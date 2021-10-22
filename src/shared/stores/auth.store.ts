import { makeAutoObservable } from "mobx";
import { LoginRequest } from "./../../dto/request/login-request.dto";
import { AuthService } from "./../../services/auth.service";

export class AuthStore {
  private authenticated = false;

  constructor(private readonly authService: AuthService) {
    makeAutoObservable(this);
    this.authenticated = !!this.getAccessToken();
  }

  async login(LoginRequest: LoginRequest) {
    try {
      const tokenPayloadDTO = await this.authService.login(LoginRequest);
      localStorage.setItem("MyApp_access_token", tokenPayloadDTO.token);
      this.setAuthenticated(true);
    } catch (error) {
      this.setAuthenticated(false);
    }
  }

  private setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  getAccessToken() {
    return localStorage.getItem("MyApp_access_token");
  }

  isAuthenticated() {
    return this.authenticated;
  }
}
