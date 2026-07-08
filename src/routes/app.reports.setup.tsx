import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, CalendarRange, Check } from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  country: z.string().optional(),
  period: z.string().optional(),
});

export const Route = createFileRoute("/app/reports/setup")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Country setup — PayClarity" },
      { name: "description", content: "Configure country-specific reporting requirements." },
    ],
  }),
  component: ReportSetupPage,
});

function ReportSetupPage() {
  const { country = "DE", period = "2026-Q1" } = Route.useSearch();

  const steps = [
    { label: "Report scope", done: true },
    { label: "Country setup", done: false, current: true },
    { label: "Data mapping", done: false },
    { label: "Analysis & review", done: false },
    { label: "Sign-off & export", done: false },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Country setup"
        description={`Configure reporting rules for ${country} · ${period}`}
        actions={
          <Button variant="outline" asChild>
            <Link to="/app/reports"><ArrowLeft className="mr-1 h-4 w-4" /> Back to reports</Link>
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-card)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-56 opacity-60"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative grid gap-8 md:grid-cols-[220px_1fr]">
          <ol className="space-y-2">
            {steps.map((s, i) => (
              <li
                key={s.label}
                className={
                  "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm " +
                  (s.current
                    ? "border-teal/60 bg-teal/5 font-medium"
                    : s.done
                      ? "border-border/60 bg-background text-muted-foreground"
                      : "border-border/60 bg-background text-muted-foreground")
                }
              >
                <span
                  className={
                    "grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold " +
                    (s.done
                      ? "bg-success text-primary-foreground"
                      : s.current
                        ? "bg-teal text-teal-foreground"
                        : "border border-border text-muted-foreground")
                  }
                >
                  {s.done ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                {s.label}
              </li>
            ))}
          </ol>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-teal/40 bg-teal/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-teal">
              Coming soon
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
              Country-specific rules for {country}
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              This step configures the regulatory framework applied to your report — thresholds,
              required disclosures, joint pay assessment triggers, and language templates.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-background p-4">
                <MapPin className="h-4 w-4 text-teal" />
                <div className="mt-2 text-sm font-medium">Country</div>
                <div className="text-xs text-muted-foreground">{country}</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-background p-4">
                <CalendarRange className="h-4 w-4 text-teal" />
                <div className="mt-2 text-sm font-medium">Reporting period</div>
                <div className="text-xs text-muted-foreground">{period}</div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button variant="hero" disabled>Continue to data mapping</Button>
              <Button variant="outline" asChild>
                <Link to="/app">Save draft</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}