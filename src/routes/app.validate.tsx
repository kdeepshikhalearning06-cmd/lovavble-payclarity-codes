import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, TriangleAlert as AlertTriangle, CircleAlert as AlertCircle, DollarSign, Users, Copy, Building2, Briefcase, ArrowRight, ArrowLeft, Eye, EyeOff, Flag, CircleCheck as CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { WorkflowStrip } from "@/components/app/WorkflowStrip";
import { useDemoMode, useUploadedFiles } from "@/lib/demo-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/app/validate")({
  head: () => ({
    meta: [
      { title: "Validate data — PayClarity" },
      {
        name: "description",
        content:
          "Review data quality issues before AI processing begins.",
      },
    ],
  }),
  component: ValidatePage,
});

type CheckKey =
  | "missing_salary"
  | "missing_gender"
  | "duplicate_ids"
  | "invalid_currency"
  | "missing_department"
  | "invalid_title";

type ValidationCheck = {
  key: CheckKey;
  title: string;
  description: string;
  icon: typeof DollarSign;
  severity: "error" | "warning";
  count: number;
  sampleRows: string[];
};

type IssueStatus = "open" | "ignored" | "review";

function buildChecks(demo: boolean, fileCount: number): ValidationCheck[] {
  if (!demo && fileCount === 0) return [];
  return [
    {
      key: "missing_salary",
      title: "Missing salary values",
      description: "Employees without a salary cannot be included in pay gap calculations.",
      icon: DollarSign,
      severity: "error",
      count: 14,
      sampleRows: ["DE-1042", "DE-1087", "NL-2014", "FR-3051", "DE-1129"],
    },
    {
      key: "missing_gender",
      title: "Missing gender information",
      description: "Gender is required for gender pay gap analysis under the EU directive.",
      icon: Users,
      severity: "error",
      count: 23,
      sampleRows: ["FR-3018", "NL-2076", "IT-4033", "DE-1099", "FR-3024"],
    },
    {
      key: "duplicate_ids",
      title: "Duplicate employee IDs",
      description: "Duplicate IDs may cause double-counting or data corruption.",
      icon: Copy,
      severity: "error",
      count: 3,
      sampleRows: ["DE-1102", "NL-2045", "FR-3077"],
    },
    {
      key: "invalid_currency",
      title: "Invalid currency values",
      description: "Salaries with non-standard or mismatched currency codes.",
      icon: AlertCircle,
      severity: "warning",
      count: 8,
      sampleRows: ["DE-1067", "DE-1134", "IT-4019", "FR-3042", "NL-2088"],
    },
    {
      key: "missing_department",
      title: "Missing departments",
      description: "Employees without department assignment cannot be grouped for comparison.",
      icon: Building2,
      severity: "warning",
      count: 19,
      sampleRows: ["DE-1055", "NL-2031", "FR-3068", "IT-4044", "DE-1078"],
    },
    {
      key: "invalid_title",
      title: "Invalid job titles",
      description: "Blank or non-standard job titles that AI grouping cannot process.",
      icon: Briefcase,
      severity: "warning",
      count: 11,
      sampleRows: ["DE-1091", "FR-3037", "NL-2058", "IT-4061", "DE-1115"],
    },
  ];
}

function ValidatePage() {
  const [demo] = useDemoMode();
  const files = useUploadedFiles();
  const checks = useMemo(
    () => buildChecks(demo, files.length),
    [demo, files.length],
  );

  const totalRecords = 1428;
  const errorCount = checks
    .filter((c) => c.severity === "error")
    .reduce((sum, c) => sum + c.count, 0);
  const warningCount = checks
    .filter((c) => c.severity === "warning")
    .reduce((sum, c) => sum + c.count, 0);
  const recordsWithIssues = Math.min(errorCount + warningCount, totalRecords);
  const validRecords = totalRecords - recordsWithIssues;
  const validationScore = Math.round(
    (validRecords / totalRecords) * 100,
  );

  const [issueStates, setIssueStates] = useState<Record<string, IssueStatus>>(
    {},
  );
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const updateIssue = (key: string, status: IssueStatus) => {
    setIssueStates((prev) => ({ ...prev, [key]: status }));
    const labels: Record<IssueStatus, string> = {
      open: "restored as open",
      ignored: "ignored",
      review: "marked for review",
    };
    toast.success(`Issue ${labels[status]}`);
  };

  const hasData = demo || files.length > 0;

  if (!hasData) {
    return (
      <div className="mx-auto max-w-4xl">
        <PageHeader
          title="Validate data"
          description="Identify and resolve data quality issues before analysis begins"
        />
        <NoDataState />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Validate data"
        description="Identify and resolve data quality issues before AI processing begins"
        actions={
          <Button variant="outline" asChild>
            <Link to="/app/data-sources">
              <ArrowLeft className="mr-1 h-4 w-4" /> Data sources
            </Link>
          </Button>
        }
      />

      <div className="mb-6">
        <WorkflowStrip current="validate" />
      </div>

      {/* Summary metrics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total records",
            value: totalRecords.toLocaleString(),
            icon: ShieldCheck,
            tone: "text-info",
          },
          {
            label: "Valid records",
            value: validRecords.toLocaleString(),
            icon: CheckCircle2,
            tone: "text-success",
          },
          {
            label: "Need attention",
            value: recordsWithIssues.toLocaleString(),
            icon: AlertTriangle,
            tone: "text-warning",
          },
          {
            label: "Validation score",
            value: `${validationScore}%`,
            icon: ShieldCheck,
            tone:
              validationScore >= 90
                ? "text-success"
                : validationScore >= 70
                  ? "text-warning"
                  : "text-destructive",
          },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-teal/40"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {m.label}
              </div>
              <m.icon className={cn("h-4 w-4", m.tone)} />
            </div>
            <div className="mt-3 font-display text-3xl font-semibold tabular-nums">
              {m.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Validation score bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-sm font-semibold">
              Data quality score
            </div>
            <div className="text-xs text-muted-foreground">
              Weighted by error severity — errors count double
            </div>
          </div>
          <div
            className={cn(
              "font-display text-2xl font-bold tabular-nums",
              validationScore >= 90
                ? "text-success"
                : validationScore >= 70
                  ? "text-warning"
                  : "text-destructive",
            )}
          >
            {validationScore}%
          </div>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${validationScore}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={cn(
              "h-full rounded-full",
              validationScore >= 90
                ? "bg-success"
                : validationScore >= 70
                  ? "bg-warning"
                  : "bg-destructive",
            )}
          />
        </div>
      </motion.div>

      {/* Validation check cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {checks.map((check, i) => {
          const status = issueStates[check.key] ?? "open";
          const isExpanded = expandedKey === check.key;
          return (
            <motion.div
              key={check.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] transition-all",
                status === "ignored"
                  ? "border-border/60 opacity-60"
                  : status === "review"
                    ? "border-teal/40"
                    : check.severity === "error"
                      ? "border-destructive/30"
                      : "border-warning/30",
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                    check.severity === "error"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-warning/10 text-warning",
                  )}
                >
                  <check.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-semibold">
                      {check.title}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                        check.severity === "error"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-warning/10 text-warning",
                      )}
                    >
                      {check.severity}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {check.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-display text-lg font-semibold tabular-nums">
                      {check.count}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      affected rows
                    </span>
                  </div>
                </div>
              </div>

              {/* Affected rows preview */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 p-3">
                      <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Sample affected rows
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {check.sampleRows.map((row) => (
                          <span
                            key={row}
                            className="rounded-md border border-border/60 bg-background px-2 py-0.5 font-mono text-[11px]"
                          >
                            {row}
                          </span>
                        ))}
                        {check.count > check.sampleRows.length && (
                          <span className="rounded-md px-2 py-0.5 text-[11px] text-muted-foreground">
                            +{check.count - check.sampleRows.length} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    setExpandedKey(isExpanded ? null : check.key)
                  }
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="mr-1 h-3.5 w-3.5" /> Hide rows
                    </>
                  ) : (
                    <>
                      <Eye className="mr-1 h-3.5 w-3.5" /> View rows
                    </>
                  )}
                </Button>
                {status === "open" ? (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateIssue(check.key, "ignored")}
                    >
                      <EyeOff className="mr-1 h-3.5 w-3.5" /> Ignore
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateIssue(check.key, "review")}
                    >
                      <Flag className="mr-1 h-3.5 w-3.5" /> Mark for review
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateIssue(check.key, "open")}
                  >
                    Restore
                  </Button>
                )}
                {status === "review" && (
                  <span className="ml-auto rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-medium text-teal">
                    Flagged
                  </span>
                )}
                {status === "ignored" && (
                  <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Ignored
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom navigation */}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link to="/app/data-sources">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to data sources
          </Link>
        </Button>
        <Button variant="hero" asChild>
          <Link to="/app/review">
            Continue to data review{" "}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function NoDataState() {
  return (
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
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          No data to validate yet
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          Upload a payroll snapshot first, then return here to review data
          quality before AI processing begins.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Button variant="hero" asChild>
            <Link to="/app/data-sources">Go to data sources</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/app">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
