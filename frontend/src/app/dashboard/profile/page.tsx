"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { 
  User, 
  Mail, 
  Weight, 
  Ruler, 
  Target,
  Save,
  CheckCircle,
  Loader2
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.user.getProfile().then(setProfile).finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const updated = await api.user.updateProfile(profile);
      setProfile(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
        console.error("Failed to update profile", err);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="text-white/40 animate-pulse">Syncing User Data...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight mb-2 uppercase brand-tracking">User Profile</h1>
        <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest">Biometric Configuration // Secure</p>
      </header>

      <div className="surface-card border-white/5">
        <form onSubmit={handleUpdate} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 rounded bg-surface-hover flex items-center justify-center text-primary relative group cursor-pointer overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(163,255,18,0.05)]">
                    <User size={60} />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Update</span>
                    </div>
                </div>
                <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                name="full_name"
                                value={profile?.full_name || ""}
                                onChange={handleInputChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 font-mono">Email Address</label>
                            <div className="flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/40 font-medium">
                                <Mail size={18} />
                                {profile?.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/5">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 flex items-center gap-1">
                        <Weight size={12} /> Weight (kg)
                    </label>
                    <input
                        type="number"
                        name="weight_kg"
                        value={profile?.weight_kg || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-bold"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 flex items-center gap-1">
                        <Ruler size={12} /> Height (cm)
                    </label>
                    <input
                        type="number"
                        name="height_cm"
                        value={profile?.height_cm || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-bold"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={profile?.age || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-bold"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Gender</label>
                    <input
                        type="text"
                        name="gender"
                        value={profile?.gender || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-bold"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <Target size={12} /> Primary Fitness Goal
                </label>
                <textarea
                    name="fitness_goal"
                    value={profile?.fitness_goal || ""}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-medium"
                />
            </div>

            <button
                type="submit"
                disabled={saving}
                className="w-full bg-primary text-background font-bold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(163,255,18,0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {saving ? (
                    <Loader2 className="animate-spin" size={20} />
                ) : saved ? (
                    <>
                        <CheckCircle size={20} /> Profile Updated
                    </>
                ) : (
                    <>
                        <Save size={20} /> Commit Changes
                    </>
                )}
            </button>
        </form>
      </div>
    </div>
  );
}
