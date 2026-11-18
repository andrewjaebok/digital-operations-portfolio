import Link from "next/link";
import Image from "../../components/PortfolioImage";
import PortfolioNav from "../../components/PortfolioNav";
import { categories } from "../../data/categories";
export const metadata = { title: "Personal Projects | Andrew", description: "Independent projects in finance, consumer products, and mobile games." };
export default function CategoryPage(){return <main><PortfolioNav/><section className="category-intro category-intro--three shell"><Link className="back-link" href="/#work">← All three areas</Link><h1>Personal Projects</h1><p>Independent projects in finance, consumer products, and mobile games.</p><nav className="category-tabs" aria-label="Project categories">{categories.map(c=><Link key={c.id} href={c.route} aria-current={c.id === "personal-projects" ? "page" : undefined}>{c.title}</Link>)}</nav></section><section className="shell category-projects" aria-label="Personal Projects projects"><nav className="category-case-index" aria-label="Case studies in this category">
          <span>3 case studies</span>
          <Link href="/projects/hearth">LumaFi <span aria-hidden="true">↗</span></Link>
          <Link href="/projects/gogi-snacks">Gogi Snacks <span aria-hidden="true">↗</span></Link>
          <Link href="/projects/emberwake">EmberWake <span aria-hidden="true">↗</span></Link>
        </nav>
        <div className="project-gallery balanced-project-gallery three-project-gallery">          <Link className="bento-card portfolio-project-card hearth-project" href="/projects/hearth">
            <div className="project-topline"><span><i aria-hidden="true">◇</i> Project 03</span><b>Product platform</b></div>
            <div className="portfolio-card-media hearth-card-media" aria-label="Lumafi product operating model illustration">
              <div className="hearth-card-window" aria-hidden="true"><span>Monthly overview</span><strong>$8,420</strong><div><i/><i/><i/></div><small>Privacy-first · One-time purchase</small></div>
            </div>
            <div className="portfolio-card-copy">
              <p className="project-label">0→1 Product Development</p><h3>Lumafi Personal Finance Platform</h3>
              <p className="project-business-problem"><span>Business problem</span>Personal finance products can feel complex, impersonal, and difficult to justify as another subscription.</p>
              <div className="project-card-impact"><span>Impact · Verified delivery</span><strong>Help households understand what they can spend this month</strong><small>Includes desktop and mobile screenshots from the saved build.</small></div>
              <p className="project-card-role"><span>Project role</span>Product Owner / Product Operations</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Strategy</span><span>Roadmap</span><span>Architecture</span><span>Releases</span></div>
            </div>
            <div className="portfolio-card-footer"><span>No adoption or revenue claims</span><b>View case study ↗</b></div>
          </Link>
          <Link className="bento-card portfolio-project-card" href="/projects/gogi-snacks">
            <div className="project-topline"><span>Project 07</span><b>Consumer product concept</b></div>
            <div className="portfolio-card-media personal-card-media">
              <Image src="/images/personal-projects/gogi-packaging.webp" width={1280} height={853} alt="Gogi Snacks packaging and brand concepts" />
            </div>
            <div className="portfolio-card-copy">
              <h3>Gogi Snacks</h3>
              <p>Developing a Korean barbecue jerky chip concept through packaging exploration and supplier samples.</p>
              <div className="project-card-impact"><span>Current stage</span><strong>Packaging concepts and supplier samples</strong></div>
            </div>
            <div className="portfolio-card-footer"><span>Discovery · Packaging · Validation plan</span><b>View case study ↗</b></div>
          </Link>
          <Link className="bento-card portfolio-project-card" href="/projects/emberwake">
            <div className="project-topline"><span>Project 08</span><b>Mobile game prototype</b></div>
            <div className="portfolio-card-media personal-card-media">
              <Image src="/images/personal-projects/emberwake-menu.webp" width={900} height={1200} alt="EmberWake mobile home screen concept" />
            </div>
            <div className="portfolio-card-copy">
              <h3>EmberWake</h3>
              <p>Designing the first run of a mobile RPG, from hero selection to combat feedback and rewards.</p>
              <div className="project-card-impact"><span>Current stage</span><strong>Playable prototype and release QA</strong></div>
            </div>
            <div className="portfolio-card-footer"><span>Mobile UX · Release QA · Analytics plan</span><b>View case study ↗</b></div>
          </Link>
        </div></section><footer className="site-footer shell"><Link href="/#work">← Return to the hub</Link><a href="mailto:andrewjaebok@gmail.com">Get in touch ↗</a></footer></main>}
