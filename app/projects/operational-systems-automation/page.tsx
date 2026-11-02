import type { Metadata } from "next";
import { CaseStudyEnding, CaseStudyWorkspace } from "../../components/CaseStudyWorkspace";

export const metadata: Metadata = {
  title: "Operational Systems & Automation | Product Operations Case Study",
  description: "A Senior Product Operations case study on root-cause analysis, workflow automation, QA, asset continuity, and protection for customer ordering infrastructure.",
};

const caseNavigation = [
  { id: "overview", label: "Overview" },
  { id: "operating-model", label: "Operating model" },
  { id: "production-automation", label: "Automation" },
  { id: "asset-persistence", label: "Asset persistence" },
  { id: "traffic-protection", label: "Traffic protection" },
  { id: "quality", label: "QA" },
  { id: "scorecard", label: "Impact" },
  { id: "standardization", label: "Standardization" },
];

const operatingModel = [
  "Operational signal",
  "Workflow assessment",
  "Root-cause analysis",
  "Prioritization",
  "Requirements",
  "System improvement",
  "QA",
  "Rollout",
  "Measurement",
  "Standardization",
];

const decisionCriteria = [
  ["Frequency", "How often does the work or exception recur?"],
  ["Manual effort", "How much employee intervention does the workflow require?"],
  ["Error risk", "Could inconsistent handling affect output quality?"],
  ["Customer impact", "Does the friction create extra work or delay for customers or approvers?"],
  ["Production impact", "Does it interrupt proof or production continuity?"],
  ["Reusability", "Can the improvement strengthen more than one workflow or template?"],
  ["Implementation effort", "Is the operational leverage proportionate to the work and risk?"],
];

const productionBehaviors = [
  "Dynamic text handling",
  "Text overflow and overset handling",
  "Image placement and fitting",
  "QR placement",
  "Formatting rules",
  "Layer-specific behavior",
  "Proof-generation requirements",
  "Template-specific production logic",
];

const productionQa = [
  "Missing content",
  "Long or overset text",
  "Image fitting",
  "Missing images",
  "Layer availability",
  "Formatting variations",
];

const productionMetrics = [
  "Average manual time before vs. after",
  "Monthly workflow and proof volume",
  "Manual interventions",
  "Production corrections",
  "Error and rework rate",
  "Estimated hours saved per month",
];

const proofLifecycle = [
  "Customer uploads image",
  "Proof generated",
  "Revision requested",
  "Proof regenerated",
  "Asset may need retrieval",
  "Customer contact may be required",
  "Revision delayed",
];

const persistenceTests = [
  ["Initial upload", "First proof"],
  ["Initial upload → revision", "Regenerated proof"],
  ["Approver edit", "Regenerated proof"],
  ["Replacement image", "Updated proof"],
  ["Missing or invalid image", "Controlled exception"],
];

const qaFlow = [
  "Requirement",
  "Development / test",
  "Normal scenario",
  "Edge cases",
  "Production check",
  "Rollout",
  "Monitor",
  "Iterate",
];

const stakeholders = [
  ["Digital Services", "Workflow ownership and issue signals"],
  ["Customer Service", "Customer questions and exception context"],
  ["Prepress / Production", "Output requirements and production continuity"],
  ["IT / technical systems", "System constraints and implementation support"],
  ["Customers / approvers", "Proof inputs, revisions, and expected continuity"],
];

const standardization = [
  ["Implemented direction", "Reusable workflow logic", "Recurring production behaviors are handled consistently inside the workflow."],
  ["Implemented direction", "Defined expected behaviors", "Requirements clarify what normal and exception outcomes should be."],
  ["Implemented direction", "Exception handling", "Missing or invalid inputs are considered as workflow states, not surprises."],
  ["Next step", "Reusable QA scenarios", "Turn known normal and edge cases into a shared validation set."],
  ["Next step", "Documentation", "Record expected behaviors and troubleshooting guidance."],
  ["Next step", "Shared production standards", "Make successful patterns easier to reuse across future workflows."],
];

const backlog = [
  ["High", "Measure time and manual intervention", "Establish a reliable baseline and post-change comparison for automated workflows."],
  ["High", "Document recurring workflows", "Define expected behavior, known exceptions, and ownership."],
  ["High", "Categorize production exceptions", "Track recurring issues by root cause instead of treating them as isolated events."],
  ["Medium", "Identify additional automation candidates", "Review high-frequency manual work against the prioritization criteria."],
  ["Medium", "Create reusable QA scenarios", "Standardize normal, edge-case, and controlled-exception checks."],
  ["Future", "Build an operational dashboard", "Track workflow volume, intervention rate, errors, rework, and estimated time saved."],
];

export default function OperationalSystemsAutomation() {
  return <main id="top" className="case-study-page operations-case-study">
    <a className="skip-link" href="#overview">Skip to case study</a>
    <CaseStudyWorkspace
      number="PROJECT 04"
      archetype="OPERATIONAL SYSTEMS"
      shortTitle="Operational Systems"
      title="Operational Systems & Automation"
      subtitle="Building dependable systems behind digital production and customer ordering."
      summary="I investigated production friction and infrastructure risks, automated repeatable workflows, and implemented layered protection for customer ordering websites."
      metadata={[
        { label: "Project Role", value: "Senior Product Operations / Digital Services" },
        { label: "Scope", value: "Assessment · Automation · QA · Infrastructure protection" },
        { label: "Project type", value: "Production and ordering systems" },
        { label: "Status", value: "Implemented · Measurement maturing" },
      ]}
      navigation={caseNavigation}
      accent="operations"
      story={[
        { label: "Discovery", copy: "Recurring proof and production exceptions revealed patterns of repeated manual handling, inconsistent outcomes, and avoidable workflow interruption." },
        { label: "Decision", copy: "Prioritize recurring problems where a reusable system improvement could create operational leverage without introducing unacceptable production risk." },
        { label: "Delivery", copy: "Translated production rules into reusable automation, improved asset continuity through proof revisions, documented expected behavior, and validated normal and edge cases." },
        { label: "Impact", copy: "Production workflows are implemented and actively used. Layered traffic protection was implemented for customer ordering; production time savings remain directional." },
      ]}
    >
      <div className="executive-summary operations-summary" aria-label="Case study executive summary">
        <article><span>Problem</span><p>Recurring manual tasks, production exceptions, and workflow failures created unnecessary intervention across customer-facing proof and production processes.</p></article>
        <article><span>My ownership</span><p>Workflow assessment, requirements, prioritization, automation design, implementation, QA, troubleshooting, and continuous improvement.</p></article>
        <article><span>Key decision</span><p>Fix recurring problems at the system level rather than repeatedly treating individual symptoms.</p></article>
        <article><span>Impact · Verified + Directional</span><p>Production workflows are actively used. Customer ordering protection is implemented; production efficiency gains remain directional.</p></article>
      </div>

      <div className="evidence-boundary" aria-label="Evidence boundary">
        <b>Evidence boundary</b>
        <span><strong>Documented:</strong> live production workflow improvements and layered protection for customer ordering. Traffic results are detailed in Initiative 03; sensitive security configuration is excluded.</span>
        <span><strong>Directional:</strong> automated behaviors required less repeated manual handling, but the effect was not formally quantified.</span>
        <span><strong>Future KPI:</strong> manual interventions per week, processing time per workflow, exception rate, error and rework rate, volume handled, and workflow reliability.</span>
      </div>
    </CaseStudyWorkspace>

    <section className="operations-section shell" id="operating-model">
      <div className="operations-section-heading">
        <div><p className="kicker">Operating model</p><h2>Turn recurring friction into a reusable operational capability.</h2></div>
        <p>The objective was not to automate as much as possible. The objective was to identify recurring work that created meaningful customer friction, employee effort, production risk, error potential, or unnecessary intervention.</p>
      </div>
      <ol className="operations-flow" aria-label="Operational systems improvement process">
        {operatingModel.map((step, index) => <li key={step}><small>{String(index + 1).padStart(2, "0")}</small><strong>{step}</strong>{index < operatingModel.length - 1 && <span aria-hidden="true">→</span>}</li>)}
      </ol>
      <div className="operations-initiative-index" aria-label="Documented operational initiatives">
        <a href="#production-automation"><span>Initiative 01</span><strong>Production Workflow Automation</strong><p>Standardize predictable production behaviors.</p></a>
        <a href="#asset-persistence"><span>Initiative 02</span><strong>Proof Asset Persistence</strong><p>Protect customer assets through the revision lifecycle.</p></a>
        <a href="#traffic-protection"><span>Initiative 03</span><strong>Customer Ordering Protection</strong><p>Reduce unwanted traffic reaching the ordering infrastructure.</p></a>
      </div>
    </section>

    <section className="operations-section operations-priority shell" id="prioritization">
      <div className="operations-section-heading">
        <div><p className="kicker">Operational prioritization</p><h2>Not every manual task should be automated.</h2></div>
        <p>These criteria describe the decision logic used to distinguish high-value systemic improvements from isolated issues. They are not presented as a historical numerical scoring model.</p>
      </div>
      <div className="criteria-grid">
        {decisionCriteria.map(([criterion, description], index) => <article key={criterion}><span>{String(index + 1).padStart(2, "0")}</span><h3>{criterion}</h3><p>{description}</p></article>)}
      </div>
      <p className="operations-principle"><strong>Decision principle</strong> Prioritize recurring problems where a system-level improvement creates meaningful operational leverage.</p>
    </section>

    <section className="operations-initiative shell" id="production-automation">
      <header className="initiative-heading"><span>Initiative 01</span><div><p className="kicker">Production Workflow Automation</p><h2>Move predictable production behaviors out of repeated manual handling.</h2></div></header>

      <div className="initiative-brief">
        <article><span>Before</span><p>Production workflows required repeated manual handling and correction for predictable behaviors.</p></article>
        <article><span>Operational problem</span><p>Repeated intervention increased processing effort and created opportunities for inconsistent output and human error.</p></article>
        <article><span>Approach</span><p>Identify repeatable production rules and move appropriate behaviors into automated workflows while preserving existing production requirements.</p></article>
        <article><span>System response</span><p>Standardize recurring behaviors through production automation and reusable workflow logic.</p></article>
      </div>

      <div className="initiative-detail-grid">
        <div>
          <p className="kicker">Recurring workflow behaviors</p>
          <div className="behavior-list">{productionBehaviors.map(item => <span key={item}>{item}</span>)}</div>
        </div>
        <div>
          <p className="kicker">QA coverage</p>
          <p>Normal scenarios and edge cases were checked before relying on the automated behavior in production.</p>
          <div className="qa-chip-list">{productionQa.map(item => <span key={item}>{item}</span>)}</div>
        </div>
      </div>

      <div className="initiative-outcome">
        <div><span className="evidence-state verified">Verified implementation</span><h3>Repeatable production rules were moved into reusable automated workflows.</h3></div>
        <div><span className="evidence-state directional">Directional impact</span><p>The change reduced the need for repeated manual handling of the automated behaviors. No percentage or time-saving claim is made because a formal baseline was not captured.</p></div>
      </div>

      <div className="measurement-opportunities">
        <div><p className="kicker">Future KPI</p><h3>Build the operational baseline next.</h3><p>These are measurement opportunities, not existing results.</p></div>
        <ul>{productionMetrics.map(metric => <li key={metric}>{metric}</li>)}</ul>
      </div>
    </section>

    <section className="operations-initiative persistence-initiative shell" id="asset-persistence">
      <header className="initiative-heading"><span>Initiative 02</span><div><p className="kicker">Proof Asset Persistence</p><h2>A technical state issue became a workflow reliability problem.</h2></div></header>

      <ol className="lifecycle-flow" aria-label="Original proof asset workflow">
        {proofLifecycle.map((step, index) => <li key={step} className={index >= 4 ? "risk-step" : ""}><small>{String(index + 1).padStart(2, "0")}</small><strong>{step}</strong>{index < proofLifecycle.length - 1 && <span aria-hidden="true">→</span>}</li>)}
      </ol>
      <p className="workflow-consequence">When an approver requested changes or another proof was generated, losing the original uploaded asset could create unnecessary customer contact and rework across customers, approvers, Digital Services, and Production.</p>

      <div className="root-cause-grid">
        <article><span>Signal</span><p>Recurring problems during proof revisions revealed that uploaded customer assets were not reliably surviving the full proof lifecycle.</p></article>
        <article><span>Root cause</span><p>The workflow handled initial image placement but did not adequately account for asset persistence across later proof-generation and revision scenarios.</p></article>
        <article><span>Requirement</span><p>Customer-provided assets should remain available throughout the proof lifecycle unless intentionally replaced.</p></article>
        <article><span>System improvement</span><p>Proof revisions can reuse the appropriate uploaded asset rather than requiring the customer or employee to locate it again.</p></article>
      </div>

      <div className="validation-matrix">
        <div><p className="kicker">Validation scenarios</p><h3>Test the complete proof lifecycle.</h3></div>
        <div role="table" aria-label="Proof asset persistence validation scenarios">
          {persistenceTests.map(([input, expected]) => <div role="row" key={input}><span role="cell">{input}</span><b aria-hidden="true">→</b><strong role="cell">{expected}</strong></div>)}
        </div>
      </div>

      <div className="initiative-outcome">
        <div><span className="evidence-state verified">Verified implementation</span><h3>The workflow was updated to preserve the appropriate customer-provided asset through proof revision scenarios.</h3></div>
        <div><span className="evidence-state directional">Directional impact</span><p>The change removed a known source of unnecessary re-upload and retrieval work. Reupload frequency, employee interventions, and revision delay were not formally measured.</p></div>
      </div>
    </section>

    <section className="operations-initiative shell" id="traffic-protection">
      <header className="initiative-heading"><span>Initiative 03</span><div><p className="kicker">Customer Ordering Protection · 2026</p><h2>Protect the systems behind customer ordering.</h2></div></header>
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
      <div className="measurement-opportunities">
        <div><p className="kicker">Traffic results · Oct 30 – Nov 1, 2026</p><h3>97.3% lower measured request volume reaching the server.</h3><p>Average HTTP requests per minute reaching Apache. Figures represent requests, not unique visitors, bots, or orders.</p></div>
        <ol>
          <li><strong>1,877 requests/minute · Original flood</strong><p>Baseline request rate before the origin access restriction.</p></li>
          <li><strong>50.7 requests/minute · Measured after origin restriction</strong><p>About 1,826 fewer requests per minute, a 97.3% reduction compared with the original flood.</p></li>
          <li><strong>12.7 requests/minute · Estimated after two high-volume IP blocks</strong><p>Projected 99.3% reduction from the original flood, or approximately 75.0% below the 50.7 stage. This is an estimate, not a verified post-block result.</p></li>
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

    <section className="operations-section lifecycle-learning shell" id="lifecycle-learning">
      <div className="operations-section-heading">
        <div><p className="kicker">From isolated fixes to systemic thinking</p><h2>Early improvements can reveal a deeper workflow requirement.</h2></div>
        <p>The initial image-placement improvement solved an immediate production need. Revision scenarios then exposed the broader lifecycle requirement without making the original work a failure.</p>
      </div>
      <div className="learning-flow" aria-label="Evolution of the proof asset requirement">
        <article><span>Initial problem</span><p>Place the customer-provided image correctly.</p></article>
        <i aria-hidden="true">↓</i>
        <article><span>Broader observation</span><p>Proof revisions exposed an asset-lifecycle problem.</p></article>
        <i aria-hidden="true">↓</i>
        <article><span>Deeper requirement</span><p>The asset needs to survive the complete proof and revision lifecycle.</p></article>
        <i aria-hidden="true">↓</i>
        <article><span>System-level solution</span><p>Design around the complete workflow, not only the initial transaction.</p></article>
      </div>
      <blockquote>Automate the workflow lifecycle, not just an individual step.</blockquote>
    </section>

    <section className="operations-quality" id="quality">
      <div className="shell">
        <div className="operations-section-heading light">
          <div><p className="kicker">QA and change management</p><h2>Automation is dependable only when normal and exception behavior are validated.</h2></div>
          <p>Incorrect automation can repeat a problem at scale. Requirement clarity, edge-case validation, production checks, monitoring, and controlled exceptions are part of the Product Operations process.</p>
        </div>
        <ol className="quality-flow" aria-label="Quality assurance and rollout process">
          {qaFlow.map((step, index) => <li key={step}><small>{String(index + 1).padStart(2, "0")}</small><strong>{step}</strong></li>)}
        </ol>
        <div className="stakeholder-strip" aria-label="Operational stakeholders">
          {stakeholders.map(([name, role]) => <article key={name}><h3>{name}</h3><p>{role}</p></article>)}
        </div>
        <p className="process-boundary"><strong>Process boundary:</strong> This reflects the stakeholders and validation work involved. It does not imply a formal approval governance process where one did not exist.</p>
      </div>
    </section>

    <section className="operations-section shell" id="scorecard">
      <div className="operations-section-heading">
        <div><p className="kicker">Operational impact scorecard</p><h2>Track implementation, impact, and evidence separately.</h2></div>
        <p>The scorecard is designed to grow as additional operational initiatives are documented.</p>
      </div>
      <div className="impact-scorecard" role="table" aria-label="Operational impact scorecard">
        <div className="scorecard-row scorecard-header" role="row"><span role="columnheader">Initiative</span><span role="columnheader">Problem</span><span role="columnheader">Verified implementation</span><span role="columnheader">Directional impact</span><span role="columnheader">Future KPI</span></div>
        <div className="scorecard-row" role="row"><strong role="rowheader">Production Workflow Automation</strong><p role="cell">Repetitive manual production handling</p><p role="cell">Recurring production behaviors standardized through reusable automation</p><p role="cell">Less repeated handling of automated behaviors</p><p role="cell">Time, interventions, errors, volume</p></div>
        <div className="scorecard-row" role="row"><strong role="rowheader">Proof Asset Persistence</strong><p role="cell">Customer assets could require retrieval or re-upload during revisions</p><p role="cell">Appropriate asset retained through proof revision scenarios</p><p role="cell">Known source of unnecessary retrieval work removed</p><p role="cell">Reuploads, employee interventions, revision delays</p></div>
        <div className="scorecard-row" role="row"><strong role="rowheader">Customer Ordering Protection</strong><p role="cell">Heavy automated traffic reaching Apache and 4D infrastructure</p><p role="cell">Cloudflare and layered traffic protection implemented; website access verified</p><p role="cell">97.3% lower measured request rate; further reduction is projected</p><p role="cell">Request trends and legitimate customer access</p></div>
      </div>
    </section>

    <section className="operations-section standardization-section shell" id="standardization">
      <div className="operations-section-heading">
        <div><p className="kicker">Standardization and scalability</p><h2>Build repeatable production patterns, not one-off fixes.</h2></div>
        <p>The long-term goal is to reduce dependence on individual intervention and make successful operational improvements reusable across future workflows.</p>
      </div>
      <div className="standardization-list">
        {standardization.map(([status, title, copy]) => <article key={title} className={status === "Next step" ? "next-step" : ""}><span>{status}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>

    <section className="operations-section shell" id="backlog">
      <div className="operations-section-heading">
        <div><p className="kicker">Next-iteration backlog</p><h2>Make the operational system measurable and easier to reuse.</h2></div>
        <p>These are planned next steps, not completed work.</p>
      </div>
      <div className="backlog-table operations-backlog">
        {backlog.map(([priority, item, reason], index) => <article key={item}><b>{String(index + 1).padStart(2, "0")}</b><span className={`priority ${priority.toLowerCase()}`}>{priority}</span><h3>{item}</h3><p>{reason}</p></article>)}
      </div>
    </section>

    <section className="operations-takeaway shell">
      <p className="kicker">Operating evolution</p>
      <div className="evolution-line" aria-label="Senior Product Operations progression"><span>Fix individual problems</span><b>→</b><span>Identify recurring patterns</span><b>→</b><span>Build systemic improvements</span><b>→</b><span>Standardize validation and reuse</span><b>→</b><span>Measure operational impact</span></div>
      <h2>I identify recurring operational friction and build repeatable systems that reduce unnecessary intervention, improve workflow reliability, and create operational leverage across digital production.</h2>
    </section>

    <CaseStudyEnding
      capabilities={["Root Cause Analysis", "Process Automation", "Quality Assurance", "Operational Excellence", "System Standardization", "Infrastructure Troubleshooting"]}
      nextNumber="05"
      nextTitle="University Logo Directory Redesign"
      nextDescription="See how discovery signals, KPI design, and matched synthetic scenario testing shaped a second product iteration."
      nextHref="/projects/university-logo-directory"
    />
    <footer className="site-footer shell"><div><span className="brand-mark">A</span><strong>Andrew</strong></div><p>Digital operations · Product transformation</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
