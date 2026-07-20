import Link from "next/link";
import Image from "./components/PortfolioImage";

const capabilities = [
  ["01", "🔍 Notice the friction", "Look for repeated questions, manual work, confusing steps, and outdated experiences."],
  ["02", "🧭 Understand what must remain", "Identify technical constraints, production dependencies, and workflows people already understand."],
  ["03", "⚙️ Improve the system", "Build the simplest solution that meaningfully improves the customer or employee experience."],
];

const skills = ["Product strategy", "Product operations", "Roadmap prioritization", "Voice of customer", "Requirements management", "Stakeholder alignment", "Cross-functional leadership", "Customer implementations", "Product analytics", "KPI development", "Process optimization", "Workflow automation", "Change management", "Launch management", "Risk and compliance", "Service design", "Digital growth", "SEO and GEO strategy", "Quality assurance", "Continuous improvement"];

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Portfolio home"><span className="brand-mark">A</span><span>Andrew</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation"><a href="#work">Projects</a><a href="#capabilities">Approach</a><a href="#about">About</a></nav>
        <a className="nav-cta" href="mailto:andrewjaebok@gmail.com">Contact <span aria-hidden="true">↗</span></a>
        <details className="mobile-menu"><summary aria-label="Open navigation">Menu</summary><nav aria-label="Mobile navigation"><a href="#work">Projects</a><a href="#capabilities">Approach</a><a href="#about">About</a><a href="mailto:andrewjaebok@gmail.com">Contact</a></nav></details>
      </header>

      <section className="product-hero shell" id="main-content">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Digital Operations · Product Transformation</p>
          <h1>I notice where the work <mark>gets stuck,</mark> then build a better way through it.</h1>
          <p className="hero-lead">A portfolio of customer portals, production automation, and operational improvements developed through my work at Castle Press.</p>
          <div className="hero-links"><a className="primary-button" href="#work">View projects</a><a className="secondary-link" href="#about">How I work <span>↓</span></a></div>
        </div>
        <div className="hero-summary" aria-label="Portfolio disciplines">
          <span><small>01</small>Product operations</span>
          <span><small>02</small>Portal modernization</span>
          <span><small>03</small>Workflow automation</span>
        </div>
      </section>

      <section className="role-mandate shell" aria-labelledby="role-title">
        <div className="role-overview">
          <p className="eyebrow">Current scope</p>
          <h2 id="role-title">Senior Product/Digital Operations</h2>
          <p>I lead the strategy, development, implementation, and continuous improvement of Castle Press&apos;s customer-facing digital services. My scope includes online portals, web platforms, digital ordering systems, workflow optimization, customer implementations, and digital growth initiatives.</p>
        </div>
        <div className="operating-mandate">
          <p className="eyebrow">Operating mandate</p>
          <h3>Modernize every customer-facing digital experience.</h3>
          <p>I prioritize the highest-volume portals, improve usability and search visibility, and identify opportunities to grow online revenue through complementary products and self-service capabilities.</p>
          <div className="mandate-priorities" aria-label="Strategic priorities"><span>Prioritize by volume</span><span>Improve usability</span><span>Increase visibility</span><span>Grow digital revenue</span></div>
        </div>
      </section>

      <section className="skills-marquee" aria-label="Skills and capabilities">
        <div className="skills-track">
          <div className="skills-group">{skills.map((skill, index) => <span key={`primary-${skill}`}><b aria-hidden="true">{["✦","●","◆"][index % 3]}</b>{skill}</span>)}</div>
          <div className="skills-group" aria-hidden="true">{skills.map((skill, index) => <span key={`duplicate-${skill}`}><b>{["✦","●","◆"][index % 3]}</b>{skill}</span>)}</div>
        </div>
      </section>

      <section className="bento-section shell" id="work">
        <div className="section-heading"><div><p className="eyebrow">Selected projects</p><h2>Business problems turned into better products.</h2></div><p>Choose a project to see the business context, operational assessment, requirements, decisions, responsibilities, and outcome.</p></div>
        <div className="project-gallery balanced-project-gallery">
          <Link className="bento-card portfolio-project-card" href="/projects/customer-portal-redesign">
            <div className="project-topline"><span><i aria-hidden="true">🌐</i> Project 01</span><b>Full case study</b></div>
            <div className="portfolio-card-media project-compare-media" aria-label="Regional utility portal before and after">
              <figure><span>Before</span><Image src="/images/utility-portal/portal-before.png" width={1513} height={667} priority alt="Original regional utility report portal" /></figure>
              <figure><span>After</span><Image src="/images/utility-portal/portal-after.png" width={1216} height={895} priority alt="Improved regional utility report portal with search, status filtering, and bilingual navigation" /></figure>
            </div>
            <div className="portfolio-card-copy"><p className="project-label">Product operations · Customer experience</p><h3>Regional Utility Customer Portal</h3><p>Led a customer portal improvement initiative from operational assessment and requirements definition through implementation and validation.</p></div>
            <div className="portfolio-card-footer"><span>Product operations lead</span><b>View case study ↗</b></div>
          </Link>

          <Link className="bento-card portfolio-project-card rx-project" href="/projects/prescription-pad-ordering-portal">
            <div className="project-topline"><span><i aria-hidden="true">🩺</i> Project 02</span><b>Full case study</b></div>
            <div className="portfolio-card-media project-compare-media" aria-label="Prescription pad ordering experience before and after">
              <figure><span>Before</span><Image src="/images/rx-pad-portal/order-before.png" width={1502} height={888} alt="Original California prescription pad ordering experience" /></figure>
              <figure><span>After</span><Image src="/images/rx-pad-portal/order-after.png" width={1225} height={788} alt="Redesigned California prescription pad ordering experience" /></figure>
            </div>
            <div className="portfolio-card-copy"><p className="project-label">Product operations · Regulated ordering</p><h3>Prescription Pad Ordering Experience</h3><p>Reframed a legacy ordering portal into a clearer customer journey while preserving the 4D backend and production workflow.</p></div>
            <div className="portfolio-card-footer"><span>Product Operations Manager</span><b>View case study ↗</b></div>
          </Link>

          <article className="bento-card portfolio-project-card automation-project">
            <div className="project-topline"><span><i aria-hidden="true">⚙️</i> Project 03</span><b>Coming soon</b></div>
            <div className="portfolio-card-media project-compare-media workflow-compare" aria-label="Production workflow current and future states">
              <figure><span>Current state</span><div className="workflow-state manual"><i>Input</i><i>Repeat</i><i>Check</i></div></figure>
              <figure><span>Target state</span><div className="workflow-state automated"><i>Input</i><b>→</b><i>Automate</i><b>→</b><i>Output</i></div></figure>
            </div>
            <div className="portfolio-card-copy"><p className="project-label">Operational automation</p><h3>Production Workflow Automation</h3><p>A variable-data automation initiative focused on reducing repetitive work and improving production consistency.</p></div>
            <div className="portfolio-card-footer muted"><span>Operational automation</span><b>Case study in development</b></div>
          </article>
        </div>
        <div className="portfolio-summary"><div><strong>7+</strong><span>Client portals supported</span></div><div><strong>3</strong><span>Transformation disciplines</span></div><p>Each project is documented around the problem, constraints, decisions, responsibilities, and verified outcome.</p></div>
      </section>

      <section className="capability-section shell" id="capabilities">
        <div className="section-heading"><div><p className="eyebrow">How I think</p><h2>A practical approach to improving systems.</h2></div><p>Delivery is not the end of a product initiative. It is the start of a capability that should keep getting better.</p></div>
        <div className="capability-grid">{capabilities.map(([number,title,copy])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
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
