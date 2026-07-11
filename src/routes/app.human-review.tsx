import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ClipboardCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { WorkflowStrip } from "@/components/app/WorkflowStrip";

export const Route = createFileRoute("/app/human-review")({
  head: () => ({
    meta: [
      { title: "Human review — PayClarity" },
      {
        name: "description",
        content:
          "Human review checkpoint for AI-generated explanations and compliance decisions.",
      },
    ],
  }),
  component: HumanReviewPage,
});

function HumanReviewPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Human review"
        description="Final human checkpoint before compliance report generation"
        actions={
          <Button variant="outline" asChild>
            <Link to="/app/explanations">
              <ArrowLeft className="mr-1 h-4 w-4" /> AI explanations
            </Link>
          </Button>
        }
      />

      <div className="mb-6">
        <WorkflowStrip current="human" />
      </div>

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
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-teal/40 bg-teal/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-teal">
            Coming soon
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
            Human review is being built
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            This is the final checkpoint where HR and compliance teams review
            AI-generated explanations, approve or override findings, and
            sign off on the compliance report before submission.
          </p>
          <ul className="mx-auto mt-6 grid max-w-md gap-2 text-left text-sm">
            {[
              "Review and approve AI-drafted explanations for each job category",
              "Override or annotate AI findings with human judgment",
              "Assign reviewers by category, country, or department",
              "Track sign-off status and approval chain for audit trail",
              "Lock and finalize the compliance report for submission",
            ].map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-2"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                <span className="text-muted-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link to="/app/explanations">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to AI explanations
          </Link>
        </Button>
        <Button variant="hero" asChild>
          <Link to="/app/reports">
            Go to reports <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
