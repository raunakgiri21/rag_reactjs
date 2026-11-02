import { z } from "zod";

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
});

export type User = z.infer<typeof UserSchema>;

/*
|--------------------------------------------------------------------------
| Requests
|--------------------------------------------------------------------------
*/

export const LoginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginDto = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    name: z.string().min(3),
    email: z.email(),
    password: z
      .string()
      .min(8)
      .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain uppercase, lowercase and a number",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterDto = z.infer<typeof RegisterSchema>;

/*
|--------------------------------------------------------------------------
| Responses
|--------------------------------------------------------------------------
*/

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RefreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;
