import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ShieldCheck, TriangleAlert as AlertTriangle, CircleAlert as AlertCircle, TrendingDown, Users, Building2, ClipboardCheck, CalendarClock, ArrowRight, ArrowUpRight, Activity, Globe, CircleCheck as CheckCircle2, Clock } from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import { AssessmentContextBanner } from "@/components/app/AssessmentContextBanner";
import { COMPANY } from "@/lib/company-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/executive")({
  head: () => ({
    meta: [
      { title: "Executive dashboard — PayClarity" },
      {
        name: "description",
        content:
          "Leadership view: compliance risk, readiness, and upcoming obligations at a glance.",
      },
    ],
  }),
  component: ExecutiveDashboardPage,
});

const COUNTRIES_AT_RISK = [
  {
    code: "DE",
    name: "Germany",
    gap: 4.7,
    status: "reporting_required",
    deadline: "June 2026",
    categories: 5,
  },
  {
    code: "NL",
    name: "Netherlands",
    gap: 3.9,
    status: "reporting_required",
    deadline: "June 30, 2026",
    categories: 2,
  },
  {
    code: "FR",
    name: "France",
    gap: 5.2,
    status: "reporting_required",
    deadline: "Dec 2026",
    categories: 3,
  },
  {
    code: "IT",
    name: "Italy",
    gap: 3.1,
    status: "pending_implementation",
    deadline: "TBD",
    categories: 1,
  },
];

const CATEGORIES_ABOVE_THRESHOLD = [
  { name: "Marketing IC", gap: 10.1, risk: "high", approval: "escalated" },
  { name: "Sales Management", gap: 9.4, risk: "high", approval: "escalated" },
  { name: "Data & Analytics", gap: 7.3, risk: "medium", approval: "pending" },
  { name: "Engineering Management", gap: 6.7, risk: "medium", approval: "escalated" },
  { name: "Engineering IC Level 2", gap: 6.3, risk: "medium", approval: "pending" },
];

const READINESS_TREND = [
  { period: "FY2024", value: 72 },
  { period: "FY2025", value: 85 },
  { period: "H1 2026", value: 62 },
  { period: "FY2026", value: 78 },
];

const OPEN_REVIEWS = [
  {
    category: "Engineering IC Level 2",
    reviewer: "Anna Novak",
    status: "pending",
  },
  {
    category: "Engineering Management",
    reviewer: "Unassigned",
    status: "escalated",
  },
  {
    category: "Data & Analytics",
    reviewer: "Marco Bianchi",
    status: "pending",
  },
  {
    category: "Sales Management",
    reviewer: "Unassigned",
    status: "escalated",
  },
  {
    category: "Marketing IC",
    reviewer: "Anna Novak",
    status: "pending",
  },
];

const UPCOMING_OBLIGATIONS = [
  {
    title: "FY2026 assessment — annual report submission",
    deadline: "June 2026",
    daysLeft: 84,
    severity: "warning",
  },
  {
    title: "Netherlands KvK submission",
    deadline: "June 30, 2026",
    daysLeft: 102,
    severity: "info",
  },
  {
    title: "Joint pay assessment — Sales Management",
    deadline: "Within 6 months",
    daysLeft: 180,
    severity: "destructive",
  },
  {
    title: "Joint pay assessment — Marketing IC",
    deadline: "Within 6 months",
    daysLeft: 180,
    severity: "destructive",
  },
];

function ExecutiveDashboardPage() {
  const overallRisk = "medium";
  const readinessScore = 78;
  const openReviewCount = OPEN_REVIEWS.length;
  const escalatedCount = OPEN_REVIEWS.filter(
    (r) => r.status === "escalated",
  ).length;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Executive dashboard"
        description={`How is ${COMPANY.name} performing on compliance?`}
        actions={
          <Button variant="outline" asChild>
            <Link to="/app/generate-report">
              View full report <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        }
      />

      <AssessmentContextBanner />

      {/* Overall risk banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "mb-6 relative overflow-hidden rounded-3xl border p-6 shadow-[var(--shadow-card)]",
          overallRisk === "high"
            ? "border-destructive/30 bg-card"
            : overallRisk === "medium"
              ? "border-warning/30 bg-card"
              : "border-success/30 bg-card",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-56 opacity-50"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground shadow-[var(--shadow-glow)]",
                overallRisk === "high"
                  ? "bg-[image:var(--gradient-primary)]"
                  : overallRisk === "medium"
                    ? "bg-[image:var(--gradient-teal)]"
                    : "bg-[image:var(--gradient-teal)]",
              )}
            >
              <Activity className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  {COMPANY.assessmentName}
                </h2>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest",
                    overallRisk === "high"
                      ? "bg-destructive/10 text-destructive"
                      : overallRisk === "medium"
                        ? "bg-warning/10 text-warning"
                        : "bg-success/10 text-success",
                  )}
                >
                  {overallRisk === "high"
                    ? "High risk"
                    : overallRisk === "medium"
                      ? "Medium risk"
                      : "Low risk"}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {escalatedCount} categories escalated for legal review ·{" "}
                {openReviewCount} open reviews · Readiness at {readinessScore}%
              </p>
            </div>
          </div>
          <div className="text-right">
            <div
              className={cn(
                "font-display text-4xl font-bold tabular-nums",
                readinessScore >= 90
                  ? "text-success"
                  : readinessScore >= 70
                    ? "text-warning"
                    : "text-destructive",
              )}
            >
              {readinessScore}%
            </div>
            <div className="text-xs text-muted-foreground">
              Compliance readiness
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[
          {
            label: "Overall gap",
            value: "4.7%",
            icon: TrendingDown,
            tone: "text-warning",
          },
          {
            label: "Countries at risk",
            value: String(COUNTRIES_AT_RISK.length),
            icon: Globe,
            tone: "text-warning",
          },
          {
            label: "Above threshold",
            value: String(CATEGORIES_ABOVE_THRESHOLD.length),
            icon: AlertTriangle,
            tone: "text-destructive",
          },
          {
            label: "Readiness",
            value: `${readinessScore}%`,
            icon: ShieldCheck,
            tone: "text-warning",
          },
          {
            label: "Open reviews",
            value: String(openReviewCount),
            icon: ClipboardCheck,
            tone: "text-warning",
          },
          {
            label: "Escalated",
            value: String(escalatedCount),
            icon: AlertCircle,
            tone: "text-destructive",
          },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-teal/40"
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {m.label}
              </div>
              <m.icon className={cn("h-4 w-4", m.tone)} />
            </div>
            <div className="mt-2 font-display text-2xl font-semibold tabular-nums">
              {m.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Countries at risk */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Globe className="h-3.5 w-3.5 text-teal" /> Countries at risk
          </div>
          <div className="mt-4 space-y-2">
            {COUNTRIES_AT_RISK.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-border/60 bg-muted/40 text-xs font-bold">
                    {c.code}
                  </span>
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {c.categories} categories above threshold
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "font-display text-sm font-semibold tabular-nums",
                      c.gap >= 5 ? "text-warning" : "text-success",
                    )}
                  >
                    {c.gap}%
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      c.status === "reporting_required"
                        ? "bg-info/10 text-info"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {c.status === "reporting_required"
                      ? "Reporting required"
                      : "Pending"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Readiness trend */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <TrendingDown className="h-3.5 w-3.5 text-teal" /> Readiness trend
          </div>
          <div className="mt-4 flex items-end justify-between gap-3" style={{ height: "160px" }}>
            {READINESS_TREND.map((t, i) => {
              const max = Math.max(...READINESS_TREND.map((r) => r.value));
              const heightPct = (t.value / max) * 100;
              return (
                <motion.div
                  key={t.period}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${heightPct}%`, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-1 text-xs font-medium tabular-nums">
                    {t.value}%
                  </span>
                  <div
                    className={cn(
                      "w-full rounded-t-md",
                      t.value >= 85
                        ? "bg-success"
                        : t.value >= 70
                          ? "bg-warning"
                          : "bg-destructive",
                    )}
                    style={{ minHeight: "8px" }}
                  />
                  <span className="mt-1.5 text-[10px] text-muted-foreground">
                    {t.period}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Categories above threshold */}
      <div className="mt-6 rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
        <div className="border-b border-border/60 p-4">
          <div className="text-sm font-medium">Categories above 5% threshold</div>
          <div className="text-xs text-muted-foreground">
            Requiring executive attention and remediation
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Job category</th>
                <th className="px-3 py-3 font-medium">Gap %</th>
                <th className="px-3 py-3 font-medium">Risk</th>
                <th className="px-3 py-3 font-medium">Approval</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES_ABOVE_THRESHOLD.map((c, i) => (
                <motion.tr
                  key={c.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  className={cn(
                    "border-t border-border/60 transition-colors hover:bg-muted/30",
                    c.risk === "high" && "bg-destructive/[0.03]",
                  )}
                >
                  <td className="px-5 py-3 font-medium">{c.name}</td>
                  <td className="px-3 py-3">
                    <span className="font-display font-semibold tabular-nums text-warning">
                      {c.gap}%
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <RiskBadge risk={c.risk} />
                  </td>
                  <td className="px-3 py-3">
                    <ApprovalBadge approval={c.approval} />
                  </td>
                  <td className="px-5 py-3">
                    <Button size="sm" variant="ghost" asChild>
                      <Link to="/app/human-review">
                        Review <ArrowRight className="ml-0.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Open reviews */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <ClipboardCheck className="h-3.5 w-3.5 text-teal" /> Open reviews
            </div>
            <span className="rounded-full bg-warning/10 px-2 py-0.5 text-[11px] font-medium text-warning">
              {openReviewCount} open
            </span>
          </div>
          <ul className="mt-4 space-y-2">
            {OPEN_REVIEWS.map((r, i) => (
              <motion.li
                key={r.category}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to="/app/human-review"
                  className="group flex items-center justify-between rounded-lg border border-border/60 bg-background p-3 transition-all hover:-translate-y-0.5 hover:border-teal/40"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        r.status === "escalated" ? "bg-destructive" : "bg-warning",
                      )}
                    />
                    <div>
                      <div className="text-sm font-medium">{r.category}</div>
                      <div className="text-xs text-muted-foreground">
                        {r.reviewer}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-teal" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Upcoming reporting obligations */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5 text-teal" /> Upcoming reporting obligations
          </div>
          <ul className="mt-4 space-y-2">
            {UPCOMING_OBLIGATIONS.map((o, i) => (
              <motion.li
                key={o.title}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3",
                  o.severity === "destructive"
                    ? "border-destructive/30 bg-destructive/5"
                    : o.severity === "warning"
                      ? "border-warning/30 bg-warning/5"
                      : "border-border/60 bg-background",
                )}
              >
                <div
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-lg",
                    o.severity === "destructive"
                      ? "bg-destructive/10 text-destructive"
                      : o.severity === "warning"
                        ? "bg-warning/10 text-warning"
                        : "bg-info/10 text-info",
                  )}
                >
                  <CalendarClock className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{o.title}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {o.deadline} · {o.daysLeft} days remaining
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
        <div>
          <div className="font-display text-sm font-semibold">
            Ready for executive review?
          </div>
          <div className="text-xs text-muted-foreground">
            Generate the full compliance report or explore assessment history
            and trends.
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/app/assessments">
              Assessment history <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/app/generate-report">
              Generate report <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const map: Record<string, { label: string; className: string }> = {
    high: { label: "High", className: "bg-destructive/10 text-destructive" },
    medium: { label: "Medium", className: "bg-warning/10 text-warning" },
    low: { label: "Low", className: "bg-success/10 text-success" },
  };
  const m = map[risk] ?? map.low;
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-medium",
        m.className,
      )}
    >
      {m.label}
    </span>
  );
}

function ApprovalBadge({ approval }: { approval: string }) {
  const map: Record<string, { label: string; className: string }> = {
    approved: { label: "Approved", className: "bg-success/10 text-success" },
    pending: { label: "Pending", className: "bg-muted text-muted-foreground" },
    escalated: { label: "Escalated", className: "bg-warning/10 text-warning" },
    rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive" },
  };
  const m = map[approval] ?? map.pending;
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-medium",
        m.className,
      )}
    >
      {m.label}
    </span>
  );
}
