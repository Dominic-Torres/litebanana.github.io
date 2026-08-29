import { motion, useScroll, useSpring } from "motion/react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="flex flex-col items-end gap-3">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollTo(section.id)}
            className="group flex items-center gap-2"
            aria-label={`Go to ${section.label}`}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-faint opacity-0 transition-opacity group-hover:opacity-100 dark:text-slate-400">
              {section.label}
            </span>
            <span className="h-2 w-2 rounded-full bg-ink/20 transition-all group-hover:h-2.5 group-hover:w-2.5 group-hover:bg-accent dark:bg-white/20" />
          </button>
        ))}
      </div>

      {/* Progress line */}
      <div className="absolute right-1 top-0 h-full w-px bg-ink/10 dark:bg-white/10">
        <motion.div
          className="w-full origin-top bg-accent"
          style={{ scaleY, height: "100%" }}
        />
      </div>
    </nav>
  );
}
