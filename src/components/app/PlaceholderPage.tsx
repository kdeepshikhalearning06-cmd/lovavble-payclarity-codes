import { motion } from "motion/react";
import { Sparkles, type LucideIcon } from "lucide-react";
import { PageHeader } from "./AppShell";

export function PlaceholderPage({
  title,
  description,
  icon: Icon = Sparkles,
  bullets,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  bullets?: string[];
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title={title} description={description} />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 text-center shadow-[var(--shadow-card)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-56 opacity-60"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <Icon className="h-6 w-6" />
          </div>
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-teal/40 bg-teal/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-teal">
            Coming soon
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
            {title} is being built
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            {description}
          </p>
          {bullets && (
            <ul className="mx-auto mt-6 grid max-w-md gap-2 text-left text-sm">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-2"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}