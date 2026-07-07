import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Demo workspace — PayClarity" },
      { name: "description", content: "Explore the PayClarity workflow with realistic demo data." },
    ],
  }),
  component: AppShell,
});