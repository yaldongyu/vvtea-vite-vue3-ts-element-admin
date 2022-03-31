import { createRouter, createWebHashHistory } from "vue-router";
import Layout from '@/layout/index.vue'
const modules = import.meta.glob("../views/*/*.vue");
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod);
  });
}

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      component: modules["../views/login/index.vue"],
    }, 
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: modules["../views/dashboard/index.vue"],
          name: 'Dashboard',
          meta: {
            title: 'dashboard',
            icon: 'dashboard',
            affix: true
          }
        }
      ]
    },
    {
      path: '/testpage',
      component: Layout,
      redirect: '/testpage/index',
      children: [
        {
          path: 'index',
          component: modules["../views/testpage/index.vue"],
          name: 'testpage',
          meta: {
            title: 'testpage',
            icon: 'testpage',
            affix: true
          }
        }
      ]
    },
  ],
});

export default Router;
