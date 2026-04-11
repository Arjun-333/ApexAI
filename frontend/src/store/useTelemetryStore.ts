import { create } from 'zustand';

interface TelemetryData {
  heartRate: number;
  hrv: number;
  recovery: number;
  metabolicZone: "Aerobic" | "Anaerobic" | "Recovery" | "Peak";
  stressLevel: number;
}

interface TelemetryState {
  data: TelemetryData;
  syncStatus: "CONNECTED" | "SYNCING" | "STABLE";
  dataSource: "SIMULATION" | "LIVE";
  biometricSource: string | null;
  setData: (data: Partial<TelemetryData>) => void;
  setSyncStatus: (status: "CONNECTED" | "SYNCING" | "STABLE") => void;
  setDataSource: (source: "SIMULATION" | "LIVE", biometricSource?: string | null) => void;
  isSyncing: () => boolean;
}

export const useTelemetryStore = create<TelemetryState>((set, get) => ({
  data: {
    heartRate: 72,
    hrv: 45,
    recovery: 88,
    metabolicZone: "Aerobic",
    stressLevel: 12,
  },
  syncStatus: "STABLE",
  dataSource: "SIMULATION",
  biometricSource: null,
  setData: (newData) => set((state) => ({ 
    data: { ...state.data, ...newData } 
  })),
  setSyncStatus: (status) => set({ syncStatus: status }),
  setDataSource: (source, biometricSource = null) => set({ 
    dataSource: source, 
    biometricSource: biometricSource 
  }),
  isSyncing: () => get().syncStatus !== "STABLE",
}));
