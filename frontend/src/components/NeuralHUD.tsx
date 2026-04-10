"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

export const NeuralHUD = () => {
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const handleAlert = (e: any) => {
      const newMessage = { id: Math.random().toString(), text: e.detail };
      setMessages((prev) => [...prev, newMessage]);
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== newMessage.id));
      }, 5000);
    };

    window.addEventListener("neural-alert", handleAlert);
    return () => window.removeEventListener("neural-alert", handleAlert);
  }, []);

  if (messages.length === 0) return null;

  return (
    <div className="fixed top-24 right-8 z-[100] space-y-4 pointer-events-none">
      {messages.map((m) => (
        <div key={m.id} className="bg-black/90 border border-primary/40 p-4 min-w-[300px] animate-in slide-in-from-right fade-in backdrop-blur-md">
          <div className="flex items-center gap-3 mb-2">
            <Terminal size={14} className="text-primary animate-pulse" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Neural Transmission Entry</span>
          </div>
          <p className="text-xs font-bold text-white uppercase leading-relaxed font-mono">
            {m.text}
          </p>
          <div className="mt-3 h-0.5 bg-white/5 overflow-hidden">
            <div className="h-full bg-primary animate-[loading-bar_5s_linear_infinite] origin-left" />
          </div>
        </div>
      ))}
    </div>
  );
};
