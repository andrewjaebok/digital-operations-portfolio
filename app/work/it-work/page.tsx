import Link from "next/link";
import Image from "../../components/PortfolioImage";
import PortfolioNav from "../../components/PortfolioNav";
import { categories } from "../../data/categories";
import "../../components/ITDecisionNarrative.css";
export const metadata = { title: "IT Work | Andrew", description: "Reliable systems behind the customer experience." };
export default function CategoryPage(){return <main><PortfolioNav/><section className="category-intro shell"><Link className="back-link" href="/#work">← All three areas</Link><p className="eyebrow">Explore the work</p><h1>IT Work</h1><p>Reliable systems behind the customer experience.</p><nav className="category-tabs" aria-label="Project categories">{categories.map(c=><Link key={c.id} href={c.route} aria-current={c.id === "it-work" ? "page" : undefined}>{c.title}</Link>)}</nav></section><section className="shell it-decision-intro" aria-labelledby="it-decision-intro-title">
  <div><p className="eyebrow">Technical judgment &amp; operational ownership</p><h2 id="it-decision-intro-title">The important work happened before and after the fix.</h2><p>Each initiative began with a recurring operational signal. The work involved narrowing the root cause, weighing service continuity against change risk, implementing a targeted improvement, and checking whether the workflow still supported employees and customers.</p></div>
  <div className="it-decision-stages" aria-label="IT decision process"><span>Investigate signal</span><b aria-hidden="true">→</b><span>Evaluate tradeoffs</span><b aria-hidden="true">→</b><span>Protect critical workflows</span><b aria-hidden="true">→</b><span>Validate and learn</span></div>
  <a href="/projects/operational-systems-automation/#decision-records" className="it-decision-link">Explore three documented technical decisions →</a>
</section><section className="shell category-projects" aria-label="IT Work projects"><div className="project-gallery balanced-project-gallery">          <Link className="bento-card portfolio-project-card operations-project" href="/projects/operational-systems-automation">
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
          </Link></div></section><footer className="site-footer shell"><Link href="/#work">← Return to the hub</Link><a href="mailto:andrewjaebok@gmail.com">Get in touch ↗</a></footer></main>}
