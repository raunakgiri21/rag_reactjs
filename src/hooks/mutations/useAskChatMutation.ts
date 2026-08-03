import { useMutation } from "@tanstack/react-query";

import { askChat } from "@/api/chat/chat.api";

export function useAskChatMutation() {
  return useMutation({
    mutationFn: askChat,
  });
}
