import "./ITDecisionNarrative.css";

const cases=[
 {id:"automation",number:"01",name:"Production workflow automation",signal:"Recurring manual adjustments around variable text, images, QR placement, and template-specific rules created repeated handling.",question:"Which recurring production behaviors are stable enough to automate without compromising output?",options:[
  ["Continue manual intervention","Lowest immediate change risk, but continued repetitive handling and inconsistent outcomes."],
  ["Automate everything at once","Potentially broad reach, but fragile around template exceptions and missing inputs."],
  ["Standardize repeatable rules with exception QA","Balanced reusability with controlled behavior for unusual content and templates."]
 ],decision:"The implemented direction was reusable rules for predictable behaviors, supported by normal and edge-case QA.",risk:"A failed rule can reproduce an error across many proofs. Missing content, overset text, images, layer availability and formatting variations matter.",validation:"Production workflow implementation and QA coverage are documented. Time saved, rework prevented, and volume handled have not been quantified.",learning:"A useful automation system needs explicit behavior for failure and unusual inputs, not just the happy path."},
 {id:"assets",number:"02",name:"Proof asset persistence",signal:"Proof revisions exposed that an initially placed customer image could be unavailable in later generations.",question:"Should the workflow solve only first-time placement or preserve assets throughout the entire revision lifecycle?",options:[
  ["Retrieve missing files manually","Can resolve an individual case but repeats customer contact and staff effort."],
  ["Fix initial proof generation only","Improves first-run results but leaves subsequent revisions exposed."],
  ["Treat asset availability as a lifecycle requirement","Supports initial upload, revision, replacement and missing-input scenarios."]
 ],decision:"The implemented workflow was updated to retain the appropriate customer-provided image through revisions.",risk:"Using the wrong or stale asset could compromise proof accuracy, so replacement images and controlled missing-file states are important.",validation:"Documented validation scenarios cover initial uploads, revisions, replacements and controlled exceptions; no formal re-upload frequency baseline was captured.",learning:"Diagnosing the full user and production lifecycle often reveals a larger requirement than the first reported symptom."},
 {id:"security",number:"03",name:"Customer ordering traffic protection",signal:"A high volume of automated requests was reaching infrastructure supporting customer ordering.",question:"How do you reduce unnecessary origin traffic without disrupting legitimate customer ordering or integrations?",options:[
  ["Respond only at the application or origin","Leaves more traffic reaching Apache and 4D before mitigation."],
  ["Apply broad filtering without access checks","May lower unwanted requests but risks disrupting legitimate flows."],
  ["Add layered protection and validate access","Filters earlier in the request path while checking that customer workflows still function."]
 ],decision:"Layered protection was introduced using Cloudflare and origin-side controls, followed by troubleshooting and access checks.",risk:"Aggressive blocking can interrupt real users or ordering integrations. The operational objective is lower unwanted origin traffic with preserved access.",validation:"Documented origin request rate fell from 1,877 to 50.7 per minute (97.3%). The later 12.7 rate remains an estimate, not a verified result.",learning:"Lower traffic alone is insufficient; availability and customer transaction continuity are equally important outcomes."}
];
export default function ITDecisionNarrative(){
 return <section className="shell it-decision-section" id="decision-records" aria-labelledby="it-decisions-title">
  <div className="it-decision-heading"><p className="kicker">Decision-making across technical initiatives</p><h2 id="it-decisions-title">Diagnose the system. Compare approaches. Protect the workflow.</h2><p>These are retrospective decision records based on the documented project work. Options illustrate relevant operational tradeoffs, not a claim that a formal alternatives workshop or quantitative scoring process occurred.</p></div>
  <nav className="it-decision-nav" aria-label="Decision record shortcuts">{cases.map(c=><a href={`#decision-${c.id}`} key={c.id}><span>{c.number}</span>{c.name}</a>)}</nav>
  {cases.map(c=><article className="it-decision-case" id={`decision-${c.id}`} key={c.id}>
   <div className="it-decision-case-heading"><span>Decision {c.number}</span><h3>{c.name}</h3><p><b>Operational signal:</b> {c.signal}</p><strong>{c.question}</strong></div>
   <div className="it-decision-tradeoffs" aria-label={c.name+" approaches and tradeoffs"}>{c.options.map((item,i)=><div key={item[0]}><small>{String(i+1).padStart(2,"0")}</small><h4>{item[0]}</h4><p>{item[1]}</p></div>)}</div>
   <div className="it-decision-conclusion">
    <div><span>Implemented direction</span><p>{c.decision}</p></div>
    <div><span>Risk / safeguard</span><p>{c.risk}</p></div>
    <div><span>Validation boundary</span><p>{c.validation}</p></div>
    <div><span>Lesson carried forward</span><p>{c.learning}</p></div>
   </div>
   <a className="it-decision-initiative" href={c.id==="automation"?"#production-automation":c.id==="assets"?"#asset-persistence":"#traffic-protection"}>See implementation and evidence →</a>
  </article>)}
 </section>;
}
