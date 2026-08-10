import type { Metadata } from "next";
import { assetPath } from "@/lib/asset-path";
import { CaseStudyEnding, CaseStudyWorkspace } from "../../components/CaseStudyWorkspace";

export const metadata: Metadata = {
  title: "University Logo Directory | Product Operations Case Study",
  description: "A Senior Product Operations case study on modernizing a 195-entry legacy directory, defining KPIs, and using two matched rounds of synthetic scenario testing to guide iteration.",
};

const caseNavigation = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "decisions", label: "Decisions" },
  { id: "solution", label: "Solution" },
  { id: "testing", label: "Testing" },
  { id: "kpis", label: "KPIs" },
  { id: "iteration", label: "Iteration" },
  { id: "validation", label: "Next validation" },
];

const painPoints = [
  ["Reference list, not a finder", "Users had to scan a long directory, remember a name, and find it again in the ordering workflow."],
  ["195 entries at once", "Schools, departments, centers, libraries, offices, and affiliated groups competed for attention in one expanded list."],
  ["Hierarchy was implicit", "Color and indentation carried the structure, so parent context became easy to lose while scrolling."],
  ["No recovery tools", "There was no search, alias handling, typo support, result count, or useful path forward when an entry was hard to locate."],
  ["Persistent reference need", "Users could need the directory while continuing through a separate ordering task, making an on-page modal temporary by design."],
  ["Accessibility risk", "Small text, color-dependent hierarchy, weak semantics, and limited keyboard support made the workflow harder to navigate."],
];

const stakeholders = [
  ["Customers and campus users", "Find the correct organizational logo with confidence and keep the reference available while ordering."],
  ["Customer Service", "Reduce avoidable lookup questions and give users a clearer recovery path."],
  ["Prepress and Production", "Receive the correct template filename without changing downstream production logic."],
  ["Brand stakeholders", "Make parent-child relationships visible so similarly named units are easier to distinguish."],
  ["IT and legacy platform", "Preserve the existing data include, 4D directives, login behavior, and maintainable integration."],
];

const decisions = [
  ["Changed", "Replaced manual scanning with search, category filters, A–Z browsing, aliases, explicit paths, copy actions, and no-results recovery."],
  ["Preserved", "Kept the existing organization data source, template filenames, 4D directives, login workflow, and production handoff."],
  ["Iterated", "Moved from an on-page modal to a reusable 900 × 760 reference window that can stay open beside the ordering workflow."],
  ["Did not claim", "Did not present synthetic persona outcomes as actual customer behavior, conversion data, or post-launch impact."],
];

const solutionFeatures = [
  ["Search and aliases", "Find official names using shortened terms, common language, abbreviations, or minor misspellings."],
  ["Explicit paths", "Show the organization hierarchy on every result and repeat it in a prominent selection confirmation."],
  ["Persistent window", "Keep the directory available for reference and refocus the existing window instead of opening duplicates."],
  ["Browse and filter", "Support category filters and A–Z browsing for users who do not know the exact organization name."],
  ["Copy controls", "Copy the selected logo name or complete organizational path into another workflow."],
  ["Recovery states", "Offer clear search, browse, and assistance actions when a query produces no result."],
];

const kpis = [
  ["Correct completion", "58%", "95%", "99%", "≥ 90%", "Met"],
  ["Median lookup time", "106 sec", "24 sec", "20 sec", "≤ 20 sec", "Met"],
  ["Assistance required", "Not modeled", "7%", "3%", "≤ 5%", "Met"],
  ["Mobile completion", "Not modeled", "85.2%", "96.3%", "≥ 85%", "Met"],
  ["Wrong selection", "Not modeled", "1%", "0%", "≤ 5%", "Met"],
];

const roundTwoChanges = [
  ["Assistance remained above target", "Added aliases, closer matches, clear-search, A–Z, and prefilled assistance options.", "7% → 3% modeled assistance"],
  ["Hierarchy was still a risk", "Placed a labeled organizational path on every result, not only after selection.", "95% → 99% modeled completion"],
  ["Mobile had little margin", "Improved responsive layout and preserved simpler result actions at narrow widths.", "85.2% → 96.3% modeled mobile completion"],
  ["Users needed a lasting reference", "Changed the modal into a reusable, resizable window and added copy controls.", "24 → 20 sec modeled median lookup"],
];

const nextSteps = [
  ["High", "Run a matched real-user test", "Ask 5–10 participants to complete the same tasks in the original and redesigned experiences."],
  ["High", "Instrument live finder events", "Measure opens, queries, zero-results, result rank, selections, changes, assistance clicks, and elapsed time."],
  ["High", "Validate accessibility", "Complete keyboard-only, focus-order, screen-reader, zoom, and mobile viewport testing."],
  ["Medium", "Expand aliases from real searches", "Use anonymous zero-result language to improve alternate terms without guessing."],
  ["Medium", "Review wrong-level selections", "Monitor whether users choose a parent school when a department-level logo is needed."],
];

const hostedVideo = (fileName: string) =>
  `https://digital-operations-portfolio.achong888381.chatgpt.site/videos/university-logo-directory/${fileName}`;

export default function UniversityLogoDirectory() {
  return <main id="top" className="case-study-page finder-case-study">
    <a className="skip-link" href="#overview">Skip to case study</a>
    <CaseStudyWorkspace
      number="PROJECT 05"
      archetype="DISCOVERY & VALIDATION"
      shortTitle="Logo Directory"
      title="University Logo Directory Redesign"
      subtitle="Turning a static reference list into a measurable self-service workflow."
      summary="I reframed a legacy directory as a product workflow: preserve the production contract, reduce lookup friction, define success measures, test assumptions, and iterate against the remaining risks."
      metadata={[
        { label: "Role", value: "Senior Product Operations / Digital Services" },
        { label: "Scope", value: "Discovery · Requirements · UX · Testing · Iteration" },
        { label: "Directory scale", value: "195 organization and logo entries" },
        { label: "Evidence", value: "Verified interface change · Synthetic pre-launch model" },
      ]}
      navigation={caseNavigation}
      accent="finder"
    >
      <div className="executive-summary finder-summary" aria-label="Case study executive summary">
        <article><span>Operational problem</span><p>A fixed directory required users to manually scan a long, color-coded hierarchy and remember the result elsewhere.</p></article>
        <article><span>Product decision</span><p>Preserve the underlying data and production handoff while replacing the customer-facing lookup experience.</p></article>
        <article><span>Evaluation design</span><p>Model the same 100 synthetic profiles across the original experience, Round 1, and Round 2.</p></article>
        <article><span>Modeled Round 2</span><p>99% completion, 20-second median lookup, 3% assistance, and all 11 modeled thresholds met.</p></article>
        <article><span>Evidence limit</span><p>The KPI results are scenario projections for planning. Real-user and production analytics remain the validation gate.</p></article>
      </div>
      <div className="evidence-boundary" aria-label="Evidence boundary">
        <b>Evidence boundary</b>
        <span><strong>Verified:</strong> 195-entry source, original interface limitations, delivered finder features, and before/after recordings.</span>
        <span><strong>Modeled:</strong> task completion, time, assistance, mobile completion, wrong selections, and KPI threshold performance.</span>
        <span><strong>To validate:</strong> real-user task results, production usage, support demand, accessibility, and sustained search success.</span>
      </div>
    </CaseStudyWorkspace>

    <section className="finder-section shell" id="problem">
      <div className="finder-section-heading">
        <div><p className="kicker">01 · Discovery</p><h2>The visible problem was an old popup. The operational problem was duplicate work.</h2></div>
        <p>Users could open the directory, but it did not help them complete the lookup. They still had to scan, infer hierarchy, remember a name, and return to the ordering workflow.</p>
      </div>
      <div className="finder-pain-grid">
        {painPoints.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
      <div className="finder-problem-statement"><span>Problem statement</span><p>How might we help users identify the correct organizational logo quickly and confidently without disrupting the legacy data, login, or production workflow?</p></div>
    </section>

    <section className="finder-section finder-decision-section" id="decisions">
      <div className="shell">
        <div className="finder-section-heading">
          <div><p className="kicker">02 · Product Operations framing</p><h2>Align the customer experience with the systems behind it.</h2></div>
          <p>The work required more than interface polish. The solution had to serve customers, support, production, brand governance, and a legacy technical environment at the same time.</p>
        </div>
        <div className="finder-stakeholders">
          {stakeholders.map(([stakeholder, need]) => <article key={stakeholder}><h3>{stakeholder}</h3><p>{need}</p></article>)}
        </div>
        <div className="finder-tradeoffs">
          {decisions.map(([label, copy]) => <article key={label}><span>{label}</span><p>{copy}</p></article>)}
        </div>
      </div>
    </section>

    <section className="finder-section shell" id="solution">
      <div className="finder-section-heading">
        <div><p className="kicker">03 · Solution</p><h2>Make the hierarchy searchable, understandable, and reusable.</h2></div>
        <p>The redesigned directory supports a quick lookup and a longer reference session. Users can search directly, browse when uncertain, confirm the full path, and keep the result available while continuing their work.</p>
      </div>
      <div className="finder-feature-grid">
        {solutionFeatures.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
      <div className="finder-video-grid" aria-label="Original and redesigned directory recordings">
        <figure>
          <div><span>Before</span><video controls playsInline preload="metadata" poster={assetPath("/images/university-logo-directory/original-directory.jpg")} aria-label="Original static university logo directory recording"><source src={hostedVideo("original-directory.mp4")} type="video/mp4" /></video></div>
          <figcaption><strong>Static reference list</strong><p>Manual scrolling, color-and-indentation hierarchy, and no direct path from lookup to confirmed selection.</p></figcaption>
        </figure>
        <figure>
          <div><span>After</span><video controls playsInline preload="metadata" poster={assetPath("/images/university-logo-directory/redesigned-directory.jpg")} aria-label="Redesigned searchable university logo directory recording"><source src={hostedVideo("redesigned-directory.mp4")} type="video/mp4" /></video></div>
          <figcaption><strong>Searchable persistent directory</strong><p>Aliases, categories, A–Z browsing, explicit paths, copy controls, and recovery actions inside a reusable window.</p></figcaption>
        </figure>
      </div>
      <p className="finder-video-note"><strong>Visual evidence only:</strong> the recordings demonstrate the interface change, but they do not perform the same timed task and therefore are not used to claim a measured speed improvement.</p>
    </section>

    <section className="finder-section finder-testing-section" id="testing">
      <div className="shell">
        <div className="finder-section-heading">
          <div><p className="kicker">04 · Evaluation design</p><h2>Use a matched synthetic cohort to stress-test the plan before real-user validation.</h2></div>
          <p>The 100 personas were structured test profiles, not 100 human participants. Reusing the same profiles across rounds kept role, device, familiarity, and task difficulty constant while the interface changed.</p>
        </div>
        <div className="finder-method">
          <article><span>100</span><h3>Matched profiles</h3><p>Distinct combinations of user role, device, familiarity, accessibility need, task, target logo, and search phrase.</p></article>
          <article><span>5</span><h3>Task patterns</h3><p>Exact name, shortened name, misspelling, unknown parent hierarchy, and unavailable organization.</p></article>
          <article><span>3</span><h3>Experience states</h3><p>Original static directory, redesigned Round 1, and the test-driven Round 2 iteration.</p></article>
        </div>
        <div className="finder-test-flow" aria-label="Matched evaluation process">
          <span>Define profiles</span><b>→</b><span>Run original model</span><b>→</b><span>Evaluate Round 1</span><b>→</b><span>Identify missed targets</span><b>→</b><span>Change product</span><b>→</b><span>Re-run same profiles</span>
        </div>
        <aside className="finder-model-caveat"><b>Why use this model?</b><p>It creates a disciplined hypothesis and exposes weak segments before launch. It does not replace usability research, production analytics, or direct customer feedback.</p></aside>
        <div className="finder-workbook-heading">
          <div><span>Evaluation artifact</span><h3>Inside the matched-sample workbook</h3></div>
          <p>The model kept the cohort and KPI definitions fixed across both design rounds, making it easier to connect each product change to the risk it was intended to address.</p>
        </div>
        <div className="finder-workbook-grid" aria-label="Workbook excerpts from the synthetic evaluation model">
          <figure className="finder-workbook-scorecard">
            <div className="finder-sheet-frame">
              <span className="finder-sheet-tab">KPI Dashboard</span>
              <img src={assetPath("/images/university-logo-directory/kpi-workbook-scorecard.png")} alt="Workbook excerpt comparing eleven KPI values across the original directory, Round 1, Round 2, and target thresholds" />
            </div>
            <figcaption><strong>One scorecard, three experience states</strong><p>Each KPI was compared against a launch threshold. Round 2 met all 11 modeled targets, with real-user testing still required before treating the values as outcomes.</p></figcaption>
          </figure>
          <figure className="finder-workbook-personas">
            <div className="finder-sheet-frame">
              <span className="finder-sheet-tab">100 Personas</span>
              <img src={assetPath("/images/university-logo-directory/persona-workbook-sample.png")} alt="Five-row workbook sample showing persona ID, role, device, UCLA familiarity, accessibility need, task type, and search phrase" />
            </div>
            <figcaption><strong>A structured cohort, not fictional biographies</strong><p>Profiles varied by role, device, familiarity, accessibility need, and task type. The same 100 profiles were reused so the interface was the primary variable between rounds.</p></figcaption>
          </figure>
        </div>
        <p className="finder-workbook-disclaimer"><strong>Synthetic planning data:</strong> these workbook excerpts document the pre-launch evaluation method. They are not observed customer sessions, production analytics, or proof of causal impact.</p>
      </div>
    </section>

    <section className="finder-section shell" id="kpis">
      <div className="finder-section-heading">
        <div><p className="kicker">05 · KPI scorecard</p><h2>Round 2 improved every KPI targeted by the changes.</h2></div>
        <p>The strongest modeled change was not just higher completion. Assistance demand moved below its target, and mobile completion gained enough margin to reduce a clear launch risk.</p>
      </div>
      <div className="finder-kpi-highlights" aria-label="Round 1 to Round 2 synthetic KPI changes">
        <article><span>Correct completion</span><strong>95% → 99%</strong><small>+4 percentage points</small></article>
        <article><span>Median lookup time</span><strong>24 → 20 sec</strong><small>4 seconds faster</small></article>
        <article><span>Assistance required</span><strong>7% → 3%</strong><small>4 percentage points lower</small></article>
        <article><span>Mobile completion</span><strong>85.2% → 96.3%</strong><small>+11.1 percentage points</small></article>
      </div>
      <div className="finder-kpi-table" role="table" aria-label="Synthetic KPI comparison across original, Round 1, and Round 2">
        <div className="finder-kpi-row finder-kpi-header" role="row"><span role="columnheader">KPI</span><span role="columnheader">Original</span><span role="columnheader">Round 1</span><span role="columnheader">Round 2</span><span role="columnheader">Target</span><span role="columnheader">Status</span></div>
        {kpis.map(([metric, original, roundOne, roundTwo, target, status]) => <div className="finder-kpi-row" role="row" key={metric}><strong role="rowheader">{metric}</strong><span role="cell" data-label="Original">{original}</span><span role="cell" data-label="Round 1">{roundOne}</span><span role="cell" data-label="Round 2">{roundTwo}</span><span role="cell" data-label="Target">{target}</span><b role="cell">{status}</b></div>)}
      </div>
      <div className="finder-threshold-callout"><strong>11 / 11</strong><span>Modeled KPI thresholds met in Round 2</span><p>Synthetic pre-launch model, not observed user behavior or a measured production outcome.</p></div>
    </section>

    <section className="finder-section finder-iteration-section" id="iteration">
      <div className="shell">
        <div className="finder-section-heading">
          <div><p className="kicker">06 · Test-driven iteration</p><h2>Turn the remaining misses into a prioritized product backlog.</h2></div>
          <p>Round 1 already modeled a major improvement over the original. The decision was not to stop at a good average, but to address the segments and behaviors that still carried launch risk.</p>
        </div>
        <div className="finder-iteration-list">
          {roundTwoChanges.map(([signal, change, modeledEffect], index) => <article key={signal}><b>{String(index + 1).padStart(2, "0")}</b><div><span>Signal</span><h3>{signal}</h3></div><div><span>Product response</span><p>{change}</p></div><div><span>Modeled effect</span><strong>{modeledEffect}</strong></div></article>)}
        </div>
      </div>
    </section>

    <section className="finder-section shell" id="validation">
      <div className="finder-section-heading">
        <div><p className="kicker">07 · Launch and measurement</p><h2>Use the synthetic result to decide what to validate, not what to claim.</h2></div>
        <p>The next gate is a small matched test with real users followed by anonymous production analytics. Those sources determine whether the modeled gains translate into actual behavior.</p>
      </div>
      <div className="backlog-table finder-backlog">
        {nextSteps.map(([priority, item, reason], index) => <article key={item}><b>{String(index + 1).padStart(2, "0")}</b><span className={`priority ${priority.toLowerCase()}`}>{priority}</span><h3>{item}</h3><p>{reason}</p></article>)}
      </div>
      <div className="finder-measurement-plan">
        <article><span>Real-user test</span><p>Correct result, time, help needed, scroll actions, confidence, and ease rating using the same tasks in both versions.</p></article>
        <article><span>Production events</span><p>Finder opened, search started, no result, filter used, result selected, selection changed, assistance clicked, and elapsed time.</p></article>
        <article><span>Decision rule</span><p>If real completion or assistance misses target, review failed queries and wrong-level selections before expanding scope.</p></article>
      </div>
    </section>

    <CaseStudyEnding
      capabilities={["Workflow Discovery", "Legacy System Modernization", "KPI Design", "Scenario Modeling", "Iterative Product Operations"]}
      nextNumber="01"
      nextTitle="Regional Utility Customer Portal"
      nextDescription="Continue to a customer workflow case with retrospective task-based evidence from 20 participants."
      nextHref="/projects/customer-portal-redesign"
    />
    <footer className="site-footer shell"><div><span className="brand-mark">A</span><strong>Andrew</strong></div><p>Digital operations · Product transformation</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
