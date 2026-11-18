"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import "./RegionalUtilityPrototype.css";

type Status = "Waiting" | "Proof ready" | "Approved" | "In production";
const reports:{region:string;name:string;status:Status;batch:string}[]=[
 {region:"Northern",name:"CCR report A",status:"Approved",batch:"Batch 01"},
 {region:"Central",name:"CCR report B",status:"Proof ready",batch:"Batch 01"},
 {region:"Coastal",name:"CCR report C",status:"Waiting",batch:"Batch 02"},
 {region:"Southern",name:"CCR report D",status:"In production",batch:"Batch 02"},
 {region:"Eastern",name:"CCR report E",status:"Approved",batch:"Batch 03"},
 {region:"Western",name:"CCR report F",status:"Proof ready",batch:"Batch 03"},
 {region:"Mountain",name:"CCR report G",status:"Waiting",batch:"Batch 04"},
];
const statuses=["All","Waiting","Proof ready","Approved","In production"] as const;
const sampleFilename = (name:string,language:"English"|"Español") => `${name.toLowerCase().replaceAll(" ","-")}-${language==="English"?"en":"es"}.pdf`;
type Filter=typeof statuses[number];
const spanishStatus: Record<Filter, string> = {
  All: "Todos", Waiting: "En espera", "Proof ready": "Prueba lista",
  Approved: "Aprobado", "In production": "En producción",
};
const normalizeQuery = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").trim().toLowerCase();

export default function RegionalUtilityPrototype(){
 const searchInput = useRef<HTMLInputElement>(null);
 const previewClose = useRef<HTMLButtonElement>(null);
 const previewTrigger = useRef<HTMLButtonElement>(null);
 const [query,setQuery]=useState("");
 const [filter,setFilter]=useState<Filter>("All");
 const [language,setLanguage]=useState<"English"|"Español">("English");
 const [view,setView]=useState<"desktop"|"mobile">("desktop");
 const [opened,setOpened]=useState<string|null>(null);
 const isSpanish = language === "Español";
 const matches = useMemo(() => {
   const term = normalizeQuery(query);
   return reports.filter(report =>
     (filter === "All" || report.status === filter) &&
     normalizeQuery([report.name, report.region, report.batch, report.status,
       isSpanish ? spanishStatus[report.status] : "", sampleFilename(report.name, language)].join(" ")).includes(term)
   );
 }, [query, filter, language, isSpanish]);
 useEffect(() => {
   if (opened) previewClose.current?.focus();
 }, [opened]);
 const labels=language==="English"?{title:"Find a report",search:"Search reports, regions, batches, or statuses",region:"Region",report:"Report",status:"Status",action:"Action",open:"Open",empty:"No matching reports. Try a different search or status.",clear:"Clear filters",close:"Close",notice:"Illustrative file selection",file:"Language-specific PDF",sample:"Sample data"}:{title:"Buscar un informe",search:"Buscar informes, regiones, lotes o estados",region:"Región",report:"Informe",status:"Estado",action:"Acción",open:"Abrir",empty:"No hay informes coincidentes. Pruebe otra búsqueda.",clear:"Restablecer filtros",close:"Cerrar",notice:"Selección de archivo ilustrativa",file:"PDF del idioma seleccionado",sample:"Datos de ejemplo"};
 const clearFilters = () => {
   setQuery("");
   setFilter("All");
   setOpened(null);
   searchInput.current?.focus();
 };
 const closePreview = () => {
   setOpened(null);
   if (previewTrigger.current?.isConnected) previewTrigger.current.focus();
   else searchInput.current?.focus();
 };
 const reset = () => {
   clearFilters();
   setLanguage("English");
 };
 return <section className="shell utility-proto-section" id="interactive-prototype" aria-labelledby="utility-proto-title">
  <div className="utility-proto-heading"><p className="kicker">Clickable interaction prototype</p><h2 id="utility-proto-title">Explore the interaction choices.</h2><p>This functional, retrospective prototype illustrates search, filters, language switching, empty states, and responsive layouts. It uses invented report names and sample statuses, with separate simulated English and Spanish filenames; it is <strong>not</strong> a production customer portal, historical pre-launch Figma artifact, or live customer-data connection.</p></div>
  <div className="utility-proto-controls" role="group" aria-label="Prototype viewport">
    <button type="button" aria-pressed={view==="desktop"} onClick={()=>setView("desktop")}>Desktop preview</button>
    <button type="button" aria-pressed={view==="mobile"} onClick={()=>setView("mobile")}>Mobile preview</button>
    <button type="button" onClick={reset}>Reset example</button>
  </div>
  <div className={`utility-proto-stage ${view==="mobile"?"is-mobile":""}`}>
    <div className="utility-proto-app">
      <div className="utility-proto-top"><strong>Regional utility · Proofing center</strong><span>Interactive concept · sample files</span></div>
      <div className="utility-proto-body" lang={isSpanish ? "es" : "en"}>
        <header><h3>{labels.title}</h3><span role="status" aria-live="polite" aria-atomic="true">{matches.length === 0 ? labels.empty : `${matches.length} / ${reports.length} · ${labels.sample}`}</span></header>
        <div className="utility-proto-search"><label htmlFor="utility-proto-query">{labels.search}</label><input ref={searchInput} id="utility-proto-query" type="search" value={query} onChange={e=>{setQuery(e.target.value);setOpened(null)}} placeholder={labels.search}/></div>
        <div className="utility-proto-filters" role="group" aria-label={isSpanish ? "Filtrar por estado de producción" : "Filter by production status"}>{statuses.map(status=><button type="button" key={status} aria-pressed={filter===status} onClick={()=>{setFilter(status);setOpened(null)}}>{isSpanish ? spanishStatus[status] : status}</button>)}</div>
        <div className="utility-proto-lang" role="group" aria-label={isSpanish ? "Idioma del informe" : "Report language"}>{(["English","Español"] as const).map(value=><button type="button" key={value} lang={value === "Español" ? "es" : "en"} aria-pressed={language===value} onClick={()=>{setLanguage(value);setOpened(null)}}>{value}</button>)}</div>
        {matches.length===0?<div className="utility-proto-empty"><p>{labels.empty}</p><button type="button" onClick={clearFilters}>{labels.clear}</button></div>:<div className="utility-proto-list">
          <div className="utility-proto-tablehead" aria-hidden="true"><b>{labels.region}</b><b>{labels.report}</b><b>{labels.status}</b><b>{labels.action}</b></div>
          {matches.map(r=><div className="utility-proto-report" key={r.name}><div><span className="utility-proto-mobile-label">{labels.region}: </span>{r.region}<small>{r.batch}</small></div><div><span className="utility-proto-mobile-label">{labels.report}: </span><strong>{r.name}</strong><small className="utility-proto-filename">{sampleFilename(r.name,language)}</small></div><div><span className="utility-proto-mobile-label">{labels.status}: </span><span className="utility-proto-status">{isSpanish ? spanishStatus[r.status] : r.status}</span></div><div><button type="button" aria-label={`${labels.open} ${r.name}`} onClick={(event)=>{
            previewTrigger.current = event.currentTarget;
            setOpened(sampleFilename(r.name,language));
          }}>{labels.open} <span aria-hidden="true">↗</span></button></div></div>)}
        </div>}
        {opened&&<div className="utility-proto-toast"><span id="utility-preview-message">{labels.notice}: {opened}</span><button type="button" ref={previewClose} aria-describedby="utility-preview-message" onClick={closePreview}>{labels.close}</button></div>}
      </div>
    </div>
  </div>
  <p className="utility-proto-footnote">Try searching for “Central” and switching to Español to see the file name change. Then choose “Aprobado” to see the empty state and try clearing the filters. No files open and no customer records are used.</p>
 </section>
}
