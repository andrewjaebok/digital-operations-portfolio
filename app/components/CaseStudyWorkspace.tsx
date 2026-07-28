import Link from "next/link";
import type { ReactNode } from "react";
import CaseProgress from "./CaseProgress";

type NavItem = {
  id: string;
  label: string;
};

type MetaItem = {
  label: string;
  value: string;
};

type CaseStudyWorkspaceProps = {
  number: string;
  archetype: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  summary: string;
  metadata: MetaItem[];
  navigation: NavItem[];
  accent: "utility" | "rx" | "hearth" | "operations";
  children?: ReactNode;
};

type CaseStudyEndingProps = {
  capabilities: string[];
  nextNumber: string;
  nextTitle: string;
  nextDescription: string;
  nextHref: string;
};

export function CaseStudyWorkspace({
  number,
  archetype,
  shortTitle,
  title,
  subtitle,
  summary,
  metadata,
  navigation,
  accent,
  children,
}: CaseStudyWorkspaceProps) {
  return <>
    <header className="site-header case-header">
      <Link className="brand" href="/" aria-label="Portfolio home"><span className="brand-mark">A</span><span>Andrew</span></Link>
      <div className="case-header-context" aria-label="Current page"><span>Case study workspace</span><b>{`${number} / ${shortTitle}`}</b></div>
      <nav aria-label="Case study utilities"><Link href="/#project-quest">All projects</Link><a href="#case-navigation">Sections</a></nav>
    </header>

    <section className={`case-masthead case-masthead-${accent}`} id="overview">
      <div className="shell">
        <Link className="back-link" href="/#project-quest"><span aria-hidden="true">←</span> All projects</Link>
        <p className="case-record-label">{`${number} / ${archetype}`}</p>
        <div className="case-masthead-grid">
          <div>
            <h1>{title}</h1>
            <p className="case-masthead-subtitle">{subtitle}</p>
          </div>
          <p className="case-masthead-summary">{summary}</p>
        </div>
        <dl className="case-masthead-meta">
          {metadata.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
      </div>
    </section>

    <nav className={`case-study-nav case-study-nav-${accent}`} id="case-navigation" aria-label={`${shortTitle} case study sections`}>
      <div className="shell">
        <span>{number}</span>
        <div>{navigation.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</div>
      </div>
    </nav>
    <CaseProgress
      sections={navigation.map((item, index) => ({
        ...item,
        icon: String(index + 1).padStart(2, "0"),
      }))}
    />
    {children && <section className={`case-executive case-executive-${accent}`} aria-label={`${shortTitle} executive summary`}><div className="shell">{children}</div></section>}
  </>;
}

export function CaseStudyEnding({
  capabilities,
  nextNumber,
  nextTitle,
  nextDescription,
  nextHref,
}: CaseStudyEndingProps) {
  return <section className="case-study-ending shell" aria-labelledby="case-demonstrates-title">
    <div>
      <p className="kicker">What this demonstrates</p>
      <h2 id="case-demonstrates-title">Capabilities demonstrated through the work.</h2>
      <ul>{capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
    </div>
    <Link className="case-study-next" href={nextHref}>
      <span>Next case study · {nextNumber}</span>
      <strong>{nextTitle}</strong>
      <p>{nextDescription}</p>
      <b>Continue →</b>
    </Link>
  </section>;
}
