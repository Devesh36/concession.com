"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RetroGrid } from "@/components/magicui/retro-grid";

export default function LoginPage() {
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
            Welcome Back
          </h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-amber-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-amber-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-500 transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-amber-700">
            Don't have an account?{" "}
            <Link 
              href="/register" 
              className="text-amber-600 hover:text-amber-800 font-medium"
            >
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}