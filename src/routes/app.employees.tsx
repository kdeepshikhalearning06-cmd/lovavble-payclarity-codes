import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PlaceholderPage } from "@/components/app/PlaceholderPage";

export const Route = createFileRoute("/app/employees")({
  head: () => ({ meta: [{ title: "Employees — PayClarity" }] }),
  component: () => (
    <PlaceholderPage
      title="Employees"
      icon={Users}
      description="Manage the workforce data that feeds every pay transparency report."
      bullets={[
        "Import and validate payroll snapshots per country",
        "Enrich missing seniority, role, and department fields",
        "Track ungrouped employees awaiting human review",
      ]}
    />
  ),
});