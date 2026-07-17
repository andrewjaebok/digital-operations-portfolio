import Link from "next/link";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const capabilities = [
  ["01", "Notice the friction", "Look for repeated questions, manual work, confusing steps, and outdated experiences."],
  ["02", "Understand what must remain", "Identify technical constraints, production dependencies, and workflows people already understand."],
  ["03", "Improve the system", "Build the simplest solution that meaningfully improves the customer or employee experience."],
];

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

      <section className="bento-section shell" id="work">
        <div className="section-heading"><div><p className="eyebrow">Selected projects</p><h2>Business problems turned into better products.</h2></div><p>Choose a project to see the business context, operational assessment, requirements, decisions, responsibilities, and outcome.</p></div>
        <div className="project-gallery">
          <Link className="bento-card featured-project" href="/projects/customer-portal-redesign">
            <div className="project-topline"><span>Project 01</span><b>Full case study</b></div>
            <div className="project-shot real-project-shot">
              <span className="evidence-label">Final production interface</span>
              <Image src={`${basePath}/images/utility-portal/portal-after.png`} width={1216} height={895} priority alt="Final regional utility report portal with search, status key, language tabs, and reports organized by region" />
            </div>
            <div className="featured-copy"><div><p className="project-label">Product operations · Customer experience</p><h3>Regional Utility Customer Portal</h3><p>Led a customer portal improvement initiative from operational assessment and requirements definition through implementation and validation.</p><aside className="noticed-note"><b>NOTICED 01</b><span>A valuable reporting workflow was creating unnecessary customer effort and needed a clearer, more scalable product experience.</span></aside></div><span className="case-action">View case study <b>↗</b></span></div>
            <div className="project-facts"><span><small>My role</small>Product operations lead</span><span><small>Coverage</small>7 regions · 2 languages</span><span><small>Focus</small>Discovery through delivery</span></div>
          </Link>

          <div className="secondary-projects">
            <article className="bento-card upcoming-card portal-project"><div className="project-topline"><span>Project 02</span><b>Coming soon</b></div><div className="mini-system"><i/><i/><i/><i/><i/><i/></div><p className="project-label">Platform modernization</p><h3>Customer Portal Design System</h3><p>A reusable interface system for modernizing legacy client portals while preserving their production workflows.</p><span className="disabled-action">Case study in development</span></article>
            <article className="bento-card upcoming-card automation-project"><div className="project-topline"><span>Project 03</span><b>Coming soon</b></div><div className="mini-flow"><i>Input</i><b>→</b><i>Automate</i><b>→</b><i>Output</i></div><p className="project-label">Operational automation</p><h3>Production Workflow Automation</h3><p>Automated variable-data workflows designed to reduce repetitive work and improve production consistency.</p><span className="disabled-action">Case study in development</span></article>
          </div>
        </div>
        <div className="portfolio-summary"><div><strong>7+</strong><span>Client portals supported</span></div><div><strong>3</strong><span>Transformation disciplines</span></div><p>Each project is documented around the problem, constraints, decisions, responsibilities, and verified outcome.</p></div>
      </section>

      <section className="capability-section shell" id="capabilities">
        <div className="section-heading"><div><p className="eyebrow">How I think</p><h2>A practical approach to improving systems.</h2></div><p>Delivery is not the end of a product initiative. It is the start of a capability that should keep getting better.</p></div>
        <div className="capability-grid">{capabilities.map(([number,title,copy])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="about-panel shell" id="about"><div><p className="eyebrow">About my work</p><h2>Part product thinking. Part operations. Always practical.</h2></div><div><p>I work at the intersection of customer experience, production operations, and technical implementation. Much of my work begins with a process that technically functions but has stopped serving people as clearly as it could.</p><p>I improve those systems carefully, preserving the workflows that matter while removing unnecessary friction.</p><div className="tool-row"><span>HTML/CSS/JS</span><span>4D</span><span>FileMaker</span><span>InDesign</span><span>VBScript</span><span>Process design</span></div><a className="email-link" href="mailto:andrewjaebok@gmail.com">andrewjaebok@gmail.com <span aria-hidden="true">↗</span></a></div></section>
      <footer className="site-footer shell"><div><span className="brand-mark">A</span><strong>Andrew</strong></div><p>Digital operations · Product transformation</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
