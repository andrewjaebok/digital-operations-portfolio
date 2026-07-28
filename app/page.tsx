import type { Metadata } from "next";
import Link from "next/link";
import Image from "./components/PortfolioImage";
import ProjectQuest from "./components/ProjectQuest";
import AntWorkflow from "./components/AntWorkflow";

export const metadata: Metadata = {
  title: "Andrew | Senior Product Operations Portfolio",
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
          <p className="eyebrow"><span /> Digital Operations · Product Transformation</p>
          <h1>
            I notice where the work <mark>gets stuck,</mark> then build a better way through it
            <span className="hero-period">.</span>
            <AntWorkflow />
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

      <section className="role-mandate shell" aria-labelledby="role-title">
        <div className="role-overview">
          <p className="eyebrow">Current scope</p>
          <h2 id="role-title">Senior Product/Digital Operations</h2>
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
        <div className="section-heading"><div><p className="eyebrow">Selected projects</p><h2>Four kinds of systems. One operating mindset.</h2></div><p>Each case study applies the same Product Operations approach to a different kind of business problem.</p></div>
        <ProjectQuest />
        <div className="project-archetypes" id="case-studies" aria-label="Project types">
          <span className="utility-type"><i aria-hidden="true">◫</i> Customer portal</span>
          <span className="rx-type"><i aria-hidden="true">✚</i> Regulated commerce</span>
          <span className="hearth-type"><i aria-hidden="true">◇</i> Product platform</span>
          <span className="operations-type"><i aria-hidden="true">⚙</i> Operational system</span>
        </div>
        <div className="project-gallery balanced-project-gallery">
          <Link className="bento-card portfolio-project-card utility-project" href="/projects/customer-portal-redesign">
            <div className="project-topline"><span><i aria-hidden="true">◫</i> Project 01</span><b>Customer portal</b></div>
            <div className="portfolio-card-media project-compare-media" aria-label="Regional utility portal before and after">
              <figure><span>Before</span><Image src="/images/utility-portal/portal-before.png" width={1513} height={667} priority alt="Original regional utility report portal" /></figure>
              <figure><span>After</span><Image src="/images/utility-portal/portal-after.png" width={1216} height={895} priority alt="Improved regional utility report portal with search, status filtering, and bilingual navigation" /></figure>
            </div>
            <div className="portfolio-card-copy"><p className="project-label">Product operations · Customer experience</p><h3>Regional Utility Customer Portal</h3><p>Led a customer portal improvement initiative from operational assessment and requirements definition through implementation and validation.</p></div>
            <div className="portfolio-card-footer"><span>Product operations lead</span><b>View case study ↗</b></div>
          </Link>

          <Link className="bento-card portfolio-project-card rx-project" href="/projects/prescription-pad-ordering-portal">
            <div className="project-topline"><span><i aria-hidden="true">✚</i> Project 02</span><b>Regulated commerce</b></div>
            <div className="portfolio-card-media project-compare-media" aria-label="Prescription pad ordering experience before and after">
              <figure><span>Before</span><Image src="/images/rx-pad-portal/order-before.png" width={1502} height={888} alt="Original California prescription pad ordering experience" /></figure>
              <figure><span>After</span><Image src="/images/rx-pad-portal/order-after.png" width={1225} height={788} alt="Redesigned California prescription pad ordering experience" /></figure>
            </div>
            <div className="portfolio-card-copy"><p className="project-label">Product operations · Regulated ordering</p><h3>Prescription Pad Ordering Experience</h3><p>Reframed a legacy ordering portal into a clearer customer journey while preserving the 4D backend and production workflow.</p></div>
            <div className="portfolio-card-footer"><span>Product Operations Manager</span><b>View case study ↗</b></div>
          </Link>

          <Link className="bento-card portfolio-project-card hearth-project" href="/projects/hearth">
            <div className="project-topline"><span><i aria-hidden="true">◇</i> Project 03</span><b>Product platform</b></div>
            <div className="portfolio-card-media hearth-card-media" aria-label="Hearth product operating model illustration">
              <div className="hearth-card-window" aria-hidden="true"><span>Monthly overview</span><strong>$8,420</strong><div><i/><i/><i/></div><small>Privacy-first · One-time purchase</small></div>
            </div>
            <div className="portfolio-card-copy"><p className="project-label">Independent product · Zero-to-one platform</p><h3>Hearth Personal Finance Platform</h3><p>Building and operationalizing a privacy-first financial platform from product concept through cloud architecture, release environments, user feedback, and continuous simplification.</p></div>
            <div className="portfolio-card-footer"><span>Product Owner / Product Operations</span><b>View case study ↗</b></div>
          </Link>

          <Link className="bento-card portfolio-project-card operations-project" href="/projects/operational-systems-automation">
            <div className="project-topline"><span><i aria-hidden="true">⚙</i> Project 04</span><b>Operational system</b></div>
            <div className="portfolio-card-media operations-card-media" aria-label="Operational systems improvement flow">
              <div className="operations-card-flow" aria-hidden="true">
                <span>Signal</span><i>→</i><span>Root cause</span><i>→</i><span>System</span><i>→</i><span>QA</span><i>→</i><span>Standardize</span>
              </div>
              <p>Recurring friction <b>→</b> repeatable operations</p>
            </div>
            <div className="portfolio-card-copy"><p className="project-label">Product operations · Operational excellence</p><h3>Operational Systems &amp; Automation</h3><p>Improving the systems behind digital production through workflow automation, root-cause analysis, QA, and repeatable operational standards.</p><div className="project-tag-row" aria-label="Project capabilities"><span>Process Automation</span><span>Root Cause Analysis</span><span>Workflow Design</span><span>QA</span><span>Operational Excellence</span></div></div>
            <div className="portfolio-card-footer"><span>Senior Product Operations / Digital Operations</span><b>View case study ↗</b></div>
          </Link>

        </div>
        <div className="portfolio-summary"><div><strong>7+</strong><span>Client portals supported</span></div><div><strong>4</strong><span>Documented case studies</span></div><p>Each project is documented around the problem, constraints, decisions, responsibilities, and verified outcome.</p></div>
      </section>

      <section className="capability-section shell" id="capabilities">
        <div className="section-heading"><div><p className="eyebrow">How I think</p><h2>A practical approach to improving systems.</h2></div><p>Delivery is not the end of a product initiative. It is the start of a capability that should keep getting better.</p></div>
        <div className="capability-grid">{capabilities.map(([number,title,copy])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <Link className="framework-cta" href="/how-i-work"><span>See the complete operating system</span><b>Discovery, prioritization, stakeholders, launch, and measurement →</b></Link>
      </section>

      <section className="portfolio-operating-model shell" aria-labelledby="operating-model-title">
        <div className="section-heading"><div><p className="eyebrow">Portfolio operating model</p><h2 id="operating-model-title">How I prioritize and manage digital improvements.</h2></div><p>Each initiative is evaluated as part of a broader customer-facing product portfolio, not as an isolated design request.</p></div>
        <div className="operating-model-grid">
          <article><span>01</span><h3>Intake signals</h3><p>Customer questions, support friction, operational bottlenecks, usage patterns, compliance needs, and growth opportunities.</p></article>
          <article><span>02</span><h3>Prioritize</h3><p>Balance customer impact, portal volume, revenue potential, implementation effort, and operational risk.</p></article>
          <article><span>03</span><h3>Align</h3><p>Translate customer, production, support, compliance, and technical needs into a shared scope.</p></article>
          <article><span>04</span><h3>Deliver</h3><p>Coordinate requirements, implementation, quality assurance, launch readiness, and workflow continuity.</p></article>
          <article><span>05</span><h3>Improve</h3><p>Use customer feedback, product analytics, and operational outcomes to shape the next iteration.</p></article>
        </div>
      </section>

      <section className="about-panel shell" id="about"><div><p className="eyebrow">About my work</p><h2>Part product thinking. Part operations. Always practical.</h2></div><div><p>I work at the intersection of customer experience, production operations, and technical implementation. Much of my work begins with a process that technically functions but has stopped serving people as clearly as it could.</p><p>I improve those systems carefully, preserving the workflows that matter while removing unnecessary friction.</p><div className="tool-row"><span>HTML/CSS/JS</span><span>4D</span><span>FileMaker</span><span>InDesign</span><span>VBScript</span><span>Process design</span></div><a className="email-link" href="mailto:andrewjaebok@gmail.com">andrewjaebok@gmail.com <span aria-hidden="true">↗</span></a></div></section>
      <footer className="site-footer shell"><div><span className="brand-mark">A</span><strong>Andrew</strong></div><p>Digital operations · Product transformation</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
