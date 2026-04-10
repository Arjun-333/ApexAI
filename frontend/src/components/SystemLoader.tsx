'use client';

import React, { useState, useEffect } from 'react';

export default function SystemLoader({ message = "Establishing Neural Link" }: { message?: string }) {
  const [logs, setLogs] = useState<string[]>([]);
  const systemMessages = [
    "Initializing biometric handshake...",
    "Verifying authorized operative...",
    "Parsing performance metrics...",
    "Syncing training protocols...",
    "Optimizing nutritional matrix...",
    "Securing operational environment...",
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < systemMessages.length) {
        setLogs(prev => [...prev, `>> ${systemMessages[current]}`]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-primary font-black brand-tracking text-[10px] uppercase">
            {message}
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-primary animate-pulse"></div>
            <div className="w-1 h-1 bg-primary animate-pulse [animation-delay:200ms]"></div>
            <div className="w-1 h-1 bg-primary animate-pulse [animation-delay:400ms]"></div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="h-1 bg-white/5 w-full mb-6 overflow-hidden border border-white/5">
          <div className="h-full bg-primary w-full origin-left animate-[loading-bar_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(163,255,18,0.5)]"></div>
        </div>

        {/* Console Output */}
        <div className="bg-black/40 border border-white/5 p-4 h-32 font-mono text-[9px] overflow-hidden">
          <div className="space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="text-white/40 animate-in fade-in slide-in-from-left-2 duration-300">
                {log}
                {i === logs.length - 1 && <span className="inline-block w-1.5 h-3 bg-primary/40 ml-1 animate-pulse align-middle"></span>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-white/10 text-[8px] font-bold uppercase tracking-[0.3em] animate-pulse">
                System Authorized // Handshake in Progress
            </p>
        </div>
      </div>
    </div>
  );
}
