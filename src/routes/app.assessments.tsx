import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { History, TrendingDown, TrendingUp, Minus, Users, Building2, ShieldCheck, CalendarClock, ArrowDownRight, ArrowUpRight, Info, ChartBar as BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/assessments")({
  head: () => ({
    meta: [
      { title: "Assessment history — PayClarity" },
      {
        name: "description",
        content:
          "Compare assessments over time, track trends, and benchmark against industry averages.",
      },
    ],
  }),
  component: AssessmentsPage,
});

type Assessment = {
  id: string;
  name: string;
  cycle: string;
  overallGap: number;
  readiness: number;
  countries: string[];
  employees: number;
  completionDate: string;
  status: "completed" | "in_progress" | "draft";
};

const ASSESSMENTS: Assessment[] = [
  {
    id: "a1",
    name: "FY2026 Pay Transparency Assessment",
    cycle: "FY 2026",
    overallGap: 4.7,
    readiness: 78,
    countries: ["DE", "NL", "FR", "IT"],
    employees: 184,
    completionDate: "Mar 12, 2026",
    status: "in_progress",
  },
  {
    id: "a2",
    name: "2026 Mid-Year Compensation Review",
    cycle: "H1 2026",
    overallGap: 5.2,
    readiness: 62,
    countries: ["DE", "NL"],
    employees: 142,
    completionDate: "Sep 15, 2026",
    status: "draft",
  },
  {
    id: "a3",
    name: "FY2025 Pay Transparency Assessment",
    cycle: "FY 2025",
    overallGap: 6.1,
    readiness: 85,
    countries: ["DE", "NL", "FR", "IT"],
    employees: 172,
    completionDate: "Feb 04, 2026",
    status: "completed",
  },
  {
    id: "a4",
    name: "FY2024 Pay Transparency Assessment",
    cycle: "FY 2024",
    overallGap: 7.3,
    readiness: 72,
    countries: ["DE", "NL"],
    employees: 128,
    completionDate: "Jan 18, 2025",
    status: "completed",
  },
];

type CategoryTrend = {
  category: string;
  fy2024: number;
  fy2025: number;
  fy2026: number;
  status: "improved_below" | "improved" | "worsened" | "stable";
};

const CATEGORY_TRENDS: CategoryTrend[] = [
  {
    category: "Engineering IC Level 2",
    fy2024: 7.2,
    fy2025: 6.8,
    fy2026: 6.3,
    status: "improved",
  },
  {
    category: "Engineering IC Level 3",
    fy2024: 4.1,
    fy2025: 3.5,
    fy2026: 2.5,
    status: "improved_below",
  },
  {
    category: "Engineering Management",
    fy2024: 5.8,
    fy2025: 6.2,
    fy2026: 6.7,
    status: "worsened",
  },
  {
    category: "Sales IC Level 2",
    fy2024: 5.2,
    fy2025: 4.5,
    fy2026: 3.9,
    status: "improved_below",
  },
  {
    category: "Sales Management",
    fy2024: 8.1,
    fy2025: 8.8,
    fy2026: 9.4,
    status: "worsened",
  },
  {
    category: "Product Management",
    fy2024: 3.8,
    fy2025: 2.9,
    fy2026: 2.1,
    status: "improved_below",
  },
  {
    category: "Data & Analytics",
    fy2024: 6.5,
    fy2025: 6.9,
    fy2026: 7.3,
    status: "worsened",
  },
  {
    category: "People Operations",
    fy2024: 3.2,
    fy2025: 2.8,
    fy2026: 2.5,
    status: "improved_below",
  },
  {
    category: "Marketing IC",
    fy2024: 8.5,
    fy2025: 9.3,
    fy2026: 10.1,
    status: "worsened",
  },
];

const BENCHMARKS = {
  industry: {
    label: "Technology industry average",
    gap: 5.8,
    source: "Eurostat 2025 (illustrative)",
  },
  country: {
    label: "EU average (all sectors)",
    gap: 12.7,
    source: "Eurostat 2025 (illustrative)",
  },
  company: {
    label: "Your company trend",
    gap: 4.7,
    source: "FY2026 assessment",
  },
};

function AssessmentsPage() {
  const [compareA, setCompareA] = useState("a3");
  const [compareB, setCompareB] = useState("a1");

  const assessmentA = ASSESSMENTS.find((a) => a.id === compareA);
  const assessmentB = ASSESSMENTS.find((a) => a.id === compareB);

  const trendSummary = useMemo(() => {
    const improved = CATEGORY_TRENDS.filter(
      (c) => c.status === "improved" || c.status === "improved_below",
    ).length;
    const worsened = CATEGORY_TRENDS.filter(
      (c) => c.status === "worsened",
    ).length;
    const belowThreshold = CATEGORY_TRENDS.filter(
      (c) => c.fy2026 < 5,
    ).length;
    const readinessDelta =
      ASSESSMENTS[0].readiness - ASSESSMENTS[2].readiness;
    return { improved, worsened, belowThreshold, readinessDelta };
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Assessment history"
        description="Compare assessments over time, track trends, and benchmark against industry averages"
      />

      {/* Trend summary KPIs */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Gap improvement",
            value: `${(ASSESSMENTS[2].overallGap - ASSESSMENTS[0].overallGap).toFixed(1)} pts`,
            icon: TrendingDown,
            tone: "text-success",
            sub: "FY2024 to FY2026",
          },
          {
            label: "Categories improved",
            value: String(trendSummary.improved),
            icon: ArrowDownRight,
            tone: "text-success",
            sub: "Below or approaching threshold",
          },
          {
            label: "Categories worsened",
            value: String(trendSummary.worsened),
            icon: ArrowUpRight,
            tone: "text-destructive",
            sub: "Gap increased since FY2024",
          },
          {
            label: "Readiness change",
            value: `${trendSummary.readinessDelta > 0 ? "+" : ""}${trendSummary.readinessDelta} pts`,
            icon: ShieldCheck,
            tone:
              trendSummary.readinessDelta > 0
                ? "text-success"
                : "text-warning",
            sub: "FY2024 to FY2026",
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
            <div className="mt-0.5 text-xs text-muted-foreground">{m.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Assessment comparison */}
      <div className="mb-6 rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <History className="h-3.5 w-3.5 text-teal" /> Assessment comparison
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Assessment A
            </label>
            <Select value={compareA} onValueChange={setCompareA}>
              <SelectTrigger className="mt-1 h-9 w-[260px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ASSESSMENTS.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Assessment B
            </label>
            <Select value={compareB} onValueChange={setCompareB}>
              <SelectTrigger className="mt-1 h-9 w-[260px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ASSESSMENTS.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {assessmentA && assessmentB && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Metric</th>
                  <th className="px-4 py-3 font-medium">{assessmentA.cycle}</th>
                  <th className="px-4 py-3 font-medium">{assessmentB.cycle}</th>
                  <th className="px-4 py-3 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow
                  label="Overall pay gap"
                  valueA={`${assessmentA.overallGap}%`}
                  valueB={`${assessmentB.overallGap}%`}
                  delta={assessmentA.overallGap - assessmentB.overallGap}
                  invertGood
                />
                <ComparisonRow
                  label="Readiness score"
                  valueA={`${assessmentA.readiness}%`}
                  valueB={`${assessmentB.readiness}%`}
                  delta={assessmentA.readiness - assessmentB.readiness}
                />
                <ComparisonRow
                  label="Employees analysed"
                  valueA={assessmentA.employees.toLocaleString()}
                  valueB={assessmentB.employees.toLocaleString()}
                  delta={assessmentA.employees - assessmentB.employees}
                />
                <ComparisonRow
                  label="Countries included"
                  valueA={String(assessmentA.countries.length)}
                  valueB={String(assessmentB.countries.length)}
                  delta={assessmentA.countries.length - assessmentB.countries.length}
                />
                <tr className="border-t border-border/60">
                  <td className="px-4 py-3 text-muted-foreground">Completion date</td>
                  <td className="px-4 py-3">{assessmentA.completionDate}</td>
                  <td className="px-4 py-3">{assessmentB.completionDate}</td>
                  <td className="px-4 py-3 text-muted-foreground">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All assessments list */}
      <div className="mb-6 rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
        <div className="border-b border-border/60 p-4">
          <div className="text-sm font-medium">All assessments</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Assessment</th>
                <th className="px-3 py-3 font-medium">Cycle</th>
                <th className="px-3 py-3 font-medium">Overall gap</th>
                <th className="px-3 py-3 font-medium">Readiness</th>
                <th className="px-3 py-3 font-medium">Countries</th>
                <th className="px-3 py-3 font-medium">Employees</th>
                <th className="px-3 py-3 font-medium">Completed</th>
                <th className="px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ASSESSMENTS.map((a, i) => (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  className="border-t border-border/60 transition-colors hover:bg-muted/30"
                >
                  <td className="px-5 py-3 font-medium">{a.name}</td>
                  <td className="px-3 py-3 text-muted-foreground">{a.cycle}</td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "font-display font-semibold tabular-nums",
                        a.overallGap >= 5 ? "text-warning" : "text-success",
                      )}
                    >
                      {a.overallGap}%
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-1.5 rounded-full",
                            a.readiness >= 90
                              ? "bg-success"
                              : a.readiness >= 60
                                ? "bg-warning"
                                : "bg-destructive",
                          )}
                          style={{ width: `${a.readiness}%` }}
                        />
                      </div>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {a.readiness}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {a.countries.map((c) => (
                        <span
                          key={c}
                          className="rounded-md border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[10px]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-3 tabular-nums text-muted-foreground">
                    {a.employees}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {a.completionDate}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={a.status} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category trend analysis */}
      <div className="mb-6 rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
        <div className="border-b border-border/60 p-4">
          <div className="text-sm font-medium">Category trend analysis</div>
          <div className="text-xs text-muted-foreground">
            Gap progression across FY2024 → FY2025 → FY2026
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Job category</th>
                <th className="px-3 py-3 font-medium">FY2024</th>
                <th className="px-3 py-3 font-medium">FY2025</th>
                <th className="px-3 py-3 font-medium">FY2026</th>
                <th className="px-3 py-3 font-medium">Trend</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORY_TRENDS.map((c, i) => (
                <motion.tr
                  key={c.category}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  className={cn(
                    "border-t border-border/60 transition-colors hover:bg-muted/30",
                    c.fy2026 >= 5 && "bg-warning/[0.03]",
                  )}
                >
                  <td className="px-5 py-3 font-medium">{c.category}</td>
                  <td className="px-3 py-3 tabular-nums text-muted-foreground">
                    {c.fy2024}%
                  </td>
                  <td className="px-3 py-3 tabular-nums text-muted-foreground">
                    {c.fy2025}%
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "font-display font-semibold tabular-nums",
                        c.fy2026 >= 5 ? "text-warning" : "text-success",
                      )}
                    >
                      {c.fy2026}%
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <TrendIcon trend={c.status} />
                  </td>
                  <td className="px-5 py-3">
                    <TrendStatusBadge status={c.status} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Benchmarking */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <BarChart3 className="h-3.5 w-3.5 text-teal" /> Benchmarking
        </div>
        <div className="mt-2 flex items-start gap-2 rounded-lg border border-info/30 bg-info/5 p-3">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-info" />
          <p className="text-xs text-muted-foreground">
            Benchmark values are illustrative demo data for comparison
            purposes only. They do not represent official statistics and
            should not be used for compliance reporting.
          </p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {Object.entries(BENCHMARKS).map(([key, b]) => {
            const isCompany = key === "company";
            return (
              <div
                key={key}
                className={cn(
                  "rounded-xl border p-4",
                  isCompany
                    ? "border-teal/40 bg-teal/5"
                    : "border-border/60 bg-background",
                )}
              >
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {b.label}
                </div>
                <div className="mt-1.5 font-display text-3xl font-bold tabular-nums">
                  {b.gap}%
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {b.source}
                </div>
                {isCompany && (
                  <div className="mt-2 rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-medium text-teal inline-block">
                    Your company
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Visual comparison bar */}
        <div className="mt-4 space-y-2">
          {Object.entries(BENCHMARKS).map(([key, b]) => (
            <div key={key} className="flex items-center gap-3">
              <div className="w-40 text-xs text-muted-foreground">
                {b.label}
              </div>
              <div className="h-5 flex-1 overflow-hidden rounded-md bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(b.gap * 7, 100)}%` }}
                  transition={{ duration: 0.6 }}
                  className={cn(
                    "h-full rounded-md",
                    key === "company"
                      ? "bg-teal"
                      : key === "industry"
                        ? "bg-info"
                        : "bg-muted-foreground",
                  )}
                />
              </div>
              <div className="w-12 text-right text-xs font-medium tabular-nums">
                {b.gap}%
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ComparisonRow({
  label,
  valueA,
  valueB,
  delta,
  invertGood,
}: {
  label: string;
  valueA: string;
  valueB: string;
  delta: number;
  invertGood?: boolean;
}) {
  const isGood = invertGood ? delta > 0 : delta > 0;
  const isNeutral = delta === 0;
  return (
    <tr className="border-t border-border/60">
      <td className="px-4 py-3 text-muted-foreground">{label}</td>
      <td className="px-4 py-3 font-medium tabular-nums">{valueA}</td>
      <td className="px-4 py-3 font-medium tabular-nums">{valueB}</td>
      <td className="px-4 py-3">
        {isNeutral ? (
          <span className="text-muted-foreground">—</span>
        ) : (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium tabular-nums",
              isGood ? "text-success" : "text-destructive",
            )}
          >
            {delta > 0 ? "+" : ""}
            {typeof delta === "number" && delta % 1 !== 0
              ? delta.toFixed(1)
              : delta}
            {invertGood ? " pts" : ""}
          </span>
        )}
      </td>
    </tr>
  );
}

function TrendIcon({ trend }: { trend: CategoryTrend["status"] }) {
  if (trend === "improved_below" || trend === "improved")
    return <TrendingDown className="h-4 w-4 text-success" />;
  if (trend === "worsened")
    return <TrendingUp className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

function TrendStatusBadge({ status }: { status: CategoryTrend["status"] }) {
  const map = {
    improved_below: {
      label: "Improved below threshold",
      className: "bg-success/10 text-success",
    },
    improved: {
      label: "Improved",
      className: "bg-teal/10 text-teal",
    },
    worsened: {
      label: "Worsened",
      className: "bg-destructive/10 text-destructive",
    },
    stable: {
      label: "Stable",
      className: "bg-muted text-muted-foreground",
    },
  } as const;
  const m = map[status];
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

function StatusBadge({ status }: { status: Assessment["status"] }) {
  const map = {
    completed: { label: "Completed", className: "bg-success/10 text-success" },
    in_progress: {
      label: "In progress",
      className: "bg-warning/10 text-warning",
    },
    draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  } as const;
  const m = map[status];
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
