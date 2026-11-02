import { z } from "zod";

export const ChatSourceSchema = z.object({
  source: z.string(),
  score: z.number(),
  page: z.number(),
  chunkId: z.string(),
  documentId: z.string(),
});

export const ChatResponseSchema = z.object({
  answer: z.string(),
  confidence: z.number(),
  suggestions: z.array(z.string()),
  sources: z.array(ChatSourceSchema),
});

export type ChatResponse = z.infer<typeof ChatResponseSchema>;

export const AskQuestionSchema = z.object({
  question: z.string().trim().min(1, "Question is required"),
});

export type AskQuestionDto = z.infer<typeof AskQuestionSchema>;
