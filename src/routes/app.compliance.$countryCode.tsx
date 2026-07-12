import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Scale, CalendarClock, Users, Percent, Gavel, FileText, ShieldCheck, TriangleAlert as AlertTriangle, Building2, CircleCheck as CheckCircle2, Upload, Bot, ClipboardCheck, FileCheck as FileCheck2, Workflow } from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/compliance/$countryCode")({
  head: () => ({
    meta: [{ title: "Compliance detail — PayClarity" }],
  }),
  component: CountryDetailPage,
});

type CountryDetail = {
  code: string;
  name: string;
  flag: string;
  overview: string;
  reportingRequirements: string;
  reportingFrequency: string;
  companySizeThreshold: string;
  payGapThreshold: string;
  employeeRights: string;
  employerObligations: string;
  implementationTimeline: string;
  penalties: string;
  tags: string[];
  triggerConditions: string[];
  requiredDocumentation: string[];
  workflowMapping: { step: string; legalBasis: string }[];
};

const COUNTRY_DATA: Record<string, CountryDetail> = {
  DE: {
    code: "DE",
    name: "Germany",
    flag: "DE",
    overview:
      "Germany is transposing the EU Pay Transparency Directive into national law. Employers with 250+ employees must report annually on gender pay gaps. The 5% threshold triggers a joint pay assessment with works councils. Pay secrecy clauses are void under German law.",
    reportingRequirements:
      "Annual pay transparency report covering all employees. Must include gender pay gap metrics by job category, median and mean gaps, and explanations for gaps above 5%.",
    reportingFrequency: "Annual",
    companySizeThreshold: "250+ employees",
    payGapThreshold: "5% unexplained gap triggers joint pay assessment",
    employeeRights:
      "Employees have the right to request information about individual pay levels and the pay of comparable colleagues. Pay secrecy clauses are void.",
    employerObligations:
      "Publish annual pay gap report. Conduct joint pay assessment when triggered. Document objective justifications. Provide pay transparency information to employees.",
    implementationTimeline:
      "EU directive transposition in progress. National legislation expected by June 2026. Reporting obligations begin for FY2026 cycle.",
    penalties:
      "Fines up to €500,000 for non-compliance. Potential civil liability claims from affected employees. Regulatory enforcement by Federal Anti-Discrimination Agency.",
    tags: ["reporting_required", "annual_reporting", "joint_assessment_risk", "employee_disclosure_rights"],
    triggerConditions: [
      "Unexplained pay gap of 5% or more in any job category",
      "Company size of 250+ employees",
      "Joint pay assessment must be completed within 6 months of identification",
      "Works council co-determination rights apply during assessment",
      "Remediation plan required within 12 months if gaps persist",
    ],
    requiredDocumentation: [
      "Annual salary analysis by gender and job category",
      "Objective justification documentation for gaps above 5%",
      "Joint pay assessment report (if triggered)",
      "Remediation plan with timeline and measurable targets",
      "Employee pay transparency information records",
    ],
    workflowMapping: [
      { step: "Upload Data", legalBasis: "Salary data collection obligation" },
      { step: "Validate", legalBasis: "Data quality and completeness requirements" },
      { step: "Review", legalBasis: "Employer responsibility for data accuracy" },
      { step: "AI Grouping", legalBasis: "Job category classification per §3" },
      { step: "Gap Analysis", legalBasis: "5% threshold detection per §11" },
      { step: "AI Explanations", legalBasis: "Objective justification documentation" },
      { step: "Human Review", legalBasis: "Employer accountability and sign-off" },
      { step: "Generate Report", legalBasis: "Annual reporting obligation" },
    ],
  },
  NL: {
    code: "NL",
    name: "Netherlands",
    flag: "NL",
    overview:
      "The Netherlands has existing pay gap reporting requirements and is enhancing them under the EU Pay Transparency Directive. Employers with 100+ employees must publish annual pay gap reports. The Dutch Labour Authority (IW) oversees enforcement.",
    reportingRequirements:
      "Annual gender pay gap report. Employers must publish pay gap metrics on company website and submit to the Dutch Chamber of Commerce (KvK).",
    reportingFrequency: "Annual",
    companySizeThreshold: "100+ employees",
    payGapThreshold: "5% unexplained gap requires documented justification",
    employeeRights:
      "Employees have the right to request pay information. Pay secrecy clauses are prohibited. Works council consultation rights apply.",
    employerObligations:
      "Publish annual pay gap report on website. Submit to KvK. Document objective justifications. Conduct remediation when required.",
    implementationTimeline:
      "Dutch implementation of EU directive expected by June 2026. Existing pay gap reporting obligations already apply under Wlb (Work and Security Act).",
    penalties:
      "Administrative fines up to €87,000. Repeated non-compliance can lead to higher penalties. Public naming and shaming by Inspectorate SZW.",
    tags: ["reporting_required", "annual_reporting", "employee_disclosure_rights"],
    triggerConditions: [
      "Unexplained pay gap of 5% or more in any job category",
      "Company size of 100+ employees",
      "Annual reporting deadline: June 30th following reporting year",
      "Works council consultation required for remediation measures",
    ],
    requiredDocumentation: [
      "Annual gender pay gap report",
      "Pay structure documentation by job category",
      "Objective justification records for gaps above 5%",
      "Remediation action plan (if required)",
      "Website publication confirmation",
    ],
    workflowMapping: [
      { step: "Upload Data", legalBasis: "Salary data collection under Wlb" },
      { step: "Validate", legalBasis: "Data quality requirements" },
      { step: "Review", legalBasis: "Employer data accuracy responsibility" },
      { step: "AI Grouping", legalBasis: "Job category classification" },
      { step: "Gap Analysis", legalBasis: "5% threshold detection" },
      { step: "AI Explanations", legalBasis: "Objective justification documentation" },
      { step: "Human Review", legalBasis: "Employer accountability" },
      { step: "Generate Report", legalBasis: "Annual KvK submission obligation" },
    ],
  },
  SE: {
    code: "SE",
    name: "Sweden",
    flag: "SE",
    overview:
      "Sweden has one of the most mature pay transparency frameworks in the EU. The Swedish Discrimination Act requires annual pay surveys and action plans for equal pay. The EU directive supplements existing requirements with enhanced reporting standards.",
    reportingRequirements:
      "Annual pay gap survey and action plan. Employers must conduct a gender pay gap survey every three years and develop an action plan for equal pay.",
    reportingFrequency: "Annual survey, triennial action plan",
    companySizeThreshold: "25+ employees for survey, 50+ for action plan",
    payGapThreshold: "Differences must be investigated and justified",
    employeeRights:
      "Employees have extensive pay transparency rights under Swedish Discrimination Act. Trade union access to pay information is mandated.",
    employerObligations:
      "Conduct annual pay survey. Create action plan for equal pay (50+ employees). Document and justify pay differences. Report to Swedish Discrimination Ombudsman (DO).",
    implementationTimeline:
      "Sweden has well-established pay audit requirements since 2017. EU directive enhancements being integrated into existing Discrimination Act framework.",
    penalties:
      "Discrimination damages awarded by Swedish Discrimination Ombudsman. Court-ordered compliance. Potential civil liability claims.",
    tags: ["reporting_required", "annual_reporting", "employee_disclosure_rights"],
    triggerConditions: [
      "Any unexplained pay difference between men and women in comparable work",
      "Company size of 25+ employees for annual survey",
      "Company size of 50+ employees for action plan requirement",
      "Triennial action plan review and update",
    ],
    requiredDocumentation: [
      "Annual gender pay gap survey",
      "Equal pay action plan (50+ employees)",
      "Job classification and comparison documentation",
      "Objective justification for all pay differences",
      "Remediation progress reports",
    ],
    workflowMapping: [
      { step: "Upload Data", legalBasis: "Pay survey data collection obligation" },
      { step: "Validate", legalBasis: "Data quality and completeness" },
      { step: "Review", legalBasis: "Employer responsibility for accuracy" },
      { step: "AI Grouping", legalBasis: "Job category classification per Discrimination Act" },
      { step: "Gap Analysis", legalBasis: "Pay difference detection" },
      { step: "AI Explanations", legalBasis: "Objective justification documentation" },
      { step: "Human Review", legalBasis: "Employer accountability under DO oversight" },
      { step: "Generate Report", legalBasis: "Annual pay survey and action plan" },
    ],
  },
  DK: {
    code: "DK",
    name: "Denmark",
    flag: "DK",
    overview:
      "Denmark has mandatory pay gap reporting since 2022. Employers publish pay gap data on a government portal. The EU Pay Transparency Directive extends requirements with enhanced documentation and joint assessment obligations.",
    reportingRequirements:
      "Annual gender pay gap report. Employers must publish pay gap data on a designated government portal. Data is publicly accessible.",
    reportingFrequency: "Annual",
    companySizeThreshold: "250+ employees (50+ for public sector)",
    payGapThreshold: "5% unexplained gap requires documentation",
    employeeRights:
      "Employees have access to published pay gap data. Pay transparency is mandated by Danish Equal Pay Act. No pay secrecy permitted.",
    employerObligations:
      "Publish annual pay gap report on government portal. Submit pay data by gender. Document objective justifications for gaps above 5%.",
    implementationTimeline:
      "Denmark implemented pay gap reporting in 2022. EU directive enhancements being integrated. Reporting deadline: June 1st annually.",
    penalties:
      "Fines imposed by Danish Working Environment Authority. Public disclosure of non-compliant companies. Potential civil liability.",
    tags: ["reporting_required", "annual_reporting", "employee_disclosure_rights"],
    triggerConditions: [
      "Unexplained pay gap of 5% or more in any job category",
      "Company size of 250+ employees (private sector)",
      "Company size of 50+ employees (public sector)",
      "Annual reporting deadline: June 1st",
    ],
    requiredDocumentation: [
      "Annual gender pay gap report",
      "Pay data by gender and job category",
      "Objective justification documentation for gaps above 5%",
      "Government portal submission confirmation",
      "Remediation plan (if required)",
    ],
    workflowMapping: [
      { step: "Upload Data", legalBasis: "Pay data collection obligation" },
      { step: "Validate", legalBasis: "Data quality requirements" },
      { step: "Review", legalBasis: "Employer data accuracy responsibility" },
      { step: "AI Grouping", legalBasis: "Job category classification" },
      { step: "Gap Analysis", legalBasis: "5% threshold detection" },
      { step: "AI Explanations", legalBasis: "Objective justification documentation" },
      { step: "Human Review", legalBasis: "Employer accountability" },
      { step: "Generate Report", legalBasis: "Government portal submission" },
    ],
  },
  FI: {
    code: "FI",
    name: "Finland",
    flag: "FI",
    overview:
      "Finland has a long-standing equality planning framework under the Finnish Equality Act. Employers with 30+ employees must maintain equality plans including pay survey results. The EU directive enhances these with stricter reporting and documentation requirements.",
    reportingRequirements:
      "Annual pay gap report as part of equality plan. Employers must conduct pay surveys and include results in their equality plan.",
    reportingFrequency: "Annual pay survey, equality plan every 2 years",
    companySizeThreshold: "30+ employees for equality plan",
    payGapThreshold: "Pay differences must be investigated and justified",
    employeeRights:
      "Employees have access to pay survey results. Pay transparency mandated by Finnish Equality Act. Employee representatives participate in pay surveys.",
    employerObligations:
      "Conduct annual pay survey. Include results in equality plan. Document and justify pay differences. Report to Occupational Safety and Health Administration.",
    implementationTimeline:
      "Finland has existing equality planning requirements. EU directive being integrated into Finnish Equality Act. Full implementation expected by 2026.",
    penalties:
      "Fines imposed by Occupational Safety and Health Administration. Court-ordered compliance. Potential discrimination damages.",
    tags: ["reporting_required", "annual_reporting", "employee_disclosure_rights", "pending_implementation"],
    triggerConditions: [
      "Any unjustified pay difference between genders in comparable work",
      "Company size of 30+ employees for equality plan",
      "Annual pay survey requirement",
      "Equality plan update every 2 years",
    ],
    requiredDocumentation: [
      "Annual pay survey results",
      "Equality plan with pay gap analysis",
      "Objective justification documentation",
      "Employee representative consultation records",
      "Remediation measures and progress tracking",
    ],
    workflowMapping: [
      { step: "Upload Data", legalBasis: "Pay survey data collection obligation" },
      { step: "Validate", legalBasis: "Data quality requirements" },
      { step: "Review", legalBasis: "Employer responsibility for accuracy" },
      { step: "AI Grouping", legalBasis: "Job category classification per Equality Act" },
      { step: "Gap Analysis", legalBasis: "Pay difference detection" },
      { step: "AI Explanations", legalBasis: "Objective justification documentation" },
      { step: "Human Review", legalBasis: "Employer accountability under OSHA oversight" },
      { step: "Generate Report", legalBasis: "Equality plan and pay survey obligation" },
    ],
  },
};

const TAG_CONFIG: Record<string, { label: string; className: string }> = {
  reporting_required: { label: "Reporting required", className: "bg-info/10 text-info" },
  annual_reporting: { label: "Annual reporting", className: "bg-teal/10 text-teal" },
  joint_assessment_risk: { label: "Joint assessment risk", className: "bg-warning/10 text-warning" },
  employee_disclosure_rights: { label: "Employee disclosure rights", className: "bg-success/10 text-success" },
  pending_implementation: { label: "Pending national implementation", className: "bg-muted text-muted-foreground" },
};

const WORKFLOW_ICONS = [Upload, ShieldCheck, FileText, Workflow, Scale, Bot, ClipboardCheck, FileCheck2];

function CountryDetailPage() {
  const { countryCode } = Route.useParams();
  const country = COUNTRY_DATA[countryCode];

  if (!country) {
    return (
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Country not found" />
        <Button variant="outline" asChild>
          <Link to="/app/compliance">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to compliance library
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title={`${country.name} compliance guide`}
        description={country.overview}
        actions={
          <Button variant="outline" asChild>
            <Link to="/app/compliance">
              <ArrowLeft className="mr-1 h-4 w-4" /> Compliance library
            </Link>
          </Button>
        }
      />

      {/* Tags */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {country.tags.map((tag) => {
          const config = TAG_CONFIG[tag];
          return (
            <span
              key={tag}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                config.className,
              )}
            >
              {config.label}
            </span>
          );
        })}
      </div>

      {/* Key facts grid */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[
          { icon: CalendarClock, label: "Reporting frequency", value: country.reportingFrequency },
          { icon: Users, label: "Company size threshold", value: country.companySizeThreshold },
          { icon: Percent, label: "Pay gap threshold", value: country.payGapThreshold },
        ].map((f) => (
          <div
            key={f.label}
            className="rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-2">
              <f.icon className="h-4 w-4 text-teal" />
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {f.label}
              </div>
            </div>
            <div className="mt-1.5 text-sm font-medium">{f.value}</div>
          </div>
        ))}
      </motion.div>

      {/* Reporting Requirements */}
      <Section icon={FileText} title="Reporting requirements">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {country.reportingRequirements}
        </p>
      </Section>

      {/* Trigger Conditions */}
      <Section icon={AlertTriangle} title="Trigger conditions">
        <ul className="mt-3 space-y-2">
          {country.triggerConditions.map((t) => (
            <li
              key={t}
              className="flex items-start gap-2 rounded-lg border border-border/60 bg-background p-3 text-sm"
            >
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
              <span className="text-muted-foreground">{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Required Documentation */}
      <Section icon={FileText} title="Required documentation">
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {country.requiredDocumentation.map((d) => (
            <div
              key={d}
              className="flex items-start gap-2 rounded-lg border border-border/60 bg-background p-3 text-sm"
            >
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
              <span className="text-muted-foreground">{d}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Employee Rights */}
      <Section icon={ShieldCheck} title="Employee rights">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {country.employeeRights}
        </p>
      </Section>

      {/* Employer Obligations */}
      <Section icon={Building2} title="Employer obligations">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {country.employerObligations}
        </p>
      </Section>

      {/* Implementation Timeline */}
      <Section icon={CalendarClock} title="Implementation timeline">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {country.implementationTimeline}
        </p>
      </Section>

      {/* Penalties */}
      <Section icon={Gavel} title="Penalties for non-compliance">
        <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {country.penalties}
          </p>
        </div>
      </Section>

      {/* Recommended Workflow */}
      <Section icon={Workflow} title="PayClarity workflow mapping">
        <p className="mt-2 text-xs text-muted-foreground">
          How PayClarity maps to legal requirements in {country.name}.
        </p>
        <ol className="mt-4 space-y-2">
          {country.workflowMapping.map((w, i) => {
            const Icon = WORKFLOW_ICONS[i] ?? FileText;
            const isLast = i === country.workflowMapping.length - 1;
            return (
              <li
                key={w.step}
                className="flex items-start gap-3 rounded-lg border border-border/60 bg-background p-3"
              >
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{w.step}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {w.legalBasis}
                  </div>
                </div>
                {!isLast && (
                  <div className="hidden items-center text-muted-foreground sm:flex">
                    →
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-4"
      >
        <div className="flex items-start gap-2">
          <Scale className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            This guidance is for informational purposes only and does not
            constitute legal advice. National implementation of the EU Pay
            Transparency Directive is ongoing. Consult with qualified legal
            counsel for country-specific compliance obligations.
          </p>
        </div>
      </motion.div>

      {/* Back navigation */}
      <div className="mt-6">
        <Button variant="outline" asChild>
          <Link to="/app/compliance">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to compliance library
          </Link>
        </Button>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof FileText;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-teal" /> {title}
      </div>
      <div className="mt-3">{children}</div>
    </motion.section>
  );
}
