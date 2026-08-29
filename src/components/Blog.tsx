import Section from "./Section";
import Reveal from "./Reveal";
import { ARTICLES } from "../data/articles";
import { ArrowRightIcon } from "./Icons";

export default function Blog() {
  return (
    <Section
      id="blog"
      index={7}
      eyebrow="Blog"
      title="Things I've written"
      description="Articles about projects, lessons learned, and things I find interesting."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article, i) => (
          <Reveal key={article.id} delay={i * 80}>
            <article className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-6 shadow-soft transition-all hover:border-accent/50 hover:shadow-lift dark:border-white/10 dark:bg-[#131D30]">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-ink-faint dark:text-slate-400">
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{article.readTime} read</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-ink group-hover:text-accent-deep dark:text-white dark:group-hover:text-accent-bright">
                {article.title}
              </h3>
              <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-ink-faint dark:text-slate-400">
                {article.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent-tint px-2.5 py-1 text-[11px] font-extrabold text-accent-deep dark:bg-accent/15 dark:text-accent-bright"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={`#blog-${article.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-wider text-accent-deep transition-all hover:gap-2.5 dark:text-accent-bright"
              >
                Read more
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
