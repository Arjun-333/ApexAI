"use client";

import React from "react";

const BackgroundAtmosphere = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
      {/* Dynamic Grid System */}
      <div 
        className="absolute inset-0 opacity-[var(--grid-opacity,0.03)]"
        style={{
          backgroundImage: `linear-gradient(rgb(var(--primary) / 0.2) 1px, transparent 1px), 
                            linear-gradient(90deg, rgb(var(--primary) / 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgb(var(--background) / 0.8) 100%)',
        }}
      />

      {/* Tactical Scanning Line */}
      <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[rgb(var(--scan-line))] to-transparent animate-scan top-0" />

      {/* Floating Tactical Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 animate-float"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDuration: (Math.random() * 10 + 10) + 's',
              animationDelay: (Math.random() * -20) + 's',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundAtmosphere;
