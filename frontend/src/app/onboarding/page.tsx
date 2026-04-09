"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight_kg: "",
    height_cm: "",
    fitness_goal: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.user.updateProfile({
        ...formData,
        age: parseInt(formData.age),
        weight_kg: parseFloat(formData.weight_kg),
        height_cm: parseFloat(formData.height_cm),
      });
      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "The Foundation",
      subtitle: "Tell us about your physical blueprint",
      fields: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all"
                placeholder="25"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all appearance-none"
              >
                <option value="" disabled>Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Weight (kg)</label>
              <input
                type="number"
                name="weight_kg"
                value={formData.weight_kg}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all"
                placeholder="75"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Height (cm)</label>
              <input
                type="number"
                name="height_cm"
                value={formData.height_cm}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all"
                placeholder="180"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Objective",
      subtitle: "What is your ultimate fitness milestone?",
      fields: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Fitness Goal</label>
            <textarea
              name="fitness_goal"
              value={formData.fitness_goal}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50 transition-all"
              placeholder="e.g., Lose 5kg and build muscle, improve marathon time, increase bench press by 20kg..."
            />
          </div>
        </div>
      )
    }
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="surface-card w-full max-w-xl border border-white/10 shadow-2xl">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 w-10 transition-all duration-500 ${i + 1 <= step ? 'bg-primary' : 'bg-white/5'}`} 
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Step {step} // {steps.length}</span>
          </div>
          <h1 className="text-4xl font-black mb-2 brand-tracking">{currentStep.title}</h1>
          <p className="text-white/40 font-medium uppercase text-xs tracking-widest">{currentStep.subtitle}</p>
        </div>

        <div className="mb-10">
          {currentStep.fields}
        </div>

        <div className="flex gap-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 bg-white/5 text-white/60 font-bold py-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all uppercase text-xs tracking-widest"
            >
              Back
            </button>
          )}
          <button
            onClick={step === steps.length ? handleSubmit : handleNext}
            disabled={loading}
            className="flex-[2] bg-primary text-background font-bold py-4 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 uppercase text-xs tracking-[0.2em]"
          >
            {loading ? "Processing" : step === steps.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
