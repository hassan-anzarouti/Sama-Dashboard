import http from "../../api/axios";

class AuthService {
  login = (data: any): Promise<any> => http.post("/login", data);
  logout = (data: any): Promise<any> => http.post("/auth/logout");

  // logout = (params?: RequestParams) =>
  //   this.http.request<void>({
  //     path: `/auth/sign-out`,
  //     method: "POST",
  //     ...params,
  //   })

  me = () => http.get("/auth/me");

  changePassword = (data: any): Promise<any> =>
    http.post("/auth/change-password", data);

  updateProfile = (data: any): Promise<any> => http.put("/auth/me", data);
}

export default AuthService;
