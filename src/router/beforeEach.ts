import router from "./index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { RouteLocationNormalized } from "vue-router";
import { useUserStore } from "@/store/user";

NProgress.configure({ showSpinner: false });
const modules = import.meta.glob("../views/*/*.vue");
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod);
  });
}

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

const routerPackag = function (routers: []) {
  if (routers) {
    routers.filter((itemRouter: any) => {
      // if (itemRouter.component != "layout/Layout") {
      router.addRoute({
        //home是父组件 add-route添加进父组件chilren里
        path: `${itemRouter.path}`,
        name: itemRouter.name,
        meta: {
          title: itemRouter.name,
        },
        component: modules[`../views/${itemRouter.component}`],
      });
      // }
      if (itemRouter.children && itemRouter.children.length) {
        routerPackag(itemRouter.children);
      }
      return true;
    });
  }
};

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: any
  ) => {
    // Start progress bar
    NProgress.start();
    console.log(
      "------router.beforeEach and nprogress has working---------------"
    );

    const userStore = useUserStore();
    const token = userStore.getUserState.token || "";
    const roles = userStore.getUserState.roles || [];

    // const GenerateRoutes = userStore.GenerateRoutes;
    console.log("roles from server =", userStore.getUserState);
    if (token.length > 0) {
      if (to.path === "/login") {
        next({ path: "/" });
      } else {
        //  if (roles.length === 0) { // 判断当前用户是否已拉取完user_info信息,新人有基础角色
        //     GetInfo.then(res => { // 拉取info
        //       const roles = res.data.role;
        //       GenerateRoutes(roles).then(() => { // 生成可访问的路由表
        //         router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //         next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        //       })
        //     }).catch(err => {
        //       console.log(err);
        //     });
        //   } else {
        //     next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        //   }

        // determine whether the user has obtained his permission roles through getInfo
        const hasRoles = (roles.length > 0);
        if (hasRoles) {
          next();
        } else {
          try {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']

            const { roles = ["userRole"] } = await userStore.GetInfo();

            
            console.log("roles from server =", to);
            console.log("hasRoles=", hasRoles);

            // generate accessible routes map based on roles
            const { routes = [] } = await userStore.GenerateRoutes(roles);

            // const about = {    //接口返回路由信息
            //   path: '/about',
            //   name: 'About',
            //   component: () => import('./views/About.vue')
            // };
            // dynamically add accessible routes
            // router.addRoute(routerPackag(routes));
            routerPackag(routes);
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true });
          } catch (error) {
            // remove token and go to login page to re-login
            // await store.dispatch("user/resetToken");
            // Message.error(error || "Has Error");
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next();
      } else {
        next("/login"); // 否则全部重定向到登录页
      }
    }

    // next();
  }
);

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done();
});
