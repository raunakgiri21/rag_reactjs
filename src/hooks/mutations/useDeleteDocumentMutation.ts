import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { deleteDocument } from "@/api/documents/documents.api";

import { documentKeys } from "@/api/documents/documents.keys";

export function useDeleteDocumentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,

    onSuccess() {
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
