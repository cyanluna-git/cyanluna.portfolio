import { useEffect, useState } from "react";

interface UseCounterOptions {
  end: number;
  duration?: number;
  enabled?: boolean;
  suffix?: string;
}

export function useCounter({
  end,
  duration = 400,
  enabled = false,
  suffix = "",
}: UseCounterOptions): string {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    const startTime = performance.now();

    function tick(now: number): void {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [end, duration, enabled]);

  return `${value}${suffix}`;
}
