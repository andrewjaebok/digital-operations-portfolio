import type { Metadata } from "next";
import Link from "next/link";
import Image from "../../components/PortfolioImage";
import CaseProgress from "../../components/CaseProgress";
import ProjectOperatingViews from "../../components/ProjectOperatingViews";
import UtilityUsabilityResults from "../../components/UtilityUsabilityResults";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Regional Utility CCR Portal | Product Operations Case Study",
  description: "A Product Operations case study on improving CCR report discovery, proof-status clarity, bilingual access, and responsive usability while preserving production workflows.",
};

const progressSections = [
  { id: "case-content", label: "Overview", icon: "◫" },
  { id: "measured-impact", label: "Impact", icon: "↗" },
  { id: "ownership", label: "Ownership", icon: "◎" },
  { id: "assessment", label: "Assessment", icon: "⌕" },
  { id: "strategy", label: "Strategy", icon: "◇" },
  { id: "baseline", label: "Before", icon: "◷" },
  { id: "solution", label: "Solution", icon: "✦" },
  { id: "results", label: "What changed", icon: "↔" },
  { id: "usability-results", label: "Measured results", icon: "▦" },
  { id: "decisions", label: "Operating decisions", icon: "◆" },
  { id: "process", label: "Process", icon: "⚙" },
  { id: "outcome", label: "Outcome", icon: "✓" },
  { id: "validation", label: "Validation", icon: "◌" },
];

const changes = [
  ["Finding a report", "Manual scanning across a large matrix", "Search by region, filename, version, status, or path"],
  ["Understanding status", "Passive color legend", "Interactive, descriptive status filters"],
  ["Language navigation", "Separate stacked tables", "Clear English and Spanish tabs"],
  ["Portfolio visibility", "No aggregate information", "Live totals for waiting, ready, and approved reports"],
  ["Device support", "Desktop-era fixed presentation", "Responsive interface across screen sizes"],
];

const process = [
  ["01", "Discovery", "Customer feedback, the original portal audit, workflow evaluation, and operational and technical constraints."],
  ["02", "Prioritization", "Evidence was translated into requirements for report discovery, batch navigation, status clarity, bilingual access, and responsive use."],
  ["03", "Execution", "Delivered search, region and batch organization, status controls, bilingual navigation, summaries, and responsive improvements."],
  ["04", "Validation", "After development, 20 participants compared the original and redesigned portals across four core tasks."],
  ["05", "Iteration", "The next cycle adds live search behavior, empty searches, filters, report clicks, device patterns, and repeat visits."],
];

const priorities = [
  ["P0", "Report discovery", "Manual scanning created friction when locating a specific report.", "Workflow assessment"],
  ["P0", "Region and batch navigation", "The customer workflow centered on reports being completed and reviewed in batches.", "Customer feedback · Workflow assessment"],
  ["P0", "Status understanding", "Status determined where a report was in the proofing and approval workflow.", "Operational requirement · Workflow assessment"],
  ["P1", "English and Spanish access", "Bilingual access was required, while later testing showed perceived ease was already comparatively strong.", "Operational requirement"],
  ["P1", "Responsive usability", "Access needed to improve across devices without changing the established workflow.", "Workflow assessment · Technical constraint"],
  ["P2", "Visual modernization", "Hierarchy and clarity supported the workflow but were secondary to discovery and status problems.", "Portal audit"],
];

export default function CustomerPortalRedesign() {
  return <main id="top">
    <CaseProgress sections={progressSections} />
    <a className="skip-link" href="#case-content">Skip to case study</a>
    <header className="site-header case-header">
      <Link className="brand" href="/"><span className="brand-mark">A</span><span>Andrew</span></Link>
      <div className="case-header-context" aria-label="Current page"><span>Case study</span><b><i aria-hidden="true">◫</i> 01 / Customer Portal Redesign</b></div>
      <nav aria-label="Case study navigation"><Link href="/">All projects</Link><a href="#results">Jump to results</a></nav>
    </header>

    <div className="project-context-bar">
      <div className="shell">
        <nav className="case-breadcrumb" aria-label="Breadcrumb"><Link href="/">Portfolio</Link><span aria-hidden="true">/</span><strong>Regional Utility Portal</strong></nav>
        <span className="case-page-label">Project case study · 01</span>
      </div>
    </div>

    <section className="case-hero shell" id="case-content">
      <Link className="back-link" href="/"><span aria-hidden="true">←</span> Back to all projects</Link>
      <p className="kicker">Product operations · CCR report and proof tracking</p>
      <h1>Improving a recurring proof-review workflow, not just its interface.</h1>
      <p className="case-lead">I evaluated and improved a regional utility portal used to find the correct CCR report, understand its production status, select the English or Spanish version, and open it for review or proofing.</p>
      <aside className="case-noticed"><b>BUSINESS PROBLEM</b><p>Customers had to manually scan a dense regional report matrix, interpret status colors, and locate the correct language file during recurring proofing and approval work.</p></aside>
      <div className="case-meta">
        <div><span>Role</span><strong>Product Operations / Digital Services Lead</strong></div>
        <div><span>Scope</span><strong>Discovery, requirements, delivery, validation</strong></div>
        <div><span>Platform</span><strong>HTML, CSS, JavaScript</strong></div>
        <div><span>Initiative</span><strong>Self-directed opportunity</strong></div>
      </div>
      <div className="executive-summary" aria-label="Case study executive summary">
        <article><span>Business problem</span><p>Customers had to scan a dense report matrix and interpret production status manually.</p></article>
        <article><span>What I owned</span><p>Assessment, requirements, prioritization, implementation, launch coordination, and validation.</p></article>
        <article><span>Key decision</span><p>Add search and status guidance while preserving the production process behind the portal.</p></article>
        <article><span>Measured result</span><p>Core report tasks were completed faster, with fewer incorrect selections and higher ease ratings across three of four evaluated workflows.</p></article>
        <article><span>Business significance</span><p>A repeatable modernization model for other customer-facing portals.</p></article>
      </div>
      <p className="executive-methodology"><strong>20 participants</strong><span aria-hidden="true">·</span><strong>4 core tasks</strong><span aria-hidden="true">·</span><strong>Original vs redesigned portal</strong><span>Retrospective usability evaluation, not live production analytics</span></p>
    </section>

    <section className="utility-impact shell" id="measured-impact" aria-labelledby="measured-impact-title">
      <div className="utility-impact-heading">
        <div><p className="kicker">Measured impact</p><h2 id="measured-impact-title">Three core workflows improved across time, accuracy, and ease.</h2></div>
        <p>Results from a <strong>20-participant retrospective usability evaluation</strong>. Completion time is shown as the observed range, not as a single calculated percentage.</p>
      </div>
      <div className="utility-impact-grid">
        <article><span>Find a location</span><div><p><small>Completion time</small><b>30–60 sec → 10–15 sec</b></p><p><small>Incorrect selections</small><b>1.86 → 0.32</b></p><p><small>Ease</small><b>2.4 → 4.8 / 5</b></p></div></article>
        <article><span>Find a region</span><div><p><small>Completion time</small><b>20–30 sec → 5–10 sec</b></p><p><small>Incorrect selections</small><b>1.86 → 0</b></p><p><small>Ease</small><b>1.9 → 4.6 / 5</b></p></div></article>
        <article><span>Identify status</span><div><p><small>Completion time</small><b>30–60 sec → 10–15 sec</b></p><p><small>Incorrect selections</small><b>1.86 → 0.32</b></p><p><small>Ease</small><b>2.4 → 4.8 / 5</b></p></div></article>
      </div>
      <p className="utility-impact-note">The fourth task, opening the correct English or Spanish file, remains in the detailed results below. Its time range became more consistent while its ease rating remained 4.0/5.</p>
    </section>

    <section className="case-cover shell real-case-cover"><span className="evidence-label">Delivered customer capability</span><Image src="/images/utility-portal/portal-after.png" width={1216} height={895} priority alt="Final regional utility report portal showing search, report totals, interactive status key, language tabs, and regional report table" /></section>

    <section className="ownership-section shell" id="ownership">
      <div className="ownership-column"><p className="kicker">Product Operations Ownership</p><p>I owned the customer-facing improvement from assessment through validation.</p><ul><li>Evaluated the existing portal and workflow</li><li>Identified customer and operational friction</li><li>Defined and prioritized product requirements</li><li>Implemented the customer-experience improvements</li><li>Validated functionality, responsiveness, and usability</li></ul></div>
      <div className="ownership-column"><p className="kicker">Business objective</p><p>Improve access to the existing proof-review workflow without replacing it or retraining users on new production terminology.</p><ul><li>Clearer regional and batch organization</li><li>Consistent bilingual access</li><li>Scalable report structure</li><li>Existing platform and report-link compatibility</li></ul></div>
    </section>

    <section className="review-section utility-evidence-section shell" id="assessment">
      <div><p className="kicker">Discovery evidence</p><h2>The roadmap came from customer and workflow evidence.</h2><p>I combined direct customer feedback with an audit of the original portal, workflow observation, and operational and technical constraints. The usability evaluation came later and validated the delivered solution.</p></div>
      <div>
        <div className="review-grid"><span>Customer feedback</span><span>Original portal audit</span><span>Workflow evaluation</span><span>Operational constraints</span><span>Technical constraints</span><span>Bilingual requirements</span></div>
        <div className="voice-of-customer">
          <p className="kicker">Voice of Customer</p>
          <div className="voice-heading"><span>Customer insight</span><span>Product implication</span></div>
          <div><p>Reports are reviewed in batches</p><p>Make region and batch organization easier to scan.</p></div>
          <div><p>Finding the correct report creates friction</p><p>Prioritize search and discoverability.</p></div>
          <div><p>Users need to understand proofing progress</p><p>Improve status visibility without replacing familiar terminology.</p></div>
          <div><p>Existing workflows are already understood</p><p>Preserve the report structure instead of redesigning the operational process.</p></div>
        </div>
      </div>
    </section>

    <section className="constraints-section shell"><div><p className="kicker">Constraints</p><h2>Improve access without disrupting active operations.</h2></div><div className="constraint-list"><span>Production workflow had to remain unchanged</span><span>Existing report structure had to be preserved</span><span>Report links could not be disrupted</span><span>Status terminology needed to remain familiar</span><span>English and Spanish support was required</span><span>Legacy platform compatibility had to remain intact</span></div></section>

    <section className="story-section shell two-col" id="strategy">
      <div><p className="kicker">Stakeholder Alignment</p><h2>Customer usability and operational continuity had to move together.</h2></div>
      <div className="story-copy"><p>The solution required alignment between customer expectations, internal production practices, regional reporting requirements, and the existing technical environment.</p><p>I translated customer friction into requirements while protecting the consistency teams needed to prepare reports, update statuses, and maintain familiar file structures.</p><aside>Cross-functional objective: improve access to the workflow while keeping the operational system dependable and recognizable.</aside></div>
    </section>

    <section className="utility-priority-section shell">
      <div className="utility-priority-heading"><div><p className="kicker">Evidence-backed prioritization</p><h2>Workflow evidence determined what mattered first.</h2></div><p>A formal scoring workshop did not occur before development. These priorities retrospectively explain the decision logic using the evidence available when each decision was made.</p></div>
      <div className="utility-priority-list" role="table" aria-label="Evidence-backed project priorities">
        <div className="utility-priority-row utility-priority-header" role="row"><span role="columnheader">Priority</span><span role="columnheader">Requirement</span><span role="columnheader">Reason</span><span role="columnheader">Decision evidence</span></div>
        {priorities.map(([priority,requirement,reason,evidence]) => <div className="utility-priority-row" role="row" key={requirement}><b role="cell">{priority}</b><strong role="rowheader">{requirement}</strong><p role="cell">{reason}</p><span role="cell">{evidence}</span></div>)}
      </div>
      <p className="utility-priority-note"><strong>Evidence boundary:</strong> the 20-participant evaluation occurred after implementation. It validated the solution’s task outcomes but did not drive the original product decisions.</p>
    </section>

    <section className="before-section shell" id="baseline">
      <div className="section-intro"><p className="kicker">Product Requirements</p><h2>Turn operational needs into a clear, testable scope.</h2><p>The requirements preserved what worked while targeting the highest-friction parts of the customer journey.</p></div>
      <figure className="evidence-frame before-evidence"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Original regional report portal</span></div><Image src="/images/utility-portal/portal-before.png" width={1513} height={667} alt="Original regional utility report portal with a basic table, color-coded cells, and separate Spanish table" /><figcaption><b>Baseline:</b> The information was available, but users had to manually scan a dense matrix, interpret the status legend, and move between English and Spanish tables.</figcaption></figure>
      <div className="utility-requirements" aria-label="Product requirements"><span>Preserve the existing report structure</span><span>Support seven geographic regions</span><span>Support English and Spanish navigation</span><span>Preserve production-status terminology</span><span>Improve report discoverability</span><span>Reduce manual scanning</span><span>Clarify status meaning</span><span>Improve mobile usability</span><span>Maintain report-link compatibility</span><span>Scale as reports and batches are added</span></div>
    </section>

    <section className="solution-section shell" id="solution">
      <div className="section-intro light"><p className="kicker">Execution</p><h2>Preserve the workflow. Remove the friction.</h2><p>I coordinated and implemented the prioritized requirements around the existing regional matrix, file structure, and six established production statuses.</p></div>
      <figure className="evidence-frame after-evidence"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Delivered regional report portal</span></div><Image src="/images/utility-portal/portal-after.png" width={1216} height={895} alt="Updated regional utility report portal with search, summary counts, status filters, language tabs, and improved regional organization" /><figcaption><b>Delivered:</b> Search, status filtering, report summaries, language tabs, and clearer regional organization improved access while preserving the established workflow.</figcaption></figure>
      <div className="interaction-intro"><div><p className="kicker">Interaction details</p><h3>See how the new workflow behaves.</h3></div><p>Short demonstrations show how users move from a large report matrix to the exact files and statuses they need.</p></div>
      <div className="interaction-demos">
        <figure className="demo-card">
          <div className="demo-number">01</div>
          <video autoPlay muted loop playsInline controls preload="metadata" poster={assetPath("/images/utility-portal/portal-after.png")} aria-label="Demonstration of searching the regional utility report portal">
            <source src={assetPath("/videos/utility-portal/search-demo.mp4")} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
          <figcaption><div><span>Universal search</span><b>Locate a report without scanning the full matrix.</b></div><p>Users can search by filename, region, version, status, language, or file path and see the table update immediately.</p></figcaption>
        </figure>
        <figure className="demo-card">
          <div className="demo-number">02</div>
          <video autoPlay muted loop playsInline controls preload="metadata" poster={assetPath("/images/utility-portal/portal-after.png")} aria-label="Demonstration of filtering regional utility reports by production status">
            <source src={assetPath("/videos/utility-portal/status-filter-demo.mp4")} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
          <figcaption><div><span>Status filtering</span><b>Turn a passive color key into a useful control.</b></div><p>Choosing a production status highlights matching reports so customers can understand each batch at a glance.</p></figcaption>
        </figure>
      </div>
      <div className="feature-grid">
        <article><span>⌕</span><h3>Universal search</h3><p>Find reports by region, filename, version, status, language, or file path.</p></article>
        <article><span>◉</span><h3>Status filtering</h3><p>Turn the existing color language into clear, interactive controls.</p></article>
        <article><span>64</span><h3>Live summaries</h3><p>Surface total, waiting, proof-ready, and approved counts at a glance.</p></article>
        <article><span>EN</span><h3>Language tabs</h3><p>Move between English and Spanish deliverables without losing context.</p></article>
      </div>
    </section>

    <section className="comparison-section shell" id="results">
      <div className="section-intro"><p className="kicker">04 · What changed</p><h2>From static file matrix to usable workflow experience.</h2></div>
      <div className="comparison-table" role="table" aria-label="Before and after comparison">
        <div className="comparison-row header-row" role="row"><span role="columnheader">Experience</span><span role="columnheader">Before</span><span role="columnheader">After</span></div>
        {changes.map(([area,before,after]) => <div className="comparison-row" role="row" key={area}><strong role="rowheader">{area}</strong><span role="cell">{before}</span><span role="cell">{after}</span></div>)}
      </div>
    </section>

    <UtilityUsabilityResults />

    <section className="timeline-section product-process utility-process shell" id="process"><div className="section-intro"><p className="kicker">Product Operations Process</p><h2>Discovery → prioritization → execution → validation → iteration.</h2><p>The retrospective study sits after delivery so discovery evidence and validation evidence cannot be mistaken for each other.</p></div><ol>{process.map(([number,title,why]) => <li key={number}><b>{number}</b><span>{title}</span><p>{why}</p></li>)}</ol></section>

    <ProjectOperatingViews variant="utility" />

    <section className="impact-section shell" id="outcome">
      <p className="kicker">06 · Outcome</p>
      <h2>A stronger customer capability with the operational foundation preserved.</h2>
      <div className="impact-grid"><div><strong>7</strong><span>Geographic service regions</span></div><div><strong>2</strong><span>Report languages</span></div><div><strong>6</strong><span>Production statuses preserved</span></div></div>
      <div className="outcome-columns"><article><h3>Measured usability</h3><ul><li>Completion-time ranges improved across all four tasks</li><li>Incorrect selections decreased in the three measured tasks</li><li>Ease ratings improved in three of four tasks</li><li>Most participants used the new search function</li></ul></article><article><h3>Verified delivery</h3><ul><li>Seven geographic regions supported</li><li>English and Spanish versions supported</li><li>Six production statuses preserved</li><li>Responsive behavior and core interactions tested</li></ul></article><article><h3>Workflow continuity</h3><ul><li>Existing production terminology preserved</li><li>Underlying report workflow unchanged</li><li>Existing report links remained compatible</li><li>Reusable structure supports future batches</li></ul></article></div>
      <p className="impact-note">The 20-participant findings come from a retrospective task-based usability evaluation. Live adoption, search, engagement, support-volume, and repeat-usage analytics were not available.</p>
    </section>

    <section className="feedback-section shell" id="validation"><p className="kicker">Customer feedback</p><blockquote>The customer reported that organizing projects in batches made them easier to find and helped with navigation through the process.</blockquote><p>Paraphrased from direct customer feedback after delivery. The usability evaluation independently added task-time, incorrect-selection, and ease-of-use evidence.</p></section>

    <section className="next-project shell"><p className="kicker">Next transformation</p><h2>Prescription Pad Ordering Experience</h2><span>Product operations · Regulated ordering</span><Link href="/projects/prescription-pad-ordering-portal">View case study →</Link></section>
    <footer className="site-footer shell"><div><span className="brand-mark">A</span><strong>Andrew</strong></div><p>Professional client work · Product operations</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
