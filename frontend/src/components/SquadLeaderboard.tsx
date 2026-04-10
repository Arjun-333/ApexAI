"use client";

import React from "react";
import { Users, Trophy, Target } from "lucide-react";

const mockOperatives = [
  { rank: 1, callsign: "VIPER-7", power: 98.4, status: "Active" },
  { rank: 2, callsign: "GHOST-Z", power: 95.2, status: "Active" },
  { rank: 3, callsign: "NEO-PRIME", power: 92.1, status: "Rest" },
  { rank: 4, callsign: "ARJUN-R", power: 88.4, status: "Active" },
];

export const SquadLeaderboard = () => {
  return (
    <div className="surface-card border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-black brand-tracking uppercase text-white/20 flex items-center gap-2">
          <Users size={12} className="text-primary" /> Squad Leaderboard // Sector 4
        </h3>
        <Trophy size={14} className="text-primary/40" />
      </div>

      <div className="space-y-4">
        {mockOperatives.map((op) => (
          <div 
            key={op.callsign} 
            className={`flex items-center justify-between p-3 border ${op.callsign === "ARJUN-R" ? 'border-primary/40 bg-primary/5' : 'border-white/5 bg-white/2'}`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black w-4 ${op.rank <= 3 ? 'text-primary' : 'text-white/20'}`}>
                {op.rank.toString().padStart(2, '0')}
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-wider text-white uppercase">{op.callsign}</span>
                <span className="text-[8px] font-bold text-white/20 uppercase">{op.status}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <Target size={10} className="text-primary/40" />
                <span className="text-sm font-black text-primary tabular-nums">{op.power.toFixed(1)}</span>
              </div>
              <span className="text-[8px] font-bold text-white/10 uppercase">Power Index</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
