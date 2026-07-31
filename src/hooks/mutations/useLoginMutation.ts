import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { login } from "@/api/auth/auth.api";
import type { LoginDto } from "@/api/auth/auth.schema";

import { tokenService } from "@/services/token.service";
import { useAuthStore } from "@/store/auth.store";

import { getApiError } from "@/utils/api-error";

export function useLoginMutation() {
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (dto: LoginDto) => login(dto),

    onSuccess: ({ data }) => {
      tokenService.setTokens(data.accessToken, data.refreshToken);

      setUser(data.user);

      toast.success("Logged in successfully");

      navigate("/");
    },

    onError: (error) => {
      toast.error(getApiError(error));
    },
  });
}
