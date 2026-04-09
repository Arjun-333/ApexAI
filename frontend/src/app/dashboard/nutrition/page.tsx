"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { 
  Utensils, 
  Leaf,
  Beef,
  Droplet,
  Info,
  Flame
} from "lucide-react";

export default function NutritionPlanPage() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.nutrition.getPlan().then(setPlan).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white/40 animate-pulse">Analyzing Metabolism...</div>;

  const macros = [
    { name: "Protein", val: plan?.protein_g, unit: "g", color: "text-secondary", icon: Beef, desc: "For muscle repair and growth" },
    { name: "Carbs", val: plan?.carbs_g, unit: "g", color: "text-primary", icon: Leaf, desc: "Primary energy source" },
    { name: "Fats", val: plan?.fats_g, unit: "g", color: "text-accent", icon: Droplet, desc: "Hormonal health" },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3 uppercase brand-tracking">
          Nutritional Plan
        </h1>
        <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest">Biometric Intake Targets // Verified</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 surface-card border-white/5 flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center text-secondary mb-4 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                <Flame size={40} />
            </div>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-1">Target Intake</p>
            <p className="text-4xl font-black tracking-tight">{plan?.daily_calories}</p>
            <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest">Kcal / Day</p>
        </div>

        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {macros.map((macro, i) => {
                const Icon = macro.icon;
                return (
                    <div key={i} className="surface-card border-white/5">
                        <Icon className={`${macro.color} mb-4 opacity-80`} size={28} />
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-1">{macro.name}</p>
                        <p className="text-3xl font-black tracking-tight">{macro.val}<span className="text-xs ml-1 opacity-20 uppercase tracking-widest">{macro.unit}</span></p>
                        <p className="text-white/20 text-[10px] mt-4 font-bold uppercase tracking-widest leading-relaxed">{macro.desc}</p>
                    </div>
                );
            })}
        </div>
      </div>

      <div className="surface-card border-white/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="text-secondary" />
            Dietary Guidance
        </h3>
        <p className="text-white/80 leading-relaxed italic">
            "{plan?.advice}"
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold">Recommended Food Sources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Lean proteins (Chicken, Fish, Tofu)", "Complex carbs (Oats, Rice, Sweet Potato)", "Healthy fats (Avocado, Nuts, Olive Oil)"].map((food, i) => (
                <div key={i} className="bg-white/5 px-6 py-4 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span className="font-medium">{food}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
