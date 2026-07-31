const ACCESS = "access_token";
const REFRESH = "refresh_token";

class TokenService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.accessToken = localStorage.getItem(ACCESS);
    this.refreshToken = localStorage.getItem(REFRESH);
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;

    localStorage.setItem(ACCESS, access);
    localStorage.setItem(REFRESH, refresh);
  }

  clear() {
    this.accessToken = null;
    this.refreshToken = null;

    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
  }

  has() {
    return !!this.accessToken;
  }
}

export const tokenService = new TokenService();
