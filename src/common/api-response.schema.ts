import { z } from "zod";

export const ApiResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    success: z.boolean(),
    statusCode: z.number(),
    message: z.string(),
    data: schema,
  });

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};
