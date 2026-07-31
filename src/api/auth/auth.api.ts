import { api } from "@/services/axios";

import { ApiResponseSchema } from "../../common/api-response.schema";

import {
  type LoginDto,
  LoginResponseSchema,
  type RegisterDto,
  UserSchema,
} from "./auth.schema";

export async function login(dto: LoginDto) {
  const response = await api.post("/auth/login", dto);

  return ApiResponseSchema(LoginResponseSchema).parse(response.data);
}

export async function register(dto: RegisterDto) {
  const response = await api.post("/auth/register", dto);

  return ApiResponseSchema(LoginResponseSchema).parse(response.data);
}

export async function me() {
  const response = await api.get("/auth/me");

  return ApiResponseSchema(UserSchema).parse(response.data);
}

export async function logout() {
  await api.post("/auth/logout");
}
