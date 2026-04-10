"use client";

import { useCallback, useRef } from "react";

export const useNeuralCommander = () => {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const findVocalProfile = useCallback(() => {
    if (!synth) return null;
    const voices = synth.getVoices();
    // Prefer "Google UK English Male" or similar authoritative voices
    return voices.find(v => v.name.includes("Male") && v.lang.startsWith("en")) || voices[0];
  }, [synth]);

  const transmit = useCallback((message: string, pitch = 0.8, rate = 0.9) => {
    if (!synth) return;

    // Cancel any ongoing transmissions
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    const voice = findVocalProfile();
    
    if (voice) utterance.voice = voice;
    utterance.pitch = pitch; // Lower pitch for tactical feel
    utterance.rate = rate; // Slower rate for clarity/authority
    utterance.volume = 0.5;

    synth.speak(utterance);

    // Visual HUD Fallback Trigger
    const event = new CustomEvent("neural-alert", { detail: message });
    window.dispatchEvent(event);
  }, [synth, findVocalProfile]);

  return { transmit };
};
