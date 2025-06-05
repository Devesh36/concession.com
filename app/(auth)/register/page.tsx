"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  college: z.string().min(2, "Please enter your college name"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      // We'll implement this later with API
      console.log(data);
    } catch (error) {
      console.error(error);
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
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-amber-700 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                {...register("name")}
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-amber-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-amber-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-amber-700 mb-2" htmlFor="college">
                College Name
              </label>
              <input
                {...register("college")}
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.college && (
                <p className="mt-1 text-red-500 text-sm">{errors.college.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center text-amber-700">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-amber-600 hover:text-amber-800 font-medium"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}