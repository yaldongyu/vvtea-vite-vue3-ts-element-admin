import { defineStore } from "pinia"; 



export interface ISidebarState {
    opened?: boolean;
    withoutAnimation?: boolean;
     
  }


export const useAppStore = defineStore("app", {
  state: () => {
    return {
      sidebar:  {
        opened: true,
        withoutAnimation: false,
      } as ISidebarState,
      device: "desktop",
      size: "medium",
    };
  },
  getters: {
    getSideBar: (state) => {
      // 安装完插件后好像没生效，当我准备自己写的时候，生效了。
      // state.userState.token = localStorage.getItem("token")  || ""
      return state.sidebar;
    },
  },
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
