import "./RegionalUtilityUX.css";

const decisions = [
  {number:"01",title:"Report discovery",problem:"People had to scan a dense report matrix to locate a particular report.",choice:"Keep the underlying table, but introduce a search entry point across region, filename, status, version, language, and path.",reason:"Reduce manual scanning without changing the existing report naming or approval process."},
  {number:"02",title:"Production status",problem:"Color was useful as a visual cue, but the passive legend demanded interpretation.",choice:"Retain familiar status terms and turn them into descriptive interactive filters.",reason:"Make the status actionable without retraining users or changing production semantics."},
  {number:"03",title:"Bilingual access",problem:"Separate stacked English and Spanish tables increased visual scanning and context switching.",choice:"Present language options as clear tabs while preserving the underlying file links.",reason:"Let customers change language context without searching through another full table."},
  {number:"04",title:"Region and batch organization",problem:"Customers reviewed reports in recurring geographic batches.",choice:"Emphasize region and batch grouping, supported by summaries and consistent hierarchy.",reason:"Follow the customer's existing mental model rather than invent a new workflow."},
];

const patterns = [
  {name:"Search",input:"Query entered",response:"Matching rows update; report structure stays intact",check:"Queries, empty results, and keyboard focus"},
  {name:"Status filters",input:"A status is selected",response:"Matching report states are emphasized with text and color",check:"Selected state, labels, and contrast"},
  {name:"Language tabs",input:"English or Spanish selected",response:"The relevant language set appears without changing report identity",check:"Tab semantics, focus, and language labels"},
  {name:"Responsive layout",input:"Viewport narrows",response:"Navigation and report information remain usable on smaller screens",check:"Zoom, overflow, and target sizes"},
];

export default function RegionalUtilityUX() {
  return (
    <>
      <section className="shell utility-ux-section" id="ux-design" aria-labelledby="utility-ux-title">
        <div className="utility-ux-heading"><p className="kicker">UX design rationale</p><h2 id="utility-ux-title">From report matrix to task-focused experience.</h2><p>The delivered interface is documented through four concrete interaction decisions. The diagrams below are <strong>retrospective explanatory reconstructions</strong>, not original pre-development wireframes or a claim that a formal Figma design process was used.</p></div>
        <h3 className="utility-ux-subheading" id="ux-decisions">01 / Annotated UX design decisions</h3>
        <div className="utility-ux-decisions">{decisions.map(item=><article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p><strong>Friction:</strong> {item.problem}</p><p><strong>Design decision:</strong> {item.choice}</p><p><strong>Why:</strong> {item.reason}</p></article>)}</div>
        <h3 className="utility-ux-subheading" id="ux-task-flow">02 / User task-flow comparison</h3>
        <nav className="utility-ux-jump" aria-label="Six UX portfolio improvements"><a href="#ux-decisions">01 Design decisions</a><a href="#ux-task-flow">02 Task flow</a><a href="#ux-wireframes">03 Wireframes</a><a href="#ux-accessibility">04 Accessibility</a><a href="#study-context">05 Research methods</a><a href="#ux-design-system">06 Components</a></nav>
        <div className="utility-ux-flow" aria-label="Retrospective task-flow comparison">
          <article><span>Before · manual path</span><div className="utility-ux-chain"><b>Open portal</b><i>→</i><b>Scan region and rows</b><i>→</i><b>Interpret color</b><i>→</i><b>Find language file</b><i>→</i><b>Open report</b></div><p>Several decisions depended on manual scanning and remembering table context.</p></article>
          <article><span>After · directed path</span><div className="utility-ux-chain"><b>Open portal</b><i>→</i><b>Search or choose region</b><i>→</i><b>Verify labeled status</b><i>→</i><b>Choose language</b><i>→</i><b>Open report</b></div><p>The production workflow remains intact, while finding and verifying the right report becomes easier.</p></article>
        </div>
        <h3 className="utility-ux-subheading" id="ux-wireframes">03 / Wireframes: original structure vs redesigned experience</h3>
        <p className="utility-ux-intro">These are reconstructed low-fidelity wireframes made for this case study. They illustrate design hierarchy and responsive layout; they were not created before implementation or in Figma.</p>
        <div className="utility-ux-wireframes" aria-label="Illustrative interface hierarchy comparison">
          <figure><div className="utility-ux-frame"><div className="utility-ux-framebar">Original organization · conceptual</div><div className="utility-ux-legend">Production status legend</div><div className="utility-ux-matrix">{Array.from({length:24},(_,i)=><span key={i} className={i%6===0?"is-tint":""}/>)}</div><div className="utility-ux-legend">Second language report matrix</div><div className="utility-ux-matrix">{Array.from({length:12},(_,i)=><span key={i}/>)}</div></div><figcaption>Manual table scanning and separated language information.</figcaption></figure>
          <figure><div className="utility-ux-frame is-new"><div className="utility-ux-framebar">Delivered hierarchy · conceptual</div><div className="utility-ux-search">⌕ Search by region, filename, or status</div><div className="utility-ux-pills"><span>All</span><span>Waiting</span><span>Proof ready</span><span>Approved</span></div><div className="utility-ux-tabs"><b>English</b><span>Spanish</span></div><div className="utility-ux-matrix">{Array.from({length:18},(_,i)=><span key={i} className={i%5===0?"is-tint":""}/>)}</div></div><figcaption>Discovery controls and language context appear before the report rows.</figcaption></figure>
        </div>
        <h3 className="utility-ux-subheading">Responsive wireframe explorations</h3>
        <div className="utility-ux-responsive" aria-label="Desktop and mobile retrospective wireframes">
          <figure className="utility-ux-device-desktop">
            <div className="utility-ux-browser">
              <div className="utility-ux-browser-top"><span className="utility-ux-dots">● ● ●</span> Regional reports / desktop</div>
              <div className="utility-ux-device-content">
                <div className="utility-ux-device-title"><strong>Report center</strong><span>Region overview · report proofs</span></div>
                <div className="utility-ux-device-search">⌕ Search reports, regions, filenames, statuses…</div>
                <div className="utility-ux-device-summary"><span>All reports</span><span>Waiting</span><span>Proof ready</span><span>Approved</span></div>
                <div className="utility-ux-device-row"><b>English</b><span>Español</span><em>Filter by status ▾</em></div>
                <div className="utility-ux-device-table"><div className="is-head"><b>Region</b><b>Report</b><b>Status</b><b>Open</b></div>{["North","Central","South","Coastal"].map((region,i)=><div key={region}><span>{region}</span><span>CCR report {i+1}</span><span className="utility-ux-status">{i%2?"Approved":"Proof ready"}</span><span>View ↗</span></div>)}</div>
              </div>
            </div>
            <figcaption><strong>Desktop</strong> · Search and global filters first, then a scannable report matrix with explicit status labels.</figcaption>
          </figure>
          <figure className="utility-ux-device-mobile">
            <div className="utility-ux-phone">
              <div className="utility-ux-phone-top">● Regional reports <span>☰</span></div>
              <div className="utility-ux-phone-inner">
                <strong>Find a report</strong>
                <div className="utility-ux-device-search">⌕ Search reports…</div>
                <div className="utility-ux-mobile-tabs"><b>English</b><span>Español</span></div>
                <div className="utility-ux-mobile-filter">Status: All ▾</div>
                {["North · CCR report","Central · CCR report","South · CCR report"].map((name,i)=><div className="utility-ux-mobile-card" key={name}><b>{name}</b><span>{i===1?"Approved":"Proof ready"}</span><small>Open report ↗</small></div>)}
              </div>
            </div>
            <figcaption><strong>Mobile concept</strong> · Filter before scrolling; one report card at a time avoids reproducing a crowded desktop matrix.</figcaption>
          </figure>
        </div>
        <p className="utility-ux-boundary">This mobile card layout is a design exploration, not a claim that this exact layout shipped. Compare against the delivered screenshots and videos below.</p>
        <p className="utility-ux-boundary">These simplified diagrams communicate information architecture only. Actual delivered screenshots and interaction videos are shown in the execution section.</p>
      </section>
      <section className="shell utility-ux-section" id="interaction-specification" aria-labelledby="utility-pattern-title">
        <div className="utility-ux-heading"><p className="kicker">Interaction specification</p><h2 id="utility-pattern-title">Four patterns that support the task.</h2><p>A concise documentation layer for design and QA. These are interaction descriptions, not a separate Figma prototype or a completed design-system audit.</p></div>
        <h3 className="utility-ux-subheading" id="ux-design-system">06 / Interaction patterns and component states</h3>
        <div className="utility-ux-patterns">{patterns.map(item=><article key={item.name}><h3>{item.name}</h3><dl><dt>User action</dt><dd>{item.input}</dd><dt>Expected response</dt><dd>{item.response}</dd><dt>Validation focus</dt><dd>{item.check}</dd></dl></article>)}</div>
        <div className="utility-ux-a11y" id="ux-accessibility"><div><p className="kicker">04 / Accessibility · validation backlog</p><h3>Testing to complete before making WCAG conformance claims</h3><p>Responsive behavior and core controls were functionally checked, but this case study does not yet include a documented accessibility audit. The checks below are planned, not reported as passed.</p></div><ul><li>Keyboard-only search, filtering, tabs, and report links</li><li>Visible focus, selected-state cues, and screen-reader labels</li><li>Text and status contrast, including information not conveyed by color alone</li><li>200% zoom, narrow viewport reflow, and touch targets</li><li>Document findings, remediation, and WCAG 2.2 AA criteria by result</li></ul></div>
      </section>
      <section className="shell utility-ux-section utility-ux-study" id="study-context" aria-labelledby="utility-study-context-title">
        <div className="utility-ux-heading"><p className="kicker">05 / Research methodology and limitations</p><h2 id="utility-study-context-title">What the usability evaluation can and cannot establish.</h2></div>
        <div className="utility-ux-context"><article><h3>Known study details</h3><p>Twenty participants evaluated four recurring tasks in both the original and redesigned interfaces. The results record completion-time ranges, average incorrect selections where measured, and perceived ease on a five-point scale.</p></article><article><h3>Evidence limitations</h3><p>The study took place after implementation. The task-time summaries are observed ranges, not instrumented live-product analytics. Participant recruitment, counterbalancing, and complete raw observations have not been documented here, so the findings should be read as directional usability evidence.</p></article><article><h3>Next research step</h3><p>Document participant roles, session procedure, task ordering, and raw observations where records exist. Follow with live search, zero-result, filter, report-click, and accessibility telemetry to evaluate sustained usage.</p></article></div>
      </section>
    </>
  );
}
