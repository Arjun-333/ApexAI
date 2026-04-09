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
  Activity
} from "lucide-react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [workoutPlan, setWorkoutPlan] = useState<any>(null);
  const [nutritionPlan, setNutritionPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prof, wp, np] = await Promise.all([
          api.user.getProfile(),
          api.workout.getPlan(),
          api.nutrition.getPlan()
        ]);
        setProfile(prof);
        setWorkoutPlan(wp);
        setNutritionPlan(np);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
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
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-white/20 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">Performance System // Overview</h2>
          <h1 className="text-5xl font-black tracking-tight uppercase">User <span className="text-gradient">Session</span></h1>
        </div>
        <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
            <Calendar size={18} className="text-primary" />
            <span className="font-bold text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="surface-card flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Flame size={32} />
          </div>
          <div>
            <p className="text-white/40 text-sm font-bold uppercase tracking-wider">Calorie Target</p>
            <p className="text-3xl font-black">{nutritionPlan?.daily_calories || 2500}<span className="text-sm text-white/40 font-medium ml-1">kcal</span></p>
          </div>
        </div>

        <div className="surface-card flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
            <Activity size={32} />
          </div>
          <div>
            <p className="text-white/40 text-sm font-bold uppercase tracking-wider">Current Weight</p>
            <p className="text-3xl font-black">{profile?.weight_kg}<span className="text-sm text-white/40 font-medium ml-1">kg</span></p>
          </div>
        </div>

        <div className="surface-card flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
            <Target size={32} />
          </div>
          <div>
            <p className="text-white/40 text-sm font-bold uppercase tracking-wider">Fitness Goal</p>
            <p className="text-lg font-bold leading-tight line-clamp-2">{profile?.fitness_goal}</p>
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
    </div>
  );
}
