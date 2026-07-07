import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Users,
  Workflow,
  FileCheck2,
  Bot,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Welcome back, Anna"
        description="Germany 2026 Q1 report · 1,428 employees analysed"
        actions={
          <Button variant="hero" asChild>
            <Link to="/app/reports">Generate report <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Compliance readiness", value: "96%", delta: "+12 pts", icon: ShieldCheck, tone: "text-success" },
          { label: "Mean pay gap", value: "3.2%", delta: "-1.4 pts", icon: TrendingDown, tone: "text-teal" },
          { label: "Employees", value: "1,428", delta: "+22 this month", icon: Users, tone: "text-info" },
          { label: "Job clusters", value: "18", delta: "AI verified", icon: Workflow, tone: "text-primary" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <s.icon className={"h-4 w-4 " + s.tone} />
            </div>
            <div className="mt-3 font-display text-3xl font-semibold">{s.value}</div>
            <div className={"mt-1 text-xs " + s.tone}>{s.delta}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Pay gap by department</h2>
              <p className="text-xs text-muted-foreground">Mean gender pay gap · target &lt; 5%</p>
            </div>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/app/pay-gap">Open <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <div className="mt-6 space-y-3">
            {[
              { name: "Engineering", value: 2.1 },
              { name: "Sales", value: 8.3 },
              { name: "Marketing", value: 4.6 },
              { name: "Product", value: 1.4 },
              { name: "Customer Success", value: 3.0 },
              { name: "Operations", value: 5.7 },
            ].map((d) => (
              <div key={d.name} className="grid grid-cols-[10rem_1fr_4rem] items-center gap-3">
                <div className="truncate text-sm">{d.name}</div>
                <div className="h-2 rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(d.value * 10, 100)}%` }}
                    transition={{ duration: 0.8 }}
                    className={"h-2 rounded-full " + (d.value > 5 ? "bg-destructive/70" : d.value > 3 ? "bg-warning/70" : "bg-success/70")}
                  />
                </div>
                <div className="text-right text-sm tabular-nums">{d.value}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-teal/40 bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-teal)] text-teal-foreground">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <div className="font-display text-sm font-semibold">AI Copilot</div>
              <div className="text-xs text-muted-foreground">3 suggestions today</div>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Sales Managers show an 8.3% gap — draft an explanation?",
              "6 employees flagged as missing seniority data.",
              "24 engineers ready to regroup into 3 clusters.",
            ].map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-border/60 bg-muted/40 p-3 transition-colors hover:border-teal/40"
              >
                {t}
              </motion.li>
            ))}
          </ul>
          <Button variant="teal" size="sm" className="mt-4 w-full" asChild>
            <Link to="/app/explanations">Review with copilot</Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { icon: Workflow, title: "AI job grouping", body: "Cluster 218 roles into an audit-ready job architecture.", to: "/app/job-grouping" as const },
          { icon: FileCheck2, title: "Generate report", body: "Assemble your country-specific PDF with one click.", to: "/app/reports" as const },
          { icon: TrendingUp, title: "Compliance readiness", body: "The exact steps that get you from 96% to 100%.", to: "/app/compliance" as const },
        ].map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="group rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-[var(--shadow-elegant)]"
          >
            <c.icon className="h-5 w-5 text-teal" />
            <div className="mt-3 font-display text-sm font-semibold">{c.title}</div>
            <p className="mt-1 text-xs text-muted-foreground">{c.body}</p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-teal">
              Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}