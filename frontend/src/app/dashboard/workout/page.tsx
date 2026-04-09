"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { 
  Dumbbell, 
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function WorkoutPlanPage() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedWeek, setExpandedWeek] = useState(0);

  useEffect(() => {
    api.workout.getPlan().then(setPlan).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white/40 animate-pulse">Loading Protocol...</div>;

  const workoutData = plan?.plan_json;

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-4xl font-black tracking-tight mb-2 uppercase brand-tracking">{workoutData?.plan_name}</h1>
        <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest">Operational Training Protocol // Phase 01</p>
      </header>

      <div className="space-y-6">
        {workoutData?.weeks?.map((week: any, weekIdx: number) => (
          <div key={weekIdx} className="surface-card !p-0 overflow-hidden border border-white/5">
            <button 
              onClick={() => setExpandedWeek(expandedWeek === weekIdx ? -1 : weekIdx)}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
            >
              <h2 className="text-xl font-bold flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                    {week.week_number}
                </div>
                Week {week.week_number}
              </h2>
              {expandedWeek === weekIdx ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedWeek === weekIdx && (
              <div className="p-6 border-t border-white/5 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
                {week.days.map((day: any, dayIdx: number) => (
                  <div key={dayIdx} className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <h3 className="text-primary font-black uppercase tracking-widest text-sm">{day.day_name}: {day.focus}</h3>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {day.exercises.map((ex: any, exIdx: number) => (
                        <div key={exIdx} className="bg-white/5 p-4 rounded-2xl flex items-start gap-4 border border-white/5 hover:border-white/10 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                            <Dumbbell size={20} className="text-white/40" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold mb-1">{ex.name}</h4>
                            <div className="flex gap-3 text-xs font-bold text-white/50">
                                <span>{ex.sets} Sets</span>
                                <span>•</span>
                                <span>{ex.reps} Reps</span>
                            </div>
                            {ex.notes && (
                                <p className="text-xs text-white/30 mt-2 flex items-start gap-1">
                                    <Info size={12} className="mt-0.5 shrink-0" />
                                    {ex.notes}
                                </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
