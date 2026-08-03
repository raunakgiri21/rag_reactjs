import { api } from "@/services/axios";

import { ApiResponseSchema } from "../../common/api-response.schema";

import { type AskQuestionDto, ChatResponseSchema } from "./chat.schema";

export async function askChat(dto: AskQuestionDto) {
  const response = await api.post("/chat/ask", dto);

  return ApiResponseSchema(ChatResponseSchema).parse(response.data);
}
