import { useAuthStore } from "@/store/auth.store";
import { tokenService } from "./token.service";
import type { LoginResponse } from "@/api/auth/auth.schema";
import { clearChatHistory } from "./chat.service";
import { documentKeys } from "@/api/documents/documents.keys";
import { queryClient } from "@/providers/query.client";

export function loginSuccess(data: LoginResponse) {
  tokenService.setTokens(data.accessToken, data.refreshToken);

  useAuthStore.getState().setUser(data.user);
}

export function logoutSuccess() {
  const userId = useAuthStore.getState().user?.id ?? null;

  clearChatHistory(userId);
  tokenService.clear();
  queryClient.invalidateQueries({
    queryKey: documentKeys.all,
    refetchType: "none",
  });

  useAuthStore.getState().logout();
}
