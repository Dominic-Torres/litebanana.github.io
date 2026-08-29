import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./Icons";

/**
 * Fixed "back to top" button. Appears after the visitor scrolls past the
 * hero, fades in with a small rise, and smooth-scrolls back to the top
 * (instantly when the user prefers reduced motion).
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 480);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-6 z-30 grid h-12 w-12 place-items-center rounded-xl border-2 border-ink/10 bg-white text-ink shadow-lift transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent-deep active:scale-90 dark:border-white/15 dark:bg-[#131D30] dark:text-slate-200 dark:hover:border-accent dark:hover:text-accent-bright ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* Scroll progress ring */}
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.15"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={`${2 * Math.PI * 20}`}
          strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
          className="text-accent dark:text-accent-bright"
          strokeLinecap="round"
        />
      </svg>
      <ArrowUpIcon className="relative h-5 w-5" />
    </button>
  );
}
