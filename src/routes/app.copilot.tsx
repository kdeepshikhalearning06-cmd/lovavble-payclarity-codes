import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Sparkles, Send, ShieldCheck, TriangleAlert as AlertTriangle, TrendingDown, ClipboardCheck, Scale, ArrowRight, Info, CircleCheck as CheckCircle2, FileText, Workflow } from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/copilot")({
  head: () => ({
    meta: [
      { title: "AI Copilot — PayClarity" },
      {
        name: "description",
        content:
          "Your HR compliance analyst — understand findings, risks, and next actions.",
      },
    ],
  }),
  component: CopilotPage,
});

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  stages?: string[];
  confidence?: number;
  actions?: string[];
};

type SuggestedQuestion = {
  id: string;
  label: string;
  prompt: string;
  icon: typeof Bot;
};

const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: "q1",
    label: "Summarize current compliance risks",
    prompt: "Summarize current compliance risks",
    icon: ShieldCheck,
  },
  {
    id: "q2",
    label: "Show categories requiring attention",
    prompt: "Which categories represent the highest compliance risk?",
    icon: AlertTriangle,
  },
  {
    id: "q3",
    label: "Explain Germany's 5% threshold",
    prompt: "Explain Germany's 5% threshold",
    icon: Scale,
  },
  {
    id: "q4",
    label: "What actions should we prioritize this quarter?",
    prompt: "What should HR teams do next?",
    icon: TrendingDown,
  },
  {
    id: "q5",
    label: "Which explanations need human approval?",
    prompt: "Which explanations still require human approval?",
    icon: ClipboardCheck,
  },
  {
    id: "q6",
    label: "Which countries require annual reporting?",
    prompt: "Which countries require annual reporting?",
    icon: FileText,
  },
];

const RESPONSES: Record<string, Message> = {
  "Summarize current compliance risks": {
    id: "r1",
    role: "assistant",
    content:
      "Your FY2026 assessment shows 5 of 9 job categories above the 5% EU threshold. Two categories (Sales Management at 9.4% and Marketing IC at 10.1%) have no objective justification identified and require joint pay assessment. Engineering IC Level 2 and Data & Analytics have partial objective factors but need completed documentation. Overall compliance readiness is 78%.",
    sources: [
      "Gap Analysis — 9 categories analysed",
      "AI Explanations — 3 drafts generated",
      "Human Review — 5 items pending",
      "Compliance Library — Germany DE guide",
    ],
    stages: ["Gap Analysis", "AI Explanations", "Human Review"],
    confidence: 92,
    actions: [
      "Initiate joint pay assessment for Sales Management and Marketing IC",
      "Complete objective justification documentation for Engineering IC Level 2",
      "Review escalated categories in Human Review queue",
    ],
  },
  "Which categories represent the highest compliance risk?": {
    id: "r2",
    role: "assistant",
    content:
      "The highest-risk categories are: 1) Marketing IC (10.1% gap, no objective factors, confidence 48%) — requires immediate joint assessment. 2) Sales Management (9.4% gap, no objective factors, confidence 55%) — requires joint assessment per Article 10. 3) Engineering Management (6.7% gap, small sample, confidence 65%) — escalated for legal review. 4) Data & Analytics (7.3% gap, partial factors, confidence 72%) — needs documentation. 5) Engineering IC Level 2 (6.3% gap, partial factors, confidence 78%) — needs documentation.",
    sources: [
      "Gap Analysis — threshold status per category",
      "AI Explanations — confidence scores",
      "Human Review — escalation status",
    ],
    stages: ["Gap Analysis", "AI Explanations", "Human Review"],
    confidence: 89,
    actions: [
      "Prioritize Marketing IC and Sales Management for joint pay assessment",
      "Review Engineering Management escalation with legal counsel",
      "Complete documentation for Data & Analytics and Engineering IC Level 2",
    ],
  },
  "Explain Germany's 5% threshold": {
    id: "r3",
    role: "assistant",
    content:
      "Under the EU Pay Transparency Directive as transposed in Germany, employers with 250+ employees must report annually on gender pay gaps. When an unexplained pay gap of 5% or more is identified in any job category, a joint pay assessment must be conducted with works councils within 6 months. If gaps persist after assessment, a remediation plan with measurable targets is required within 12 months. Pay secrecy clauses are void under German law.",
    sources: [
      "Compliance Library — Germany (DE) guide",
      "EU Pay Transparency Directive — Article 10",
    ],
    stages: ["Compliance Library"],
    confidence: 95,
    actions: [
      "Review Germany compliance guide for full requirements",
      "Verify company size threshold applicability",
      "Ensure works council consultation for any joint assessment",
    ],
  },
  "What should HR teams do next?": {
    id: "r4",
    role: "assistant",
    content:
      "Based on current workflow state, recommended priorities: 1) Resolve 5 pending human review items — 2 are escalated for legal review and need immediate attention. 2) Complete objective justification documentation for 2 categories with partial factors. 3) Initiate joint pay assessment for 2 categories with no objective factors. 4) Generate compliance report once all reviews are approved. 5) Submit annual report before June 2026 deadline.",
    sources: [
      "Human Review — 5 pending items",
      "AI Explanations — 3 drafts awaiting action",
      "Gap Analysis — 2 joint assessment triggers",
      "Compliance Library — reporting deadlines",
    ],
    stages: ["Human Review", "AI Explanations", "Gap Analysis", "Generate Report"],
    confidence: 87,
    actions: [
      "Approve or reject 5 pending explanations in Human Review",
      "Document objective justifications for Engineering IC Level 2 and Data & Analytics",
      "Initiate joint pay assessment for Sales Management and Marketing IC",
      "Generate and submit compliance report before June 2026",
    ],
  },
  "Which explanations still require human approval?": {
    id: "r5",
    role: "assistant",
    content:
      "5 explanations are currently pending human review: 1) Engineering IC Level 2 (6.3% gap, 78% confidence, assigned to Anna Novak). 2) Engineering Management (6.7% gap, 65% confidence, escalated for legal review). 3) Data & Analytics (7.3% gap, 72% confidence, assigned to Marco Bianchi). 4) Sales Management (9.4% gap, 55% confidence, unassigned). 5) Marketing IC (10.1% gap, 48% confidence, assigned to Anna Novak). 2 of these are escalated and require legal review before approval.",
    sources: [
      "Human Review — review queue",
      "AI Explanations — draft status",
    ],
    stages: ["Human Review", "AI Explanations"],
    confidence: 94,
    actions: [
      "Assign reviewers to 2 unassigned categories",
      "Prioritize escalated items for legal counsel review",
      "Approve or reject each explanation to advance workflow",
    ],
  },
  "Which countries require annual reporting?": {
    id: "r6",
    role: "assistant",
    content:
      "All 5 supported countries require annual reporting: Germany (250+ employees, annual), Netherlands (100+ employees, annual, deadline June 30), Sweden (25+ employees, annual survey + triennial action plan), Denmark (250+ employees, annual, deadline June 1), Finland (30+ employees, annual pay survey + equality plan every 2 years). Your current assessment covers 4 countries: DE, NL, FR, and IT.",
    sources: [
      "Compliance Library — all country guides",
      "Gap Analysis — countries included in assessment",
    ],
    stages: ["Compliance Library", "Gap Analysis"],
    confidence: 91,
    actions: [
      "Verify all applicable country thresholds are met",
      "Check reporting deadlines for each country",
      "Ensure compliance report covers all required countries",
    ],
  },
};

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "assistant",
  content:
    "I'm your HR compliance analyst. I can help you understand pay gap findings, assess compliance risks, and identify next actions. Ask me about specific job categories, threshold requirements, or what your team should prioritize.",
};

function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const response = findResponse(trimmed);
      setMessages((prev) => [...prev, response]);
      setIsThinking(false);
    }, 800);
  };

  const findResponse = (query: string): Message => {
    const normalized = query.toLowerCase();
    for (const [key, value] of Object.entries(RESPONSES)) {
      if (normalized.includes(key.toLowerCase().slice(0, 20))) {
        return { ...value, id: `r_${Date.now()}` };
      }
    }
    return {
      id: `r_${Date.now()}`,
      role: "assistant",
      content:
        "I can help with questions about compliance risks, job category findings, threshold requirements, human review status, and recommended next actions. Try one of the suggested questions below, or ask about a specific job category.",
      sources: ["PayClarity workflow data"],
      stages: ["Workspace"],
      confidence: 70,
    };
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="AI Copilot"
        description="Your HR compliance analyst — understand findings, assess risks, and identify next actions"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Chat area */}
        <div className="flex flex-col rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto p-5"
            style={{ minHeight: "400px", maxHeight: "calc(100vh - 320px)" }}
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isThinking && <ThinkingBubble />}
          </div>

          {/* Input */}
          <div className="border-t border-border/60 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about compliance risks, categories, or next actions…"
                className="flex-1 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-teal/40"
              />
              <Button type="submit" variant="hero" size="sm" disabled={!input.trim() || isThinking}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Suggested questions sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-teal" /> Suggested questions
            </div>
            <div className="mt-3 space-y-1.5">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleSend(q.prompt)}
                  disabled={isThinking}
                  className="group flex w-full items-start gap-2 rounded-lg border border-border/60 bg-background p-2.5 text-left text-xs transition-all hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-[var(--shadow-card)] disabled:opacity-50"
                >
                  <q.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                  <span className="flex-1 text-muted-foreground group-hover:text-foreground">
                    {q.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Info className="h-3.5 w-3.5 text-teal" /> Capabilities
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal" />
                Analyzes findings from your workflow
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal" />
                Cites PayClarity data sources
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal" />
                Recommends prioritized actions
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal" />
                References compliance library
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal" />
                Does not provide legal advice
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-3", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
          isUser
            ? "bg-muted text-muted-foreground"
            : "bg-[image:var(--gradient-teal)] text-teal-foreground",
        )}
      >
        {isUser ? (
          <span className="text-[10px] font-medium">You</span>
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div className={cn("min-w-0 flex-1", isUser && "flex justify-end")}>
        <div
          className={cn(
            "inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-muted text-foreground"
              : "border border-teal/30 bg-teal/5 text-muted-foreground",
          )}
        >
          {message.content}
        </div>

        {/* Explainability */}
        {!isUser && message.sources && (
          <div className="mt-3 space-y-2">
            {/* Actions */}
            {message.actions && message.actions.length > 0 && (
              <div className="rounded-lg border border-border/60 bg-background p-3">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Recommended actions
                </div>
                <ul className="mt-2 space-y-1.5">
                  {message.actions.map((a, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-teal" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sources & confidence */}
            <div className="flex flex-wrap items-start gap-3 rounded-lg border border-border/60 bg-background p-3">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Sources used
                </div>
                <ul className="mt-1.5 space-y-1">
                  {message.sources.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-1.5 text-[11px] text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              {message.confidence !== undefined && (
                <div className="shrink-0">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Confidence
                  </div>
                  <div
                    className={cn(
                      "mt-1 font-display text-lg font-bold tabular-nums",
                      message.confidence >= 85
                        ? "text-success"
                        : message.confidence >= 70
                          ? "text-teal"
                          : "text-warning",
                    )}
                  >
                    {message.confidence}%
                  </div>
                </div>
              )}
            </div>

            {/* Workflow stages */}
            {message.stages && message.stages.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Stages:
                </span>
                {message.stages.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-medium text-teal"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ThinkingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[image:var(--gradient-teal)] text-teal-foreground">
        <Bot className="h-4 w-4" />
      </div>
      <div className="inline-block rounded-2xl border border-teal/30 bg-teal/5 px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="h-2 w-2 rounded-full bg-teal"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
