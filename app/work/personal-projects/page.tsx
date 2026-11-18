import Link from "next/link";
import Image from "../../components/PortfolioImage";
import PortfolioNav from "../../components/PortfolioNav";
import { categories } from "../../data/categories";
export const metadata = { title: "Personal Projects | Andrew", description: "Independent ideas built into working products." };
export default function CategoryPage(){return <main><PortfolioNav/><section className="category-intro shell"><Link className="back-link" href="/#work">← All three areas</Link><p className="eyebrow">Explore the work</p><h1>Personal Projects</h1><p>Independent ideas built into working products.</p><nav className="category-tabs" aria-label="Project categories">{categories.map(c=><Link key={c.id} href={c.route} aria-current={c.id === "personal-projects" ? "page" : undefined}>{c.title}</Link>)}</nav></section><section className="shell category-projects" aria-label="Personal Projects projects"><div className="project-gallery balanced-project-gallery">          <Link className="bento-card portfolio-project-card hearth-project" href="/projects/hearth">
            <div className="project-topline"><span><i aria-hidden="true">◇</i> Project 03</span><b>Product platform</b></div>
            <div className="portfolio-card-media hearth-card-media" aria-label="Lumafi product operating model illustration">
              <div className="hearth-card-window" aria-hidden="true"><span>Monthly overview</span><strong>$8,420</strong><div><i/><i/><i/></div><small>Privacy-first · One-time purchase</small></div>
            </div>
            <div className="portfolio-card-copy">
              <p className="project-label">0→1 Product Development</p><h3>Lumafi Personal Finance Platform</h3>
              <p className="project-business-problem"><span>Business problem</span>Personal finance products can feel complex, impersonal, and difficult to justify as another subscription.</p>
              <div className="project-card-impact"><span>Impact · Verified delivery</span><strong>Working end-to-end product</strong><strong>Auth · payments · production deployment · release management</strong></div>
              <p className="project-card-role"><span>Project role</span>Product Owner / Product Operations</p>
              <div className="project-tag-row" aria-label="Project capabilities"><span>Strategy</span><span>Roadmap</span><span>Architecture</span><span>Releases</span></div>
            </div>
            <div className="portfolio-card-footer"><span>No adoption or revenue claims</span><b>View case study ↗</b></div>
          </Link></div></section><footer className="site-footer shell"><Link href="/#work">← Return to the hub</Link><a href="mailto:andrewjaebok@gmail.com">Get in touch ↗</a></footer></main>}
