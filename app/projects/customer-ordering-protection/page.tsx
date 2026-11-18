import type { Metadata } from "next";
import PortfolioImage from "../../components/PortfolioImage";
import { CaseStudyEnding, CaseStudyWorkspace } from "../../components/CaseStudyWorkspace";

export const metadata: Metadata = {
  title: "Customer Ordering Protection | Andrew",
  description: "How I reduced server request traffic and verified website access after the rollout.",
};

export default function CustomerOrderingProtection() {
  return (
    <main id="top" className="case-study-page operations-case-study">
      <a className="skip-link" href="#overview">Skip to case study</a>
      <CaseStudyWorkspace
        number="PROJECT 06"
        archetype="CUSTOMER ORDERING INFRASTRUCTURE"
        shortTitle="Ordering Protection"
        title="Customer Ordering Protection"
        subtitle="Reducing server traffic while preserving customer website access."
        summary="I investigated unusually heavy automated traffic on the infrastructure behind customer ordering, introduced layered protection, and verified website access after rollout."
        metadata={[
          { label: "My role", value: "Investigation, implementation, and validation" },
          { label: "Measured result", value: "1,877 → 50.7 requests per minute reaching Apache" },
          { label: "Observation window", value: "October 30 through November 1, 2026" },
        ]}
        navigation={[
          { id: "overview", label: "Overview" },
          { id: "traffic-protection", label: "Results and evidence" },
        ]}
        accent="operations"
        story={[
          { label: "Discovery", copy: "Apache logs showed a sharp rise in requests reaching the infrastructure that serves customer ordering." },
          { label: "Decision", copy: "Reduce the load at the server and verify that customers could still reach the site." },
          { label: "Delivery", copy: "Implemented layered protection, investigated a browser connectivity issue during rollout, and confirmed website access." },
          { label: "Impact", copy: "The measured rate of requests reaching Apache fell 97.3% after the origin access change." },
        ]}
      />

    <section className="operations-initiative shell" id="traffic-protection">
      <header className="initiative-heading"><span>Results</span><div><p className="kicker">Customer Ordering Protection · 2026</p><h2>Protect the systems behind customer ordering.</h2></div></header>
      <div className="initiative-brief">
        <article><span>Business context</span><p>Castle Press relies on customer ordering websites supported by Apache and 4D. Unusually heavy automated traffic prompted an investigation into protecting the platform and maintaining customer access.</p></article>
        <article><span>My ownership</span><p>Investigated the hosting environment and traffic patterns, configured Cloudflare and DNS, troubleshot browser connectivity, and reviewed traffic data following the changes.</p></article>
        <article><span>Key decision</span><p>Introduce layered protection around the existing platform. Evaluate the full request path and balance traffic filtering with accessibility for legitimate customers.</p></article>
        <article><span>Constraints</span><p>Work within the existing production environment and preserve the customer ordering experience while introducing infrastructure improvements.</p></article>
      </div>
      <div className="root-cause-grid">
        <article><span>01 · Investigate</span><p>Reviewed the relationship between DNS, web hosting, and the ordering application. Used traffic patterns to guide the response rather than treating high activity as customer demand.</p></article>
        <article><span>02 · Implement</span><p>Configured Cloudflare protection and updated DNS settings as part of a broader infrastructure response around the existing Apache and 4D platform.</p></article>
        <article><span>03 · Troubleshoot</span><p>Investigated browser connectivity issues during rollout, adjusted the configuration, and confirmed website access afterward.</p></article>
        <article><span>04 · Review</span><p>Reviewed request data following the changes to assess the response and guide further adjustments. Implementation and measured effectiveness were treated as separate questions.</p></article>
      </div>
      <section className="featured-evidence" aria-labelledby="ordering-access-check-title">
        <h2 id="ordering-access-check-title">Browser access check after rollout</h2>
        <p>During rollout, browser connectivity became an issue. I adjusted the configuration, then checked that the customer-facing website could open in a browser again. That confirmed page access for this check. Order completion was outside its scope.</p>
      </section>
      <figure style={{ margin: "32px 0", padding: "24px", border: "1px solid var(--line)", borderRadius: 14 }}>
        <figcaption><p className="kicker">Traffic comparison</p><h3>Fewer requests reaching the ordering server</h3><p>Average HTTP requests per minute · Oct 30 – Nov 1, 2026</p></figcaption>
        <svg viewBox="0 0 900 215" role="img" aria-labelledby="traffic-chart-title traffic-chart-description" style={{ width: "100%", height: "auto", display: "block" }}>
          <title id="traffic-chart-title">97.3% lower measured origin request rate</title>
          <desc id="traffic-chart-description">Before: 1,877 requests per minute. After the origin access change: 50.7 requests per minute. Both bars use the same linear scale.</desc>
          <g fill="currentColor" fontSize="20">
            <text x="10" y="32">Before</text><text x="875" y="32" textAnchor="end">1,877 / min</text>
            <text x="10" y="125">After</text><text x="875" y="125" textAnchor="end">50.7 / min</text>
          </g>
          <rect x="10" y="47" width="865" height="28" rx="4" fill="#64748b"/>
          <rect x="10" y="140" width="865" height="28" rx="4" fill="#e2e8f0"/>
          <rect x="10" y="140" width="23.36" height="28" rx="4" fill="#c75b20"/>
        </svg>
      </figure>
      <div className="initiative-detail-grid">
        <figure style={{ margin: 0, minWidth: 0 }}>
          <PortfolioImage src="/images/ordering-protection/cloudflare-traffic.png" width={1205} height={390} alt="Cloudflare request graph from an earlier observation window: 1.44k total, 105 mitigated, 31 served by Cloudflare, and 1.31k served by origin." style={{ width: "100%", height: "auto", background: "white", borderRadius: 8 }} />
          <figcaption><h3>Traffic investigation evidence</h3><p>Original Cloudflare graph from Oct 30. This earlier dashboard window shows requests mitigated and served; it is separate from the origin-log comparison above. Source IPs and unrelated panels have been cropped out.</p></figcaption>
        </figure>
        <figure style={{ margin: 0, minWidth: 0 }}>
          <PortfolioImage src="/images/ordering-protection/cloudflare-actions.png" width={400} height={197} alt="Cloudflare security actions panel showing 91 blocks and 14 managed challenges." style={{ width: "100%", maxWidth: 400, height: "auto", background: "white", borderRadius: 8 }} />
          <figcaption><h3>Security actions observed</h3><p>The captured dashboard lists 91 blocks and 14 managed challenges. These counts document actions in that dashboard window; they do not establish the later rate limiting rule’s effectiveness or the 97.3% origin reduction.</p></figcaption>
        </figure>
      </div>
      <div className="measurement-opportunities">
        <div><p className="kicker">Traffic results · Oct 30 – Nov 1, 2026</p><h3>97.3% lower measured request volume reaching the server.</h3><p>Average HTTP requests per minute reaching Apache. Figures represent requests, not unique visitors, bots, or orders.</p></div>
        <ol>
          <li><strong>1,877 requests/minute · Original flood</strong><p>Baseline request rate before the origin access restriction.</p></li>
          <li><strong>50.7 requests/minute · Measured after origin restriction</strong><p>About 1,826 fewer requests per minute, a 97.3% reduction compared with the original flood.</p></li>
        </ol>
      </div>
      <div className="initiative-detail-grid">
        <div><p className="kicker">Why this was beneficial</p><h3>Reduce unnecessary work reaching the ordering infrastructure.</h3><p>Fewer unwanted requests reaching Apache means fewer requests for the server to handle. This reduces traffic pressure around the customer ordering platform and supports the goal of preserving capacity for legitimate customers.</p><p>The measured benefit is lower incoming request volume. Faster checkout, lower CPU usage, higher conversion, and avoided downtime were not measured and are not claimed.</p></div>
        <div><p className="kicker">How the figures were assessed</p><p>The 1,877 and 50.7 rates are documented in the Castle Press Website Traffic Reduction review for Oct 30 – Nov 1, 2026. The 12.7 estimate was calculated by removing the two blocked sources’ prior requests from an observed six-hour sample. A fresh post-block log is needed to verify that projection.</p><p>These are comparisons across observation periods, not a controlled experiment. Traffic patterns may also vary over time.</p></div>
      </div>
      <div className="initiative-outcome">
        <div><span className="evidence-state verified">Implemented</span><h3>Layered traffic protection added to the customer ordering environment.</h3><p>Cloudflare protection was configured and website access was verified following the rollout. Traffic reviews informed the subsequent response. The documented measured request rate fell 97.3%. Detailed security settings remain private.</p></div>
        <div><span className="evidence-state directional">Operational learning</span><h3>Infrastructure changes need both technical checks and customer access validation.</h3><p>The work extended my operational ownership from ordering workflows to the infrastructure supporting them. A configuration change is only useful when the platform remains accessible and its effects are reviewed.</p></div>
      </div>
    </section>

      <CaseStudyEnding
        capabilities={["Traffic analysis", "Rollout validation", "Customer access"]}
        nextNumber="PROJECT 04"
        nextTitle="Operational Systems & Automation"
        nextDescription="Keeping customer files available through proof revisions."
        nextHref="/projects/operational-systems-automation"
      />
    </main>
  );
}
