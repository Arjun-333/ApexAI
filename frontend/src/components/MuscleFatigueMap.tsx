"use client";

import React from "react";
import { Activity } from "lucide-react";

export const MuscleFatigueMap = () => {
  return (
    <div className="surface-card border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-black brand-tracking uppercase text-white/20 flex items-center gap-2">
          <Activity size={12} className="text-primary" /> Fatigue Heatmap // Neural Path
        </h3>
      </div>

      <div className="flex justify-center py-4">
        <svg width="120" height="240" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Detailed Silhouette */}
          <path d="M50 10C55 10 58 14 58 20C58 26 55 30 50 30C45 30 42 26 42 20C42 14 45 10 50 10Z" className="fill-white/5" />
          <path d="M50 32C40 32 30 38 28 50C26 62 26 80 26 80H74C74 80 74 62 72 50C70 38 60 32 50 32Z" className="fill-white/5 text-white/10" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Muscle Groups - Heatmap Highlights */}
          {/* Shoulders */}
          <circle cx="30" cy="50" r="5" className="fill-primary/40 animate-pulse" />
          <circle cx="70" cy="50" r="5" className="fill-primary/40 animate-pulse" />
          
          {/* Chest/Core */}
          <rect x="35" y="45" width="30" height="40" rx="4" className="fill-primary/20" />
          
          {/* Quads */}
          <path d="M30 110C30 110 25 140 28 160" stroke="#a3ff12" strokeWidth="6" strokeLinecap="round" className="opacity-80" />
          <path d="M70 110C70 110 75 140 72 160" stroke="#a3ff12" strokeWidth="6" strokeLinecap="round" className="opacity-80" />
          
          {/* Legend-style indicators */}
          <text x="50" y="195" textAnchor="middle" className="fill-primary/60 text-[6px] font-bold uppercase tracking-widest">Active Zones: Quads / Delts</text>
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="p-2 bg-white/2 border border-white/5">
          <span className="block text-[8px] font-bold text-white/20 uppercase">Core Stability</span>
          <span className="text-xs font-black text-white">84%</span>
        </div>
        <div className="p-2 bg-white/2 border border-white/5">
          <span className="block text-[8px] font-bold text-white/20 uppercase">Neural Load</span>
          <span className="text-xs font-black text-primary">High</span>
        </div>
      </div>
    </div>
  );
};
