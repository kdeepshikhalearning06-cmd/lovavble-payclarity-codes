import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AlertTone = "warning" | "destructive" | "info" | "teal";

const TONE_CONFIG: Record<
  AlertTone,
  { border: string; bg: string; icon: string; iconBg: string }
> = {
  warning: {
    border: "border-warning/30",
    bg: "bg-warning/5",
    icon: "text-warning",
    iconBg: "bg-warning/10",
  },
  destructive: {
    border: "border-destructive/30",
    bg: "bg-destructive/5",
    icon: "text-destructive",
    iconBg: "bg-destructive/10",
  },
  info: {
    border: "border-info/30",
    bg: "bg-info/5",
    icon: "text-info",
    iconBg: "bg-info/10",
  },
  teal: {
    border: "border-teal/30",
    bg: "bg-teal/5",
    icon: "text-teal",
    iconBg: "bg-[image:var(--gradient-teal)] text-teal-foreground",
  },
};

const ICON_MAP: Record<AlertTone, LucideIcon> = {
  warning: AlertTriangle,
  destructive: AlertCircle,
  info: Info,
  teal: Info,
};

export function ComplianceAlert({
  tone = "warning",
  title,
  message,
  linkTo,
  linkLabel,
  dismissible = false,
  icon: CustomIcon,
}: {
  tone?: AlertTone;
  title: string;
  message: string;
  linkTo?: string;
  linkLabel?: string;
  dismissible?: boolean;
  icon?: LucideIcon;
}) {
  const config = TONE_CONFIG[tone];
  const Icon = CustomIcon ?? ICON_MAP[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4",
        config.border,
        config.bg,
      )}
    >
      <div
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
          config.iconBg,
        )}
      >
        <Icon className={cn("h-4 w-4", config.icon)} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{message}</div>
        {linkTo && linkLabel && (
          <Link
            to={linkTo}
            className="mt-1.5 inline-flex items-center gap-0.5 text-xs font-medium text-teal transition-colors hover:text-teal/80"
          >
            {linkLabel}
          </Link>
        )}
      </div>
    </motion.div>
  );
}
