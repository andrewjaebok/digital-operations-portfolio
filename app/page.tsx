import type { Metadata } from "next";
import Link from "next/link";
import Image from "./components/PortfolioImage";
import ProjectQuest from "./components/ProjectQuest";

export const metadata: Metadata = {
  title: "Andrew | Senior Product Operations / Digital Services",
  description: "Senior Product Operations case studies spanning customer portal modernization, regulated digital ordering, operational systems, automation, and zero-to-one product development.",
};

const capabilities = [
  ["01", "Notice the friction", "Look for repeated questions, manual work, confusing steps, and outdated experiences."],
  ["02", "Understand what must remain", "Identify technical constraints, production dependencies, and workflows people already understand."],
  ["03", "Improve the system", "Build the simplest solution that meaningfully improves the customer or employee experience."],
];

const skills = ["Product strategy", "Product operations", "Roadmap prioritization", "Voice of customer", "Requirements management", "Stakeholder alignment", "Launch management", "Product analytics", "Change management", "Continuous improvement"];

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Portfolio home"><span className="brand-mark">A</span><span>Andrew</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation"><a href="#work">Projects</a><Link href="/how-i-work">How I Work</Link><a href="#about">About</a></nav>
        <a className="nav-cta" href="mailto:andrewjaebok@gmail.com">Contact <span aria-hidden="true">↗</span></a>
        <details className="mobile-menu"><summary aria-label="Open navigation">Menu</summary><nav aria-label="Mobile navigation"><a href="#work">Projects</a><Link href="/how-i-work">How I Work</Link><a href="#about">About</a><a href="mailto:andrewjaebok@gmail.com">Contact</a></nav></details>
      </header>

      <section className="product-hero shell" id="main-content">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Senior Product Operations / Digital Services</p>
          <h1>
            I notice where the work <mark>gets stuck,</mark> then build a better way through it
            <span className="hero-period">.</span>
          </h1>
          <p className="hero-lead">A portfolio of customer portal modernization, regulated digital ordering, operational systems, and independent product development.</p>
          <div className="hero-links"><a className="primary-button" href="#work">View projects</a><Link className="secondary-link" href="/how-i-work">How I work <span>↗</span></Link></div>
        </div>
        <div className="hero-summary" aria-label="Portfolio disciplines">
          <span><small>01</small>Product operations</span>
          <span><small>02</small>Portal modernization</span>
          <span><small>03</small>Operational systems</span>
          <span><small>04</small>Zero-to-one products</span>
        </div>
      </section>

      <section className="operating-scope shell" aria-labelledby="operating-scope-title">
        <div className="operating-scope-intro">
          <p className="eyebrow">Operating scope</p>
          <h2 id="operating-scope-title">Customer experiences and the systems behind them.</h2>
          <p>The work spans customer portals, regulated ordering, operational systems, workflow automation, and independent product development.</p>
        </div>
        <div className="operating-scope-grid">
          <article><strong>7+</strong><span>Customer-facing portals supported</span></article>
          <article><strong>5</strong><span>Documented case studies</span></article>
          <article><strong>Customer + internal systems</strong><span>Digital experiences and operational workflows</span></article>
          <article><strong>Discovery → launch → iteration</strong><span>End-to-end initiative ownership</span></article>
        </div>
      </section>

      <section className="role-mandate shell" aria-labelledby="role-title">
        <div className="role-overview">
          <p className="eyebrow">Current scope</p>
          <h2 id="role-title">Senior Product Operations / Digital Services</h2>
          <p>I lead the strategy, development, implementation, and continuous improvement of customer-facing digital services for a commercial printing and digital-services organization. My scope includes online portals, web platforms, digital ordering systems, workflow optimization, customer implementations, and digital growth initiatives.</p>
        </div>
        <div className="operating-mandate">
          <p className="eyebrow">Operating mandate</p>
          <h3>Modernize digital experiences and the systems behind them.</h3>
          <p>I prioritize high-value portal and workflow improvements, improve usability and search visibility, reduce recurring operational friction, and identify opportunities to grow digital capabilities.</p>
          <div className="mandate-priorities" aria-label="Strategic priorities"><span>Prioritize by impact</span><span>Improve usability</span><span>Standardize workflows</span><span>Grow digital capabilities</span></div>
        </div>
      </section>

      <section className="skills-marquee" aria-label="Skills and capabilities">
        <div className="skills-track">
          <div className="skills-group">{skills.map((skill, index) => <span key={`primary-${skill}`}><b aria-hidden="true">{["✦","●","◆"][index % 3]}</b>{skill}</span>)}</div>
          <div className="skills-group" aria-hidden="true">{skills.map((skill, index) => <span key={`duplicate-${skill}`}><b>{["✦","●","◆"][index % 3]}</b>{skill}</span>)}</div>
        </div>
      </section>

      <section className="bento-section shell" id="work">
        <div className="section-heading"><div><p className="eyebrow">Selected projects</p><h2>Five case studies. One operating mindset.</h2></div><p>Each case study applies the same Product Operations approach to a different kind of business problem.</p></div>
        <ProjectQuest />
        <div className="project-archetypes" id="case-studies" aria-label="Project types">
          <span className="utility-type"><i aria-hidden="true">◫</i> Customer portal</span>
          <span className="rx-type"><i aria-hidden="true">✚</i> Regulated commerce</span>
          <span className="hearth-type"><i aria-hidden="true">◇</i> Product platform</span>
          <span className="operations-type"><i aria-hidden="true">⚙</i> Operational system</span>
          <span className="finder-type"><i aria-hidden="true">⌕</i> Discovery &amp; validation</span>
        </div>
        <div className="project-gallery balanced-project-gallery">
          <Link className="bento-card portfolio-project-card utility-project" href="/projects/customer-portal-redesign">
            <div className="project-topline"><span><i aria-hidden="true">◫</i> Project 01</span><b>Customer portal</b></div>
            <div className="portfolio-card-media project-compare-media" aria-label="Regional utility portal before and after">
              <figure><span>Before</span><Image src="/images/utility-portal/portal-before.png" width={1513} height={667} priority alt="Original regional utility report portal" /></figure>
              <figure><span>After</span><Image src="/images/utility-portal/portal-after.png" width={1216} height={895} priority alt="Improved regional utility report portal with search, status filtering, and bilingual navigation" /></figure>
            </div>
            <div className="portfolio-card-copy">
              <p className="project-label">Customer Workflow</p><h3>Regional Utility Customer Portal</h3>
              <p className="project-business-problem"><span>Business problem</span>Customers had to scan a dense report matrix and interpret production status manually.</p>
              <div className="project-card-impact"><span>Impact · Measured</span><strong>≈70%+ lower task time</strong><strong>83–100% fewer incorrect selections</strong></div>
              <p className="project-card-role"><span>Project role</span>Product Operations Lead</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Discovery</span><span>Prioritization</span><span>Delivery</span><span>Measurement</span></div>
            </div>
            <div className="portfolio-card-footer"><span>20-participant retrospective evaluation</span><b>View case study ↗</b></div>
          </Link>

          <Link className="bento-card portfolio-project-card rx-project" href="/projects/prescription-pad-ordering-portal">
            <div className="project-topline"><span><i aria-hidden="true">✚</i> Project 02</span><b>Regulated commerce</b></div>
            <div className="portfolio-card-media project-compare-media" aria-label="Prescription pad ordering experience before and after">
              <figure><span>Before</span><Image src="/images/rx-pad-portal/order-before.png" width={1502} height={888} alt="Original California prescription pad ordering experience" /></figure>
              <figure><span>After</span><Image src="/images/rx-pad-portal/order-after.png" width={1225} height={788} alt="Redesigned California prescription pad ordering experience" /></figure>
            </div>
            <div className="portfolio-card-copy">
              <p className="project-label">Regulated Product &amp; Growth</p><h3>Prescription Pad Ordering Experience</h3>
              <p className="project-business-problem"><span>Business problem</span>A legacy journey made compliant product selection and guidance harder to understand.</p>
              <div className="project-card-impact"><span>Impact · Measured signals</span><strong>+1,272% new users</strong><strong>100% reduction across 4 tracked recurring question categories</strong><small>Redesign and search-content program occurred together; causal attribution is directional.</small></div>
              <p className="project-card-role"><span>Project role</span>Product Operations Lead</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Requirements</span><span>Compliance</span><span>Launch</span><span>Growth</span></div>
            </div>
            <div className="portfolio-card-footer"><span>Customer + production workflow</span><b>View case study ↗</b></div>
          </Link>

          <Link className="bento-card portfolio-project-card hearth-project" href="/projects/hearth">
            <div className="project-topline"><span><i aria-hidden="true">◇</i> Project 03</span><b>Product platform</b></div>
            <div className="portfolio-card-media hearth-card-media" aria-label="Hearth product operating model illustration">
              <div className="hearth-card-window" aria-hidden="true"><span>Monthly overview</span><strong>$8,420</strong><div><i/><i/><i/></div><small>Privacy-first · One-time purchase</small></div>
            </div>
            <div className="portfolio-card-copy">
              <p className="project-label">0→1 Product Development</p><h3>Hearth Personal Finance Platform</h3>
              <p className="project-business-problem"><span>Business problem</span>Personal finance products can feel complex, impersonal, and difficult to justify as another subscription.</p>
              <div className="project-card-impact"><span>Impact · Verified delivery</span><strong>Working end-to-end product</strong><strong>Auth · payments · production deployment · release management</strong></div>
              <p className="project-card-role"><span>Project role</span>Product Owner / Product Operations</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Strategy</span><span>Roadmap</span><span>Architecture</span><span>Releases</span></div>
            </div>
            <div className="portfolio-card-footer"><span>No adoption or revenue claims</span><b>View case study ↗</b></div>
          </Link>

          <Link className="bento-card portfolio-project-card operations-project" href="/projects/operational-systems-automation">
            <div className="project-topline"><span><i aria-hidden="true">⚙</i> Project 04</span><b>Operational system</b></div>
            <div className="portfolio-card-media operations-card-media" aria-label="Operational systems improvement flow">
              <div className="operations-card-flow" aria-hidden="true">
                <span>Signal</span><i>→</i><span>Root cause</span><i>→</i><span>System</span><i>→</i><span>QA</span><i>→</i><span>Standardize</span>
              </div>
              <p>Recurring friction <b>→</b> repeatable operations</p>
            </div>
            <div className="portfolio-card-copy">
              <p className="project-label">Operational Systems</p><h3>Operational Systems &amp; Automation</h3>
              <p className="project-business-problem"><span>Business problem</span>Recurring manual work and production exceptions created avoidable intervention and inconsistent handling.</p>
              <div className="project-card-impact"><span>Impact · Verified + Directional</span><strong>Implemented workflows actively used</strong><strong>Less repeated handling · more consistent execution</strong><small>No fabricated time-saving or efficiency percentages.</small></div>
              <p className="project-card-role"><span>Project role</span>Senior Product Operations / Digital Services</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Root cause</span><span>Automation</span><span>QA</span><span>Standardization</span></div>
            </div>
            <div className="portfolio-card-footer"><span>Future KPIs defined in case study</span><b>View case study ↗</b></div>
          </Link>

          <Link className="bento-card portfolio-project-card operations-project" href="/projects/operational-systems-automation/#traffic-protection">
            <div className="project-topline"><span><i aria-hidden="true">↗</i> Project 04 · Initiative 03</span><b>Infrastructure protection</b></div>
            <div className="portfolio-card-media operations-card-media" aria-label="Customer ordering traffic protection result">
              <div className="operations-card-flow" aria-hidden="true"><span>Investigate</span><i>→</i><span>Protect</span><i>→</i><span>Validate</span></div>
              <p><b>97.3%</b> lower measured server request rate</p>
            </div>
            <div className="portfolio-card-copy">
              <p className="project-label">Customer Ordering Infrastructure</p><h3>Customer Ordering Protection</h3>
              <p className="project-business-problem"><span>Business problem</span>Heavy automated traffic put pressure on the infrastructure supporting customer ordering.</p>
              <div className="project-card-impact"><span>Impact · Measured request reduction</span><strong>1,877 → 50.7 requests per minute</strong><strong>97.3% lower measured request rate</strong><small>12.7 requests/minute and 99.3% total reduction are projected after additional IP blocks, pending verification.</small></div>
              <p className="project-card-role"><span>Project role</span>Digital Operations · Investigation, implementation, and validation</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Cloudflare</span><span>Apache</span><span>4D</span><span>Troubleshooting</span></div>
            </div>
            <div className="portfolio-card-footer"><span>Part of Operational Systems &amp; Automation</span><b>View protection project ↗</b></div>
          </Link>

          <Link className="bento-card portfolio-project-card finder-project" href="/projects/university-logo-directory">
            <div className="project-topline"><span><i aria-hidden="true">⌕</i> Project 05</span><b>Discovery &amp; validation</b></div>
            <div className="portfolio-card-media project-compare-media" aria-label="University logo directory before and after">
              <figure><span>Before</span><Image src="/images/university-logo-directory/original-directory.jpg" width={1200} height={1145} alt="Original static university logo directory requiring manual scrolling" /></figure>
              <figure><span>After</span><Image src="/images/university-logo-directory/redesigned-directory.jpg" width={1200} height={1012} alt="Searchable university logo directory showing explicit organizational paths" /></figure>
            </div>
            <div className="portfolio-card-copy">
              <p className="project-label">Discovery &amp; Validation</p>
              <h3>University Logo Directory Redesign</h3>
              <p className="project-business-problem"><span>Business problem</span>A static 195-entry list required manual scanning, memory, and a second lookup in the ordering workflow.</p>
              <div className="project-card-impact project-card-impact-modeled" aria-label="Synthetic Round 2 modeled KPI results"><span>Impact · Modeled pre-launch results</span><strong>11 / 11 modeled KPI thresholds met</strong><strong>95% → 99% completion · 24s → 20s lookup</strong></div>
              <small className="finder-card-caveat"><b>Synthetic pre-launch evaluation.</b> Decision-support model, not observed user research.</small>
              <p className="project-card-role"><span>Project role</span>Senior Product Operations / Digital Services</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Discovery</span><span>KPI design</span><span>Iteration</span><span>Validation</span></div>
            </div>
            <div className="portfolio-card-footer"><span>Hypothesis → evaluation → iteration</span><b>View case study ↗</b></div>
          </Link>

        </div>
        <div className="portfolio-summary evidence-summary"><p><strong>Evidence discipline:</strong> each case study separates verified implementation, measured outcomes, directional signals, modeled evaluation, and future KPIs.</p></div>
      </section>

      <section className="capability-section shell" id="capabilities">
        <div className="section-heading"><div><p className="eyebrow">How I think</p><h2>A practical philosophy for improving systems.</h2></div><p>Notice the friction. Understand what must remain. Improve the system in a way people can trust.</p></div>
        <div className="capability-grid">{capabilities.map(([number,title,copy])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <Link className="framework-cta" href="/how-i-work"><span>See the complete operating system</span><b>Discovery, prioritization, stakeholders, launch, and measurement →</b></Link>
      </section>

      <section className="portfolio-operating-model shell" aria-labelledby="operating-model-title">
        <div className="section-heading"><div><p className="eyebrow">Portfolio operating model</p><h2 id="operating-model-title">Intake → prioritize → align → deliver → measure → improve.</h2></div><p>This is the repeatable process used to move initiatives through the portfolio, from an operating signal to the next evidence-led iteration.</p></div>
        <div className="operating-model-grid">
          <article><span>01</span><h3>Intake signals</h3><p>Customer questions, support friction, operational bottlenecks, usage patterns, compliance needs, and growth opportunities.</p></article>
          <article><span>02</span><h3>Prioritize</h3><p>Balance customer impact, portal volume, revenue potential, implementation effort, and operational risk.</p></article>
          <article><span>03</span><h3>Align</h3><p>Translate customer, production, support, compliance, and technical needs into a shared scope.</p></article>
          <article><span>04</span><h3>Deliver</h3><p>Coordinate requirements, implementation, quality assurance, launch readiness, and workflow continuity.</p></article>
          <article><span>05</span><h3>Measure</h3><p>Separate verified outcomes, measured results, directional signals, modeled evidence, and future instrumentation.</p></article>
          <article><span>06</span><h3>Improve</h3><p>Use customer feedback, product analytics, and operational outcomes to shape the next iteration.</p></article>
        </div>
      </section>

      <section className="about-panel shell" id="about"><div><p className="eyebrow">About my work</p><h2>Part product thinking. Part operations. Always practical.</h2></div><div><p>I work at the intersection of customer experience, production operations, and technical implementation. Much of my work begins with a process that technically functions but has stopped serving people as clearly as it could.</p><p>I improve those systems carefully, preserving the workflows that matter while removing unnecessary friction.</p><div className="tool-row"><span>HTML/CSS/JS</span><span>4D</span><span>FileMaker</span><span>InDesign</span><span>VBScript</span><span>Process design</span></div><a className="email-link" href="mailto:andrewjaebok@gmail.com">andrewjaebok@gmail.com <span aria-hidden="true">↗</span></a></div></section>
      <footer className="site-footer shell"><div><span className="brand-mark">A</span><strong>Andrew</strong></div><p>Digital operations · Product transformation</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
