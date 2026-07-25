import type { Metadata } from "next";
import Link from "next/link";
import CaseProgress from "../../components/CaseProgress";

export const metadata: Metadata = {
  title: "Hearth | Zero-to-One Product Operations Case Study",
  description: "Hearth is an independently owned personal finance product shaped through strategy, architecture, release operations, user feedback, responsive delivery, and continuous simplification.",
};

const progressSections = [
  { id: "overview", label: "Overview", icon: "⌂" },
  { id: "opportunity", label: "Opportunity", icon: "◌" },
  { id: "principles", label: "Product principles", icon: "◆" },
  { id: "evolution", label: "Evolution", icon: "↗" },
  { id: "feedback", label: "Feedback", icon: "↔" },
  { id: "prioritization", label: "Prioritization", icon: "◎" },
  { id: "stakeholders", label: "Stakeholders", icon: "◉" },
  { id: "tradeoffs", label: "Tradeoffs", icon: "⇄" },
  { id: "architecture", label: "Architecture", icon: "⌘" },
  { id: "launch", label: "Launch", icon: "✓" },
  { id: "measurement", label: "Measurement", icon: "▦" },
  { id: "backlog", label: "Backlog", icon: "☷" },
  { id: "learning", label: "Learning", icon: "✦" },
];

const principles = [
  ["Privacy", "No advertising or sale of user data."],
  ["Clarity", "Financial workflows should be easy to understand."],
  ["User ownership", "Export, backup, and restore keep users in control."],
  ["No subscription", "A one-time purchase avoids recurring-cost fatigue."],
  ["Sustainable scope", "Trustworthy core workflows come before novelty."],
  ["Optional cloud", "Local access remains useful while cloud adds convenience."],
  ["Household planning", "Monthly decisions are visible across shared goals."],
  ["Continuous simplification", "Feedback can justify removing or reversing work."],
];

const evolution = [
  ["01", "Financial foundation", "A monthly dashboard established the core planning concept."],
  ["02", "Household planning", "Accounts, budgets, goals, and monthly snapshots expanded the workflow."],
  ["03", "Experience system", "Shared patterns, onboarding, setup, and responsive behavior improved consistency."],
  ["04", "Data foundation", "Imports, backup planning, and a structured data model prepared the product to scale."],
  ["05", "Cloud architecture", "Supabase authentication, PostgreSQL, Row Level Security, and environment separation moved Hearth beyond a prototype."],
  ["06", "Strategic simplification", "User feedback led to fewer competing choices and a clearer navigation hierarchy."],
  ["07", "Product expression", "Hearth World explored personality while remaining subordinate to financial tasks."],
  ["08", "Release operations", "Main and staging branches now support production, preview testing, and safer iteration."],
];

const tradeoffs = [
  ["One-time purchase", "Reduce subscription resistance", "Revenue must support ongoing costs", "Recurring plans"],
  ["Local-first with optional cloud", "Balance ownership and access", "Sync adds complexity", "Cloud-only dependency"],
  ["Privacy over aggregation", "Limit sensitive integrations", "More manual entry", "Automated bank connections"],
  ["Simplicity over feature count", "Protect confidence and focus", "Some power features wait", "Advanced analytics"],
  ["Desktop-first, responsive", "Optimize detailed planning", "Mobile needs deliberate adaptation", "Mobile-first parity"],
  ["Familiar patterns with personality", "Keep finance understandable", "Differentiation stays restrained", "Novel navigation everywhere"],
  ["Hearth World as optional exploration", "Add warmth without blocking tasks", "Visual complexity can distract", "Game mechanics"],
  ["Supabase foundation", "Use mature auth and data controls", "Platform dependency", "Custom backend"],
  ["Incremental releases", "Create faster learning cycles", "Requires careful sequencing", "Waiting for feature completeness"],
];

const stakeholders = [
  ["Individual users", "Confidence and simple monthly decisions", "Drive clarity and onboarding choices"],
  ["Household users", "Shared visibility without confusion", "Shape collaboration and permissions"],
  ["Prospective customers", "Trust, privacy, and clear value", "Shape business model and positioning"],
  ["Product owner", "Balance value, risk, scope, and learning", "Owns roadmap and release decisions"],
  ["Supabase", "Reliable authentication and data controls", "Defines auth, database, and RLS constraints"],
  ["Stripe", "Safe one-time payment completion", "Shapes purchase and access flow"],
  ["Vercel", "Stable preview and production delivery", "Enables environment-based releases"],
  ["Future support and compliance", "Clear recovery, privacy, and issue handling", "Influence readiness requirements"],
];

const launchStages = [
  ["01", "Requirements", "Define user value, acceptance criteria, and data risk."],
  ["02", "Implementation", "Build the smallest coherent product increment."],
  ["03", "Migration", "Sequence schema changes before dependent features."],
  ["04", "Security", "Test authentication, RLS, and household isolation."],
  ["05", "Staging", "Deploy environment-specific configuration for review."],
  ["06", "Functional QA", "Validate financial flows, exports, and recovery."],
  ["07", "Responsive QA", "Check desktop, tablet, and mobile behavior."],
  ["08", "Production", "Promote the verified release with rollback awareness."],
  ["09", "Learn", "Monitor issues, collect feedback, and reprioritize."],
];

const backlog = [
  ["High", "Validate core financial workflows", "Financial trust must be proven before expanding scope."],
  ["High", "Complete security and data-safety testing", "Authentication, isolation, backup, and recovery are release gates."],
  ["High", "Improve onboarding and analytics", "The next learning cycle needs observable activation and abandonment signals."],
  ["High", "Validate the one-time purchase flow", "Commercial access should be tested end to end before launch claims."],
  ["Medium", "Strengthen reports and imports", "Useful depth follows a dependable daily workflow."],
  ["Medium", "Refine collaboration and responsive behavior", "Shared and cross-device use should improve from evidence."],
  ["Future", "Advanced integrations and insights", "Defer until core trust, demand, and maintenance cost are understood."],
  ["Future", "Further Hearth World exploration", "Product personality should never outrank financial clarity."],
];

export default function HearthCaseStudy() {
  return <main id="top" className="hearth-case-study">
    <CaseProgress sections={progressSections} />
    <a className="skip-link" href="#overview">Skip to case study</a>
    <header className="site-header case-header">
      <Link className="brand" href="/"><span className="brand-mark">A</span><span>Andrew</span></Link>
      <div className="case-header-context" aria-label="Current page"><span>Independent product</span><b><i aria-hidden="true">⌂</i> 03 / Hearth</b></div>
      <nav aria-label="Case study navigation"><Link href="/">All projects</Link><a href="#measurement">Evidence</a><a href="#backlog">Backlog</a></nav>
    </header>
    <div className="project-context-bar"><div className="shell"><div className="case-breadcrumb"><Link href="/">Projects</Link><span>/</span><strong>Hearth Personal Finance Platform</strong></div><span className="case-page-label">Zero-to-one product operations</span></div></div>

    <section className="case-hero shell hearth-hero" id="overview">
      <Link className="back-link" href="/"><span>←</span> Back to all projects</Link>
      <p className="kicker">Independent product · Privacy-first personal finance</p>
      <h1>Hearth: Building a Privacy-First Personal Finance Platform</h1>
      <p className="case-summary">I am taking Hearth from product concept toward an operating cloud-backed platform, owning the strategy, roadmap, requirements, architecture decisions, releases, quality assurance, feedback response, and business-model tradeoffs.</p>
      <div className="case-meta hearth-meta">
        <div><span>Role</span><strong>Product Owner / Product Operations</strong></div>
        <div><span>Stage</span><strong>Active development and validation</strong></div>
        <div><span>Model</span><strong>One-time purchase · No ads</strong></div>
        <div><span>Environment</span><strong>Production + staging</strong></div>
      </div>
      <div className="executive-summary" aria-label="Case study executive summary">
        <article><span>Business problem</span><p>Personal finance tools can feel complex, impersonal, and difficult to justify as another subscription.</p></article>
        <article><span>What I own</span><p>Strategy, roadmap, requirements, UX direction, architecture decisions, QA, releases, and feedback response.</p></article>
        <article><span>Key decision</span><p>Prioritize privacy, financial clarity, and a dependable core before expanding novelty.</p></article>
        <article><span>Verified result</span><p>A working cloud-backed foundation with authentication, RLS, responsive workflows, and separate release environments.</p></article>
        <article><span>Business significance</span><p>Zero-to-one ownership across customer, operational, commercial, and technical decisions.</p></article>
      </div>
      <div className="hearth-hero-panel" aria-label="Hearth product summary">
        <div><span>Your monthly financial home</span><strong>Clarity before complexity.</strong><p>Core financial workflows, data ownership, and household planning in one understandable product.</p></div>
        <ul><li>React + TypeScript</li><li>Supabase + PostgreSQL</li><li>Row Level Security</li><li>Stripe Checkout</li><li>Vercel</li><li>GitHub environments</li></ul>
      </div>
    </section>

    <section className="project-framework shell" id="opportunity">
      <div className="section-intro split-heading"><div><p className="kicker">Product opportunity</p><h2>Make monthly finances feel clearer, more private, and more personal.</h2></div><p>Many financial tools can feel complicated, impersonal, or difficult to justify as another subscription. Hearth explores a simpler alternative built around household understanding and user control.</p></div>
      <div className="hearth-opportunity-grid"><article><b>Customer problem</b><p>Competing features and unfamiliar financial language can make monthly planning intimidating.</p></article><article><b>Product opportunity</b><p>Bring transactions, budgets, goals, reports, and household planning into a coherent monthly workflow.</p></article><article><b>What this demonstrates</b><p>Zero-to-one ownership across customer, business, operational, and technical decisions.</p></article></div>
    </section>

    <section className="project-framework hearth-ownership"><div className="shell"><div className="section-intro"><p className="kicker">Product Operations ownership</p><h2>Clear ownership across strategy, delivery, and continuous improvement.</h2><p>I own or coordinate the product concept, strategy, roadmap, requirements, UX direction, architecture choices, database planning, environments, QA, security testing, feedback integration, simplification, and business model.</p></div><div className="hearth-ownership-list"><span>Strategy</span><span>Feature definition</span><span>Prioritization</span><span>Requirements</span><span>Architecture decisions</span><span>Release management</span><span>Security testing</span><span>Feedback response</span></div></div></section>

    <section className="project-framework shell" id="principles"><div className="section-intro"><p className="kicker">Product principles</p><h2>Rules that protect trust when priorities compete.</h2></div><div className="hearth-principle-grid">{principles.map(([title,copy],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="project-framework hearth-evolution" id="evolution"><div className="shell"><div className="section-intro"><p className="kicker">Product evolution</p><h2>From dashboard concept to an operating product system.</h2></div><ol>{evolution.map(([number,title,copy])=><li key={number}><b>{number}</b><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div></section>

    <section className="project-framework shell" id="feedback"><div className="section-intro"><p className="kicker">User feedback and product response</p><h2>Simplification was a strategic product decision.</h2><p>Earlier versions accumulated capabilities faster than the navigation and mental model could absorb. Feedback that the product felt overwhelming justified reversing and removing work.</p></div><div className="hearth-feedback-grid"><article><span>Before</span><ul><li>Too many competing features</li><li>Setup mixed into primary workflows</li><li>Dashboard complexity</li><li>Unclear navigation hierarchy</li><li>Templates adding unnecessary choices</li><li>Tablet and mobile layout issues</li></ul></article><article><span>Product response</span><ul><li>Simplified single-page dashboard</li><li>Dedicated Setup section</li><li>Clearer primary navigation</li><li>Transaction templates removed</li><li>Stronger selected states</li><li>Manage Lists elevated</li><li>Responsive navigation improved</li></ul></article></div><div className="product-preview-placeholder" role="img" aria-label="Product images coming soon"><div className="preview-window" aria-hidden="true"><span /><span /><span /><i /><i /><i /></div><div><span>Private product preview</span><strong>Product images coming soon</strong><p>Interface screenshots are intentionally withheld while Hearth remains in private development.</p></div></div></section>

    <section className="project-framework shell" id="prioritization"><div className="section-intro"><p className="kicker">Prioritization framework</p><h2>Financial trust and usability outrank decorative features.</h2></div><div className="hearth-priority-board"><article className="priority-high"><span>High priority</span><h3>Trust the foundation</h3><p>Data integrity · Authentication · Core transactions and planning · Backup and recovery · Product simplicity</p></article><article className="priority-medium"><span>Medium priority</span><h3>Deepen useful workflows</h3><p>Reporting depth · Household customization · Import improvements · Cross-device polish</p></article><article className="priority-future"><span>Future opportunities</span><h3>Expand after validation</h3><p>Advanced analytics · Collaboration · Integrations · Further Hearth World improvements</p></article></div></section>

    <section className="project-framework hearth-stakeholder-section" id="stakeholders"><div className="shell"><div className="section-intro"><p className="kicker">Stakeholder map</p><h2>A realistic map for an independently owned product.</h2></div><div className="hearth-stakeholder-grid">{stakeholders.map(([name,goal,influence])=><article key={name}><h3>{name}</h3><p>{goal}</p><span>{influence}</span></article>)}</div></div></section>

    <section className="project-framework shell" id="tradeoffs"><div className="section-intro"><p className="kicker">Decisions and tradeoffs</p><h2>Each decision names the benefit and the cost.</h2></div><div className="hearth-tradeoff-table" role="table" aria-label="Hearth product tradeoffs"><div className="tradeoff-row tradeoff-header" role="row"><span>Decision</span><span>Reason</span><span>Risk</span><span>Postponed or excluded</span></div>{tradeoffs.map(([decision,reason,risk,deferred])=><div className="tradeoff-row" role="row" key={decision}><strong>{decision}</strong><span>{reason}</span><span>{risk}</span><span>{deferred}</span></div>)}</div></section>

    <section className="project-framework hearth-architecture" id="architecture"><div className="shell"><div className="section-intro"><p className="kicker">Technical and operational foundation</p><h2>Architecture choices support trust and safer releases.</h2><p>The objective is not engineering complexity. It is reliable identity, household-level data isolation, controlled payments, and a release path that can be tested before production.</p></div><div className="architecture-flow" aria-label="Hearth application architecture"><span>User</span><b>→</b><span>React + TypeScript</span><b>→</b><span>Supabase Auth</span><b>→</b><span>PostgreSQL + RLS</span><b>→</b><span>Stripe purchase</span><b>→</b><span>Vercel</span></div><div className="release-branches"><article><span>GitHub main</span><b>Production</b><p>Release-ready code and production configuration.</p></article><article><span>GitHub staging</span><b>Preview and testing</b><p>Functional, responsive, auth, RLS, and migration validation.</p></article></div></div></section>

    <section className="project-framework launch-view" id="launch"><div className="shell"><div className="section-intro"><p className="kicker">Launch and release management</p><h2>Move changes toward production through controlled gates.</h2></div><ol className="hearth-launch-flow">{launchStages.map(([number,title,copy])=><li key={number}><b>{number}</b><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol><p className="hearth-release-note">Environment variables are separated by deployment. Database migrations are sequenced before dependent application changes, and rollback planning protects data when a release cannot move forward safely.</p></div></section>

    <section className="project-framework shell" id="measurement"><div className="section-intro"><p className="kicker">Success measurement</p><h2>Working functionality is not the same as proven business success.</h2></div><div className="hearth-measurement-grid"><article><span>Verified outputs</span><h3>Operating foundation</h3><p>Application architecture, authentication, PostgreSQL model, RLS, staging and production environments, responsive structure, core workflows, and backup planning.</p></article><article><span>User evidence</span><h3>Complexity feedback</h3><p>Earlier versions felt overwhelming, leading to specific simplification decisions and scope reversal.</p></article><article><span>Directional evidence</span><h3>Product maturity</h3><p>Movement from prototype toward a cloud-backed product, clearer navigation, and a more dependable release workflow.</p></article><article><span>Future KPIs</span><h3>Activation, retention, trust</h3><p>Onboarding, first transaction and budget, active households, return rate, imports, backups, errors, conversion, abandonment, support, and reported confidence.</p></article></div><p className="measurement-caveat">No users, revenue, conversion rate, or customer-count claims are made before reliable product analytics and commercial validation exist.</p></section>

    <section className="project-framework shell" id="backlog"><div className="section-intro"><p className="kicker">Next-iteration backlog</p><h2>The roadmap follows risk and learning value.</h2></div><div className="backlog-table">{backlog.map(([priority,item,why],index)=><article key={item}><b>{String(index+1).padStart(2,"0")}</b><span className={`priority ${priority.toLowerCase()}`}>{priority}</span><h3>{item}</h3><p>{why}</p></article>)}</div></section>

    <section className="feedback-section shell" id="learning"><p className="kicker">Leadership and learning</p><blockquote>Building Hearth means owning the next learning cycle, not just shipping the next feature.</blockquote><p>The work demonstrates that I can turn an idea into an operating product, make customer-business-technical tradeoffs, respond to feedback, simplify earlier decisions, protect data integrity, manage environments, and distinguish delivered functionality from proven outcomes.</p></section>

    <section className="next-project shell"><p className="kicker">Continue exploring</p><h2>How I approach product operations.</h2><span>Discovery · Prioritization · Delivery · Measurement</span><Link href="/how-i-work">View operating model →</Link></section>
    <footer className="site-footer shell"><div><span className="brand-mark">A</span><strong>Andrew</strong></div><p>Independent product · Product operations</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
