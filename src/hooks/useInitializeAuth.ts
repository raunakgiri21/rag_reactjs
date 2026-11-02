import { useEffect } from "react";
import axios from "axios";

import { me } from "@/api/auth/auth.api";

import { tokenService } from "@/services/token.service";

import { useAuthStore } from "@/store/auth.store";
import { logoutSuccess } from "@/services/auth.service";

export function useInitializeAuth() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    if (!tokenService.getAccessToken() && !tokenService.getRefreshToken()) {
      initialize(null);
      return;
    }

    async function loadUser() {
      try {
        const response = await me();

        initialize(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === "ERR_CANCELED") {
          return;
        }

        console.log("Unable to initialize authentication. Logging out...");
        logoutSuccess();
      }
    }

    loadUser();
  }, [initialize]);
}
