export interface ILoginParams {
  username: string;
  password: string | number;
}
export interface IUserApi {
  login: (params: ILoginParams) => Promise<any>;
  GetInfo: () => Promise<any>;
  GenerateRoutes: (params: string[]) => Promise<any>;
}
