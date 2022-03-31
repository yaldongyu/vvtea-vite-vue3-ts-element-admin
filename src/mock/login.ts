import { responseEncoding } from 'axios';
import  Mock  from 'mockjs';

Mock.mock("/mock/api/login","post",function(params: String ) {
    return {
        code:200,
        data:{
            token:"xxxxxxxxxxxxxxx"            
        },
        msg:"success"
    }
})
 
Mock.mock("/mock/api/user/getinfo","post",function(params: String ) {
    return {
        code:200,
        data:{
            roles: ['admin'],
            introduction: 'I am a super administrator',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: 'Super Admin',           
            email: 'stri@ng.cn'   
            },
        msg:"success"
    }
})
Mock.mock("/mock/api/user/getroutes","post",function(params: String ) {
    return {
        code:200,
        data:{
            roles:['admin'],
            routers:[
                {
                  path: '/permission',
                  component: 'layout/Layout',
                  redirect: '/permission/index',
                  alwaysShow: true,
                  meta: {
                    title: 'Permission',
                    icon: 'lock',
                    roles: ['admin', 'editor']
                  },
                  children: [
                    {
                      path: 'page',
                      component: 'views/permission/page',
                      name: 'PagePermission',
                      meta: {
                        title: 'Page Permission',
                        roles: ['admin']
                      }
                    },
                    {
                      path: 'directive',
                      component: 'views/permission/directive',
                      name: 'DirectivePermission',
                      meta: {
                        title: 'Directive Permission'
                      }
                    },
                    {
                      path: 'role',
                      component: 'views/permission/role',
                      name: 'RolePermission',
                      meta: {
                        title: 'Role Permission',
                        roles: ['admin']
                      }
                    }
                  ]
                },
               
              
                {
                  path: '/example',
                  component: 'layout/Layout',
                  redirect: '/example/list',
                  name: 'Example',
                  meta: {
                    title: 'Example',
                    icon: 'example'
                  },
                  children: [
                    {
                      path: 'create',
                      component: 'views/example/create',
                      name: 'CreateArticle',
                      meta: { title: 'Create Article', icon: 'edit' }
                    },
                    {
                      path: 'edit/:id(\\d+)',
                      component: 'views/example/edit',
                      name: 'EditArticle',
                      meta: { title: 'Edit Article', noCache: true },
                      hidden: true
                    },
                    {
                      path: 'list',
                      component: 'views/example/list',
                      name: 'ArticleList',
                      meta: { title: 'Article List', icon: 'list' }
                    }
                  ]
                },
              
                {
                  path: '/tab',
                  component: 'layout/Layout',
                  children: [
                    {
                      path: 'index',
                      component: 'views/tab/index',
                      name: 'Tab',
                      meta: { title: 'Tab', icon: 'tab' }
                    }
                  ]
                },
              
                {
                  path: '/error',
                  component: 'layout/Layout',
                  redirect: 'noRedirect',
                  name: 'ErrorPages',
                  meta: {
                    title: 'Error Pages',
                    icon: '404'
                  },
                  children: [
                    {
                      path: '401',
                      component: 'views/error-page/401',
                      name: 'Page401',
                      meta: { title: 'Page 401', noCache: true }
                    },
                    {
                      path: '404',
                      component: 'views/error-page/404',
                      name: 'Page404',
                      meta: { title: 'Page 404', noCache: true }
                    }
                  ]
                }, 
             
                
                { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
              ]
        },
        msg:"success"
    }
})










// /**
//  * mock数据与接口
//  *  资源管理接口
//  */
//  const Mock = require("mockjs");
//  import api from "../api/index";
//  import vue from "vue";
//  //是否mock数据
//  let isMock:boolean = process.env.VUE_APP_IS_MOCK == "true";
//  //获取mock数据
//  function getMockData(template:any){
//    const result = Mock.mock(template);
//    return result;
//  }
//  //返回参数类型定义
//  interface  res{
//    code:number,
//    message:string,
//    data:any
//  }
//  //请求获取数据
//  const actions = {
//    // 发布信息资源
//    async publishInfoResource(obj:{id:string}) {
//      const template = {
//        code: 0,
//        message: "success",
//        data: {
//          iSuccess:'Y'
//        }
//      };
//      if (isMock) {
//        //是否是mock数据
//        return getMockData(template)
//      }
//      let params={
//        infoResourceId: obj.id
//      }
//      let result:res = await vue.prototype.$http.post(api.publish, params).then(
//        (data: any) => {
//          return data.data;
//        },
//        (error: any) => {
//          return {};
//        }
//      );
//      return result;
//    },
//    //取消发布信息资源
//    async cancelPublishInfoResource(obj:{id:string}) {
//      const template = {
//        code: 0,
//        message: "success",
//        data: {
//          iSuccess:'Y'
//        }
//      };
//      if (isMock) {
//        //是否是mock数据
//        return getMockData(template)
//      }
//      let params={
//        infoResourceId: obj.id
//      }
//      let result:res = await vue.prototype.$http.post(api.cancelPublish, params).then(
//        (data: any) => {
//          return data.data;
//        },
//        (error: any) => {
//          return {};
//        }
//      );
//      return result;
//    },
//    //关联文件接口
//    async fileRelation(obj:{infoResourceId:string,dataResourceId:string}) {
//      const template = {
//        code: 0,
//        message: "success",
//        data: {
//          iSuccess:'Y'
//        }
//      };
//      if (isMock) {
//        //是否是mock数据
//        return getMockData(template)
//      }
//      let result:res = await vue.prototype.$http.post(api.fileRelation, obj).then(
//        (data: any) => {
//          return data.data;
//        },
//        (error: any) => {
//          return {};
//        }
//      );
//      return result;
//    },
//    //详情页关联文件列表
//    async getInfoDetailFileList(obj:{infoResourceId:string}) {
//      const template = {
//        code: 0,
//        message: "success",
//        'data|10': [
//          {
//            "id": "@id",
//            "fileName": "@cname",
//            "fileNameExtension": "cname",
//            "fileType": "png",
//            "fileSize": "12"
//          }
 
//        ]
//      };
//      if (isMock) {
//        //是否是mock数据
//        return getMockData(template)
//      }
//      let result:res = await vue.prototype.$http.get(api.infoDetailFileList, {params:obj}).then(
//        (data: any) => {
//          return data.data;
//        },
//        (error: any) => {
//          return {};
//        }
//      );
//      return result;
//    },
 
//  };
//  export default actions;
 
 