"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { 
  Dumbbell, 
  Utensils, 
  Flame, 
  Target, 
  Calendar,
  ChevronRight,
  TrendingUp,
  Activity,
  Settings,
  ShieldAlert
} from "lucide-react";
import Image from "next/image";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { VitalSignsWidget } from "@/components/VitalSignsWidget";
import { SquadLeaderboard } from "@/components/SquadLeaderboard";
import { MissionChallenges } from "@/components/MissionChallenges";
import { MuscleFatigueMap } from "@/components/MuscleFatigueMap";
import { MetabolicPredictor } from "@/components/MetabolicPredictor";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const { data: profile, isLoading: profileLoading, isError: profileError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => api.user.getProfile(),
  });

  const { data: workoutPlan, isLoading: workoutLoading, isError: workoutError } = useQuery({
    queryKey: ["workoutPlan"],
    queryFn: () => api.workout.getPlan(),
  });

  const { data: nutritionPlan, isLoading: nutritionLoading, isError: nutritionError } = useQuery({
    queryKey: ["nutritionPlan"],
    queryFn: () => api.nutrition.getPlan(),
  });

  const isLoading = profileLoading || workoutLoading || nutritionLoading;
  const isDegraded = workoutPlan?.is_fallback || nutritionPlan?.is_fallback || workoutError || nutritionError || profileError;

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-12 w-48 bg-white/5 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-40 bg-white/5 rounded-3xl"></div>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-96 bg-white/5 rounded-3xl"></div>
          <div className="h-96 bg-white/5 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10" data-degraded={isDegraded ? 'true' : 'false'}>
      {isDegraded && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center gap-4 animate-pulse">
          <ShieldAlert className="text-amber-500" size={20} />
          <div>
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Degraded Connection Detected</p>
            <p className="text-[9px] text-amber-500/60 uppercase">System is running on static neural fallbacks. Live tracking may be limited.</p>
          </div>
        </div>
      )}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="relative w-14 h-14 opacity-80 filter drop-shadow-[0_0_8px_rgb(var(--primary))]">
            <Image 
              src="/logo.png" 
              alt="Apex Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h2 className="text-white/20 font-bold uppercase tracking-[0.3em] text-[10px] mb-1">Performance System // Overview</h2>
            <h1 className="text-5xl font-black tracking-tight uppercase">Session <span className="text-primary drop-shadow-[0_0_8px_rgb(var(--primary-glow))]">Log</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
            <Calendar size={18} className="text-primary" />
            <span className="font-bold text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
      </header>

      {/* Command Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Primary Health Cluster - 8 Columns */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VitalSignsWidget />
            <MetabolicPredictor />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MuscleFatigueMap />
            {/* AI Module - Tactical Re-integration */}
            <div className="surface-card border-primary/20 flex flex-col items-center justify-center p-8 text-center min-h-[300px] group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-all">
                <Flame size={32} className="animate-pulse" />
              </div>
              <h4 className="text-xs font-black text-white uppercase mb-2 tracking-widest leading-none">Neural AI Assistant</h4>
              <p className="text-[10px] text-white/40 uppercase leading-relaxed max-w-[200px] mt-2">
                Awaiting mission parameters. Tactical analysis mode available.
              </p>
              <button className="mt-6 px-6 py-2 border border-primary/40 text-[9px] font-black text-primary uppercase hover:bg-primary hover:text-black transition-colors tracking-widest">
                Initialize Protocol
              </button>
            </div>
          </div>
        </div>

        {/* Tactical Intel Cluster - 4 Columns */}
        <div className="lg:col-span-4 space-y-8">
          <SquadLeaderboard />
          <MissionChallenges />
          
          {/* Calorie Node - Integrated */}
          <div className="surface-card border-primary/20 flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Flame size={24} />
              </div>
              <div>
                <span className="block text-[8px] font-bold text-white/20 uppercase tracking-widest leading-none mb-1">Daily Target</span>
                <span className="text-2xl font-black text-white tabular-nums">{nutritionPlan?.daily_calories || 2500} <span className="text-[10px] text-white/40">KCAL</span></span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-primary uppercase tracking-tighter">Plan Active</span>
              <span className="block text-[8px] font-bold text-white/10 uppercase mt-1">Status</span>
            </div>
          </div>

          <div className="surface-card flex items-center gap-6 border-white/5 opacity-60">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
              <Target size={24} />
            </div>
            <div>
              <p className="text-white/20 text-[8px] font-black uppercase tracking-widest mb-1">Current Objective</p>
              <p className="text-xs font-bold leading-tight line-clamp-2 uppercase">{profile?.fitness_goal}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Workout Preview */}
        <div className="surface-card relative overflow-hidden group border-white/5">
          <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors">
            <Dumbbell size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3 brand-tracking text-white/80">
              Training Plan
            </h3>
            <div className="space-y-4">
              <p className="text-white/60 font-medium text-lg tracking-tight uppercase">{workoutPlan?.plan_json?.plan_name}</p>
              <div className="flex gap-4">
                <div className="bg-white/5 px-4 py-2 rounded text-[10px] font-bold border border-white/5 uppercase tracking-widest">
                    {workoutPlan?.plan_json?.weeks?.length} Weeks
                </div>
              </div>
              <button className="flex items-center gap-2 text-primary font-bold mt-4 hover:gap-4 transition-all uppercase text-[10px] tracking-widest">
                Access Plan <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Nutrition Preview */}
        <div className="surface-card relative overflow-hidden group border-white/5">
            <div className="absolute top-0 right-0 p-8 text-secondary/5 group-hover:text-secondary/10 transition-colors">
                <Utensils size={120} />
            </div>
            <div className="relative z-10">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 brand-tracking text-white/80">
                    Nutrition
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-white/40 text-xs font-bold uppercase mb-1">Protein</p>
                        <p className="text-xl font-black text-secondary">{nutritionPlan?.protein_g}g</p>
                    </div>
                    <div className="text-center">
                        <p className="text-white/40 text-xs font-bold uppercase mb-1">Carbs</p>
                        <p className="text-xl font-black text-primary">{nutritionPlan?.carbs_g}g</p>
                    </div>
                    <div className="text-center">
                        <p className="text-white/40 text-xs font-bold uppercase mb-1">Fats</p>
                        <p className="text-xl font-black text-accent">{nutritionPlan?.fats_g}g</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 text-secondary font-bold mt-8 hover:gap-4 transition-all">
                    View Meal Plan <ChevronRight size={20} />
                </button>
            </div>
        </div>
      </div>

      {/* Interface Configuration */}
      <div className="mt-12">
        <h3 className="text-[10px] font-black brand-tracking uppercase text-white/20 mb-4 ml-1 flex items-center gap-2">
          <Settings size={12} /> Interface Protocol
        </h3>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
