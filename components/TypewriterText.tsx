"use client";

import { useEffect, useRef, useState } from "react";

export default function TypewriterText({
  text,
  onDone,
  wordsPerTick = 2,
  tickMs = 35,
  className = "",
}: {
  text: string;
  onDone?: () => void;
  wordsPerTick?: number;
  tickMs?: number;
  className?: string;
}) {
  const words = useRef(text.split(" ")).current;
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (count >= words.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    const id = setTimeout(() => {
      setCount((c) => Math.min(c + wordsPerTick, words.length));
    }, tickMs);
    return () => clearTimeout(id);
  }, [count, words.length, wordsPerTick, tickMs, onDone]);

  const shown = words.slice(0, count).join(" ");
  const finished = count >= words.length;

  return (
    <p className={className}>
      {shown}
      {!finished && (
        <span className="inline-block w-[2px] h-[1em] bg-amberdeep/80 ml-0.5 align-text-bottom animate-blink" />
      )}
    </p>
  );
}
