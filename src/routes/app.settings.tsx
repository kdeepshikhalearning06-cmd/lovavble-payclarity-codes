import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { PlaceholderPage } from "@/components/app/PlaceholderPage";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — PayClarity" }] }),
  component: () => (
    <PlaceholderPage
      title="Settings"
      icon={Settings}
      description="Workspace preferences, team members, integrations, and data retention."
      bullets={[
        "Invite HR and legal reviewers with granular roles",
        "Connect payroll systems and HRIS providers",
        "Configure data retention and residency per country",
      ]}
    />
  ),
});