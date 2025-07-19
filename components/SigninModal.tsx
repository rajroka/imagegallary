"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useModalStore } from "@/store/useAuthmodal";
import { signIn } from "next-auth/react";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { PostUser } from "@/app/api/Users";

const SignInSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof SignInSchema>;

const SignInModal = () => {
  const { isSignupOpen, closeSignup, openLogin } = useModalStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await PostUser(data);
      reset();
      closeSignup();
      openLogin();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isSignupOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative">
        <button
          onClick={closeSignup}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full border rounded px-3 py-2"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded px-3 py-2 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-3 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">or</div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mt-2 w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-50"
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button
            onClick={() => {
              closeSignup();
              openLogin();
            }}
            className="text-blue-600 hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
