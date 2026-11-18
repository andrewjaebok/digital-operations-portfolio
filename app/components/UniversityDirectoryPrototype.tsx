"use client";
import {useMemo,useRef,useState} from "react";
import "./UniversityDirectoryPrototype.css";
type Entry={name:string;category:"School"|"Department"|"Office"|"Center"|"Library";path:string[];aliases:string[]};
const entries:Entry[]=[
{name:"College of Engineering",category:"School",path:["Sample University","College of Engineering"],aliases:["engineering","eng","coe"]},
{name:"Department of Mechanical Engineering",category:"Department",path:["Sample University","College of Engineering","Department of Mechanical Engineering"],aliases:["me","mechanical","mech eng","mechanical eng"]},
{name:"Department of Electrical Engineering",category:"Department",path:["Sample University","College of Engineering","Department of Electrical Engineering"],aliases:["ee","electrical","electrical eng"]},
{name:"School of Medicine",category:"School",path:["Sample University","School of Medicine"],aliases:["med school","medical"]},
{name:"Student Services Office",category:"Office",path:["Sample University","Student Affairs","Student Services Office"],aliases:["student services","help desk"]},
{name:"University Library",category:"Library",path:["Sample University","Libraries","University Library"],aliases:["library","libraries","lib"]},
{name:"Center for Environmental Studies",category:"Center",path:["Sample University","Research Centers","Center for Environmental Studies"],aliases:["environment","environmental","ces"]},
{name:"Graduate Studies Office",category:"Office",path:["Sample University","Academic Affairs","Graduate Studies Office"],aliases:["graduate","grad office"]},
{name:"Department of Biology",category:"Department",path:["Sample University","College of Science","Department of Biology"],aliases:["bio","biology department"]},
{name:"School of Business",category:"School",path:["Sample University","School of Business"],aliases:["business","biz school"]}
];
const cats=["All","School","Department","Office","Center","Library"] as const;
const normalize=(s:string)=>s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]/g,"");
const distance=(a:string,b:string)=>{if(Math.abs(a.length-b.length)>2)return 3;const dp=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let prev=dp[0];dp[0]=i;for(let j=1;j<=b.length;j++){const old=dp[j];dp[j]=Math.min(dp[j]+1,dp[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old;}}return dp[b.length]};
export default function UniversityDirectoryPrototype(){
 const searchInput = useRef<HTMLInputElement>(null);
 const [query,setQuery]=useState("");const [category,setCategory]=useState<typeof cats[number]>("All");const [letter,setLetter]=useState("");const [selected,setSelected]=useState<Entry|null>(null);const [copied,setCopied]=useState("");const [mobile,setMobile]=useState(false);
 const results=useMemo(()=>entries.filter(e=>{
  if(category!=="All"&&e.category!==category)return false;
  if(letter&&!e.name.toUpperCase().startsWith(letter))return false;
  const q=normalize(query.trim());if(!q)return true;
  const terms=[e.name,...e.path,...e.aliases].map(normalize);return terms.some(term=>term.includes(q)||((q.length>=4)&&term.split(/\s+/).some(w=>distance(q,w)<=1))||distance(q,term)<=1);
 }),[query,category,letter]);
 const resetSearch = () => {
   setQuery(""); setCategory("All"); setLetter(""); setSelected(null); setCopied("");
   searchInput.current?.focus();
 };
 const choose=(e:Entry)=>{setSelected(e);setCopied("")};
 const copy=async(str:string,label:string)=>{try{await navigator.clipboard.writeText(str);setCopied(label+" copied")}catch{setCopied("Clipboard unavailable. Select and copy the displayed text manually.")}};
 return <section className="shell udemo-section" id="directory-prototype" aria-labelledby="udemo-title">
  <div className="udemo-heading"><p className="kicker">Interactive prototype · sample data</p><h2 id="udemo-title">Try the self-service logo finder.</h2><p>Explore the key interactions of the redesigned directory using ten fictional/sample organization records. The delivered system has a documented 195-entry source; this demonstration is independent of its production data, user accounts, and ordering integration.</p></div>
  <div className="udemo-mode" role="group" aria-label="Preview width"><button type="button" aria-pressed={!mobile} onClick={()=>setMobile(false)}>Desktop</button><button type="button" aria-pressed={mobile} onClick={()=>setMobile(true)}>Mobile</button><button type="button" onClick={resetSearch}>Reset demo</button></div>
  <div className={`udemo-stage ${mobile?"udemo-mobile":""}`}>
   <div className="udemo-app">
    <div className="udemo-bar"><strong>Organization logo reference</strong><span>Sample directory · no login required</span></div>
    <div className="udemo-main">
     <div className="udemo-controls">
      <label htmlFor="udemo-search">Find an organization</label>
      <input ref={searchInput} id="udemo-search" type="search" value={query} placeholder="Try 'mech eng', 'library', or 'studnt services'" onChange={v=>{setQuery(v.target.value);setSelected(null)}}/>
      <div className="udemo-filters" role="group" aria-label="Organization category">{cats.map(c=><button type="button" key={c} aria-pressed={category===c} onClick={()=>{setCategory(c);setSelected(null)}}>{c==="All"?"All categories":c}</button>)}</div>
      <div className="udemo-alpha" role="group" aria-label="Browse names alphabetically"><button type="button" aria-pressed={!letter} onClick={()=>setLetter("")}>All letters</button>{["C","D","G","S","U"].map(l=><button key={l} type="button" aria-pressed={letter===l} onClick={()=>setLetter(x=>x===l?"":l)}>{l}</button>)}</div>
     </div>
     <div className="udemo-results"><div className="udemo-results-title"><strong>Matching organizations</strong><span role="status" aria-live="polite">{results.length === 0 ? "No matching entries" : `${results.length} ${results.length === 1 ? "result" : "results"}`}</span></div>
       {results.length?results.map(e=><article key={e.name} className={selected?.name===e.name?"is-selected":""}><div><b>{e.name}</b><small>{e.category} · {e.path.join(" / ")}</small></div><button type="button" onClick={()=>choose(e)} aria-pressed={selected?.name===e.name}>View reference</button></article>):<div className="udemo-empty"><strong>No matching entries</strong><p>Try an alternate name, browse a category, or clear your filters. You can also contact support in the real ordering workflow.</p><button type="button" onClick={resetSearch}>Clear search and filters</button></div>}
     </div>
     {selected&&<aside className="udemo-reference" aria-labelledby="udemo-selected-heading"><div className="udemo-reference-head"><div><small>Persistent reference panel</small><h3 id="udemo-selected-heading">{selected.name}</h3></div><button type="button" onClick={()=>setSelected(null)} aria-label="Close selected reference">Close</button></div><p><b>Full hierarchy</b></p><p className="udemo-path">{selected.path.join(" → ")}</p><div className="udemo-copy"><button type="button" onClick={()=>void copy(selected.name,"Logo name")}>Copy logo name</button><button type="button" onClick={()=>void copy(selected.path.join(" / "),"Organization path")}>Copy full path</button></div>{copied&&<p className="udemo-copy-status" role="status">{copied}</p>}<p className="udemo-note">In the real workflow, the reference window can remain open alongside the ordering task. This panel demonstrates the concept; no order is placed.</p></aside>}
    </div>
   </div>
  </div>
  <p className="udemo-foot">Example tasks: search “mech eng,” filter to Departments, inspect the hierarchy, then try an unavailable organization to see recovery. This is a reconstructed portfolio demonstration, not a verified production usability study.</p>
 </section>;
}
