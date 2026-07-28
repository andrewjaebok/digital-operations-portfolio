import type { Metadata } from "next";
import Link from "next/link";
import CaseProgress from "../../components/CaseProgress";

export const metadata: Metadata = {
  title: "Operational Systems & Automation | Product Operations Case Study",
  description: "A Senior Product Operations case study on root-cause analysis, workflow automation, QA, asset continuity, and repeatable digital-production systems.",
};

const progressSections = [
  { id: "overview", label: "Overview", icon: "⚙" },
  { id: "operating-model", label: "Operating model", icon: "→" },
  { id: "prioritization", label: "Prioritization", icon: "◎" },
  { id: "production-automation", label: "Production automation", icon: "◇" },
  { id: "asset-persistence", label: "Asset persistence", icon: "↻" },
  { id: "lifecycle-learning", label: "System learning", icon: "↗" },
  { id: "quality", label: "QA and rollout", icon: "✓" },
  { id: "scorecard", label: "Impact scorecard", icon: "▦" },
  { id: "standardization", label: "Standardization", icon: "⌘" },
  { id: "backlog", label: "Next steps", icon: "☷" },
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
  return <main id="top" className="operations-case-study">
    <CaseProgress sections={progressSections} />
    <a className="skip-link" href="#overview">Skip to case study</a>

    <header className="site-header case-header">
      <Link className="brand" href="/" aria-label="Portfolio home"><span className="brand-mark">A</span><span>Andrew</span></Link>
      <div className="case-header-context" aria-label="Current page"><span>Case study</span><b><i aria-hidden="true">⚙</i> 04 / Operational Systems</b></div>
      <nav aria-label="Case study navigation"><Link href="/">All projects</Link><a href="#scorecard">Evidence</a><a href="#backlog">Backlog</a></nav>
    </header>

    <div className="project-context-bar">
      <div className="shell">
        <nav className="case-breadcrumb" aria-label="Breadcrumb"><Link href="/">Portfolio</Link><span aria-hidden="true">/</span><strong>Operational Systems &amp; Automation</strong></nav>
        <span className="case-page-label">Project case study · 04</span>
      </div>
    </div>

    <section className="case-hero shell operations-hero" id="overview">
      <Link className="back-link" href="/"><span aria-hidden="true">←</span> Back to all projects</Link>
      <p className="kicker">Senior Product Operations · Digital production systems</p>
      <h1>Operational Systems &amp; Automation</h1>
      <p className="operations-subtitle">Building repeatable systems behind digital production.</p>
      <p className="case-lead">I identified recurring friction across proof and production workflows, investigated root causes, and moved repeatable behaviors into more dependable systems. The operating principle was simple: fix recurring problems at the system level instead of repeatedly treating individual symptoms.</p>

      <div className="executive-summary operations-summary" aria-label="Case study executive summary">
        <article><span>Operational problem</span><p>Recurring manual tasks, production exceptions, and workflow failures created unnecessary intervention across customer-facing proof and production processes.</p></article>
        <article><span>What I owned</span><p>Workflow assessment, problem identification, requirements, prioritization, automation design, implementation, QA, troubleshooting, and continuous improvement.</p></article>
        <article><span>Operating principle</span><p>Fix recurring problems at the system level rather than repeatedly treating individual symptoms.</p></article>
        <article><span>Primary outcome</span><p>More standardized and resilient digital-to-production workflows with less unnecessary manual handling of the automated behaviors.</p></article>
      </div>

      <div className="evidence-boundary" aria-label="Evidence boundary">
        <b>Evidence boundary</b>
        <span><strong>Verified:</strong> workflow improvements were implemented and used in live production workflows.</span>
        <span><strong>Directional:</strong> automated behaviors required less repeated manual handling, but the effect was not formally quantified.</span>
        <span><strong>Future measurement:</strong> time, volume, interventions, corrections, rework, and workflow reliability.</span>
      </div>
    </section>

    <section className="operations-section shell" id="operating-model">
      <div className="operations-section-heading">
        <div><p className="kicker">Operating model</p><h2>Turn recurring friction into a reusable operational capability.</h2></div>
        <p>The objective was not to automate as much as possible. The objective was to identify recurring work that created meaningful customer friction, employee effort, production risk, error potential, or unnecessary intervention.</p>
      </div>
      <ol className="operations-flow" aria-label="Operational systems improvement process">
        {operatingModel.map((step, index) => <li key={step}><small>{String(index + 1).padStart(2, "0")}</small><strong>{step}</strong>{index < operatingModel.length - 1 && <span aria-hidden="true">→</span>}</li>)}
      </ol>
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
        <div><p className="kicker">Future measurement</p><h3>Build the operational baseline next.</h3><p>These are measurement opportunities, not existing results.</p></div>
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
        <div className="scorecard-row scorecard-header" role="row"><span role="columnheader">Initiative</span><span role="columnheader">Problem</span><span role="columnheader">Verified implementation</span><span role="columnheader">Directional impact</span><span role="columnheader">Future measurement</span></div>
        <div className="scorecard-row" role="row"><strong role="rowheader">Production Workflow Automation</strong><p role="cell">Repetitive manual production handling</p><p role="cell">Recurring production behaviors standardized through reusable automation</p><p role="cell">Less repeated handling of automated behaviors</p><p role="cell">Time, interventions, errors, volume</p></div>
        <div className="scorecard-row" role="row"><strong role="rowheader">Proof Asset Persistence</strong><p role="cell">Customer assets could require retrieval or re-upload during revisions</p><p role="cell">Appropriate asset retained through proof revision scenarios</p><p role="cell">Known source of unnecessary retrieval work removed</p><p role="cell">Reuploads, employee interventions, revision delays</p></div>
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

    <section className="next-project shell"><span>Return to the portfolio</span><h2>See the customer-facing and zero-to-one work these operating principles support.</h2><Link href="/">View all projects <b aria-hidden="true">↗</b></Link></section>
    <footer className="site-footer shell"><div><span className="brand-mark">A</span><strong>Andrew</strong></div><p>Digital operations · Product transformation</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
