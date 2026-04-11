"use client";

import React, { useState, useEffect } from "react";
import { Terminal, ShieldAlert } from "lucide-react";

export const NeuralHUD = () => {
  const [messages, setMessages] = useState<{ id: string; text: string; type: 'critical' | 'info' | 'degraded' }[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleAlert = (e: any) => {
      const type = e.detail?.includes("FALLBACK") || e.detail?.includes("SIGNAL_LOST") ? 'degraded' : 'info';
      const newMessage = { 
        id: Math.random().toString(), 
        text: e.detail,
        type: type as any
      };
      setMessages((prev) => [newMessage, ...prev].slice(0, 10)); // Keep last 10 entries in blackbox
    };

    window.addEventListener("neural-alert", handleAlert);
    return () => window.removeEventListener("neural-alert", handleAlert);
  }, []);

  if (messages.length === 0 || !isOpen) return null;

  return (
    <div className="fixed top-24 right-8 z-[100] w-80 pointer-events-none">
      <div className="flex flex-col gap-3 pointer-events-auto">
        <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Neural Blackbox // History</span>
            <button 
                onClick={() => setMessages([])}
                className="text-[9px] font-bold text-primary/40 hover:text-primary uppercase tracking-widest transition-colors"
            >
                Purge Entries
            </button>
        </div>
        
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`
                relative bg-black/90 border p-4 backdrop-blur-md animate-in slide-in-from-right fade-in duration-300
                ${m.type === 'degraded' ? 'border-amber-500/50' : 'border-primary/40'}
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              {m.type === 'degraded' ? (
                  <ShieldAlert size={14} className="text-amber-500 animate-pulse" />
              ) : (
                  <Terminal size={14} className="text-primary" />
              )}
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${m.type === 'degraded' ? 'text-amber-500' : 'text-primary'}`}>
                {m.type === 'degraded' ? 'Degraded Signal' : 'Tactical Entry'}
              </span>
            </div>
            <p className="text-[11px] font-bold text-white uppercase leading-relaxed font-mono">
              {m.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
