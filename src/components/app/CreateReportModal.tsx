import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Upload, Sparkles, FileText, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enableDemo } from "@/lib/demo-store";
import { toast } from "sonner";

type Source = "csv" | "demo" | null;

export function CreateReportModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const [country, setCountry] = useState("DE");
  const [period, setPeriod] = useState("2026-Q1");
  const [snapshot, setSnapshot] = useState("2026-03-31");
  const [source, setSource] = useState<Source>(null);

  const canContinue = country && period && snapshot && source;

  const handleContinue = () => {
    if (!canContinue) return;
    if (source === "demo") {
      enableDemo();
      toast.success("Sample data loaded into your workspace");
    } else {
      toast.success("Report draft created");
    }
    onOpenChange(false);
    navigate({ to: "/app/reports/setup", search: { country, period } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">New pay transparency report</DialogTitle>
          <DialogDescription>
            Configure the reporting scope. You can upload data now or start with sample data.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="DE">🇩🇪 Germany</SelectItem>
                <SelectItem value="FR">🇫🇷 France</SelectItem>
                <SelectItem value="NL">🇳🇱 Netherlands</SelectItem>
                <SelectItem value="ES">🇪🇸 Spain</SelectItem>
                <SelectItem value="IT">🇮🇹 Italy</SelectItem>
                <SelectItem value="PL">🇵🇱 Poland</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="period">Reporting period</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger id="period"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-Q1">2026 · Q1</SelectItem>
                  <SelectItem value="2026-Q2">2026 · Q2</SelectItem>
                  <SelectItem value="2026-H1">2026 · H1</SelectItem>
                  <SelectItem value="2026-FY">2026 · Full year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="snapshot">Snapshot date</Label>
              <Input id="snapshot" type="date" value={snapshot} onChange={(e) => setSnapshot(e.target.value)} />
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Data source</Label>
            <div className="grid grid-cols-2 gap-3">
              <SourceOption
                icon={Upload}
                title="Upload CSV"
                subtitle="Bring your payroll export"
                active={source === "csv"}
                onClick={() => setSource("csv")}
              />
              <SourceOption
                icon={Sparkles}
                title="Try Sample Data"
                subtitle="Explore with demo dataset"
                active={source === "demo"}
                onClick={() => setSource("demo")}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="hero" disabled={!canContinue} onClick={handleContinue}>
            Continue <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SourceOption({
  icon: Icon,
  title,
  subtitle,
  active,
  onClick,
}: {
  icon: typeof FileText;
  title: string;
  subtitle: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={
        "group flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all " +
        (active
          ? "border-teal bg-teal/5 shadow-[var(--shadow-glow)]"
          : "border-border bg-background hover:border-teal/50 hover:bg-muted/40")
      }
    >
      <Icon className={"h-4 w-4 " + (active ? "text-teal" : "text-muted-foreground")} />
      <div className="text-sm font-medium">{title}</div>
      <div className="text-[11px] text-muted-foreground">{subtitle}</div>
    </motion.button>
  );
}