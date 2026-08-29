import { useCallback, useEffect, useState } from "react";

export type AnimationSpeed = "slow" | "normal" | "fast";

const STORAGE_KEY = "animation-speed";

function getInitialSpeed(): AnimationSpeed {
  if (typeof window === "undefined") return "normal";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "slow" || stored === "normal" || stored === "fast") return stored;
  } catch {
    /* storage unavailable */
  }
  return "normal";
}

const SPEED_VALUES: Record<AnimationSpeed, string> = {
  slow: "1.6s",
  normal: "0.6s",
  fast: "0.2s",
};

export function useAnimationSpeed() {
  const [speed, setSpeed] = useState<AnimationSpeed>(getInitialSpeed);

  useEffect(() => {
    const value = SPEED_VALUES[speed];
    document.documentElement.style.setProperty("--reveal-duration", value);
    try {
      localStorage.setItem(STORAGE_KEY, speed);
    } catch {
      /* storage unavailable */
    }
  }, [speed]);

  const cycle = useCallback(() => {
    setSpeed((s) => {
      if (s === "slow") return "normal";
      if (s === "normal") return "fast";
      return "slow";
    });
  }, []);

  return { speed, cycle };
}
