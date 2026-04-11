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

import { useTelemetryStore } from "@/store/useTelemetryStore";

export const TelemetryProvider = ({ children }: { children: ReactNode }) => {
  const setData = useTelemetryStore((s) => s.setData);
  const setSyncStatus = useTelemetryStore((s) => s.setSyncStatus);

  useEffect(() => {
    // Phase 1: Establish High-Performance Handshake
    const handshake = setTimeout(() => setSyncStatus("CONNECTED"), 1500);
    const stabilize = setTimeout(() => setSyncStatus("STABLE"), 3000);

    const interval = setInterval(async () => {
      const state = useTelemetryStore.getState();
      
      if (state.dataSource === "LIVE") {
        try {
          const res = await fetch("http://localhost:8000/api/biometric/vitals");
          const vitals = await res.json();
          setData({
            heartRate: vitals.bpm,
            hrv: vitals.hrv,
            stressLevel: vitals.stress,
            recovery: vitals.recovery,
            metabolicZone: vitals.bpm > 150 ? "Peak" : vitals.bpm > 130 ? "Anaerobic" : "Aerobic"
          });
        } catch (err) {
          console.error("Tactical Sync Error: Failed to poll live vitals.");
        }
      } else {
        // High-Fidelity Simulator
        const currentData = state.data;
        const hrDelta = Math.floor(Math.random() * 3) - 1;
        const newHR = Math.min(Math.max(currentData.heartRate + hrDelta, 60), 180);
        
        let zone: TelemetryData["metabolicZone"] = "Aerobic";
        if (newHR < 70) zone = "Recovery";
        else if (newHR > 150) zone = "Peak";
        else if (newHR > 130) zone = "Anaerobic";

        setData({
          heartRate: newHR,
          hrv: Math.min(Math.max(currentData.hrv + (Math.random() * 2 - 1), 30), 100),
          stressLevel: Math.min(Math.max(currentData.stressLevel + (Math.random() * 4 - 2), 5), 80),
          metabolicZone: zone,
        });
      }
    }, 3000); // Muted frequency for diagnostic stabilization

    return () => {
      clearTimeout(handshake);
      clearTimeout(stabilize);
      clearInterval(interval);
    };
  }, [setData, setSyncStatus]);

  return <>{children}</>;
};

export const useTelemetry = () => {
  const data = useTelemetryStore((s) => s.data);
  const syncStatus = useTelemetryStore((s) => s.syncStatus);
  const isSyncing = useTelemetryStore((s) => s.isSyncing());
  
  return { data, syncStatus, isSyncing };
};
