"use client";

import { useEffect, useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  Calendar,
  Activity,
  ChevronRight
} from "lucide-react";

export default function ProgressPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data for demo purposes as we haven't logged much yet
    const dummyData = [
      { date: "Oct 01", weight: 80 },
      { date: "Oct 04", weight: 79.5 },
      { date: "Oct 07", weight: 79.2 },
      { date: "Oct 10", weight: 78.8 },
      { date: "Oct 13", weight: 78.5 },
      { date: "Oct 16", weight: 78.2 },
      { date: "Oct 19", weight: 77.9 },
    ];
    setData(dummyData);
    setLoading(false);
  }, []);

  if (loading) return <div className="text-white/40 animate-pulse">Calculating Trajectory...</div>;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3 uppercase brand-tracking">
          Progress Analytics
        </h1>
        <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest">Biometric Data Visualization // Stream 01</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 surface-card border-white/5 h-[400px]">
          <h3 className="text-xl font-bold mb-6">Weight Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a3ff12" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a3ff12" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}}
                dy={10}
              />
              <YAxis 
                domain={['dataMin - 2', 'dataMax + 2']} 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}}
              />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: '#121212', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                }}
                itemStyle={{ color: '#a3ff12' }}
              />
              <Area 
                type="monotone" 
                dataKey="weight" 
                stroke="#a3ff12" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorWeight)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
            <div className="surface-card border-white/5">
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-1">Weekly Adherence</p>
                <div className="flex items-end gap-2 mb-4">
                    <p className="text-4xl font-black text-primary tracking-tight">92%</p>
                    <p className="text-primary/60 font-bold text-[10px] mb-1 uppercase tracking-widest">+5% Delta</p>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[92%] transition-all duration-1000 shadow-[0_0_10px_rgba(163,255,18,0.3)]"></div>
                </div>
            </div>

            <div className="surface-card border-white/5">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Estimated 1RM (Bench)</p>
                <p className="text-4xl font-black">105<span className="text-sm ml-1 opacity-40">kg</span></p>
                <div className="flex gap-1 mt-4">
                    {[1,2,3,4,5,6,7].map(i => (
                        <div key={i} className={`h-8 flex-1 rounded-md ${i < 6 ? 'bg-primary/20 border border-primary/30' : 'bg-white/5'}`}></div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="surface-card">
        <h3 className="text-xl font-bold mb-6">Recent Sessions</h3>
        <div className="space-y-4">
            {[
                { date: "Today", type: "Push Protocol", status: "Completed" },
                { date: "Yesterday", type: "Pull Protocol", status: "Completed" },
                { date: "Oct 17", type: "Recovery", status: "Skipped" },
            ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${session.status === 'Completed' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                            <Activity size={20} />
                        </div>
                        <div>
                            <p className="font-bold">{session.type}</p>
                            <p className="text-xs text-white/40">{session.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`text-xs font-bold uppercase tracking-widest ${session.status === 'Completed' ? 'text-primary' : 'text-accent'}`}>{session.status}</span>
                        <ChevronRight size={18} className="text-white/20" />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
