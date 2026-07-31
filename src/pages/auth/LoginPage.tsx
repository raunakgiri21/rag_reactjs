import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { type LoginDto, LoginSchema } from "@/api/auth/auth.schema";

import { useLoginMutation } from "@/hooks/mutations/useLoginMutation";

export default function LoginPage() {
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginDto) {
    loginMutation.mutate(values);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-3xl font-bold">Login</h1>

        <div className="mb-4">
          <label>Email</label>

          <input
            {...register("email")}
            className="mt-1 w-full rounded border p-2"
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label>Password</label>

          <input
            type="password"
            {...register("password")}
            className="mt-1 w-full rounded border p-2"
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full btn"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
