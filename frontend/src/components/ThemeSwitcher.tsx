"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useNeuralCommander } from "@/hooks/useNeuralCommander";

const ThemeSwitcher = () => {
  const { theme, setTheme, stealthMode, toggleStealthMode } = useTheme();
  const { transmit } = useNeuralCommander();

  const themes = [
    { id: 'apex', label: 'APEX CORE', color: 'bg-[#a3ff12]' },
    { id: 'chernobyl', label: 'HAZARD STATE', color: 'bg-[#ffb400]' },
    { id: 'nuorbit', label: 'VOID PROTOCOL', color: 'bg-[#00f0ff]' },
  ] as const;

  return (
    <div className="flex flex-col gap-6 p-6 surface-card border-primary/20">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black brand-tracking uppercase text-white/40">Visual Spectrum</span>
        <span className="text-[8px] font-mono text-primary/60 px-2 py-0.5 border border-primary/20 rounded-full">v4.0.1 stabilized</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTheme(t.id);
              transmit(`Visual spectrum shifted to ${t.label}. Neural resync complete.`);
            }}
            className={`
              relative group flex flex-col items-center gap-3 p-4 transition-all duration-300
              border ${theme === t.id ? 'border-primary bg-primary/5' : 'border-white/5 bg-black/20 hover:border-white/20'}
            `}
          >
            <div className={`w-3 h-3 rounded-full ${t.color} ${theme === t.id ? 'shadow-[0_0_10px_rgb(var(--primary))]' : 'opacity-40'}`} />
            <span className={`text-[9px] font-bold tracking-widest ${theme === t.id ? 'text-primary' : 'text-white/40'}`}>
              {t.label}
            </span>
            
            {theme === t.id && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rotate-45" />
            )}
          </button>
        ))}
      </div>

      {/* Stealth Mode Protocol */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-white uppercase tracking-widest">Stealth Mode Protocol</p>
          <p className="text-[8px] text-white/20 uppercase mt-1">Reduce ocular fatigue & saturation</p>
        </div>
        <button 
          onClick={() => {
            toggleStealthMode();
            transmit(stealthMode ? "Stealth mode disengaged. Full spectrum restored." : "Stealth mode engaged. Contrast minimized.");
          }}
          className={`
            relative w-12 h-6 rounded-full transition-all duration-300
            ${stealthMode ? 'bg-primary' : 'bg-white/10'}
          `}
        >
          <div className={`
            absolute top-1 w-4 h-4 rounded-full transition-all duration-300
            ${stealthMode ? 'left-7 bg-black' : 'left-1 bg-white/40'}
          `} />
        </button>
      </div>

      <div className="pt-2">
         <p className="text-[8px] leading-relaxed text-white/20 font-medium italic">
            CAUTION: High-frequency biometric monitoring is active. Ensure neural anchors are stabilized before shifting spectrum.
         </p>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
