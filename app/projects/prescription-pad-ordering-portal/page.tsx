import Link from "next/link";
import Image from "../../components/PortfolioImage";
import CaseProgress from "../../components/CaseProgress";

const progressSections = [
  { id: "case-content", label: "Overview", icon: "🩺" },
  { id: "ownership", label: "Ownership", icon: "🎯" },
  { id: "assessment", label: "Assessment", icon: "🔍" },
  { id: "strategy", label: "Strategy", icon: "🧭" },
  { id: "baseline", label: "Before", icon: "🕰️" },
  { id: "solution", label: "Solution", icon: "✨" },
  { id: "growth", label: "Growth", icon: "📈" },
  { id: "analytics", label: "Evidence", icon: "📊" },
  { id: "results", label: "What changed", icon: "↔️" },
  { id: "process", label: "Process", icon: "⚙️" },
  { id: "outcome", label: "Outcome", icon: "✅" },
  { id: "measurement", label: "Next metrics", icon: "🔭" },
];

const changes = [
  ["Page purpose", "Product education and ordering competed on the same legacy surfaces", "A welcome-focused index and a task-focused ordering experience"],
  ["Product comparison", "Two pad formats presented through dense text and repeated links", "Distinct product cards with images, descriptions, and clear selection paths"],
  ["Prescriber selection", "Long vertical lists labeled by doctor count", "Scannable one-to-ten selection grids designed for faster comparison"],
  ["Customer guidance", "Production, compliance, and customization details were fragmented", "Requirements, security features, timing, resources, and support are surfaced in context"],
  ["Device support", "Desktop-era layouts with limited responsive behavior", "Responsive structure and accessible tap targets across screen sizes"],
  ["Operational continuity", "Business-critical 4D forms, links, and session logic", "The existing backend workflow remained intact beneath the redesigned experience"],
];

const process = [
  ["01", "Audited both customer surfaces", "Reviewed the index and first ordering page as one connected journey rather than isolated screens."],
  ["02", "Mapped customer friction", "Documented where dense content, competing actions, repeated links, and inconsistent page patterns created unnecessary effort."],
  ["03", "Defined operational constraints", "Identified the 4D tags, item URLs, forms, session logic, pricing, and production steps that could not be disrupted."],
  ["04", "Separated page responsibilities", "Positioned the index around education and trust while focusing the retail page on product and prescriber selection."],
  ["05", "Created a shared design system", "Standardized typography, spacing, color, cards, buttons, inputs, responsiveness, and accessibility behavior."],
  ["06", "Reorganized ordering information", "Grouped product formats, security features, customization, timing, resources, and support around customer decisions."],
  ["07", "Iterated through visual QA", "Removed decorative treatments that competed with the hierarchy and refined the experience toward a cleaner operational interface."],
  ["08", "Validated backend preservation", "Confirmed that the original forms, IDs, actions, scripts, 4D tags, and product destinations remained available."],
  ["09", "Extended the acquisition surface", "Added an article and resource library to answer high-intent customer questions and improve organic and AI-search visibility."],
];

export default function PrescriptionPadOrderingPortal() {
  return <main id="top" className="rx-case-study">
    <CaseProgress sections={progressSections} />
    <a className="skip-link" href="#case-content">Skip to case study</a>
    <header className="site-header case-header">
      <Link className="brand" href="/"><span className="brand-mark">A</span><span>Andrew</span></Link>
      <div className="case-header-context" aria-label="Current page"><span>Case study</span><b><i aria-hidden="true">🩺</i> 02 / Prescription Pad Ordering</b></div>
      <nav aria-label="Case study navigation"><Link href="/">All projects</Link><a href="#results">Jump to results</a></nav>
    </header>

    <div className="project-context-bar">
      <div className="shell">
        <nav className="case-breadcrumb" aria-label="Breadcrumb"><Link href="/">Portfolio</Link><span aria-hidden="true">/</span><strong>Prescription Pad Ordering</strong></nav>
        <span className="case-page-label">Project case study · 02</span>
      </div>
    </div>

    <section className="case-hero shell" id="case-content">
      <Link className="back-link" href="/"><span aria-hidden="true">←</span> Back to all projects</Link>
      <p className="kicker">Product operations management · Regulated ordering experience</p>
      <h1>Turning a legacy prescription pad portal into a clearer, more dependable ordering journey.</h1>
      <p className="case-lead">I evaluated and redesigned two connected California security prescription pad experiences, improving customer decision-making while preserving the 4D ordering logic and production processes that supported fulfillment.</p>
      <aside className="case-noticed"><b>BUSINESS PROBLEM</b><p>The portal technically supported ordering, but outdated presentation, inconsistent page structures, dense product options, and fragmented guidance increased customer effort and made the experience harder to maintain.</p></aside>
      <div className="case-meta">
        <div><span>Role</span><strong>Product Operations Manager</strong></div>
        <div><span>Scope</span><strong>Assessment, requirements, design, implementation, QA</strong></div>
        <div><span>Platform</span><strong>4D, HTML, CSS, JavaScript</strong></div>
        <div><span>Environment</span><strong>Regulated print ordering</strong></div>
      </div>
    </section>

    <section className="case-cover shell real-case-cover rx-case-cover"><span className="evidence-label">Delivered landing experience</span><Image src="/images/rx-pad-portal/index-after.png" width={1383} height={855} priority alt="Redesigned Castle Press California security prescription pad landing page with clear navigation, value proposition, order actions, and trust indicators" /></section>

    <section className="ownership-section shell" id="ownership">
      <div className="ownership-column"><p className="kicker">Product Operations Ownership</p><p>I treated the redesign as a customer, acquisition, and operational system improvement, not only a visual refresh.</p><ul><li>Audited the connected customer journey</li><li>Identified usability and content gaps</li><li>Translated customer calls into market insight</li><li>Defined and prioritized requirements</li><li>Protected backend and production dependencies</li><li>Implemented, iterated, and validated the experience</li></ul></div>
      <div className="ownership-column"><p className="kicker">Business objective</p><p>Make it easier for healthcare customers to discover, understand, select, and order the correct prescription pad without rebuilding the operational foundation.</p><ul><li>Reduce decision friction</li><li>Clarify product differences</li><li>Improve trust and guidance</li><li>Increase organic and AI-search visibility</li><li>Standardize the two portal surfaces</li><li>Create a foundation for growth</li></ul></div>
    </section>

    <section className="review-section shell" id="assessment"><div><p className="kicker">Operational Assessment</p><h2>The customer journey and the fulfillment system had to be evaluated together.</h2><p>I reviewed the experience from first arrival through product selection, while documenting the technical and production dependencies behind every ordering path.</p></div><div className="review-grid"><span>Landing-page purpose</span><span>Ordering clarity</span><span>Product comparison</span><span>Prescriber selection</span><span>Compliance guidance</span><span>Production expectations</span><span>Mobile responsiveness</span><span>4D compatibility</span><span>Support and resources</span><span>Visual consistency</span></div></section>

    <section className="constraints-section shell"><div><p className="kicker">Constraints</p><h2>Modernize the product without breaking the system behind it.</h2></div><div className="constraint-list"><span>All 4D server-side tags had to remain intact</span><span>Existing item destinations and session parameters had to be preserved</span><span>Forms, IDs, actions, and JavaScript could not change</span><span>Pricing and product configurations had to remain available</span><span>Security and production information needed to remain accurate</span><span>The experience had to work within the existing Castle Press portal structure</span></div></section>

    <section className="story-section shell two-col" id="strategy">
      <div><p className="kicker">Product Strategy</p><h2>Give each page a clearer job within the customer journey.</h2></div>
      <div className="story-copy"><p>The index was reframed around welcome, trust, product education, resources, and clear next actions. The first ordering page was organized around a focused choice: select a pad format, then select the number of prescribers.</p><p>This separation created a more understandable journey while keeping the existing ordering destinations and fulfillment workflow unchanged.</p><aside>Product principle: simplify the customer&apos;s decision without creating new operational complexity.</aside></div>
    </section>

    <section className="before-section shell rx-before-section" id="baseline">
      <div className="section-intro"><p className="kicker">Baseline</p><h2>A functional ordering system with unnecessary customer effort.</h2><p>The original pages contained the required products and information, but visual hierarchy, page purpose, comparison, and responsiveness were limited.</p></div>
      <div className="evidence-pair">
        <figure className="evidence-frame"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Original index and quick-order page</span></div><Image src="/images/rx-pad-portal/index-before.png" width={1500} height={889} alt="Original Castle Press security prescription pad index with dense columns, small text, and ordering controls" /><figcaption><b>Index baseline:</b> Product education, pricing, ordering controls, contact information, and custom-layout guidance competed within one dense desktop-first interface.</figcaption></figure>
        <figure className="evidence-frame"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Original retail selection page</span></div><Image src="/images/rx-pad-portal/order-before.png" width={1502} height={888} alt="Original prescription pad retail page with long lists of doctor-count links and large unused areas" /><figcaption><b>Ordering baseline:</b> Pocket and desk formats were available, but the repeated vertical link lists and limited hierarchy made comparison and selection feel dated.</figcaption></figure>
      </div>
      <div className="pain-grid"><div><strong>01</strong><span>Customer friction</span><p>Dense layouts and repeated options made customers work harder to understand the available products and next step.</p></div><div><strong>02</strong><span>Operational risk</span><p>Any redesign had to protect the server-side logic, product mapping, session behavior, and production workflow.</p></div><div><strong>03</strong><span>Maintenance friction</span><p>Two visually different pages made it harder to deliver a consistent experience and manage future updates.</p></div></div>
    </section>

    <section className="solution-section shell rx-solution-section" id="solution">
      <div className="section-intro light"><p className="kicker">Execution</p><h2>A connected experience built around customer decisions.</h2><p>The redesigned surfaces share one visual system while serving different parts of the journey: learn and build confidence, then choose and order.</p></div>
      <div className="evidence-pair rx-after-pair">
        <figure className="evidence-frame after-evidence"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Welcome and product education</span></div><Image src="/images/rx-pad-portal/index-after.png" width={1383} height={855} alt="Redesigned prescription pad landing page with a focused headline, order actions, trust indicators, and organized content" /><figcaption><b>Landing experience:</b> A clearer value proposition, visible production timing, trust indicators, resources, and an intentional order path establish confidence before selection.</figcaption></figure>
        <figure className="evidence-frame after-evidence"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Focused ordering experience</span></div><Image src="/images/rx-pad-portal/order-after.png" width={1225} height={788} alt="Redesigned prescription pad ordering page with product guidance, quick order choices, and security information" /><figcaption><b>Ordering experience:</b> Product guidance, security details, and quick selection options are organized around the task customers came to complete.</figcaption></figure>
      </div>
      <figure className="evidence-frame selection-evidence"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Product and prescriber selection</span></div><Image src="/images/rx-pad-portal/selection-after.png" width={1222} height={561} alt="Redesigned pocket and desk prescription pad selection cards with one-to-ten prescriber options" /><figcaption><b>Selection model:</b> Pocket and desk pads can be compared side by side, with one-to-ten prescriber destinations presented as consistent, accessible controls.</figcaption></figure>
      <div className="feature-grid">
        <article><span>01</span><h3>Purposeful landing</h3><p>Build trust, explain the product, and direct customers toward the right next action.</p></article>
        <article><span>02</span><h3>Guided selection</h3><p>Separate pad format from prescriber count so customers can make one decision at a time.</p></article>
        <article><span>20</span><h3>Paths preserved</h3><p>Maintain all pocket and desk configurations for one through ten prescribers.</p></article>
        <article><span>4D</span><h3>Backend continuity</h3><p>Modernize the interface while retaining the existing server-side ordering foundation.</p></article>
      </div>
    </section>

    <section className="growth-section shell" id="growth">
      <div className="growth-story">
        <div><p className="kicker">Growth Opportunity</p><h2>Customer calls revealed an acquisition opportunity beyond the ordering flow.</h2></div>
        <div className="story-copy"><p>Prospective customers contacted Castle Press after a previous prescription pad supplier stopped serving them or went out of business. I treated those conversations as voice-of-customer evidence that the category had unmet demand and that the portal could become a stronger acquisition channel.</p><p>In response, the experience expanded beyond product ordering to include practical prescription pad articles and resources. The content was structured to improve traditional search visibility and generative engine optimization, while helping customers answer compliance, ordering, and security questions before contacting support.</p><aside>Product Operations connection: customer feedback informed a growth hypothesis, which shaped the content roadmap and created a new path from discovery to order.</aside></div>
      </div>
      <figure className="evidence-frame resources-evidence"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Articles and resources acquisition surface</span></div><Image src="/images/rx-pad-portal/resources-after.png" width={1315} height={744} alt="California prescription pad article library with searchable compliance, ordering, and security guidance" /><figcaption><b>Content-led acquisition:</b> A searchable resource library addresses high-intent questions, builds authority, and creates additional entry points into the prescription pad ordering journey.</figcaption></figure>
      <div className="growth-signals"><article><span>Signal 01</span><h3>Supplier disruption</h3><p>Inbound calls showed that healthcare customers were actively looking for a dependable replacement supplier.</p></article><article><span>Response 02</span><h3>Searchable guidance</h3><p>Practical articles expanded discoverability while helping customers understand requirements before ordering.</p></article><article><span>Result 03</span><h3>More orders observed</h3><p>Order volume increased after the website conversion, providing a directional signal that the improved experience supports growth.</p></article></div>
    </section>

    <section className="analytics-section shell" id="analytics" aria-labelledby="analytics-title">
      <div className="section-intro"><p className="kicker">Post-launch evidence</p><h2 id="analytics-title">New users increased 1,272% as visibility expanded.</h2><p>Google Analytics showed an immediate increase in discovery and site activity following the website conversion and content expansion. The 30-day snapshot recorded 4.2K active users, 4.1K new users, and 14K events.</p></div>
      <div className="analytics-evidence-grid">
        <figure className="evidence-frame analytics-primary"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>30-day acquisition snapshot</span></div><Image src="/images/rx-pad-portal/analytics-30-days.png" width={797} height={411} unoptimized alt="Google Analytics 30-day report showing 4.2 thousand active users, 14 thousand events, and 4.1 thousand new users" /><figcaption><b>Acquisition growth:</b> New users increased 1,272%, active users increased 1,224.4%, and event activity increased 639.8% compared with the previous period.</figcaption></figure>
        <figure className="evidence-frame analytics-pages"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>Prescription content visibility</span></div><Image src="/images/rx-pad-portal/analytics-page-views.png" width={294} height={386} unoptimized alt="Google Analytics page report showing increased views across California prescription pad pages" /><figcaption><b>Page-level visibility:</b> Multiple California prescription pad pages recorded substantial increases in views, supporting the content-led SEO and GEO strategy.</figcaption></figure>
        <figure className="evidence-frame analytics-trend"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>User activity trend</span></div><Image src="/images/rx-pad-portal/analytics-user-growth.png" width={801} height={417} unoptimized alt="Google Analytics user activity graph showing a sharp increase in active users during the post-launch period" /><figcaption><b>Immediate response:</b> The activity trend shows a clear post-launch rise, reaching 4.2K users over 30 days and 3.1K over seven days.</figcaption></figure>
      </div>
      <p className="analytics-caveat"><b>Measurement note:</b> These reports demonstrate increased traffic, discovery, and engagement. Because GA4 key events were not configured for completed orders, they are presented as visibility evidence rather than proof that the redesign alone caused order conversion.</p>
    </section>

    <section className="comparison-section shell" id="results">
      <div className="section-intro"><p className="kicker">What changed</p><h2>From legacy catalog pages to a managed product experience.</h2></div>
      <div className="comparison-table" role="table" aria-label="Prescription pad portal before and after comparison">
        <div className="comparison-row header-row" role="row"><span role="columnheader">Experience</span><span role="columnheader">Before</span><span role="columnheader">After</span></div>
        {changes.map(([area,before,after]) => <div className="comparison-row" role="row" key={area}><strong role="rowheader">{area}</strong><span role="cell">{before}</span><span role="cell">{after}</span></div>)}
      </div>
    </section>

    <section className="timeline-section product-process shell" id="process"><div className="section-intro"><p className="kicker">Product Operations Process</p><h2>From operational audit to validated customer experience.</h2></div><ol>{process.map(([number,title,why]) => <li key={number}><b>{number}</b><span>{title}</span><p>{why}</p></li>)}</ol></section>

    <section className="impact-section shell" id="outcome">
      <p className="kicker">Outcome</p>
      <h2>A clearer ordering capability that also opened a path for organic growth.</h2>
      <div className="impact-grid"><div><strong>1,272%</strong><span>Increase in new users</span></div><div><strong>20</strong><span>Product-selection paths preserved</span></div><div><strong>1</strong><span>Legacy 4D workflow maintained</span></div></div>
      <div className="outcome-columns"><article><h3>Customer experience</h3><ul><li>Clearer page purpose and next steps</li><li>Easier product comparison</li><li>More scannable prescriber selection</li><li>Improved responsive behavior</li></ul></article><article><h3>Operational outcomes</h3><ul><li>Existing order destinations preserved</li><li>Production workflow left unchanged</li><li>Customer calls captured as market insight</li><li>Lower-risk modernization approach</li></ul></article><article><h3>Growth foundation</h3><ul><li>SEO and GEO resource library</li><li>More entry points for high-intent customers</li><li>Observed increase in orders after launch</li><li>Clearer basis for future optimization</li></ul></article></div>
      <p className="impact-note">New users increased 1,272% compared with the previous reporting period, while order volume also increased following the website conversion. Because completed-order events and a formal attribution model were not available, traffic growth and order growth are presented as related post-launch signals rather than a sole-cause claim.</p>
    </section>

    <section className="review-section shell measurement-section" id="measurement"><div><p className="kicker">Success Measurement</p><h2>The next phase is to quantify conversion, acquisition, and operational performance.</h2><p>A Product Operations Manager would connect order trends and customer feedback to funnel, content, and support data so the growth signal can be measured and improved.</p></div><div className="review-grid"><span>Landing-to-order conversion</span><span>Organic and AI-search traffic</span><span>Article-to-order journeys</span><span>Product-selection completion</span><span>Order abandonment</span><span>Support contacts by issue</span><span>New versus repeat customers</span><span>Repeat-order rate</span></div></section>

    <section className="next-project shell"><p className="kicker">Previous transformation</p><h2>Regional Utility Customer Portal</h2><span>Product operations · Customer experience</span><Link href="/projects/customer-portal-redesign">View case study →</Link></section>
    <footer className="site-footer shell"><div><span className="brand-mark">A</span><strong>Andrew</strong></div><p>Work completed as part of my role at Castle Press.</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
