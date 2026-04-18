"use client";

import { useEffect, useRef, useState } from "react";

type Step = 1 | 2 | 3 | null;

export function useRecruiterMode() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState<Step>(null);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scrollTo = (s: 1 | 2 | 3) => {
    const id = s === 1 ? "featured" : s === 2 ? "projects" : "contact";
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const start = () => {
    clearTimer();
    setCompleted(false);
    setActive(true);
    setStep(1);
    scrollTo(1);
  };

  const exit = () => {
    clearTimer();
    setActive(false);
    setStep(null);
    setCompleted(false);
  };

  const next = () => {
    if (step === 1) {
      setStep(2);
      scrollTo(2);
    } else if (step === 2) {
      setStep(3);
      scrollTo(3);
    } else if (step === 3) {
      setCompleted(true);
      timerRef.current = setTimeout(() => exit(), 1500);
    }
  };

  useEffect(() => () => clearTimer(), []);

  return { active, step, completed, start, next, exit };
}
