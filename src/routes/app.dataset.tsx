import { createFileRoute } from "@tanstack/react-router";
import { MockPage, Card } from "@/components/app/MockPage";
import { Upload, FileCheck2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/app/dataset")({ component: DatasetPage });

function DatasetPage() {
  return (
    <MockPage
      title="Salary dataset"
      description="Demo dataset · payroll_2026_q1.csv · 1,428 rows · validated"
      copilot="I found 6 rows missing seniority. Auto-fill from role title?"
      nextTo="/app/job-grouping"
      nextLabel="Continue to job grouping"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <FileCheck2 className="h-5 w-5 text-success" />
          <div className="mt-3 font-display text-2xl font-semibold">1,422</div>
          <div className="text-xs text-muted-foreground">Rows validated</div>
        </Card>
        <Card>
          <AlertCircle className="h-5 w-5 text-warning" />
          <div className="mt-3 font-display text-2xl font-semibold">6</div>
          <div className="text-xs text-muted-foreground">Rows need review</div>
        </Card>
        <Card>
          <Upload className="h-5 w-5 text-teal" />
          <div className="mt-3 font-display text-2xl font-semibold">12</div>
          <div className="text-xs text-muted-foreground">Columns detected</div>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <div className="font-display font-semibold">Detected columns</div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {["employee_id","full_name","gender","country","department","role_title","seniority","base_salary","bonus","start_date","fte","currency"].map(c => (
              <span key={c} className="rounded-full border border-border bg-muted/40 px-2.5 py-1 font-mono">{c}</span>
            ))}
          </div>
        </Card>
      </div>
    </MockPage>
  );
}