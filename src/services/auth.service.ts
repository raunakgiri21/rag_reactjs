import { useAuthStore } from "@/store/auth.store";
import { tokenService } from "./token.service";
import type { LoginResponse } from "@/api/auth/auth.schema";

export function loginSuccess(data: LoginResponse) {
  tokenService.setTokens(data.accessToken, data.refreshToken);

  useAuthStore.getState().setUser(data.user);
}

export function logoutSuccess() {
  tokenService.clear();

  useAuthStore.getState().logout();
}
