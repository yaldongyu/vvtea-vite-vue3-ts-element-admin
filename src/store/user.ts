 
import { defineStore } from "pinia";
import http from "@/service/http";
import userApi from "@/service/api/user";
import { ILoginParams } from "@/service/api/types";

export interface IUserState {
  token?: string;
  name?: string;
  avatar?: string;
  introduction?: string;
  roles?: string[];
  email?: string;  
  routes?: [];  
 
}
 


export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userState : {} as IUserState ,
    };
  },
  getters: {
    getUserState: (state) => {  
      // 安装完插件后好像没生效，当我准备自己写的时候，生效了。
      // state.userState.token = localStorage.getItem("token")  || ""
      return state.userState
    },
  },
  actions: {
    async Login(params: ILoginParams) {
      // const { data, error } = useRequest(http.post("/", { a: "" }));
      this.userState = await userApi.login(params).then(response=>{ 
        const { data } = response   
        // localStorage.setItem("token", data.token)
        console.log("store.login token:" + data.token ); 
        this.userState.token =  data.token  
        return this.userState
      }).catch((error) => {
        var us : IUserState = {  }
        console.log("store.login fail..."); 
        console.log(error); 
        return us;
      });
    },        
    async GetInfo() {
      // 直接问后端要用户信息。因为本身有token,而且返回一个完整的userState
      this.userState = await userApi.GetInfo().then(response=>{ 
        const { data } = response    
        
        console.log("getInfo from server" , data); 
        var us : IUserState = data
        return us 
      }).catch((error) => {
        var us : IUserState = {  }
        console.log("store.GetInfo fail..."); 
        console.log(error); 
        return us;
      });
      return this.userState
    },
    async GenerateRoutes(params: string[] ) {
      // const { data, error } = useRequest(http.post("/", { a: "" }));
      this.userState = await userApi.GenerateRoutes(params).then(response=>{ 
        const { data } = response  
        this.userState.routes =  data.routers 
        return this.userState
      }).catch((error) => {
        var us : IUserState = {  }
        console.log("store.login fail..."); 
        console.log(error); 
        return us;
      });
      return this.userState
    },
  },
  persist: {
    enabled: true,
    strategies: [
      { 
        storage: localStorage,
      }
    ]
  }
});
