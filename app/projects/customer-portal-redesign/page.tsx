import Link from "next/link";
import Image from "../../components/PortfolioImage";
import CaseProgress from "../../components/CaseProgress";
import { assetPath } from "@/lib/asset-path";

const progressSections = [
  { id: "case-content", label: "Overview", icon: "🌐" },
  { id: "ownership", label: "Ownership", icon: "🎯" },
  { id: "assessment", label: "Assessment", icon: "🔍" },
  { id: "strategy", label: "Strategy", icon: "🧭" },
  { id: "baseline", label: "Before", icon: "🕰️" },
  { id: "solution", label: "Solution", icon: "✨" },
  { id: "results", label: "What changed", icon: "↔️" },
  { id: "process", label: "Process", icon: "⚙️" },
  { id: "outcome", label: "Outcome", icon: "✅" },
  { id: "validation", label: "Validation", icon: "💬" },
];

const changes = [
  ["Finding a report", "Manual scanning across a large matrix", "Search by region, filename, version, status, or path"],
  ["Understanding status", "Passive color legend", "Interactive, descriptive status filters"],
  ["Language navigation", "Separate stacked tables", "Clear English and Spanish tabs"],
  ["Portfolio visibility", "No aggregate information", "Live totals for waiting, ready, and approved reports"],
  ["Device support", "Desktop-era fixed presentation", "Responsive interface across screen sizes"],
];

const process = [
  ["01", "Reviewed the existing customer portal", "Established a clear baseline for the customer experience and the operational workflow supporting it."],
  ["02", "Identified customer pain points", "Focused the initiative on the points that created the most effort when customers located and reviewed reports in batches."],
  ["03", "Evaluated operational workflows", "Mapped what had to remain stable across report preparation, status updates, file organization, and delivery."],
  ["04", "Defined product requirements", "Translated customer needs and operational dependencies into a shared, testable scope."],
  ["05", "Prioritized improvements", "Sequenced work by customer impact while minimizing disruption to active operations."],
  ["06", "Preserved production compatibility", "Kept the report structure, terminology, links, and platform behavior familiar to internal teams."],
  ["07", "Improved the customer experience", "Implemented search, filtering, language navigation, summaries, and responsive behavior around the existing workflow."],
  ["08", "Validated usability and responsiveness", "Tested the experience across screen sizes and confirmed that core report and status workflows remained intact."],
  ["09", "Delivered the updated solution", "Released a stronger customer capability without requiring the production process to be rebuilt."],
];

export default function CustomerPortalRedesign() {
  return <main id="top">
    <CaseProgress sections={progressSections} />
    <a className="skip-link" href="#case-content">Skip to case study</a>
    <header className="site-header case-header">
      <Link className="brand" href="/"><span className="brand-mark">A</span><span>Andrew</span></Link>
      <div className="case-header-context" aria-label="Current page"><span>Case study</span><b><i aria-hidden="true">🌐</i> 01 / Customer Portal Redesign</b></div>
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
      <p className="kicker">Product operations · Customer portal improvement</p>
      <h1>Leading a regional utility portal from operational assessment through delivery.</h1>
      <p className="case-lead">I led the evaluation and improvement of an existing customer portal used to locate region-specific production reports, balancing customer usability with the operational workflows that supported delivery.</p>
      <aside className="case-noticed"><b>BUSINESS PROBLEM</b><p>A valuable reporting capability required too much manual navigation, making it harder for customers to locate reports and understand production status across regions.</p></aside>
      <div className="case-meta">
        <div><span>Role</span><strong>Product Operations Lead</strong></div>
        <div><span>Scope</span><strong>Discovery, requirements, delivery, validation</strong></div>
        <div><span>Platform</span><strong>HTML, CSS, JavaScript</strong></div>
        <div><span>Initiative</span><strong>Self-directed opportunity</strong></div>
      </div>
    </section>

    <section className="case-cover shell real-case-cover"><span className="evidence-label">Delivered customer capability</span><Image src="/images/utility-portal/portal-after.png" width={1216} height={895} priority alt="Final regional utility report portal showing search, report totals, interactive status key, language tabs, and regional report table" /></section>

    <section className="ownership-section shell" id="ownership">
      <div className="ownership-column"><p className="kicker">Product Operations Ownership</p><p>I led the evaluation and improvement of an existing customer portal used to locate region-specific production reports.</p><ul><li>Identified customer pain points</li><li>Defined and prioritized product requirements</li><li>Preserved operational workflows</li><li>Coordinated implementation needs</li><li>Validated the final customer experience</li></ul></div>
      <div className="ownership-column"><p className="kicker">Business objective</p><p>Reduce customer effort and improve report discoverability without disrupting the systems, terminology, and production practices internal teams relied on.</p><ul><li>Clearer regional reporting</li><li>Consistent bilingual access</li><li>Scalable information architecture</li><li>Compatibility with existing ordering systems</li></ul></div>
    </section>

    <section className="review-section shell" id="assessment"><div><p className="kicker">Operational Assessment</p><h2>The assessment became the roadmap for the product improvement.</h2><p>I evaluated the portal through both the customer&apos;s report-review journey and the internal process that prepared, organized, and delivered those reports.</p></div><div className="review-grid"><span>Navigation clarity</span><span>Product organization</span><span>Searchability</span><span>Workflow efficiency</span><span>Mobile responsiveness</span><span>Bilingual accessibility</span><span>Existing production workflow</span><span>Information architecture</span><span>Castle Press platform compatibility</span></div></section>

    <section className="constraints-section shell"><div><p className="kicker">Constraints</p><h2>Improve the customer capability without disrupting active operations.</h2></div><div className="constraint-list"><span>Production workflow had to remain unchanged</span><span>Existing report organization had to be preserved</span><span>Ordering systems could not be disrupted</span><span>Status terminology needed to remain familiar</span><span>English and Spanish support was required</span><span>Castle Press platform compatibility had to remain intact</span></div></section>

    <section className="story-section shell two-col" id="strategy">
      <div><p className="kicker">Stakeholder Alignment</p><h2>Customer usability and operational continuity had to move together.</h2></div>
      <div className="story-copy"><p>The solution required alignment between customer expectations, internal production teams, regional reporting needs, and the existing Castle Press ordering environment.</p><p>I translated customer friction into requirements while protecting the workflow consistency internal teams needed to prepare reports, update statuses, and maintain familiar file structures.</p><aside>Cross-functional objective: improve the customer experience while keeping the operational system dependable and recognizable.</aside></div>
    </section>

    <section className="before-section shell" id="baseline">
      <div className="section-intro"><p className="kicker">Product Requirements</p><h2>Turn operational needs into a clear, testable scope.</h2><p>The requirements preserved what worked while targeting the highest-friction parts of the customer journey.</p></div>
      <figure className="evidence-frame before-evidence"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Original regional report portal</span></div><Image src="/images/utility-portal/portal-before.png" width={1513} height={667} alt="Original regional utility report portal with a basic table, color-coded cells, and separate Spanish table" /><figcaption><b>Baseline:</b> The information was available, but users had to manually scan a dense matrix, interpret the status legend, and move between English and Spanish tables.</figcaption></figure>
      <div className="pain-grid"><div><strong>01</strong><span>Workflow requirements</span><p>Preserve report structure, status terminology, and compatibility with existing production and ordering systems.</p></div><div><strong>02</strong><span>Customer requirements</span><p>Support seven regions, bilingual navigation, report search, and reduced navigation effort.</p></div><div><strong>03</strong><span>Experience requirements</span><p>Improve discoverability, status visibility, information architecture, and mobile usability.</p></div></div>
    </section>

    <section className="solution-section shell" id="solution">
      <div className="section-intro light"><p className="kicker">Execution</p><h2>Preserve the workflow. Remove the friction.</h2><p>I coordinated and implemented the prioritized requirements around the existing regional matrix, file structure, and six established production statuses.</p></div>
      <figure className="evidence-frame after-evidence"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Delivered regional report portal</span></div><Image src="/images/utility-portal/portal-after.png" width={1216} height={895} alt="Updated regional utility report portal with search, summary counts, status filters, language tabs, and improved regional organization" /><figcaption><b>Delivered:</b> Search, status filtering, report summaries, language tabs, and clearer regional organization reduce customer effort while preserving the established workflow.</figcaption></figure>
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

    <section className="constraints-section shell"><div><p className="kicker">Prioritization</p><h2>Sequence improvements by customer impact and operational risk.</h2><p>I prioritized the capabilities that would reduce the most customer effort first, then addressed supporting experience improvements without changing the underlying production process.</p></div><div className="constraint-list"><span>01 · Report search</span><span>02 · Status filtering</span><span>03 · Navigation and information architecture</span><span>04 · Mobile experience</span><span>05 · Visual modernization</span><span>Guiding principle · Maximum customer impact with minimum workflow disruption</span></div></section>

    <section className="comparison-section shell" id="results">
      <div className="section-intro"><p className="kicker">04 · What changed</p><h2>From static file matrix to usable workflow experience.</h2></div>
      <div className="comparison-table" role="table" aria-label="Before and after comparison">
        <div className="comparison-row header-row" role="row"><span role="columnheader">Experience</span><span role="columnheader">Before</span><span role="columnheader">After</span></div>
        {changes.map(([area,before,after]) => <div className="comparison-row" role="row" key={area}><strong role="rowheader">{area}</strong><span role="cell">{before}</span><span role="cell">{after}</span></div>)}
      </div>
    </section>

    <section className="timeline-section product-process shell" id="process"><div className="section-intro"><p className="kicker">Product Operations Process</p><h2>From business problem to validated customer capability.</h2></div><ol>{process.map(([number,title,why]) => <li key={number}><b>{number}</b><span>{title}</span><p>{why}</p></li>)}</ol></section>

    <section className="impact-section shell" id="outcome">
      <p className="kicker">06 · Outcome</p>
      <h2>A stronger customer capability with the operational foundation preserved.</h2>
      <div className="impact-grid"><div><strong>7</strong><span>Geographic service regions</span></div><div><strong>2</strong><span>Report languages</span></div><div><strong>6</strong><span>Production statuses preserved</span></div></div>
      <div className="outcome-columns"><article><h3>Operational outcomes</h3><ul><li>Improved report discoverability</li><li>Reduced customer navigation effort</li><li>Preserved the production workflow</li><li>Increased consistency across regions</li></ul></article><article><h3>Customer capability</h3><ul><li>Simplified navigation</li><li>Improved bilingual accessibility</li><li>Clearer production status visibility</li><li>Better mobile usability</li></ul></article><article><h3>Scalable foundation</h3><ul><li>Seven geographic regions supported</li><li>Two report languages supported</li><li>Six workflow statuses preserved</li><li>Reusable information architecture</li></ul></article></div>
      <p className="impact-note">Formal before-and-after usage analytics were not available. This case study reports verified scope and delivered capabilities rather than estimated performance claims.</p>
    </section>

    <section className="feedback-section shell" id="validation"><p className="kicker">Validation</p><blockquote>The customer appreciated how easy it was to locate projects as they moved through production in batches. The updated portal helped them navigate the overall process and quickly understand where each project stood.</blockquote><p>Paraphrased from customer feedback after delivery. Functional validation also confirmed responsive behavior and compatibility with the established report workflow.</p></section>

    <section className="next-project shell"><p className="kicker">Next transformation</p><h2>Prescription Pad Ordering Experience</h2><span>Product operations · Regulated ordering</span><Link href="/projects/prescription-pad-ordering-portal">View case study →</Link></section>
    <footer className="site-footer shell"><div><span className="brand-mark">A</span><strong>Andrew</strong></div><p>Work completed as part of my role at Castle Press.</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
