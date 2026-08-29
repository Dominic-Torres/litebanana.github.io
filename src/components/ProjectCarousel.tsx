import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetails from "./ProjectDetails";
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "./Icons";

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const touchStart = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tech.some((t) => t.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const count = filteredProjects.length;

  useEffect(() => {
    setIndex(0);
  }, [activeCategory, searchQuery]);

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  const openDetails = useCallback(() => setDetailsOpen(true), []);

  const closeDetails = useCallback(() => setDetailsOpen(false), []);

  // Only listen to keyboard controls while the carousel is on screen
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Keyboard controls: ← → while the carousel is visible and not typing
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (detailsOpen || !inView) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => (i + 1) % count);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => (i - 1 + count) % count);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detailsOpen, inView, count]);

  // Swipe support on touch devices
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 48) {
      if (delta < 0) setIndex((i) => (i + 1) % count);
      else setIndex((i) => (i - 1 + count) % count);
    }
    touchStart.current = null;
  };

  return (
    <div className="relative">
      {/* Category filter + search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-accent text-white shadow-pop"
                  : "border-2 border-ink/10 bg-white text-ink-soft hover:border-accent hover:text-accent-deep dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-accent dark:hover:text-accent-bright"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint dark:text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            aria-label="Search projects"
            className="w-full rounded-xl border-2 border-ink/10 bg-white py-2 pl-9 pr-4 text-sm font-semibold text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-400"
          />
        </div>
      </div>
      <div
        ref={regionRef}
        className="relative min-w-0"
        role="region"
        aria-roledescription="carousel"
        aria-label="Dominic's projects"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {count === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-ink/15 bg-white/50 px-6 py-16 text-center dark:border-white/15 dark:bg-white/5">
            <SearchIcon className="h-8 w-8 text-ink-faint dark:text-slate-500" />
            <p className="mt-3 font-display text-lg font-bold text-ink dark:text-white">No projects found</p>
            <p className="mt-1 text-sm font-semibold text-ink-faint dark:text-slate-400">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl">
            <div
              className="carousel-track flex"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {filteredProjects.map((project, i) => (
                <div key={project.id} className="w-full shrink-0 px-1 py-1 sm:px-2">
                  <ProjectCard
                    project={project}
                    active={i === index}
                    onOpen={openDetails}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Arrow buttons */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous project"
          className="absolute -left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-2 border-ink/10 bg-white text-ink shadow-soft transition-all hover:scale-110 hover:border-accent hover:text-accent-deep active:scale-95 sm:-left-5 sm:h-12 sm:w-12 dark:border-white/15 dark:bg-white/10 dark:text-slate-200 dark:hover:text-accent-bright"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next project"
          className="absolute -right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-2 border-ink/10 bg-white text-ink shadow-soft transition-all hover:scale-110 hover:border-accent hover:text-accent-deep active:scale-95 sm:-right-5 sm:h-12 sm:w-12 dark:border-white/15 dark:bg-white/10 dark:text-slate-200 dark:hover:text-accent-bright"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      {count > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2.5" role="tablist" aria-label="Choose project">
          {filteredProjects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${project.name}`}
              onClick={() => goTo(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-9 bg-accent shadow-pop"
                  : "w-3 bg-ink/15 hover:bg-ink/30 dark:bg-white/20 dark:hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      <p className="mt-3 text-center text-xs font-semibold text-ink-faint">
        Use ← → keys or swipe to browse {count} {count === 1 ? "project" : "projects"}
      </p>

      <ProjectDetails
        project={filteredProjects[index]}
        open={detailsOpen}
        onClose={closeDetails}
      />
    </div>
  );
}
