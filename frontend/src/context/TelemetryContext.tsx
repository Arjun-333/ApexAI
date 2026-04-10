"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface TelemetryData {
  heartRate: number;
  hrv: number;
  recovery: number;
  metabolicZone: "Aerobic" | "Anaerobic" | "Recovery" | "Peak";
  stressLevel: number;
}

interface TelemetryContextType {
  data: TelemetryData;
  isSyncing: boolean;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<TelemetryData>({
    heartRate: 72,
    hrv: 45,
    recovery: 88,
    metabolicZone: "Aerobic",
    stressLevel: 12,
  });
  const [syncStatus, setSyncStatus] = useState<"CONNECTED" | "SYNCING" | "STABLE">("SYNCING");

  useEffect(() => {
    // Phase 1: Establish High-Performance Handshake
    const handshake = setTimeout(() => setSyncStatus("CONNECTED"), 1500);
    const stabilize = setTimeout(() => setSyncStatus("STABLE"), 3000);

    const interval = setInterval(() => {
      setData((prev) => {
        const hrDelta = Math.floor(Math.random() * 3) - 1;
        const newHR = Math.min(Math.max(prev.heartRate + hrDelta, 60), 180);
        
        let zone: TelemetryData["metabolicZone"] = "Aerobic";
        if (newHR < 70) zone = "Recovery";
        else if (newHR > 150) zone = "Peak";
        else if (newHR > 130) zone = "Anaerobic";

        return {
          heartRate: newHR,
          hrv: Math.min(Math.max(prev.hrv + (Math.random() * 2 - 1), 30), 100),
          recovery: prev.recovery,
          stressLevel: Math.min(Math.max(prev.stressLevel + (Math.random() * 4 - 2), 5), 80),
          metabolicZone: zone,
        };
      });
    }, 1200); // Higher frequency "Neural Stream"

    return () => {
      clearTimeout(handshake);
      clearTimeout(stabilize);
      clearInterval(interval);
    };
  }, []);

  const value = React.useMemo(() => ({ 
    data, 
    isSyncing: syncStatus !== "STABLE",
    syncStatus 
  }), [data, syncStatus]);

  return (
    <TelemetryContext.Provider value={value}>
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (context === undefined) {
    throw new Error("useTelemetry must be used within a TelemetryProvider");
  }
  return context;
};
