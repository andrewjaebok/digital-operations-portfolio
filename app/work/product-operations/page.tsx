import Link from "next/link";
import Image from "../../components/PortfolioImage";
import PortfolioNav from "../../components/PortfolioNav";
import { categories } from "../../data/categories";
export const metadata = { title: "Product Operations | Andrew", description: "Customer experiences, from friction to launch." };
export default function CategoryPage(){return <main><PortfolioNav/><section className="category-intro shell"><Link className="back-link" href="/#work">← All three areas</Link><p className="eyebrow">Explore the work</p><h1>Product Operations</h1><p>Customer experiences, from friction to launch.</p><nav className="category-tabs" aria-label="Project categories">{categories.map(c=><Link key={c.id} href={c.route} aria-current={c.id === "product-operations" ? "page" : undefined}>{c.title}</Link>)}</nav></section><section className="shell category-projects" aria-label="Product Operations projects"><div className="project-gallery balanced-project-gallery">          <Link className="bento-card portfolio-project-card utility-project" href="/projects/customer-portal-redesign">
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
          </Link></div></section><footer className="site-footer shell"><Link href="/#work">← Return to the hub</Link><a href="mailto:andrewjaebok@gmail.com">Get in touch ↗</a></footer></main>}
