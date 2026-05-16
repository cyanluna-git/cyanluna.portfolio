"use client";

interface RecruiterBannerProps {
  active: boolean;
  step: 1 | 2 | 3 | null;
  completed: boolean;
  onNext: () => void;
  onExit: () => void;
}

export default function RecruiterBanner({ active, step, completed, onNext, onExit }: RecruiterBannerProps) {
  if (!active) return null;

  return (
    <div
      role="region"
      aria-label="Recruiter guided tour"
      className="sticky top-0 z-[60] border-b border-[color:var(--accent)]/30 bg-surface/90 dark-glass"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <span aria-live="polite" className="text-sm font-medium text-foreground">
          {completed ? "Tour complete ✓" : `Recruiter path · Step ${step}/3`}
        </span>
        <div className="flex items-center gap-2">
          {!completed && (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent/70 hover:bg-accent/20"
            >
              Next →
            </button>
          )}
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center justify-center rounded-full border border-border px-4 py-1.5 text-sm text-muted transition-colors hover:border-white/20 hover:text-foreground"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
