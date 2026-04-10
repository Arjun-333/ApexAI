"use client";

import React from "react";
import { Shield, CheckCircle2, Circle } from "lucide-react";

const challenges = [
  { id: 1, title: "100km Tactical March", progress: 65, goal: 100, unit: "KM", difficulty: "High" },
  { id: 2, title: "Zero Gravity Intake", progress: 12, goal: 30, unit: "Days", difficulty: "Mid" },
  { id: 3, title: "Peak Output Protocol", progress: 4, goal: 5, unit: "Sessions", difficulty: "Iron" },
];

export const MissionChallenges = () => {
  return (
    <div className="surface-card border-primary/20 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-black brand-tracking uppercase text-white/20 flex items-center gap-2">
          <Shield size={12} className="text-primary" /> Strategic Challenges // Active
        </h3>
      </div>

      <div className="space-y-6">
        {challenges.map((ch) => (
          <div key={ch.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-white uppercase tracking-wider">{ch.title}</span>
              <span className="text-[8px] font-mono text-primary/60">{ch.progress}/{ch.goal} {ch.unit}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000" 
                style={{ width: `${(ch.progress / ch.goal) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-1">
               {ch.progress >= ch.goal ? <CheckCircle2 size={10} className="text-primary" /> : <Circle size={10} className="text-white/10" />}
               <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{ch.difficulty} Grade Objective</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
