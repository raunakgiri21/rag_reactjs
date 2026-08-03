import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { uploadDocument } from "@/api/documents/documents.api";
import { documentKeys } from "@/api/documents/documents.keys";
import { getApiError } from "@/utils/api-error";

export function useUploadDocumentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progress: number) => void;
    }) => uploadDocument(file, onProgress),

    onSuccess() {
      toast.success("Document uploaded");

      queryClient.invalidateQueries({
        queryKey: documentKeys.all,
      });
    },

    onError(error) {
      toast.error(getApiError(error));
    },
  });
}
