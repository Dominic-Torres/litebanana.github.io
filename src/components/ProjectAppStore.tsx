import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS, type Project } from "../data/projects";
import ProjectVisual from "./ProjectVisual";
import { CloseIcon, ExternalIcon, GithubIcon } from "./Icons";

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export default function ProjectAppStore() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);

  const openProject = useCallback((p: Project) => setSelected(p), []);
  const closeProject = useCallback(() => setSelected(null), []);

  return (
    <div className="relative">
      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
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

      {/* App Store Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => openProject(project)}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card transition-shadow hover:shadow-lift dark:border-white/10 dark:bg-[#131D30]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div layoutId={`visual-${project.id}`} className="relative aspect-[4/3] overflow-hidden">
              <ProjectVisual kind={project.visual} accent={project.accent} name={project.name} />
              <div
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: `linear-gradient(to top, ${project.accent}40, transparent)` }}
              />
            </motion.div>
            <div className="p-5">
              <motion.span
                layoutId={`category-${project.id}`}
                className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider"
                style={{ background: `${project.accent}1a`, color: project.accent }}
              >
                {project.category}
              </motion.span>
              <motion.h3
                layoutId={`title-${project.id}`}
                className="mt-2 font-display text-xl font-bold tracking-tight text-ink dark:text-white"
              >
                {project.name}
              </motion.h3>
              <motion.p
                layoutId={`tagline-${project.id}`}
                className="mt-1 text-sm font-semibold text-ink-faint dark:text-slate-400"
              >
                {project.tagline}
              </motion.p>
              <motion.div layoutId={`tech-${project.id}`} className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-accent-tint px-2 py-0.5 text-[10px] font-extrabold text-accent-deep dark:bg-accent/15 dark:text-accent-bright"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="rounded-md bg-ink/5 px-2 py-0.5 text-[10px] font-bold text-ink-faint dark:bg-white/5 dark:text-slate-400">
                    +{project.tech.length - 3}
                  </span>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Detail View */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-ink/60 backdrop-blur-md"
              onClick={closeProject}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Expanded Card */}
            <motion.div
              layoutId={`card-${selected.id}`}
              className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-ink/10 bg-paper shadow-lift dark:border-white/10 dark:bg-[#0E1726]"
            >
              {/* Close button */}
              <motion.button
                type="button"
                onClick={closeProject}
                aria-label="Close project details"
                className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-card backdrop-blur transition hover:bg-white hover:text-accent-deep dark:bg-[#131D30]/90 dark:text-slate-200 dark:hover:bg-[#131D30] dark:hover:text-accent-bright"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CloseIcon className="h-5 w-5" />
              </motion.button>

              {/* Visual */}
              <motion.div layoutId={`visual-${selected.id}`} className="relative aspect-[16/9] overflow-hidden">
                <ProjectVisual kind={selected.visual} accent={selected.accent} name={selected.name} />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${selected.accent}30, transparent 60%)` }}
                />
              </motion.div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <motion.span
                  layoutId={`category-${selected.id}`}
                  className="inline-block rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider"
                  style={{ background: `${selected.accent}1a`, color: selected.accent }}
                >
                  {selected.category}
                </motion.span>
                <motion.h3
                  layoutId={`title-${selected.id}`}
                  className="mt-3 font-display text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl"
                >
                  {selected.name}
                </motion.h3>
                <motion.p
                  layoutId={`tagline-${selected.id}`}
                  className="mt-1 text-base font-semibold text-ink-faint dark:text-slate-400"
                >
                  {selected.tagline}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.15 }}
                >
                  <p className="mt-4 text-sm font-medium leading-relaxed text-ink-soft dark:text-slate-300 sm:text-base">
                    {selected.description}
                  </p>

                  {/* Overview */}
                  {selected.overview && !selected.overview.startsWith("[") && (
                    <div className="mt-5">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink dark:text-white">
                        Overview
                      </h4>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-ink-faint dark:text-slate-400">
                        {selected.overview}
                      </p>
                    </div>
                  )}

                  {/* Problem & Solution */}
                  {(!selected.problem.startsWith("[") || !selected.solution.startsWith("[")) && (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {!selected.problem.startsWith("[") && (
                        <div className="rounded-2xl border-2 border-ink/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                          <h4 className="mb-1.5 font-display text-xs font-bold uppercase tracking-wider text-ink dark:text-white">
                            Problem
                          </h4>
                          <p className="text-sm font-medium text-ink-faint dark:text-slate-400">
                            {selected.problem}
                          </p>
                        </div>
                      )}
                      {!selected.solution.startsWith("[") && (
                        <div className="rounded-2xl border-2 border-ink/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                          <h4 className="mb-1.5 font-display text-xs font-bold uppercase tracking-wider text-ink dark:text-white">
                            Solution
                          </h4>
                          <p className="text-sm font-medium text-ink-faint dark:text-slate-400">
                            {selected.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  {selected.features.filter((f) => !f.startsWith("[")).length > 0 && (
                    <div className="mt-5">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink dark:text-white">
                        Key Features
                      </h4>
                      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                        {selected.features
                          .filter((f) => !f.startsWith("["))
                          .map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm font-medium text-ink-soft dark:text-slate-300"
                            >
                              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-tint text-[9px] font-black text-accent-deep">
                                ✓
                              </span>
                              {feature}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="mt-5">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink dark:text-white">
                      Tech Stack
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selected.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border-2 border-ink/10 bg-white px-3 py-1.5 text-xs font-extrabold text-accent-deep dark:border-white/15 dark:bg-white/5 dark:text-accent-bright"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {(selected.links?.repo || selected.links?.demo) && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {selected.links.repo && (
                        <a
                          href={selected.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline !px-5 !py-2.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GithubIcon className="h-4 w-4" />
                          VIEW CODE
                        </a>
                      )}
                      {selected.links.demo && (
                        <a
                          href={selected.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary !px-5 !py-2.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalIcon className="h-4 w-4" />
                          LIVE DEMO
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
