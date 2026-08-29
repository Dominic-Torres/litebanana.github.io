import Section from "./Section";
import Reveal from "./Reveal";
import { TESTIMONIALS } from "../data/testimonials";
import { QuoteIcon } from "./DetailIcons";

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      index={6}
      eyebrow="Testimonials"
      title="What people say"
      description="Kind words from professors, supervisors, and teammates I've worked with."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.id} delay={i * 80}>
            <figure className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#131D30]">
              <QuoteIcon className="h-8 w-8 text-accent/40" />
              <blockquote className="mt-3 flex-1 text-sm font-medium leading-relaxed text-ink-soft dark:text-slate-300">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-4 dark:border-white/10">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-accent-tint font-display text-sm font-bold text-accent-deep dark:bg-accent/20 dark:text-accent-bright">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-ink dark:text-white">{t.name}</p>
                  <p className="text-xs font-semibold text-ink-faint dark:text-slate-400">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
