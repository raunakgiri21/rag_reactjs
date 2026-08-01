import { z } from "zod";

export const DocumentStatusSchema = z.enum(["PROCESSING", "READY", "FAILED"]);

export const DocumentSchema = z.object({
  id: z.string(),

  fileName: z.string(),

  status: DocumentStatusSchema,

  userId: z.string(),

  createdAt: z.string(),
});

export type Document = z.infer<typeof DocumentSchema>;

export const DocumentsSchema = z.array(DocumentSchema);

export const UploadDocumentSchema = z.object({
  file: z
    .instanceof(File, {
      message: "Please select a PDF file",
    })
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed",
    )
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "Maximum file size is 10 MB",
    ),
});

export type UploadDocumentDto = z.infer<typeof UploadDocumentSchema>;
