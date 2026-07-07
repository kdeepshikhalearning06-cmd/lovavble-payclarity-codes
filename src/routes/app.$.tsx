import { createFileRoute, Link } from "@tanstack/react-router";
import { MockPage, Card } from "@/components/app/MockPage";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/$")({ component: AppSplat });

const titles: Record<string, { title: string; description: string; copilot: string }> = {
  employees: {
    title: "Employees",
    description: "1,428 employees across 6 departments and 5 countries.",
    copilot: "Ready to enrich missing seniority for 6 employees using AI.",
  },
  "job-grouping": {
    title: "AI job grouping",
    description: "218 role titles clustered into 18 comparable job groups.",
    copilot: "I regrouped 24 Software Engineers into 3 clusters — approve grouping?",
  },
  "pay-gap": {
    title: "Pay gap analysis",
    description: "Mean, median, bonus, and quartile analysis for all job clusters.",
    copilot: "Sales Managers show 8.3% gap — draft an explanation now?",
  },
  explanations: {
    title: "AI explanations",
    description: "Draft, review, and approve AI-assisted explanations per cluster.",
    copilot: "3 explanation drafts ready for your review.",
  },
  compliance: {
    title: "Compliance readiness",
    description: "Track exactly what's left before your report is audit-ready.",
    copilot: "You are 96% ready. 4 action items remaining — want the priority list?",
  },
  reports: {
    title: "Reports",
    description: "Generate a country-specific PDF report signed off by your team.",
    copilot: "Germany 2026 Q1 report ready to preview. Generate final PDF?",
  },
  audit: {
    title: "Audit trail",
    description: "Every AI decision, human override, and approval is logged.",
    copilot: "216 events logged. Nothing needs your attention.",
  },
  settings: {
    title: "Workspace settings",
    description: "Manage your workspace, team members, and integrations.",
    copilot: "You're currently in the read-only demo workspace.",
  },
};

function AppSplat() {
  const { _splat } = Route.useParams();
  const key = (_splat ?? "").split("/")[0];
  const meta = titles[key] ?? {
    title: "Coming soon",
    description: "This workspace section will be built out next.",
    copilot: "Meanwhile, explore the other screens in the sidebar.",
  };
  return (
    <MockPage title={meta.title} description={meta.description} copilot={meta.copilot}>
      <Card>
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display font-semibold">Demo screen</div>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              This screen is part of the PayClarity workflow. The full interactive
              build is scoped in the portfolio roadmap — the surrounding navigation,
              copilot, and audit trail are all wired up.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <Link to="/app" className="rounded-md border border-border bg-background px-3 py-1.5 hover:bg-muted">← Back to dashboard</Link>
              <Link to="/app/dataset" className="rounded-md border border-border bg-background px-3 py-1.5 hover:bg-muted">Salary dataset</Link>
              <Link to="/coming-soon" className="rounded-md border border-border bg-background px-3 py-1.5 hover:bg-muted">Roadmap</Link>
            </div>
          </div>
        </div>
      </Card>
    </MockPage>
  );
}