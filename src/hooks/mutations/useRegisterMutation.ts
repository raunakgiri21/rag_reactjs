import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { register } from "@/api/auth/auth.api";
import type { RegisterDto } from "@/api/auth/auth.schema";

import { loginSuccess } from "@/services/auth.service";
import { getApiError } from "@/utils/api-error";

export function useRegisterMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (dto: RegisterDto) => register(dto),

    onSuccess: ({ data }) => {
      loginSuccess(data);

      toast.success("Account created successfully");

      navigate("/");
    },

    onError(error) {
      toast.error(getApiError(error));
    },
  });
}
