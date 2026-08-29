import { useEffect, useState } from "react";
import { CloseIcon } from "./Icons";

const SHORTCUTS = [
  { keys: ["←", "→"], description: "Navigate projects" },
  { keys: ["Esc"], description: "Close modal" },
  { keys: ["?"], description: "Show shortcuts" },
  { keys: ["D"], description: "Toggle dark mode" },
];

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.key === "?") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Fixed hint button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts (?)"
        className="fixed bottom-6 left-6 z-30 grid h-10 w-10 place-items-center rounded-xl border-2 border-ink/10 bg-white text-ink-soft shadow-soft transition-all hover:border-accent hover:text-accent-deep dark:border-white/15 dark:bg-[#131D30] dark:text-slate-300 dark:hover:text-accent-bright"
      >
        <span className="font-display text-sm font-bold">?</span>
      </button>

      {/* Shortcuts modal */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close shortcuts"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-sm rounded-3xl border border-ink/10 bg-paper p-6 shadow-lift dark:border-white/10 dark:bg-[#0E1726]">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink dark:text-white">
                Keyboard Shortcuts
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close shortcuts"
                className="grid h-8 w-8 place-items-center rounded-lg border-2 border-ink/10 bg-white text-ink transition hover:border-accent hover:text-accent-deep dark:border-white/15 dark:bg-white/10 dark:text-slate-200"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {SHORTCUTS.map((s) => (
                <div key={s.description} className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-ink-soft dark:text-slate-300">
                    {s.description}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="grid h-7 min-w-[1.75rem] place-items-center rounded-lg border-2 border-ink/10 bg-white px-2 text-xs font-bold text-ink dark:border-white/15 dark:bg-white/5 dark:text-slate-200"
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs font-semibold text-ink-faint dark:text-slate-500">
              Press <kbd className="rounded border border-ink/10 bg-white px-1.5 py-0.5 text-[10px] font-bold dark:border-white/15 dark:bg-white/5">?</kbd> to toggle this panel
            </p>
          </div>
        </div>
      )}
    </>
  );
}
