"use client";

import React, { useState } from "react";
import { 
  Watch, 
  Smartphone, 
  CheckCircle2, 
  Link2, 
  Loader2,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { useTelemetryStore } from "@/store/useTelemetryStore";

const PROVIDERS = [
  {
    id: "garmin",
    name: "Garmin Connect",
    icon: Watch,
    color: "text-blue-400",
    description: "High-precision GPS and biometrics",
  },
  {
    id: "whoop",
    name: "WHOOP",
    icon: Link2,
    color: "text-red-500",
    description: "Recovery and strain optimization",
  },
  {
    id: "apple_health",
    name: "Apple Health",
    icon: Smartphone,
    color: "text-rose-500",
    description: "Unified iOS health data bridge",
  }
];

export const SyncCenter = () => {
  const setDataSource = useTelemetryStore(s => s.setDataSource);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [connected, setConnected] = useState<string[]>([]);

  const handleSync = (id: string) => {
    setSyncing(id);
    // Simulate OAuth/Handshake flow
    setTimeout(() => {
      setSyncing(null);
      setConnected(prev => [...prev, id]);
      setDataSource("LIVE", id);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-black uppercase tracking-tight text-white/80">Biometric Sync Center</h3>
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Authorized Device Management // Active</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <ShieldCheck size={14} className="text-primary" />
          <span className="text-[9px] font-black text-primary uppercase">Encrypted Handshake</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROVIDERS.map((provider) => {
          const isConnected = connected.includes(provider.id);
          const isSyncing = syncing === provider.id;

          return (
            <div 
              key={provider.id}
              className={`surface-card p-6 border transition-all duration-300 ${
                isConnected ? 'border-primary/40 bg-primary/5' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${provider.color}`}>
                  <provider.icon size={24} />
                </div>
                {isConnected && (
                  <CheckCircle2 size={18} className="text-primary animate-in zoom-in" />
                )}
              </div>

              <h4 className="text-sm font-black text-white uppercase mb-1 tracking-tight">{provider.name}</h4>
              <p className="text-[10px] text-white/40 uppercase mb-6 leading-relaxed">
                {provider.description}
              </p>

              <button
                disabled={isConnected || isSyncing}
                onClick={() => handleSync(provider.id)}
                className={`w-full py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  isConnected 
                    ? 'bg-primary/20 text-primary border border-primary/20' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                }`}
              >
                {isSyncing ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={12} className="animate-spin" />
                    <span>Synchronizing</span>
                  </div>
                ) : isConnected ? (
                  "Connected"
                ) : (
                  "Authorize Sync"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {!connected.length && (
        <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl flex items-center gap-4">
          <AlertTriangle className="text-amber-500" size={18} />
          <p className="text-[9px] text-amber-500/60 uppercase font-bold">
            No active biometric bridge detect. Telemetry is currently running on high-fidelity simulation protocols.
          </p>
        </div>
      )}
    </div>
  );
};
