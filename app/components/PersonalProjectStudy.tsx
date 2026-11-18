import { assetPath } from "../../lib/asset-path";
import PortfolioImage from "./PortfolioImage";
import { CaseStudyEnding, CaseStudyWorkspace } from "./CaseStudyWorkspace";

type EvidenceSection = {
  id: string;
  label: string;
  title: string;
  items: readonly { title: string; detail: string }[];
};

type PersonalProjectStudyProps = {
  number: string;
  name: string;
  title: string;
  archetype: string;
  subtitle: string;
  summary: string;
  status: string;
  role: string;
  story: { discovery: string; decision: string; delivery: string; impact: string };
  gameplay?: { src: string; poster: string; caption: string };
  visualTitle: string;
  visuals: readonly { title: string; src: string; width: number; height: number; alt: string; caption: string }[];
  sections: readonly EvidenceSection[];
  capabilities: string[];
  next: { number: string; title: string; description: string; href: string };
};

export default function PersonalProjectStudy({
  number, name, title, archetype, subtitle, summary, status, role, story,
  gameplay, visualTitle, visuals, sections, capabilities, next,
}: PersonalProjectStudyProps) {
  return (
    <main id="top" className="case-study-page">
      <a className="skip-link" href="#overview">Skip to case study</a>
      <CaseStudyWorkspace
        number={number}
        archetype={archetype}
        shortTitle={name}
        title={title}
        subtitle={subtitle}
        summary={summary}
        metadata={[
          { label: "My role", value: role },
          { label: "Project stage", value: status },
        ]}
        navigation={[
          { id: "overview", label: "Overview" },
          ...(gameplay ? [{ id: "gameplay", label: "Gameplay video" }] : []),
          { id: "design-evidence", label: visualTitle },
          ...sections.map(({ id, label }) => ({ id, label })),
        ]}
        accent="hearth"
        story={[
          { label: "Discovery", copy: story.discovery },
          { label: "Decision", copy: story.decision },
          { label: "Delivery", copy: story.delivery },
          { label: "Impact", copy: story.impact },
        ]}
      />
      {gameplay && (
        <section className="shell featured-evidence" id="gameplay" aria-labelledby="gameplay-title">
          <h2 id="gameplay-title">Watch EmberWake gameplay</h2>
          <figure className="personal-gameplay">
            <video controls playsInline preload="none" width={430} height={932}
              poster={assetPath(gameplay.poster)} aria-label="EmberWake mobile gameplay recording"
              aria-describedby="gameplay-caption">
              <source src={assetPath(gameplay.src)} type="video/mp4" />
              <a href={assetPath(gameplay.src)}>Open the gameplay video</a>
            </video>
            <figcaption id="gameplay-caption">{gameplay.caption}</figcaption>
          </figure>
        </section>
      )}
      <section className="shell featured-evidence" id="design-evidence" aria-labelledby="design-evidence-title">
        <h2 id="design-evidence-title">{visualTitle}</h2>
        <ol className="personal-visual-sequence">
          {visuals.map(({ title, caption, ...image }) => (
            <li key={image.src}>
              <figure className="personal-evidence-figure">
                <PortfolioImage {...image} />
                <figcaption><strong>{title}</strong><p>{caption}</p></figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </section>
      {sections.map(({ id, title, items }) => (
        <section className="shell featured-evidence" id={id} aria-labelledby={id + "-title"} key={id}>
          <h2 id={id + "-title"}>{title}</h2>
          <dl className="personal-process-list">
            {items.map(item => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      <CaseStudyEnding
        capabilities={capabilities}
        nextNumber={next.number}
        nextTitle={next.title}
        nextDescription={next.description}
        nextHref={next.href}
      />
    </main>
  );
}
