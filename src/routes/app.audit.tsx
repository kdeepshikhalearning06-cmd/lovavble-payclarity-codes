import { createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { PlaceholderPage } from "@/components/app/PlaceholderPage";

export const Route = createFileRoute("/app/audit")({
  head: () => ({ meta: [{ title: "Audit trail — PayClarity" }] }),
  component: () => (
    <PlaceholderPage
      title="Audit trail"
      icon={History}
      description="Every AI decision, human override, and approval is logged for regulators."
      bullets={[
        "Immutable timeline of every workspace event",
        "Filter by user, report, or event type",
        "Export tamper-evident logs for auditors",
      ]}
    />
  ),
});