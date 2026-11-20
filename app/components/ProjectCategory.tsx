import type { ReactNode } from "react";
import Link from "next/link";
import { categories } from "../data/categories";
import PortfolioImage from "./PortfolioImage";
import PortfolioNav from "./PortfolioNav";
import "./ProjectCategory.css";

type ProjectPreview =
  | { src: string; width: number; height: number; layout?: "contain" | "top" }
  | { kind: "proof-revision" | "request-rate" };

export type ProjectCard = {
  slug: string;
  title: string;
  summary: string;
  preview: ProjectPreview;
};

type ProjectCategoryProps = {
  categoryId: (typeof categories)[number]["id"];
  description: string;
  projects: readonly ProjectCard[];
  children?: ReactNode;
};

export default function ProjectCategory({ categoryId, description, projects, children }: ProjectCategoryProps) {
  const category = categories.find(({ id }) => id === categoryId)!;

  return (
    <main>
      <PortfolioNav />
      <section className="category-intro category-intro--three shell">
        <Link href="/#work" className="back-link">← All three areas</Link>
        <h1>{category.title}</h1>
        <p>{description}</p>
        <nav className="category-tabs" aria-label="Project categories">
          {categories.map(({ id, title, route }) => (
            <Link key={id} href={route} aria-current={id === categoryId ? "page" : undefined}>
              {title}
            </Link>
          ))}
        </nav>
      </section>
      <section className="shell category-projects" aria-label={`${category.title} case studies`}>
        <ul className="case-card-grid" role="list">
          {projects.map(({ slug, title, summary, preview }) => (
            <li key={slug}>
              <Link
                className="case-card"
                href={`/projects/${slug}`}
                aria-labelledby={`${slug}-title ${slug}-action`}
                aria-describedby={`${slug}-summary`}
              >
                <div className="case-card-preview" aria-hidden="true">
                  {"src" in preview ? (
                    <PortfolioImage
                      className={preview.layout}
                      src={preview.src}
                      width={preview.width}
                      height={preview.height}
                      sizes="(max-width: 600px) calc(100vw - 26px), (max-width: 960px) 47vw, 380px"
                      alt=""
                    />
                  ) : preview.kind === "proof-revision" ? (
                    <div className="case-proof-illustration">
                      <span>Customer upload</span>
                      <span>Revised proof</span>
                    </div>
                  ) : (
                    <div className="case-traffic-illustration">
                      <span>Before</span><i />
                      <span>After</span><i />
                    </div>
                  )}
                </div>
                <div className="case-card-body">
                  <h2 id={`${slug}-title`}>{title}</h2>
                  <p id={`${slug}-summary`}>{summary}</p>
                  <span className="case-card-action" id={`${slug}-action`}>View case study</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {children}
      <footer className="site-footer shell">
        <Link href="/#work">← Return to the hub</Link>
        <a href="mailto:andrewjaebok@gmail.com">Get in touch ↗</a>
      </footer>
    </main>
  );
}
