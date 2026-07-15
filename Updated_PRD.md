# PayClarity — AI Pay Transparency Copilot for HR Teams
**Portfolio project — Product Requirements Document (v1.2)**

**Positioning:** Not a "pay equity checker" (a feature). A copilot that walks HR through the *entire* Pay Transparency Directive workflow — import, detect, explain, flag for human review, draft documentation, report, and maintain an audit trail. What started as a linear workflow spec has since grown into a persistent enterprise workspace (see Section 13). This is a workflow platform story, not a dashboard story.

---

## 1. Problem Statement

HR and People Ops teams in EU companies (100+ employees) face two simultaneous pressures:

- **Regulatory:** The EU Pay Transparency Directive (2023/970) requires gender pay gap reporting. Where a gap of 5%+ in any job category can't be objectively justified, and isn't corrected within 6 months, employers must run a joint pay assessment with employee representatives.
- **Trust erosion:** There's a documented 31-point gap between how fair HR believes pay is (74.8%) and how fair they believe employees perceive it to be (44%) — largely because 22% of organizations lack job leveling, making pay differences impossible to explain.

Most mid-market HR teams (100–1,000 employees) have compensation *data* but lack:
- A fast way to **detect** which pay gaps are statistically meaningful vs. noise
- A way to **generate a defensible, plain-language explanation** for each gap that would hold up to an employee, works council, or regulator
- Tooling that's **affordable and fast to adopt** — existing solutions (Syndio, Trusaic, Payscale) are enterprise audit platforms, not lightweight team tools

**Working problem statement:**
> Mid-market HR teams in the EU can see that pay gaps exist in their data, but they lack an affordable, fast way to determine which gaps are objectively justified and generate documentation that would satisfy an employee, works council, or regulator.

**The sharper framing that emerged during build (see Section 14):** compliance itself is not the hardest problem here. Preparing evidence HR can actually defend, months later, to an auditor or a works council, is. PayClarity isn't designed to tell companies whether they're compliant — it helps them build the evidence, documentation, and confidence required to demonstrate compliance.

---

## 2. Why Now (Market Signal)

- The EU transposition deadline (7 June 2026) has passed; only a handful of states (Slovakia, Italy, Lithuania, Malta) met it. Germany, Netherlands, and France have missed it. Sweden has paused implementation and called for renegotiation. Netherlands/Denmark are targeting January 2027.
- The European Commission has refused to extend the deadline — employers can't simply wait for local law to finalize.
- Employers with 250+ staff must report annually from 2027 using 2026 pay data — data prep needs to start now, regardless of national timeline delays.
- AI adoption in HR is concentrated in recruiting (54%); compensation & benefits AI adoption is only 22% — a clear white space. While recruiting has moved onto modern integrated SaaS, rewards teams are still largely running on offline spreadsheets.

---

## 3. Target Customer (Single ICP)

**Primary persona — "Anna," HR Manager / Head of People at a 200–1,000 employee B2B SaaS company in Germany or the Netherlands**
- Owns comp & benefits alongside broader HR responsibilities; no dedicated comp analyst
- Uses a modern-ish HRIS (Personio, HiBob) + spreadsheets; no pay equity tooling
- Enough headcount to genuinely care about reporting thresholds, but not enough process maturity to have solved this already
- Realistic buying process (not enterprise procurement); anxious about works council questions
- In her own words: *"I don't need another analytics dashboard. I need confidence that I can explain our pay decisions."*

**What Anna is actually thinking (grounded in practitioner research, not guesses):**
- *"I've never had to build proof that our pay is fair before — I just knew it probably was."* The burden of proof used to sit with the employee; now it sits with the employer.
- *"What even counts as the 'same' job?"* A genuine judgment call, not a spreadsheet formula.
- *"I'm already stretched across five things — this can't become a full-time project."*
- *"I want zero gaps, not just 'legally under 5%.'"*

**Explicitly excluded persona — "Lars," Enterprise People Operations Leader at a 10,000+ employee organization**

Enterprise organizations already have sophisticated compensation platforms and specialized teams. Lars's challenges involve complex global governance and integrations, not the core workflow PayClarity was built to solve. Supporting Lars would meaningfully increase product complexity without improving the first version of the product.

**Why one persona, not two:** designing for two customer types at MVP stage signals an undecided ICP. Lars is a real segment, but he's a Phase 2 expansion, not the wedge. This customer segment (200–1,000 employees) experiences increasing regulatory pressure but often lacks dedicated compensation specialists, which makes workflow support far more valuable to them than advanced analytics.

---

## 4. MVP Scope Boundaries

**In scope:**
- Upload anonymized/synthetic employee compensation data (CSV), editable before use
- Country-aware setup for 5 target markets (Germany, Netherlands, Sweden, Denmark, Finland)
- AI-assisted job categorization using the EU's own 4-factor framework
- Pay gap detection (company-wide + per job category), mean/median/quartile views
- AI-drafted, objective-factors-only explanations for flagged gaps, with confidence tags
- A compiled report with a transparent Compliance Readiness Score and audit trail
- A persistent workspace (Dashboard, Workflow, AI Copilot, Reports & Audit Trail) rather than a single-run form — see Section 13

**Explicitly out of scope (a feature, not a gap):**
- ❌ Payroll system integrations — direct integrations with payroll and HR systems add engineering complexity before validating the core workflow. Currently mocked in the build.
- ❌ Country-by-country legal compliance calculation — each EU member state implements the directive differently; automated legal localization in V1 increases scope and claiming precision here would be dishonest *(see Section 12 for the scoped, non-calculation version of this idea being considered for V1.5)*
- ❌ Legal determination of whether a gap is lawful — always a human/legal-counsel decision. PayClarity organizes explanation paths but intentionally avoids declaring firm compliance, which belongs to regulators.
- ❌ Automatic salary adjustment recommendations — the platform identifies pay gaps and documents evidence, it does not recommend active salary modifications. Too much liability, too little trust-earning value at MVP stage.
- ❌ Multi-country reporting in a single run — one country per report for the MVP. Supporting multiple legal frameworks simultaneously would dilute development focus.
- ❌ RBAC / granular permissions, notifications, guided onboarding, real backend persistence — built as frontend-complete but not yet productionized; see Section 15.

This boundary is the strongest product-judgment signal in the project: deliberate reduction of AI overreach and legal risk, not a resourcing shortcut. Every excluded feature was evaluated against one question: *does this help the first customer complete their compliance workflow faster and with greater trust?*

---

## 5. Full Workflow Overview

1. Country & currency setup
2. Upload salary data *(own file, or "try with sample data")*
3. Review & edit data *(explicit checkpoint before AI touches anything)*
4. AI groups job categories
5. Calculate pay gaps
6. AI drafts explanations
7. Human review
8. Compile report & readiness score

This is the core linear process, designed to solve one reporting task end to end. As covered in Section 13, this workflow now lives inside a persistent workspace rather than standing alone as a single-use form.

---

## 6. Detailed Step-by-Step Spec

### Step 1 — Country & currency setup
- Anna selects one of 5 countries: Germany, Netherlands, Sweden, Denmark, Finland.
- This single choice sets, for the rest of the session:
  - **Currency**: EUR (Germany, Netherlands, Finland), SEK (Sweden), DKK (Denmark) — prevents meaningless gap math from mixed currencies.
  - **Employee representative body terminology**, used later in the report:
    - Germany → **Betriebsrat** (statutory, employee-only works council)
    - Netherlands → **Ondernemingsraad (OR)** — same structure, different name
    - Sweden → **trade union representative under the Co-Determination Act** (Sweden has no separate works council; representation runs directly through unions)
    - Denmark / Finland → generic "employee representative body" (kept generic rather than asserting an unverified specific term — representation there also runs mainly through unions/collective agreements)
  - **National context note**: e.g. Germany already has a pre-existing Entgelttransparenzgesetz (Transparency in Wage Structures Act) with its own thresholds (200 employees for individual right-to-information, 500 for a management-report-linked pay report), layered on top of the new EU-wide thresholds.
- **Edge case:** multi-country companies run one report per country in the MVP — an explicit, honest scope limit.

### Step 2 — Upload salary data

**Two paths into this step:**
- **Upload Your Own File** — the field structure below
- **Try with Sample Data** — loads a pre-built, realistic synthetic dataset instantly (a fictional "NordTech GmbH," ~150 employees, Germany) and skips straight to Step 3. This removes all friction for a portfolio visitor who just wants to see the product work.

**Landing page / copilot messaging:** rather than a splash screen with two buttons, the persistent copilot greeting itself offers this conversationally — e.g. *"Upload your own compensation data, or just say 'use sample data' and I'll load a realistic example so you can see the whole workflow right away."* This keeps the entry point feeling like part of the copilot experience, not a separate form.

**Why the sample dataset has to be deliberately designed, not just generic filler:** it should demonstrate every feature — a data quality issue for the quality check to catch, a job group with a clean tenure-based explanation, at least one gap the AI honestly flags as "no objective explanation found," and one group too small to calculate. A clean, gap-free sample would make the product look like it does nothing.

**Credibility guardrail:** the sample data path carries a visible label — *"Demo data — not a real company"* — so it's never ambiguous to a visitor what's real vs. illustrative.

**Edge case:** the sample dataset is fixed to Germany. If Anna selected a different country in Step 1, show a small note — *"Sample data is illustrated using Germany; switch to Germany above for fully matching terminology"* — rather than silently mismatching the country label and the underlying data.

**Required fields:**
- Employee ID (anonymized, never a real name)
- Job Title
- Department
- Job Level / Grade
- Gender
- Annual Base Salary
- Bonus / Variable Pay
- FTE % (full-time equivalent)
- Hire Date (or tenure in years)

**Recommended fields** (map to the EU's own 4 job-evaluation factors — see Step 4):
- Years of relevant experience before joining
- Certifications / qualifications → *skills* factor
- Management responsibility / team size → *responsibility* factor
- Working conditions notes (shift work, travel, hazard exposure) → *working conditions* factor

**Auto-filled, not uploaded:** Currency and Country, carried over from Step 1.

**Custom columns:**
- Anna can add any column not in the template (e.g. "Performance rating," "Cost center")
- Each custom column has a toggle: *"Should the AI consider this when grouping jobs?"* (on by default) — keeps AI reasoning traceable rather than hidden

**Processing:**
- Data quality check runs immediately: missing fields, 0% FTE (divide-by-zero risk), etc.
- **Edge case:** if more than 20% of rows have data issues, the tool halts and says so rather than producing a report on bad data — false confidence is worse than no report.

### Step 3 — Review & edit data *(checkpoint before AI touches anything)*
- Anna sees the uploaded data as an editable spreadsheet-style table, not a locked preview.
- She can: edit any cell directly, add a new row, delete a row, add a custom column, or bulk-fix a flagged issue (e.g. fill in a missing job level for 12 people at once).
- The data quality check re-runs live as she edits.
- **Nothing moves to Step 4 until Anna explicitly confirms the data** — deliberate checkpoint, since everything downstream inherits any uncorrected error here. Corrupted input corrupts downstream audits: this friction is intentional, prioritizing accuracy over speed.

### Step 4 — AI groups job categories

**What the AI receives:** Job Title, Department, Job Level/Grade, and any recommended/custom field marked "AI should consider this." **Does NOT receive gender or salary** — grouping happens blind to the thing being measured, so groupings can't unconsciously bend toward a convenient answer, and the model can't learn historical pay inequalities from the data it's classifying on.

**AI instructions (draft spec):**
> "Group these employees into categories of 'work of equal value,' using only these four factors from the EU's official job evaluation framework: skills required, responsibility level, effort, and working conditions. Do not group by job title alone. For each group, write one plain-language sentence explaining which factors justified the grouping. If a person doesn't clearly fit any group with confidence, place them in an 'ungrouped' set rather than forcing a match."

**Output shown to Anna:**
- Proposed groups with member count and one-line reasoning
- Controls: accept, edit, merge, split, move a person, reject, rename
- Confidence sorting: lower-confidence categories (e.g. "Marketing IC," "Data & Analytics," "People Operations") are automatically routed to manual review rather than silently accepted
- Nothing calculates a gap until Anna clicks "Confirm groupings"

**Edge cases:**
- **Too few groups** (AI lumps everyone into 2-3 huge buckets, hiding real gaps) → soft warning to consider splitting
- **One-person groups** → visually distinct from real comparable groups, since no gap can be calculated
- **Conflicting signals** (same title, very different responsibility notes) → surfaced as a flag for Anna, not silently resolved
- **Honest limitation:** "equal value" is a genuinely contested judgment even among human compensation experts — the tool makes AI reasoning visible and keeps a human in the loop, rather than claiming to solve job classification outright.
- **Trade-off, stated plainly:** trust over convenience. The model occasionally produces imperfect groupings, but the resulting categories are significantly easier to defend during audits.

### Step 5 — Calculate pay gaps

Two separate calculations, not one:

**A. Company-wide numbers:**
- Overall mean/median pay gap
- Overall bonus/variable pay gap
- **Quartile view**: split the *entire company* into 4 equal-sized bands (lowest-paid 25% → highest-paid 25%), showing gender split in each band — reveals structural patterns (e.g. "women are 70% of the lowest-paid quarter")

**B. Per-job-group numbers** (using Step 4's groups):
- Mean/median gap *within* each equal-value group — this is what actually triggers the 5% rule
- Categories that exceed the 5% threshold are automatically flagged for joint assessment risk and prioritized for investigation, largest and least-explainable anomalies first

**Formulas (plain language):**
- Mean gap % = (avg male pay − avg female pay) ÷ avg male pay × 100
- Median gap % = same idea using the middle value instead of the average — resistant to distortion by one high-earning outlier
- All salaries first normalized to full-time-equivalent (annual salary ÷ FTE%)
- Bonus gap = same mean/median formulas applied to bonus/variable pay, plus % of men vs. women who received any bonus

**"Who counts" rule (decided now, not left ambiguous):** include every employee on payroll as of a chosen snapshot date, FTE-adjusted for part-timers; exclude external contractors and agency staff.

**Sequencing rule:** gap analysis only runs after a verified, human-approved mapping of job groups has been locked in Step 4. Numbers are never calculated against an unconfirmed grouping.

**Edge cases:**
- **Single-gender group** → cannot calculate a gap at all; shown as "Cannot calculate — only one gender represented," never as a misleading 0%
- **Mean/median disagree significantly** → flagged with "check for outliers"
- **Zero variable pay in a group** → skip the bonus-gap line rather than showing a meaningless 0%
- **Design philosophy:** the objective isn't to eliminate every pay difference, it's to identify which differences require evidence.

### Step 6 — AI drafts explanations

**What the AI receives per flagged group:** the group's gap % (mean and median), anonymized employee-level data for that group only (gender, salary, tenure, prior experience, certifications, management responsibility, working conditions), and the country context from Step 1. **Does not** receive the whole company dataset — reasoning stays scoped and auditable.

**AI instructions (draft spec):**
> "For this job group, draft a plain-language explanation for the pay gap using only objective factors present in the data — tenure, job level, certifications, prior experience. Never use gender as a justification. If the data does not support a clear objective explanation, say so explicitly rather than inventing one. Tag your explanation with one of: 'Strong objective explanation,' 'Partial — recommend human review,' or 'No objective explanation found.'"

**Non-negotiable framing:** every explanation is a draft for Anna and legal/HR to review — never presented as a final legal conclusion. The AI acts exclusively as an automation assistant to formulate text; it is explicitly restricted from rendering legal conclusions or compliance verdicts.

**Trade-off, stated plainly:** the product intentionally sacrifices fully automated completion in exchange for structural accountability and audit defensibility. The goal of AI here is not to replace judgment, it's to eliminate the blank page.

### Step 7 — Human review

- Every AI-generated grouping and explanation routes through an explicit approval step before it can enter a final report.
- Anna (or a reviewer) can approve, edit, or escalate any AI output.
- Status is tracked per item: Pending, Approved, Escalated — protecting the reporting pipeline from silent errors.
- No AI draft enters a final audit report without conscious human sign-off. This is the accountability layer that turns "an AI tool produced this" into "HR reviewed and approved this."

### Step 8 — Compile report & readiness score

**Report structure:**
1. **Cover/summary** — company name (or anonymized placeholder), country, reporting period, snapshot date
2. **Company-wide headline numbers** — overall mean/median gap, bonus gap, quartile view
3. **Job category breakdown** — every group, its gap %, color flag, "reliable" vs. "too small to calculate"
4. **AI-drafted explanations** — each with its confidence tag, and a fixed disclaimer repeated per explanation: *"AI-drafted for HR review. Not a legal determination."*
5. **Needs human review** — consolidated list: ungrouped employees, "no objective explanation" cases, single-gender groups — this becomes Anna's actual to-do list
6. **Compliance Readiness Score** (below)
7. **Methodology appendix** — states the EU 4-factor framework was used for grouping, the gap-math formulas, and the "who counts" inclusion rule

**Compliance Readiness Score — transparent formula, not a mystery number:**
- Data completeness (25%) — % of employees with all required fields filled in
- Categorization completeness (25%) — % of employees successfully grouped vs. "ungrouped"
- Explanation coverage (30%) — % of flagged gaps with a "strong" or "partial" objective explanation
- Documentation completeness (20%) — whether a report has been generated and reviewed

- **Guardrail:** this is an internal *readiness heuristic*, not a legal compliance certification — stated explicitly next to the score. Given fragmented implementation across all 5 target countries, a score implying cross-country legal equivalence would be actively misleading.
- **Design principle:** each component dragging the score down links to the specific action that improves it (e.g. "12 employees missing job level → fix in Step 3") — the score functions as a checklist, not just a grade. The score feels less "magical" as a trade-off, but the logic behind it is fully transparent.

**Audit trail:** every edit — overriding an AI grouping, resolving a data issue, regenerating the report — is timestamped and logged automatically. This turns "we ran an AI tool once" into "we have a documented process," which is the actual evidence a company would need if a pay decision were ever questioned.

**Export:** the final output is a complete evidence package: PDF reports, CSV logs, and a full historic audit trail, not a single static file.

---

## 7. User Stories

| # | Priority | As Anna, I want to... | So that... |
|---|---|---|---|
| **Entry & Setup** | | | |
| 1 | Must | try the product with sample data instantly | I can evaluate it before committing my own data |
| 2 | Must | select my country before uploading data | the tool uses the correct currency and terminology automatically |
| **Data Upload & Quality** | | | |
| 3 | Must | upload a CSV of compensation data | I don't have to manually re-enter anything |
| 4 | Must | see an immediate data quality check after upload | I know what needs fixing before wasting time on analysis |
| 5 | Must | edit any cell before the AI processes anything | I stay in control of what the AI sees |
| 6 | Should | add custom columns | I can include data relevant to my company beyond the default template |
| **Job Categorization** | | | |
| 7 | Must | have the AI propose job categories using objective factors | I don't have to manually classify hundreds of roles |
| 8 | Must | see why the AI grouped two roles together | I can trust or correct its reasoning instead of taking it on faith |
| 9 | Must | merge, split, or reassign proposed groups | the categorization reflects my company's real structure |
| 10 | Should | see ambiguous roles flagged as "ungrouped" rather than force-matched | I'm never misled by a confident-looking wrong answer |
| **Gap Detection** | | | |
| 11 | Must | see both mean and median pay gaps | I can tell if one outlier is skewing the picture |
| 12 | Must | see a company-wide quartile view | I can spot structural patterns beyond individual job groups |
| 13 | Must | see groups too small to calculate reliably flagged, not scored | I don't act on statistically meaningless numbers |
| **AI Explanations & Human Review** | | | |
| 14 | Must | get a plain-language draft explanation for each flagged gap | I'm not starting from a blank page |
| 15 | Must | see a confidence tag on every explanation | I know which ones need real scrutiny before I trust them |
| 16 | Must | have the AI admit when it can't find an objective explanation | I'm never given false reassurance |
| 17 | Must | approve, edit, or escalate any AI-generated output before it's final | accountability for what enters the report always sits with a human |
| **Reporting & Compliance Readiness** | | | |
| 18 | Must | get one downloadable report combining every finding | I can share it with leadership or a works council directly |
| 19 | Must | see a compliance readiness score with a visible formula | I understand exactly what's driving the number |
| 20 | Should | have each low-scoring factor link to its specific fix | I know exactly what to do next, not just how bad things look |
| 21 | Should | have an audit trail of every edit and override | I have documentation if my process is ever questioned |
| **Ongoing Workspace** | | | |
| 22 | Should | return to a persistent dashboard instead of starting over each time | I can manage compliance as an ongoing process, not a once-a-year scramble |
| 23 | Should | ask a copilot questions about my findings or a specific grouping | I get direct answers instead of having to re-read the whole report |
| **Portfolio Demo Experience** | | | |
| 24 | Must | (as a recruiter) try the product in one click with sample data | I can evaluate it without preparing a dataset myself |
| 25 | Must | (as a recruiter) clearly see which data is real vs. demo | I trust what I'm looking at |

## 8. Success Metrics

**Track 1 — if this were a real, live product**

| Metric | What it measures | Why it matters |
|---|---|---|
| Completed Compliance Assessments (North Star) | Number of assessments successfully completed and submitted | A workflow product creates value only when users reach the final report |
| Workflow Completion Rate | % of assessments that progress from upload to final report generation | Reveals where people get stuck or give up |
| Workflow Drop-Off Analysis | Where users abandon the flow (Upload Data, AI Job Grouping, Generate Report) | Pinpoints the specific friction point to fix next |
| AI Grouping Acceptance Rate | % of AI-generated job categories approved without edits | Measures trust in the AI system directly |
| Explanation Approval Rate | % of AI explanations approved by HR reviewers as-is | Measures documentation quality |
| Time to First Actionable Insight | Time from upload to the first identified compliance risk | The core value prop is speed vs. a manual audit — this proves it |
| Time to Compliance Readiness | Average time from salary upload to readiness score generation | Goal: reduce manual prep time significantly vs. spreadsheet workflows |
| Post-Submission Correction Rate | % of submitted reports later flagged or corrected | Ensures speed and completion never come at the cost of compliance accuracy |
| Feature Engagement | Interactions with AI Job Grouping, Generate Report, Dashboard | Shows which parts of the workspace actually get used post-launch |

**Track 2 — measuring the portfolio demo itself**

| Metric | What it measures | Why it matters |
|---|---|---|
| Demo Completion Rate | % of visitors who click "Try Sample Data" and reach the final report | Tests whether the demo itself holds attention end-to-end |
| Time-to-first-value | Seconds from click to first meaningful output | Recruiters won't wait — this has to be fast |
| Interview readiness | Your ability to explain each trade-off's reasoning | Likely a direct interview question in itself |

**Guiding principle:** success isn't the number of dashboards viewed. It's the number of organizations that move from uncertainty to readiness, and the trust they place in the process to get there.

## 9. Sources Used to Ground This Design
- EIGE "EU-wide guidelines on gender-neutral job evaluation and classification" toolkit (European Commission + European Institute for Gender Equality, published 26 March 2026) — official methodology and templates, source of the 4-factor framework
- UK Government's live Gender Pay Gap Service (gender-pay-gap.service.gov.uk) — closest real, working precedent for report structure, since the EU's own system isn't live yet
- Justly's free public Gender & Ethnicity Pay Gap Calculator (Google Sheets) — real example of raw-data-to-dashboard spreadsheet structure
- Tellent (VP of People, Marieke Drees) — practitioner perspective on cross-country comparability and burden-of-proof shift
- Salary.com 2026 Pay Practices Report — HR confidence-vs-employee-perception gap data
- HR practitioner discussions — recurring concerns around evidence gathering, manual reporting, and audit preparation, which directly shaped the "explanation gap" framing in Section 1
- Review of existing HR platforms and current compensation workflows, to identify where AI-assisted compliance tooling was genuinely missing

---

## 10. Next Steps
- [x] Formal user stories + success metrics
- [x] Future roadmap documented (Section 12 — Country Compliance Intelligence, V1.5/V2)
- [x] Core compliance workflow built end to end, upload through report generation
- [x] Human-in-the-loop AI review, Audit Trail, AI Copilot built
- [x] Persistent workspace shipped (Dashboard, Workflow, AI Copilot, Reports & Audit Trail)
- [ ] RBAC, notifications, guided onboarding
- [ ] Real backend persistence and auth
- [ ] Payroll/HRIS integrations move from mocked to real
- [ ] Portfolio case study write-up


---

## 11. Pricing & Go-to-Market Strategy (MVP)

### Pricing Philosophy

PayClarity is positioned as an **AI Compliance Copilot** for HR teams rather than a free reporting utility. The product's value comes from guiding HR through an end-to-end compliance workflow—from importing compensation data to generating audit-ready documentation.

Instead of a permanent free tier, the MVP offers a **14-day free trial** alongside an interactive demo experience. This allows prospective customers to experience the full product before purchasing while maintaining a premium B2B SaaS positioning.

### Free Trial (14 Days)

**Included**
- Full access to the complete workflow (upload through report generation and human review)
- Unlimited reports using the built-in sample dataset
- One report using the customer's own uploaded CSV
- AI-powered job categorization
- Pay gap analysis
- AI-generated explanations
- Compliance Readiness Score
- AI Copilot
- Audit Trail
- PDF report generation

**Limitations**
- One organization
- Up to 250 employees
- One real company report
- Exported reports include a subtle "Generated during Free Trial" watermark
- No HRIS integrations
- No team collaboration

### Paid Plans

#### Starter
- Unlimited reports
- Unlimited employee uploads
- AI Copilot
- Compliance reports
- Audit Trail
- Email support

#### Growth
Everything in Starter plus:
- Multiple HR users
- Report version history
- Team collaboration
- Advanced analytics
- Priority support

#### Enterprise
Everything in Growth plus:
- Single Sign-On (SSO)
- API access
- HRIS integrations
- Custom branding
- Dedicated Customer Success Manager
- Enterprise-grade security
- SLA support
- Bring Your Own AI Key (BYOK) for AI-drafted explanations only — see note below

**A scoped note on BYOK:** some Enterprise buyers already have an approved AI vendor (OpenAI, Anthropic, Google) and prefer inference billed to their own account, both for cost visibility and to fit existing procurement. PayClarity supports this only for **Step 6 (AI-Drafted Explanations)**. **AI Job Grouping (Step 4) always runs on PayClarity-managed inference**, since that step is what carries the bias-blind guarantee — grouping never seeing gender or salary — and that guarantee has to stay enforced on PayClarity's side regardless of who's paying for the tokens. BYOK reduces PayClarity's inference cost and gives large customers billing control; it does not reduce PayClarity's responsibility for the audit trail, prompt scoping, or the confidence-tagging logic, all of which stay identical regardless of provider. Not part of MVP scope — see Section 12 for sequencing.

### Portfolio Demo Strategy

The landing page should present two primary calls-to-action:

- **Start Free Trial** — for HR teams evaluating PayClarity with their own data.
- **Explore with Demo Data** — instantly launches the complete workflow using the synthetic NordTech GmbH dataset without requiring sign-up or file upload.

This reduces evaluation friction while clearly distinguishing demo data from real organizational data.

### Product Management Rationale

- No permanent free tier because PayClarity delivers business-critical compliance workflows.
- The free trial exposes the complete value proposition without limiting AI capabilities.
- Demo data provides immediate time-to-value for recruiters and evaluators.
- Paid plans scale through collaboration, integrations, and enterprise administration rather than restricting core AI functionality.

---

## 12. Future Roadmap — Country Compliance Intelligence (V1.5 / V2)

**Status: Documented roadmap only. Not built in the current MVP or repo.**

### The signal behind this

Customer discovery surfaced a distinction worth designing around. HR users don't ask *"show me Article 9 of Directive 2023/970."* They ask operational questions:

- *"Do I need annual reporting?"*
- *"Does my company size qualify?"*
- *"What threshold triggers action?"*
- *"Do I need employee representatives involved?"*
- *"What happens if I exceed 5%?"*
- *"What evidence do regulators expect?"*

The job-to-be-done is **decision support**, not **document storage**. A searchable law library answers the wrong question — it hands Anna a PDF when what she needs is a direct answer to "does this apply to me." This reframing is the reason the feature is worth roadmapping at all, even though it isn't being built now.

### Why this stays a roadmap item, not a V1 build

This idea sits close to a boundary this PRD already drew in Section 4: *"Country-by-country legal compliance calculation — implementation is fragmented and shifting across all 27 states; claiming precision here would be dishonest."* A compliance snapshot that states hard thresholds and requirements as fact runs into the same honesty problem if it's not carefully scoped. Three changes make it safe to roadmap without contradicting that earlier scope cut:

1. **Narrowed to the two countries already in the ICP** (Germany, Netherlands) — not a claim of coverage across all 5 target markets or all 27 EU states.
2. **Framed as a snapshot/checklist, not a legal determination** — carries the same "not a legal conclusion" disclaimer already used elsewhere in this PRD for AI-drafted explanations.
3. **Sequenced after the core workflow**, so it doesn't pull build time away from the loop that actually proves the product.

### V1.5 — Country Compliance Snapshot

- Static, hardcoded reference data for **Germany and Netherlands only** — no live retrieval, no legal database.
- Surfaced as a small card inside **Step 1 (Country & Currency Setup)**, e.g.:

  > **Germany Requirements**
  > ✓ Annual reporting required (250+ employees)
  > ✓ 5% unexplained gap threshold
  > ✓ Works council (Betriebsrat) involvement may be required
  > ✓ Audit trail recommended
  > *This is a readiness reference, not legal advice. Confirm requirements with legal counsel.*

- AI Copilot can reference this snapshot as context when answering questions like *"why was this gap flagged?"* or *"can we submit this report now?"* — the snapshot becomes input the copilot reasons over, not a page Anna has to go read herself.
- Explicitly excluded from V1.5: any country beyond the two in scope, any legal conclusion, any auto-generated action beyond surfacing the snapshot.

### V2 — Regulatory Intelligence Layer

- Full retrieval-augmented system: structured guidance per country retrieved and injected into AI context at the point of relevance, rather than hardcoded.
- Expansion to all 27 member states as implementation stabilizes.
- Change tracking as national transposition laws update.
- Jurisdiction comparison view for multi-country employers.
- Enterprise BYOK for AI-drafted explanations (Section 11) — customer-supplied OpenAI/Anthropic/Google key for Step 6 only, with AI Job Grouping remaining PayClarity-managed to preserve the bias-blind guarantee. Held for V2 rather than V1.5 because credential storage, per-provider prompt tuning, and connection testing are real scope, not a checkbox, and the core workflow should ship first.

### Roadmap sequencing (product story)

| Phase | What it is |
|---|---|
| V1 | Compliance workflow platform — the core loop, now shipped end to end |
| V1.5 | Country intelligence layer — Germany + Netherlands snapshot, mocked data |
| V2 | Regulatory intelligence platform — full RAG, all member states, live updates |

This progression — workflow first, then narrow contextual intelligence, then a full retrieval system — is itself the product argument: features earn their place once the core workflow is proven, not before.

---

## 13. Product Evolution — From Workflow to Enterprise Workspace

The original spec (Sections 5–6) treated PayClarity as a single linear process: seven steps, one report out. During build, that assumption broke.

**The insight:** a real product needs more than a workflow, it needs a home. HR teams don't run a pay transparency assessment once and close the tab. They manage parallel reporting cycles, revisit prior analyses, collaborate with teammates, and need to maintain an audit history across years, not just within one session.

That insight took the product from ~7 screens to a live structure of roughly 20, organized around four persistent areas rather than one form:

| Area | What it does |
|---|---|
| **Dashboard** | Daily overview of audit milestones and action plans; a continuously updated compliance readiness view instead of a once-a-year report; surfaces pending actions and recent activity so decisions become institutional knowledge instead of disappearing into spreadsheets and emails |
| **Workflow** | The guided interface from Section 6, linking raw uploads to audit outcomes — country setup through human review |
| **AI Copilot** | Generative modules to map positions, draft narratives, and answer direct questions about findings, backed by source references and confidence indicators |
| **Reports & Audit Trail** | Export evidence dossiers (PDF, CSV), manage baseline data configuration, and browse the full history log of every human and AI action |

**Why this matters as a product decision, not just a build decision:** pay transparency isn't a yearly report, it's a continuous operational process. Treating it as a one-time form would have undersold the actual job-to-be-done. Quick Actions (upload data, start an assessment, generate a report) stay one click away from the dashboard specifically so the workspace doesn't reintroduce the friction the workflow was built to remove.

**Trade-off, stated plainly:** continuous monitoring requires more surface area and more operational discipline to build and maintain than a single-run tool would have. In exchange, it significantly reduces reporting risk and the cost of corrective action, and it's what makes this a credible enterprise SaaS story rather than a calculator with a nice UI.

---

## 14. Retrospective — What Changed While Building This

A few assumptions from the original spec didn't survive contact with research and build:

| Initial assumption | What changed |
|---|---|
| PayClarity is a reporting product | Research showed the harder problem isn't generating reports, it's helping HR teams produce evidence they can defend months later |
| Analytics would be the core product value | The real product challenge turned out to be trust, explainability, and human accountability, not dashboards |
| AI should automate as much as possible | The strongest design decisions came from deciding where AI should stop and a human should take over, not from maximizing automation |
| Multiple countries and payroll integrations should be in from day one | Narrowing to one persona and one workflow produced a more focused, more honest product than trying to cover everyone up front |

**The throughline:** compliance software isn't judged by how impressive it looks, it's judged by whether people can rely on it. Every major decision in this PRD — blind AI grouping, tagged confidence on explanations, a human checkpoint before AI touches anything, a transparent (not "magic") readiness score — follows the same rule: when trust and convenience conflict, trust wins. The most valuable lesson from building this was that compliance products succeed not by replacing judgment, but by making judgment easier to defend.

---

## 15. Current Build Status

As of this update, PayClarity is a functional MVP, not a wireframe or clickable prototype. Full build log lives in [`PROJECT_STATUS.md`](./PROJECT_STATUS.md); summary here:

**Shipped:**
- Full authentication and workspace shell (landing, signup, login, onboarding, dashboard)
- Data layer (Data Sources Library, Employee Library, CSV upload/preview)
- The complete 8-step compliance workflow (Section 6), upload through human review and report generation
- Audit Trail, AI Copilot, and Executive Dashboard, all full builds rather than placeholders
- Compliance Library covering all 5 target countries

**Known gaps (operational maturity, not core product features):**
- RBAC / permissions
- Notifications
- Guided onboarding / product tour
- Real backend persistence and authentication (currently frontend-complete)
- Payroll/HRIS integrations (currently mocked, per the Section 4 scope cut)
- A known bug where the demo identity ("Anna") leaks into real onboarding, fix in progress
- Settings and Profile currently overlap and need separating

This is the honest state of the build: the core product vision from Sections 5–8 and the workspace model in Section 13 are real and working. What's left is what makes it feel like software an HR team could adopt on a Monday morning and keep running for the next twelve months.
