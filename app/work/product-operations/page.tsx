import Link from "next/link";
import Image from "../../components/PortfolioImage";
import PortfolioNav from "../../components/PortfolioNav";
import { categories } from "../../data/categories";
export const metadata = { title: "Digital Operations | Andrew", description: "Customer experiences, from friction to launch." };
export default function CategoryPage(){return <main><PortfolioNav/><section className="category-intro category-intro--three shell"><Link className="back-link" href="/#work">← All three areas</Link><h1>Digital Operations</h1><p>Customer experiences, from friction to launch.</p><nav className="category-tabs" aria-label="Project categories">{categories.map(c=><Link key={c.id} href={c.route} aria-current={c.id === "product-operations" ? "page" : undefined}>{c.title}</Link>)}</nav></section><section className="shell category-projects" aria-label="Digital Operations projects"><nav className="category-case-index" aria-label="Case studies in this category">
          <span>3 case studies</span>
          <Link href="/projects/customer-portal-redesign">Regional Utility Portal <span aria-hidden="true">↗</span></Link>
          <Link href="/projects/prescription-pad-ordering-portal">RX Pads <span aria-hidden="true">↗</span></Link>
          <Link href="/projects/university-logo-directory">University Logo Directory <span aria-hidden="true">↗</span></Link>
        </nav>
        <div className="project-gallery balanced-project-gallery three-project-gallery">          <Link className="bento-card portfolio-project-card utility-project" href="/projects/customer-portal-redesign">
            <div className="project-topline"><span><i aria-hidden="true">◫</i> Project 01</span><b>Customer portal</b></div>
            <div className="portfolio-card-media project-compare-media" aria-label="Regional utility portal before and after">
              <figure><span>Before</span><Image src="/images/utility-portal/portal-before.png" width={1513} height={667} priority alt="Original regional utility report portal" /></figure>
              <figure><span>After</span><Image src="/images/utility-portal/portal-after.png" width={1216} height={895} priority alt="Improved regional utility report portal with search, status filtering, and bilingual navigation" /></figure>
            </div>
            <div className="portfolio-card-copy">
              <p className="project-label">Customer Workflow</p><h3>Regional Utility Customer Portal</h3>
              <p className="project-business-problem"><span>Business problem</span>Customers had to scan a dense report matrix and interpret production status manually.</p>
              <div className="project-card-impact"><span>Report lookup · Retrospective usability evaluation</span><strong>30–60 seconds → 10–15 seconds</strong><small>Time to find the correct location</small></div>
              <p className="project-card-role"><span>Project role</span>Product Operations Lead</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Discovery</span><span>Prioritization</span><span>Delivery</span><span>Measurement</span></div>
            </div>
            <div className="portfolio-card-footer"><span>20-participant retrospective evaluation</span><b>View case study ↗</b></div>
          </Link>
          <Link className="bento-card portfolio-project-card rx-project" href="/projects/prescription-pad-ordering-portal">
            <div className="project-topline"><span><i aria-hidden="true">✚</i> Project 02</span><b>UX case study + interactive prototype</b></div>
            <div className="portfolio-card-media project-compare-media" aria-label="Prescription pad ordering experience before and after">
              <figure><span>Before</span><Image src="/images/rx-pad-portal/order-before.png" width={1502} height={888} alt="Original California prescription pad ordering experience" /></figure>
              <figure><span>After</span><Image src="/images/rx-pad-portal/order-after.png" width={1225} height={788} alt="Redesigned California prescription pad ordering experience" /></figure>
            </div>
            <div className="portfolio-card-copy">
              <p className="project-label">Regulated Product &amp; Growth</p><h3>Prescription Pad Ordering Experience</h3>
              <p className="project-business-problem"><span>Business problem</span>A legacy journey made compliant product selection and guidance harder to understand.</p>
              <div className="project-card-impact"><span>Customer support follow-up</span><strong>Four recurring question categories fell to zero</strong><small>Observed during the two-month follow-up</small></div>
              <p className="project-card-role"><span>Project role</span>Product Operations Lead</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Customer journey</span><span>Wireframes</span><span>Prototype</span><span>WCAG review</span></div>
            </div>
            <div className="portfolio-card-footer"><span>Customer journey and ordering prototype</span><b>Explore RX Pads case study ↗</b></div>
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
              <div className="project-card-impact"><span>Search interaction</span><strong>Search by familiar names and confirm the full organization path</strong><small>Recover from an empty search with A–Z browsing</small></div>
              <p className="project-card-role"><span>Project role</span>Senior Product Operations / Digital Services</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Discovery</span><span>KPI design</span><span>Iteration</span><span>Validation</span></div>
            </div>
            <div className="portfolio-card-footer"><span>Interactive finder and Figma wireframes</span><b>View case study ↗</b></div>
          </Link></div></section><footer className="site-footer shell"><Link href="/#work">← Return to the hub</Link><a href="mailto:andrewjaebok@gmail.com">Get in touch ↗</a></footer></main>}
