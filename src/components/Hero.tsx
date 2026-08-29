import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ProfilePhoto from "./ProfilePhoto";
import TechBackdrop from "./TechBackdrop";
import { ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "./Icons";
import { LINKS, SITE } from "../data/links";

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

// Roles cycle through Dominic's real focus areas. Keep the first entry as the
// primary role — it's what shows on load and for reduced-motion visitors.
const ROLES = ["Computer Science Student", "Software Developer", "QA Tester", "AI / ML Enthusiast"];

/**
 * Rotating role headline. The active word crossfades/slides in via the keyed
 * `animate-fade-up` class; the global reduced-motion rule collapses the
 * animation to an instant swap.
 */
function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="mt-6 font-display text-2xl font-semibold text-ink-soft sm:text-3xl dark:text-slate-200">
      <span className="inline-block h-[1.25em] overflow-hidden align-bottom">
        <span key={index} className="block animate-fade-up text-accent-deep dark:text-accent-bright">
          {ROLES[index]}
        </span>
      </span>
    </p>
  );
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const HERO_STATS: Stat[] = [
  { value: 3, suffix: "+", label: "Years coding" },
  { value: 6, suffix: "", label: "Projects built" },
  { value: 4, suffix: "", label: "Certifications" },
];

function AnimatedStat({ value, suffix, label }: Stat) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 lg:items-start">
      <dt className="order-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-faint dark:text-slate-400">
        {label}
      </dt>
      <dd className="order-1 font-display text-3xl font-bold text-ink dark:text-white">
        {count}
        {suffix}
      </dd>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Ambient backdrop */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={{ y }}>
        <div className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(75%_60%_at_50%_22%,black,transparent)]" />
        <motion.div
          className="absolute -top-24 left-[10%] h-80 w-80 rounded-full bg-accent/15 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-44 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent/5 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <TechBackdrop />

      <motion.div className="container-site relative" style={{ opacity, scale }}>
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/80 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink-soft shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to internships &amp; opportunities
            </motion.p>

            <h1 className="mt-8 font-display text-5xl font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl xl:text-7xl dark:text-white">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hi,
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                I&apos;m
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-accent to-accent-deep bg-clip-text text-transparent dark:from-accent-bright dark:to-accent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Dominic.
              </motion.span>
            </h1>

            <RotatingRole />
            <motion.p
              className="mt-3 text-sm font-semibold tracking-wide text-ink-faint sm:text-base dark:text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {SITE.tagline}
            </motion.p>

            <motion.p
              className="mx-auto mt-8 max-w-xl text-base font-medium leading-relaxed text-ink-soft sm:text-lg lg:mx-0 dark:text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              I&apos;m a Computer Science student who enjoys building applications,
              developing websites, working with AI, and finding bugs that other
              people missed.
            </motion.p>

            <motion.div
              className="mt-11 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button type="button" onClick={() => scrollTo("#projects")} className="btn-primary">
                EXPLORE MY WORK
                <ArrowRightIcon className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => scrollTo("#contact")} className="btn-outline">
                <MailIcon className="h-4 w-4" />
                CONTACT ME
              </button>
              <div className="flex items-center gap-2">
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="btn-icon"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="btn-icon"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <dl className="mx-auto mt-16 flex max-w-md items-center justify-center gap-6 sm:gap-8 lg:mx-0 lg:justify-start">
              {HERO_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className={`flex flex-col items-center gap-1 lg:items-start ${
                    i > 0 ? "border-l border-ink/10 pl-6 sm:pl-8 dark:border-white/10" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <AnimatedStat value={stat.value} suffix={stat.suffix} label={stat.label} />
                </motion.div>
              ))}
            </dl>
          </div>

          {/* Portrait */}
          <motion.div
            className="relative mx-auto w-full max-w-[20rem] lg:max-w-[16.5rem]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-accent/25 via-transparent to-accent/10 blur-2xl"
            />
            <div className="relative rounded-[2.25rem] border border-ink/10 bg-white/80 p-3 shadow-lift backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="overflow-hidden rounded-[1.75rem]">
                <ProfilePhoto
                  className="aspect-[4/5] w-full"
                  alt="Dominic Torres — Computer Science Student"
                />
              </div>

              {/* Floating context badges */}
              <div className="absolute -bottom-16 right-0 hidden sm:block lg:-right-2">
                <div className="relative animate-floaty" style={{ animationDelay: "1.2s" }}>
                  <span
                    aria-hidden="true"
                    className="absolute -top-[1.15rem] right-[3.6rem] h-2 w-2 rounded-full bg-accent/70 ring-4 ring-accent/15"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -top-[1.15rem] right-[3.7rem] h-[1.15rem] w-px bg-gradient-to-b from-accent/60 to-accent/25"
                  />
                  <div className="rounded-2xl border border-ink/10 bg-white/95 px-4 py-3 shadow-card backdrop-blur dark:border-white/10 dark:bg-[#16213E]/95">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-ink-faint dark:text-slate-400">
                      Studying
                    </p>
                    <p className="font-display text-sm font-bold text-ink dark:text-white">
                      B.S. Computer Science
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink-faint dark:text-slate-400">
            Scroll
          </span>
          <div className="h-8 w-5 rounded-full border-2 border-ink/20 p-1 dark:border-white/20">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
