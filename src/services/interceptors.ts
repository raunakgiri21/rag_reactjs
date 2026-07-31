import axios from "axios";
import { api } from "./axios";
import { tokenService } from "./token.service";

let isRefreshing = false;

let queue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

function processQueue(error: unknown, token?: string) {
  queue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
    }
  });

  queue = [];
}

export function setupInterceptors() {
  api.interceptors.request.use((config) => {
    const token = tokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;
      const authEndpoints = ["/auth/login", "/auth/register", "/auth/refresh"];

      if (
        error.response?.status !== 401 ||
        originalRequest._retry ||
        authEndpoints.some((url) => originalRequest.url?.includes(url))
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;

              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        const tokens = response.data.data;

        tokenService.setTokens(tokens.accessToken, tokens.refreshToken);

        processQueue(null, tokens.accessToken);

        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        tokenService.clear();

        processQueue(err);

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    },
  );
}
