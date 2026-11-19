import { assetPath } from "../../lib/asset-path";
import PortfolioImage from "./PortfolioImage";

type WireframeBoardProps = {
  file: string;
  name: string;
  description: string;
};

export default function WireframeBoard({ file, name, description }: WireframeBoardProps) {
  const src = `/images/wireframes/${file}-full-wireframe.svg`;

  return (
    <section className="shell featured-evidence" id="full-wireframe" aria-labelledby="full-wireframe-title">
      <h2 id="full-wireframe-title">Full workflow wireframes</h2>
      <p>{description}</p>
      <div className="featured-case-links">
        <a href={assetPath(src)} target="_blank" rel="noopener">Open full-size board <span>SVG · Opens in a new tab</span></a>
      </div>
      <details className="wireframe-board">
        <summary>Preview the board</summary>
        <PortfolioImage src={src} width={1360} height={2170} alt={`${name} retrospective wireframe board showing the task flow, eight annotated screens, and acceptance criteria.`} />
      </details>
    </section>
  );
}
