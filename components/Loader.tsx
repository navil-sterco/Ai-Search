"use client";

import { useEffect, useState } from "react";

const STATUS_LINES = [
  "Opening the program prospectus…",
  "Cross-checking accreditation…",
  "Reading placement records…",
  "Noting labs and facilities…",
  "Assembling the page…",
];

export default function Loader() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLineIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="panel-card rounded-xl px-8 py-10 sm:px-12">
      <div className="flex items-center gap-4">
        <Dots />
        <div className="h-5 overflow-hidden relative w-full max-w-xs">
          {STATUS_LINES.map((line, i) => (
            <p
              key={line}
              className={`font-mono text-[13px] text-muted absolute inset-0 transition-all duration-500 ${
                i === lineIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {[100, 88, 94, 60].map((w, i) => (
          <div
            key={i}
            className="h-2.5 rounded-full bg-panelraised overflow-hidden"
            style={{ width: `${w}%` }}
          >
            <div
              className="h-full bg-amber/30 rounded-full"
              style={{
                animation: `shimmer 1.6s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

function Dots() {
  return (
    <div className="flex items-center gap-1 shrink-0">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-amber"
          style={{
            animation: `bob 1s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
