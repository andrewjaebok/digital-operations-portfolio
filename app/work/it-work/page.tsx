import Link from "next/link";
import ProjectCategory, { type ProjectCard } from "../../components/ProjectCategory";
import "../../components/ITDecisionNarrative.css";

const description = "Reliable systems behind the customer experience.";
export const metadata = { title: "IT Work | Andrew", description };

const projects: ProjectCard[] = [
  {
    slug: "operational-systems-automation",
    title: "Operational Systems & Automation",
    summary: "Revised proofs reuse the original customer upload, saving staff from having to retrieve the file again.",
    preview: { kind: "proof-revision" },
  },
  {
    slug: "customer-ordering-protection",
    title: "Customer Ordering Protection",
    summary: "The measured request rate reaching the ordering server fell 97.3% after the access change.",
    preview: { kind: "request-rate" },
  },
];

export default function CategoryPage() {
  return (
    <ProjectCategory categoryId="it-work" description={description} projects={projects}>
      <section className="shell it-decision-intro" aria-labelledby="it-decision-intro-title">
        <div>
          <p className="eyebrow">Technical judgment &amp; operational ownership</p>
          <h2 id="it-decision-intro-title">The important work happened before and after the fix.</h2>
          <p>Each initiative began with a recurring operational signal. The work involved narrowing the root cause, weighing service continuity against change risk, implementing a targeted improvement, and checking whether the workflow still supported employees and customers.</p>
        </div>
        <div className="it-decision-stages" aria-label="IT decision process">
          <span>Investigate signal</span><b aria-hidden="true">→</b>
          <span>Evaluate tradeoffs</span><b aria-hidden="true">→</b>
          <span>Protect critical workflows</span><b aria-hidden="true">→</b>
          <span>Validate and learn</span>
        </div>
        <Link href="/projects/operational-systems-automation/#decision-records" className="it-decision-link">
          Explore three documented technical decisions
        </Link>
      </section>
    </ProjectCategory>
  );
}
