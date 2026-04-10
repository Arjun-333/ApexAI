"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Zap } from "lucide-react";

const data = [
  { time: "08:00", energy: 40, pred: 45 },
  { time: "10:00", energy: 85, pred: 82 },
  { time: "12:00", energy: 70, pred: 75 },
  { time: "14:00", energy: 60, pred: 88 },
  { time: "16:00", energy: 75, pred: 92 },
  { time: "18:00", energy: 95, pred: 90 },
  { time: "20:00", energy: 50, pred: 55 },
];

export const MetabolicPredictor = () => {
  return (
    <div className="surface-card border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-black brand-tracking uppercase text-white/20 flex items-center gap-2">
          <Zap size={12} className="text-primary" /> Metabolic Predictor // Active Peak
        </h3>
      </div>

      <div className="h-[120px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a3ff12" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a3ff12" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 8 }} 
            />
            <Tooltip 
              contentStyle={{ background: "#080808", border: "1px solid rgba(163,255,18,0.2)", fontSize: "10px" }}
              itemStyle={{ color: "#a3ff12" }}
            />
            <Area 
              type="monotone" 
              dataKey="pred" 
              stroke="#a3ff12" 
              fillOpacity={1} 
              fill="url(#colorEnergy)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="text-[9px] font-medium text-white/40 leading-relaxed uppercase tracking-tighter">
          Recommendation: Initiation of high-complex carb protocol within <span className="text-primary">42 minutes</span> for optimal performance peak.
        </p>
      </div>
    </div>
  );
};
