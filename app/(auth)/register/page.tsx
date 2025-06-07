"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      // Redirect to login page on success
      router.push("/login?registered=true");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 relative">
      <div className="absolute inset-0 z-0">
        <RetroGrid />
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-amber-900 text-center mb-6">
            Create Account
          </h2>

          {error && (
            <div className="mb-6 p-4 text-sm text-red-800 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2" htmlFor="collegeName">
                College Name
              </label>
              <input
                {...register("collegeName")}
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.collegeName && (
                <p className="mt-2 text-sm text-red-600">{errors.collegeName.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-amber-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-amber-600 hover:text-amber-800"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}