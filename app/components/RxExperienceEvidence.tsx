import "./RxExperienceEvidence.css";

const journey=[
 {step:"01",name:"Discover",question:"Is this a trustworthy supplier?",friction:"Product information and order actions competed for attention on the legacy entry page.",response:"Separate the welcome, trust, product education, and next-action content."},
 {step:"02",name:"Understand",question:"What's the difference between pocket and desk pads?",friction:"Dense copy and repeated links made the formats difficult to compare.",response:"Present product formats as distinct, scannable cards with practical guidance."},
 {step:"03",name:"Configure",question:"How many prescribers should this order cover?",friction:"One-to-ten choices were displayed in long lists.",response:"Group choices into a consistent selection grid while preserving 20 existing destinations."},
 {step:"04",name:"Continue",question:"What information is required to place an order?",friction:"Regulatory guidance, production timing and product choices were dispersed.",response:"Surface requirements and next steps within the customer journey while preserving the 4D ordering handoff."}
];
const designDecisions=[
 {name:"Separate page responsibilities",before:"Education, ordering controls and support appeared together.",after:"A trust/education landing page leads into a focused ordering page.",why:"Give each screen one clearer job."},
 {name:"Product comparison",before:"Two pad formats were embedded in dense information.",after:"Pocket and desk formats appear as comparable selection cards.",why:"Reduce the mental work required to compare formats."},
 {name:"Prescriber count",before:"Repeated vertical links for each configuration.",after:"Scannable one-to-ten option groups.",why:"Make the required choice more recognizable without changing destinations."},
 {name:"Operational compatibility",before:"Ordering depends on existing 4D form and session behavior.",after:"Customer-facing presentation changed while established integration remained.",why:"Improve usability without destabilizing fulfillment."}
];
const heuristic=[
 {principle:"Recognition rather than recall",evidence:"The original prescriber lists demanded repeated scanning; the redesign groups formats and counts.",next:"Observe whether users find the correct configuration without assistance."},
 {principle:"Match with real-world concepts",evidence:"Pocket and desk remain recognizable product categories, supported by descriptions.",next:"Check whether first-time buyers can explain the difference accurately."},
 {principle:"Consistency and standards",evidence:"Shared spacing, cards and controls are described across both updated surfaces.",next:"Audit field, button and error patterns across the complete live order journey."},
 {principle:"Error prevention",evidence:"Prescriber selections still route into the preexisting ordering system.",next:"Test wrong-format/wrong-count recovery and validation errors on the real flow."}
];
const measurement=[
 ["Landing arrival","Qualified landing sessions","Existing analytics provide traffic, not unique qualified intent"],
 ["Product consideration","Format-card interaction","Proposed event; not currently reported"],
 ["Configuration","Prescriber-count selection","Proposed event; not currently reported"],
 ["Order handoff","Entry to existing 4D order workflow","Proposed event; not currently reported"],
 ["Order completion","Confirmed completed order / abandonment","GA4 completed-order event not configured in available evidence"]
];
export default function RxExperienceEvidence(){
 return <>
 <section className="shell rx-exp-section" id="rx-journey" aria-labelledby="rx-journey-title">
  <p className="kicker">01 / UX customer journey</p><h2 id="rx-journey-title">Four decisions between finding us and placing an order.</h2>
  <p className="rx-exp-lead">This journey translates documented page friction and delivered changes into a customer-decision map. The questions are illustrative design prompts, not verbatim customer quotes or a formal recorded interview study.</p>
  <div className="rx-journey-grid">{journey.map(item=><article key={item.step}><span>{item.step} / {item.name}</span><h3>{item.question}</h3><dl><dt>Observed design problem</dt><dd>{item.friction}</dd><dt>Design response</dt><dd>{item.response}</dd></dl></article>)}</div>
 </section>
 <section className="shell rx-exp-section" id="rx-wireframes" aria-labelledby="rx-wireframes-title">
  <p className="kicker">02 / Wireframes and visual decisions</p><h2 id="rx-wireframes-title">One decision at a time, without rebuilding the order system.</h2>
  <p className="rx-exp-lead"><strong>Reconstructed wireframes:</strong> these are retrospective diagrams of the design logic, not original pre-development drawings or Figma files. Original before/after production screenshots remain in the execution section.</p>
  <div className="rx-wireframe-grid">
   <figure><div className="rx-wireframe rx-wireframe-before"><div className="rx-wireframe-bar">Legacy entry / conceptual</div><div className="rx-wf-row"><span/><span/><span/></div><div className="rx-wf-grid">{Array.from({length:12},(_,i)=><i key={i}/>)}</div><div className="rx-wf-row"><span/><span/><span/></div></div><figcaption><b>Before:</b> Education, options, and actions compete within a dense view.</figcaption></figure>
   <figure><div className="rx-wireframe"><div className="rx-wireframe-bar">Redesigned landing / conceptual</div><div className="rx-wf-heading">California Security Prescription Pads</div><div className="rx-wf-subtitle"/><div className="rx-wf-cta">Explore available pad formats</div><div className="rx-wf-cards"><span>Trust &amp; requirements</span><span>Product education</span></div><div className="rx-wf-row"><span/><span/></div></div><figcaption><b>After, step one:</b> Establish purpose, information, and a primary order path.</figcaption></figure>
   <figure><div className="rx-wireframe"><div className="rx-wireframe-bar">Redesigned selection / conceptual</div><div className="rx-wf-heading">Select a pad format</div><div className="rx-wf-cards"><span>Pocket pads</span><span>Desk pads</span></div><div className="rx-wf-heading rx-wf-smaller">Select prescriber count</div><div className="rx-wf-nums">{Array.from({length:10},(_,i)=><span key={i}>{i+1}</span>)}</div></div><figcaption><b>After, step two:</b> Compare formats and locate one of ten configurations.</figcaption></figure>
  </div>
  <h3 className="rx-exp-subhead">Design decision rationale</h3><div className="rx-decisions">{designDecisions.map(d=><article key={d.name}><h4>{d.name}</h4><p><b>Before:</b> {d.before}</p><p><b>After:</b> {d.after}</p><p><b>Why:</b> {d.why}</p></article>)}</div>
 </section>
 <section className="shell rx-exp-section" id="rx-validation" aria-labelledby="rx-validation-title">
  <p className="kicker">04 / Usability and heuristic evaluation</p><h2 id="rx-validation-title">Design hypotheses, not invented usability-test results.</h2>
  <p className="rx-exp-lead">The case study already contains operational QA, order counts, support questions, and GA4 acquisition evidence. A participant-based usability study and controlled A/B test are <strong>not documented as completed</strong>. The review below is an evidence-based retrospective heuristic interpretation, not a scored expert audit.</p>
  <div className="rx-heuristic-grid">{heuristic.map(h=><article key={h.principle}><h3>{h.principle}</h3><p><b>Available evidence:</b> {h.evidence}</p><p><b>Validation still needed:</b> {h.next}</p></article>)}</div>
  <div className="rx-research-plan"><h3>Real-user validation protocol to run</h3><ol><li>Recruit customers or representative participants and record relevant experience levels</li><li>Ask each participant to identify pad types, select a format and prescriber count, and locate compliance/timing guidance</li><li>Capture task completion, selection errors, elapsed time, confidence/ease, and any assistance required</li><li>Record task instructions and order, compare devices, and disclose sample size and limitations before reporting outcomes</li></ol></div>
 </section>
 <section className="shell rx-exp-section" id="rx-accessibility" aria-labelledby="rx-accessibility-title">
  <p className="kicker">05 / WCAG 2.2 AA evidence and testing plan</p><h2 id="rx-accessibility-title">Accessibility is a testable requirement, not a design claim.</h2>
  <p className="rx-exp-lead">The portfolio documents responsive choices and describes accessible controls. This review identifies what can be inferred from the documented redesign and what still requires hands-on testing on the actual customer site. No WCAG conformance is claimed.</p>
  <div className="rx-wcag-table" role="table" aria-label="Accessibility test plan">
   <div className="rx-wcag-head" role="row"><b role="columnheader">WCAG 2.2 criterion</b><b role="columnheader">Current evidence</b><b role="columnheader">Required verification</b></div>
   <div role="row"><b role="cell">1.3.1 Information and Relationships</b><span role="cell">Prescriber options and categories are visually grouped</span><span role="cell">Check semantic headings, labels and form groups</span></div>
   <div role="row"><b role="cell">1.4.3 Contrast (Minimum)</b><span role="cell">Updated typography and color system are shown in screenshots</span><span role="cell">Measure rendered contrast for normal and interactive states</span></div>
   <div role="row"><b role="cell">2.1.1 Keyboard</b><span role="cell">Selection controls are described as accessible, but no recorded keyboard audit</span><span role="cell">Complete the entire live flow using keyboard only</span></div>
   <div role="row"><b role="cell">2.4.7 Focus Visible</b><span role="cell">Focus state behavior not independently verified</span><span role="cell">Check visible focus across product choices and order transitions</span></div>
   <div role="row"><b role="cell">3.3.1 Error Identification</b><span role="cell">Order form handling is preserved by the existing 4D system</span><span role="cell">Test invalid/missing data and understandable error recovery</span></div>
   <div role="row"><b role="cell">1.4.10 Reflow</b><span role="cell">Responsive layout is shown; no documented 320 CSS px / zoom audit</span><span role="cell">Test at narrow widths and 400% zoom</span></div>
  </div>
  <p className="rx-exp-caveat">Status: <strong>audit not completed</strong>. Screenshots and code descriptions do not establish assistive-technology compatibility. A formal outcome requires testing the actual production pages and documenting failures, fixes, and retesting.</p>
 </section>
 <section className="shell rx-exp-section" id="rx-design-measurement" aria-labelledby="rx-design-measurement-title">
  <p className="kicker">06 / Component system and digital analytics</p><h2 id="rx-design-measurement-title">Connect interface decisions to measurable customer tasks.</h2>
  <div className="rx-component-library" aria-label="Retrospective interface component documentation">
   <article><span className="rx-component-pill">Pocket pads</span><span className="rx-component-pill">Desk pads</span><h3>Product choice</h3><p>Distinct product categories paired with descriptive content instead of repeated unlabeled links.</p></article>
   <article><div className="rx-component-nums">{[1,2,3,4,5].map(n=><span key={n}>{n}</span>)}</div><h3>Prescriber count</h3><p>Consistent one-to-ten selections map to the original production destinations.</p></article>
   <article><div className="rx-component-button">Continue to order ↗</div><h3>Primary action</h3><p>Clear transitions between information, selection, and the existing order system.</p></article>
  </div>
  <p className="rx-exp-caveat">Component examples are documentation, not a claim that an exportable Figma library has been built.</p>
  <h3 className="rx-exp-subhead">Proposed funnel instrumentation</h3>
  <div className="rx-wcag-table" role="table" aria-label="Proposed product analytics events"><div className="rx-wcag-head" role="row"><b role="columnheader">Stage</b><b role="columnheader">Future measure</b><b role="columnheader">Evidence status</b></div>{measurement.map(row=><div role="row" key={row[0]}><strong role="cell">{row[0]}</strong><span role="cell">{row[1]}</span><span role="cell">{row[2]}</span></div>)}</div>
  <div className="rx-research-plan"><h3>Experiment proposal · not executed</h3><p><b>Hypothesis:</b> More prominent product-format guidance will reduce incorrect initial selections compared with a choice-only layout. <b>Primary measure:</b> correct-format task completion. <b>Guardrails:</b> order-start rate, form errors, and mobile usability. A randomized experiment would require sufficient traffic, measurement integrity, and an approved release plan.</p></div>
 </section>
 </>;
}
