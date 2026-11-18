"use client";
import {useState} from "react";
import "./RxExperiencePrototype.css";

type Format="Pocket"|"Desk";
const steps=["Choose pad","Configure","Review","Handoff"] as const;
export default function RxExperiencePrototype(){
 const [step,setStep]=useState(0);
 const [format,setFormat]=useState<Format|null>(null);
 const [count,setCount]=useState<number|null>(null);
 const [device,setDevice]=useState<"desktop"|"mobile">("desktop");
 const [error,setError]=useState("");
 const next=()=>{if(step===0&&!format){setError("Select a pad format before continuing.");return;}if(step===1&&!count){setError("Select a prescriber count before continuing.");return;}setError("");setStep(s=>Math.min(3,s+1))};
 const reset=()=>{setStep(0);setFormat(null);setCount(null);setError("")};
 return <section className="shell rx-proto-section" id="rx-prototype" aria-labelledby="rx-proto-title">
  <div className="rx-proto-intro"><p className="kicker">03 / Interactive ordering prototype</p><h2 id="rx-proto-title">Try the customer decision journey.</h2><p>A functional, retrospective prototype using sample choices. It demonstrates interface states only, does not place orders, calculate actual prices, collect personal data, or connect to the 4D checkout system. This is not an original pre-launch Figma prototype.</p></div>
  <div className="rx-proto-view" role="group" aria-label="Prototype preview size"><button type="button" aria-pressed={device==="desktop"} onClick={()=>setDevice("desktop")}>Desktop</button><button type="button" aria-pressed={device==="mobile"} onClick={()=>setDevice("mobile")}>Mobile</button><button type="button" onClick={reset}>Restart</button></div>
  <div className={`rx-proto-stage ${device==="mobile"?"is-mobile":""}`}>
   <div className="rx-proto-app"><div className="rx-proto-appbar"><strong>California Security Prescription Pads</strong><span>Sample interaction · no purchase</span></div>
    <div className="rx-proto-content">
     <ol className="rx-proto-steps" aria-label="Ordering progress">{steps.map((label,i)=><li key={label} aria-current={step===i?"step":undefined} className={i<=step?"is-active":""}><span>{i+1}</span>{label}</li>)}</ol>
     {step===0&&<div><h3>Choose your pad format</h3><p className="rx-proto-help">Select the physical pad type. You'll choose the number of prescribers next.</p><div className="rx-proto-options">{(["Pocket","Desk"] as const).map(value=><button type="button" key={value} aria-pressed={format===value} onClick={()=>{setFormat(value);setError("")}}><span className="rx-proto-format-icon" aria-hidden="true">{value==="Pocket"?"▤":"▥"}</span><strong>{value} prescription pads</strong><small>{value==="Pocket"?"Compact format":"Larger desk format"}</small></button>)}</div></div>}
     {step===1&&<div><h3>How many prescribers?</h3><p className="rx-proto-help">For {format?.toLowerCase()} pads, choose a prescriber configuration. All ten options are represented here.</p><div className="rx-proto-counts" role="group" aria-label="Number of prescribers">{Array.from({length:10},(_,i)=>i+1).map(n=><button type="button" key={n} aria-pressed={count===n} onClick={()=>{setCount(n);setError("")}}>{n}</button>)}</div></div>}
     {step===2&&<div><h3>Review your selection</h3><p className="rx-proto-help">Confirm the configuration before proceeding to the existing ordering process.</p><dl className="rx-proto-review"><div><dt>Pad format</dt><dd>{format}</dd></div><div><dt>Prescribers</dt><dd>{count}</dd></div><div><dt>Prototype scope</dt><dd>Sample configuration only</dd></div></dl><p className="rx-proto-guidance">Production requirements, prescriber credentials, pricing, and fulfillment details must be confirmed in the actual live ordering process.</p></div>}
     {step===3&&<div className="rx-proto-done" role="status"><h3>Ready for the existing order workflow</h3><p>Sample selection: <strong>{format} pads · {count} {count===1?"prescriber":"prescribers"}</strong>.</p><p>This prototype stops before the real server-side handoff. No order has been submitted and no information has been stored.</p><button type="button" onClick={reset}>Try another selection</button></div>}
     {error&&<p className="rx-proto-error" role="alert">{error}</p>}
     {step<3&&<div className="rx-proto-actions">{step>0&&<button type="button" className="rx-proto-back" onClick={()=>{setStep(x=>x-1);setError("")}}>Back</button>}<button type="button" className="rx-proto-next" onClick={next}>{step===2?"Preview handoff":"Continue"} →</button></div>}
    </div>
   </div>
  </div>
  <p className="rx-proto-footnote">Try leaving a step blank to inspect its error message, navigating backward, or switching to mobile view. The prototype is intentionally independent of live purchasing.</p>
 </section>;
}
