import {assetPath} from "@/lib/asset-path";
import "./UniversityDirectoryEvidence.css";
const states=[
 {title:"Exact or abbreviated search",input:"Mechanical Engineering / mech eng",response:"Show matching names with their full parent-school and department paths.",reason:"Users can recognize the right organizational level without memorizing its place in the hierarchy."},
 {title:"Browse when uncertain",input:"Category filters and A–Z",response:"Offer another route when a person cannot name the target precisely.",reason:"Supports exploratory finding, not only known-item lookup."},
 {title:"Ambiguous result",input:"Similar parent and department labels",response:"Keep the full organizational path visible alongside each candidate.",reason:"Reduce the risk of choosing a broad school-level logo instead of a department logo."},
 {title:"No results",input:"Unrecognized or unavailable entry",response:"Offer clear-search, alternative terms, browsing, and help options.",reason:"A dead-end result should not force the user back to a 195-item manual scan."}
];
const wcag=[
 ["1.3.1 Info and Relationships","Hierarchy is shown explicitly in the redesigned UI","Inspect DOM headings, lists, breadcrumb/path relationships"],
 ["1.4.1 Use of Color","Paths and statuses have textual descriptions rather than depending only on color","Verify all information remains understandable without color"],
 ["2.1.1 Keyboard","Keyboard behavior is described as implemented","Manually test search, filters, results, copy, popup focus and close"],
 ["2.4.3 Focus Order","The finder opens a separate persistent window","Verify opening focus, keyboard order, return focus and window refocusing"],
 ["2.4.7 Focus Visible","Visible focus support is part of the design requirements","Inspect focus indicator visibility on live controls"],
 ["1.4.3 Contrast Minimum","Contrast has not been measured in the available evidence","Measure text, hierarchy labels, selected filters and error messages"],
 ["1.4.10 Reflow","Responsive behavior is described and demonstrated in portfolio media","Test 320 CSS px and 400% zoom on the actual experience"],
 ["4.1.3 Status Messages","Search counts and no-results messages are UX requirements","Verify dynamic result updates are announced with a screen reader"]
];
export default function UniversityDirectoryEvidence(){
 return <>
 <section className="shell finder-evidence-section" id="finder-gallery" aria-labelledby="finder-gallery-title">
  <p className="kicker">Verified interface evidence</p><h2 id="finder-gallery-title">See the actual transformation, not just modeled numbers.</h2>
  <p>These still frames come from the existing before-and-after recordings already included in the portfolio. They show the legacy directory and redesigned interface, but do not independently establish a measured improvement in user task time.</p>
  <div className="finder-evidence-gallery">
   <figure><img src={assetPath("/images/university-logo-directory/original-directory.jpg")} alt="Original university logo directory displayed as a dense hierarchical reference list" loading="lazy"/><figcaption><strong>Before · Static reference list</strong><span>Manual scrolling and visually encoded hierarchy required users to keep track of organizational context.</span></figcaption></figure>
   <figure><img src={assetPath("/images/university-logo-directory/redesigned-directory.jpg")} alt="Redesigned logo finder interface captured from the implemented demonstration" loading="lazy"/><figcaption><strong>After · Searchable reference workflow</strong><span>Search, filtering, hierarchy, and selection controls were introduced while the existing production mapping was preserved.</span></figcaption></figure>
  </div>
 </section>
 <section className="shell finder-evidence-section" id="finder-taskflow" aria-labelledby="finder-taskflow-title">
  <p className="kicker">Customer task flow</p><h2 id="finder-taskflow-title">From scanning and remembering to finding and confirming.</h2>
  <div className="finder-flow-grid"><article><span>Original path</span><ol><li>Open a long reference list</li><li>Scroll through multiple organizations</li><li>Infer the parent school or department</li><li>Memorize the exact listing</li><li>Return to the ordering process</li></ol></article><article><span>Redesigned path</span><ol><li>Open or refocus the persistent finder</li><li>Search, browse, or filter</li><li>Verify the full hierarchy</li><li>Copy the name or complete path</li><li>Keep the reference available while ordering</li></ol></article></div>
 </section>
 <section className="shell finder-evidence-section" id="finder-search-states" aria-labelledby="finder-search-states-title">
  <p className="kicker">Search interaction design</p><h2 id="finder-search-states-title">Four important states and their design rationale.</h2>
  <div className="finder-states-grid">{states.map(s=><article key={s.title}><h3>{s.title}</h3><p><b>Example:</b> {s.input}</p><p><b>Interaction:</b> {s.response}</p><p><b>Why it matters:</b> {s.reason}</p></article>)}</div>
 </section>
 <section className="shell finder-evidence-section" id="finder-accessibility" aria-labelledby="finder-accessibility-title">
  <p className="kicker">Accessibility evidence and validation</p><h2 id="finder-accessibility-title">WCAG 2.2 AA review backlog</h2>
  <p>These checks are derived from documented interface features and known risk areas. They are <strong>not</strong> results of a production accessibility audit; actual pass/fail findings require browser and assistive-technology testing.</p>
  <div className="finder-wcag-list" role="table" aria-label="University logo finder WCAG review backlog"><div className="finder-wcag-row finder-wcag-header" role="row"><b role="columnheader">Criterion</b><b role="columnheader">Current evidence</b><b role="columnheader">Still to test</b></div>{wcag.map(r=><div className="finder-wcag-row" role="row" key={r[0]}><strong role="cell">{r[0]}</strong><span role="cell">{r[1]}</span><span role="cell">{r[2]}</span></div>)}</div>
  <p className="finder-wcag-caveat">The demo prototype includes native buttons, a labeled search, and live result counts. Those implementation choices do not certify WCAG conformance of the production logo directory.</p>
 </section>
 <section className="shell finder-evidence-section" id="finder-research-plan" aria-labelledby="finder-research-title">
  <p className="kicker">Real-user validation · proposed</p><h2 id="finder-research-title">Make the next evaluation observational.</h2>
  <div className="finder-research-grid"><article><h3>Tasks to run</h3><p>Ask 5–10 representative users to find an exact organization, locate a department using an abbreviation, resolve an ambiguous parent hierarchy, and recover from an unavailable logo.</p></article><article><h3>Measurements</h3><p>Record correct selection, task time, wrong-level selections, help requested, error recovery, confidence, and device used. Preserve task wording and participant recruitment details.</p></article><article><h3>Production instrumentation</h3><p>Propose anonymous events for opened finder, searches, zero results, filters, result selection, copy action, and assistance. Do not collect sensitive queries unnecessarily.</p></article></div>
  <p className="finder-wcag-caveat"><strong>Evidence boundary:</strong> No real participant outcome or live funnel measurement is added to this case study until it has actually been collected.</p>
 </section>
 </>;
}
