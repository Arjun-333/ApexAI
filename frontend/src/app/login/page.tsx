"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import SystemLoader from "@/components/SystemLoader";
import Image from "next/image";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useNeuralCommander } from "@/hooks/useNeuralCommander";
import { useEffect } from "react";

export default function LoginPage() {
  const { transmit } = useNeuralCommander();
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    transmit("Apex Neural Interface Online. Awaiting operative authorization.");
  }, []);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      const data = await api.auth.login(formData);
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        // Simulate JWT Handshake
        localStorage.setItem("apex_token", "oper-tier-alpha-" + Date.now());
        router.push("/dashboard");
      } else {
        setError(data.detail || "Invalid login credentials");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      {loading && <SystemLoader message="Authenticating Identity" />}
      <div className="surface-card w-full max-w-md border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 -rotate-45 translate-x-8 -translate-y-8" />
        
        <div className="text-center mb-10 pt-4">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16 opacity-80 filter drop-shadow-[0_0_8px_rgb(var(--primary))]">
              <Image 
                src="/logo.png" 
                alt="Apex Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="text-5xl font-black brand-tracking mb-1 uppercase text-primary drop-shadow-[0_0_10px_rgb(var(--primary-glow))]">Apex</h1>
          <p className="text-white/20 font-bold uppercase text-[9px] tracking-[0.3em] inline-block border-t border-white/5 pt-2">
             Neural Interface // Authorization
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Identity</label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/5 rounded p-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Coded Key</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/5 rounded p-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-accent text-sm text-center font-medium bg-accent/10 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-background font-black py-4 rounded hover:bg-primary/90 transition-all disabled:opacity-50 uppercase text-xs tracking-[0.2em]"
          >
            {loading ? "Decrypting" : "Authorize Access"}
          </button>
        </form>

        <p className="mt-8 text-center text-white/40 text-[10px] font-bold uppercase tracking-widest">
          New operative?{" "}
          <Link href="/register" className="text-primary hover:text-primary/80 transition-colors">
            Register Identity
          </Link>
        </p>
        <div className="mt-12">
            <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
