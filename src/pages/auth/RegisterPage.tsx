import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { type RegisterDto, RegisterSchema } from "@/api/auth/auth.schema";

import { useRegisterMutation } from "@/hooks/mutations/useRegisterMutation";

export default function RegisterPage() {
  const mutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterDto) {
    mutation.mutate(values);
  }

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-3xl font-bold">Register</h1>

        <div className="mb-4">
          <label>Name</label>

          <input
            {...register("name")}
            className="mt-1 w-full rounded border p-2"
          />

          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>

        <div className="mb-4">
          <label>Email</label>

          <input
            {...register("email")}
            className="mt-1 w-full rounded border p-2"
          />

          <p className="text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div className="mb-4">
          <label>Password</label>

          <input
            type="password"
            {...register("password")}
            className="mt-1 w-full rounded border p-2"
          />

          <p className="text-sm text-red-500">{errors.password?.message}</p>
        </div>

        <div className="mb-6">
          <label>Confirm Password</label>

          <input
            type="password"
            {...register("confirmPassword")}
            className="mt-1 w-full rounded border p-2"
          />

          <p className="text-sm text-red-500">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          disabled={mutation.isPending}
          className="w-full btn bg-green-600"
        >
          {mutation.isPending ? "Creating..." : "Register"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
