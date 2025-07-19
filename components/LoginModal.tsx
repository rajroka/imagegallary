"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useModalStore } from "@/store/useAuthmodal";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FiX } from "react-icons/fi";

const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginModal = () => {
  const { isLoginOpen, closeLogin, openSignup } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/dashboard");
      closeLogin();
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <button
          onClick={closeLogin}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Log in to your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            disabled={loading}
            {...register("email")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            disabled={loading}
            {...register("password")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">or</div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          disabled={loading}
          className="mt-2 w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-50"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>

        <div className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <button
            onClick={() => {
              closeLogin();
              openSignup();
            }}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
