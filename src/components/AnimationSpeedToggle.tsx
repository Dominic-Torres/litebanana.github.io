import { useAnimationSpeed } from "../hooks/useAnimationSpeed";

const SPEED_LABELS = {
  slow: "Slow",
  normal: "Normal",
  fast: "Fast",
};

export default function AnimationSpeedToggle() {
  const { speed, cycle } = useAnimationSpeed();

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Animation speed: ${SPEED_LABELS[speed]}. Click to change.`}
      title={`Animation speed: ${SPEED_LABELS[speed]}`}
      className="fixed bottom-6 left-20 z-30 flex items-center gap-2 rounded-xl border-2 border-ink/10 bg-white px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-ink-soft shadow-soft transition-all hover:border-accent hover:text-accent-deep dark:border-white/15 dark:bg-[#131D30] dark:text-slate-300 dark:hover:text-accent-bright"
    >
      <span className="h-2 w-2 rounded-full bg-accent" />
      {SPEED_LABELS[speed]}
    </button>
  );
}
