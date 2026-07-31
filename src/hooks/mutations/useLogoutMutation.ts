import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logout } from "@/api/auth/auth.api";
import { logoutSuccess } from "@/services/auth.service";

export function useLogoutMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,

    onSettled() {
      logoutSuccess();

      navigate("/login");
    },
  });
}
