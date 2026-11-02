import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { deleteDocument } from "@/api/documents/documents.api";

import { documentKeys } from "@/api/documents/documents.keys";
import { clearChatHistory } from "@/services/chat.service";
import { useAuthStore } from "@/store/auth.store";

export function useDeleteDocumentMutation() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id ?? null);

  return useMutation({
    mutationFn: deleteDocument,

    onSuccess() {
      clearChatHistory(userId);
      toast.success("Deleted");

      queryClient.invalidateQueries({
        queryKey: documentKeys.all,
      });
    },

    onError(error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    },
  });
}
