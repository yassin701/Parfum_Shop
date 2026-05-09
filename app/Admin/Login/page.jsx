"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/Admin/AdminCards");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      
      {/* LOGIN FORM */}
      <div 
        ref={formRef}
        className="w-full max-w-md"
      >
        {/* BRAND HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-light tracking-[0.2em] text-black mb-2">
            ARABI
          </h1>
          <div className="flex justify-center gap-2 mt-3">
            <div className="w-12 h-[1px] bg-gray-300"></div>
            <div className="w-12 h-[1px] bg-yellow-600"></div>
            <div className="w-12 h-[1px] bg-gray-300"></div>
          </div>
          <p className="text-yellow-600 text-[10px] tracking-[0.3em] font-semibold mt-3">
            ADMIN PORTAL
          </p>
        </div>

        {/* WELCOME TEXT */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-light text-black mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Please enter your credentials to access the admin dashboard
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex items-start gap-3">
              <svg className="w-4 h-4 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-red-800 text-xs font-bold uppercase tracking-wider">
                  Authentication Failed
                </p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* EMAIL FIELD */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm focus:border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600 transition-all placeholder:text-gray-400"
              placeholder="admin@arabi.com"
            />
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm focus:border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600 transition-all placeholder:text-gray-400"
              placeholder="••••••••"
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <button 
              type="button"
              className="text-[11px] text-gray-400 hover:text-yellow-600 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-yellow-600 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>

          {/* DIVIDER */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white text-gray-400">Secure Access</span>
            </div>
          </div>

          {/* BACK BUTTON */}
          <button 
            type="button"
            onClick={() => router.push('/')}
            className="w-full text-gray-400 hover:text-black text-xs transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Boutique
          </button>
        </form>

        {/* SECURITY NOTE */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-[9px] text-gray-400">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A10 10 0 0010 19.985 10 10 0 0017.834 5 8 8 0 0010 2a8 8 0 00-7.834 2.999zM10 8a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
            </svg>
            <span>Secured by Supabase Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
}