import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { PlaceholderPage } from "@/components/app/PlaceholderPage";

export const Route = createFileRoute("/app/copilot")({
  head: () => ({ meta: [{ title: "AI Copilot — PayClarity" }] }),
  component: () => (
    <PlaceholderPage
      title="AI Copilot"
      icon={Bot}
      description="Your compliance assistant — drafts explanations, flags risks, and proposes next actions."
      bullets={[
        "Draft defensible explanations for pay gaps",
        "Surface findings that require legal or HR review",
        "Suggest the fastest path to a fully audit-ready report",
      ]}
    />
  ),
});