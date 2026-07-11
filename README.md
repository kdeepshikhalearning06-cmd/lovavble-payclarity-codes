# PayClarity

**An AI Compliance Copilot for the EU Pay Transparency Directive: not a dashboard, not a calculator, a guided workflow.**

> **Status: In active build.** Core screens (landing through Country Setup) are shipped; the data workflow (upload through report generation) is next. See [Build Status](#build-status) below, or [PROJECT_STATUS.md](https://github.com/kdeepshikhalearning06-cmd/PayClarity/blob/main/Project_Status.md) for the detailed build log.

---

## The problem

The EU Pay Transparency Directive (2023/970) requires companies to report gender pay gaps, and where a gap of 5%+ in a job category can't be objectively justified, run a joint pay assessment with employee representatives. The transposition deadline (7 June 2026) has already passed in most member states, and the European Commission has refused to extend it, so mid-market HR teams can't just wait for local law to catch up.

Most 100 to 1,000 employee HR teams have the compensation *data* to comply, but not the tooling:

- No fast way to tell which pay gaps are statistically meaningful vs. noise
- No way to generate a plain-language, defensible explanation for a gap that would hold up to an employee, works council, or regulator
- Existing tools (Syndio, Trusaic, Payscale) are enterprise audit platforms, built for teams with a dedicated comp analyst, not the HR generalist juggling five other things

**PayClarity is the wedge between "we have the spreadsheet" and "we have a documented, defensible process."**

## Who it's for

**"Anna"**: HR Manager at a 200 to 1,000 person B2B SaaS company in Germany or the Netherlands. She owns comp & benefits alongside everything else, runs on Personio/HiBob + spreadsheets, and has never had to *prove* pay is fair before. The burden of proof just shifted onto her.

One persona, deliberately. Designing for a second (enterprise People Ops) segment at MVP stage would signal an undecided ICP; that's a Phase 2 problem.

## How it works

Seven core steps, one guided copilot experience, not seven disconnected forms:

```
Country & Currency Setup
        ↓
Upload Salary Data (own CSV, or one-click demo data)
        ↓
Review & Edit  ← nothing moves forward until Anna confirms
        ↓
AI Job Grouping  ← blind to gender & salary by design
        ↓
Pay Gap Calculation (mean, median, quartiles)
        ↓
AI-Drafted Explanations  ← tagged by confidence, never a legal conclusion
        ↓
Compiled Report + Compliance Readiness Score
```

A few decisions worth calling out:

- **The AI grouping step never sees gender or salary.** It groups on the EU's own four job-evaluation factors (skills, responsibility, effort, working conditions) so the categorization can't unconsciously bend toward a convenient answer.
- **Every AI explanation carries a confidence tag**: *Strong / Partial, recommend human review / No objective explanation found.* The AI is designed to admit when it can't justify a gap, rather than manufacture false reassurance.
- **The Compliance Readiness Score is a transparent formula, not a black box**: data completeness, categorization completeness, explanation coverage, documentation completeness, and every weak component links to the exact fix.
- **Full audit trail.** Every override, edit, and regeneration is logged, so the output is "we have a documented process," not "we ran a tool once."

## What's deliberately *not* in scope

The scope cuts are the actual product decision here, so they're documented, not hidden:

| Excluded | Why |
|---|---|
| Payroll/HRIS integrations | Adds scope with no MVP-narrative value |
| Country-by-country legal compliance calculation | Implementation is fragmented and shifting across all 27 states; claiming precision here would be dishonest |
| Legal determination of whether a gap is lawful | Always a human/legal-counsel decision |
| Automatic salary adjustment recommendations | Too much liability, too little trust-earning value at this stage |
| Multi-country reporting in a single run | One country per report for the MVP |

A scoped, non-calculation version of the country-compliance idea is documented as a future V1.5/V2 roadmap item in the [PRD](./docs/PayClarity_PRD_Updated.md#12-future-roadmap-country-compliance-intelligence-v15--v2), not built into the current product.

## Build status

- ✅ Landing Page
- ✅ Sign Up
- ✅ Login
- ✅ Onboarding
- ✅ Dashboard
- ✅ Reports List
- ✅ Create Report
- ✅ Country Setup
- ⚠️ Upload Data: in progress, CSV flow not yet functional
- ⬜ Data Validation
- ⬜ Data Review
- ⬜ AI Job Grouping *(the signature screen)*
- ⬜ Gap Analysis
- ⬜ AI Explanations
- ⬜ Human Review
- ⬜ Report Preview / Report Details
- ⬜ Employee Library
- ⬜ Data Sources Library
- ⚠️ Audit Trail: placeholder screen live
- ⚠️ AI Copilot: placeholder screen live
- ⚠️ Settings: placeholder screen live

*(Last updated: 08 July 2026. Full build log and prioritization notes in [docs/PROJECT_STATUS.md](https://github.com/kdeepshikhalearning06-cmd/PayClarity/blob/main/Project_Status.md).*

## Design direction

Enterprise-grade, not "compliance-tool beige," closer to Linear, Stripe, Vercel, or Ramp than to legacy HR software. Deep navy/indigo for trust, teal for AI-driven actions, a consistent status system (green = ready, amber = needs review, red = action required, blue = AI suggestion), and progressive disclosure over dense forms.

## Pricing model (for portfolio realism)

No permanent free tier; positioned as a premium B2B compliance copilot, not a free utility:

- **14-day free trial**: full workflow, unlimited demo-data reports, one real-data report
- **Starter / Growth / Enterprise** tiers scaling through collaboration, integrations, and admin controls, not by gating core AI functionality

Two landing-page CTAs: **Start Free Trial** and **Explore with Demo Data**. The latter lets anyone (recruiters included) run the full workflow with a synthetic company dataset, zero signup, zero real data.

## Why this exists

This is a portfolio project built to demonstrate end-to-end product thinking: problem framing grounded in real regulation and market research, a single well-reasoned ICP, explicit and defensible scope cuts, a user-story-backed spec, and success metrics for both the product *and* the demo itself. Full PRD and information architecture docs are in [`/docs`](./docs).

## Roadmap

- [x] Problem statement, market research, user stories, success metrics
- [x] Information architecture (20-screen live product structure)
- [x] Future roadmap documented (Country Compliance Intelligence, V1.5/V2)
- [ ] Frontend build-out (in progress; see Build Status above)
- [ ] Working prototype with real AI calls
- [ ] Portfolio case study write-up

## Connect

Built by Deepshikha, final-year Economics undergrad, Product Management. Feel free to open an issue or reach out if you want to talk through any of the product decisions above.
