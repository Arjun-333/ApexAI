"use client";

import React from "react";
import { useTelemetry } from "@/context/TelemetryContext";
import { Activity, Zap, ShieldCheck, TrendingUp } from "lucide-react";

export const VitalSignsWidget = () => {
  const { data, isSyncing } = useTelemetry();

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case "Peak": return "text-accent";
      case "Anaerobic": return "text-primary";
      case "Aerobic": return "text-primary/70";
      default: return "text-white/40";
    }
  };

  return (
    <div className="surface-card border-primary/20 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-black brand-tracking uppercase text-white/20 flex items-center gap-2">
          <Activity size={12} className="text-primary" /> Vital Signs // Live
        </h3>
        {isSyncing && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[8px] font-mono text-primary/60 uppercase">Neural Sync Active</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Heart Rate Section */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black tracking-tighter tabular-nums text-white">
              {data.heartRate}
            </span>
            <span className="text-[10px] font-bold text-white/20 uppercase">BPM</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000" 
                  style={{ width: `${(data.heartRate / 200) * 100}%` }}
                />
             </div>
          </div>
          <p className={`text-[9px] font-bold uppercase tracking-wider ${getZoneColor(data.metabolicZone)}`}>
            {data.metabolicZone} Zone
          </p>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 gap-4 border-l border-white/5 pl-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Zap size={12} className="text-primary/40" />
                <span className="text-[9px] font-bold text-white/40 uppercase">HRV</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-white">{Math.round(data.hrv)}ms</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-primary/40" />
                <span className="text-[9px] font-bold text-white/40 uppercase">Recovery</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-white">{data.recovery}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <TrendingUp size={12} className="text-primary/40" />
                <span className="text-[9px] font-bold text-white/40 uppercase">Stress</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-white">{Math.round(data.stressLevel)}/100</span>
          </div>
        </div>
      </div>

      {/* Background Pulse Effect */}
      <div 
        className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-all duration-700"
        style={{ transform: `scale(${1 + (data.heartRate % 10) / 100})` }}
      />
    </div>
  );
};
