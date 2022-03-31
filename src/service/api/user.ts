import http from "@/service/http";
import * as T from "./types";

const userApi: T.IUserApi = {
  login(params) {
    return http.post("/login", params);
  },      
  GetInfo() {
    return http.post("/user/getinfo");
  },
  GenerateRoutes(params) {
    return http.post("/user/getroutes", params);
  },
};

export default userApi;
