import { api } from "@/services/axios";

import { ApiResponseSchema } from "../../common/api-response.schema";

import { DocumentsSchema } from "./documents.schema";
import z from "zod";

export async function getDocuments() {
  const response = await api.get("/kb/documents");
  return ApiResponseSchema(DocumentsSchema).parse(response.data);
}

export async function deleteDocument(id: string) {
  const response = await api.delete(`/kb/documents`, {
    data: {
      documentId: id,
    },
  });

  const result = ApiResponseSchema(z.any()).parse(response.data);

  if (!result.success) {
    throw new Error(result.message);
  }

  if (result.data.deleted !== true) {
    throw new Error("Failed to delete document");
  }

  return result;
}

export async function uploadDocument(
  file: File,
  onProgress?: (progress: number) => void,
) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/kb/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    onUploadProgress(progressEvent) {
      if (!progressEvent.total) return;

      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );

      onProgress?.(progress);
    },
  });

  return response.data;
}

export async function getDocumentPdf(
  documentId: string,
  signal?: AbortSignal,
): Promise<Blob> {
  const response = await api.get(`/kb/documents/${documentId}/preview`, {
    responseType: "blob",
    signal,
  });

  return response.data;
}
