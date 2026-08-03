import { useEffect } from "react";
import axios from "axios";

import { me } from "@/api/auth/auth.api";

import { tokenService } from "@/services/token.service";

import { useAuthStore } from "@/store/auth.store";

export function useInitializeAuth() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    if (!tokenService.has()) {
      initialize(null);
      return;
    }

    async function loadUser() {
      try {
        const response = await me();

        initialize(response.data);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.code !== "ERR_CANCELED" &&
          error.response?.status === 401
        ) {
          console.log("Token expired or invalid. Logging out...");
          tokenService.clear();
          initialize(null);
        }
      }
    }

    loadUser();
  }, [initialize]);
}
