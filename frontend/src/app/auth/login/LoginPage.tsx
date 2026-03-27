"use client";

import { login } from "@/services/authService";
import { useProfile } from "@/contexts/ProfileContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { refreshProfile } = useProfile();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
      await refreshProfile();
      router.replace("/dashboard");
    } catch (err: any) {
      console.error("[LoginPage] Login failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 mb-6">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Sign in to continue your shopping journey
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-accent text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-gray-700 placeholder:text-gray-300 ring-1 ring-gray-100 focus:ring-2 focus:ring-accent transition-all duration-200 outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <button type="button" className="text-xs font-bold text-accent hover:underline">
                    Forgot?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-accent text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-gray-700 placeholder:text-gray-300 ring-1 ring-gray-100 focus:ring-2 focus:ring-accent transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center items-center py-4 px-4 bg-accent text-white rounded-2xl font-black shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm font-medium text-gray-500">
            First time here?{" "}
            <Link 
              href="/auth/register" 
              className="text-accent font-black hover:underline decoration-2 transition-all"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

