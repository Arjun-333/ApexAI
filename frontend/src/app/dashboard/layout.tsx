"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Dumbbell, 
  Utensils, 
  LayoutDashboard, 
  MessageSquare, 
  User, 
  LogOut,
  TrendingUp
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Workout Plan", href: "/dashboard/workout", icon: Dumbbell },
    { name: "Nutrition", href: "/dashboard/nutrition", icon: Utensils },
    { name: "Progress", href: "/dashboard/progress", icon: TrendingUp },
    { name: "AI Assistant", href: "/dashboard/ai", icon: MessageSquare },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-surface flex flex-col fixed inset-y-0">
        <div className="p-8">
          <h1 className="text-2xl font-black text-gradient brand-tracking">Apex</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${
                  isActive 
                    ? "bg-primary text-background shadow-[0_0_20px_rgba(163,255,18,0.2)]" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={20} className={isActive ? "text-background" : "group-hover:text-primary transition-colors"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/40 hover:text-accent hover:bg-accent/10 transition-all font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
          <div className="mt-4 px-4 pt-4 border-t border-white/5 opacity-20 group">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] brand-tracking text-white/40 group-hover:text-primary transition-colors">
                  Engineered by Arjun
              </p>
              <p className="text-[7px] font-bold uppercase tracking-widest text-white/20 mt-1">
                  v5.4 // Neural Collective
              </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 relative">
        <header className="sticky top-0 z-50 bg-background border-b border-white/5 px-8 py-4 flex justify-between items-center md:hidden">
            <h1 className="text-xl font-black text-gradient brand-tracking">Apex</h1>
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg">
                <LayoutDashboard size={20} />
            </button>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
