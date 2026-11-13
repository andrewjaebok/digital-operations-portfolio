"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "../data/categories";

const directions: Record<string, [number,number]> = {ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]};
export default function ProjectQuest(){
 const [open,setOpen]=useState(true);
 const [position,setPosition]=useState({x:50,y:80});
 const [selected,setSelected]=useState<number|null>(null);
 const keys=useRef(new Set<string>());
 const map=useRef<HTMLDivElement>(null);
 const router=useRouter();
 const reset=()=>{keys.current.clear();setPosition({x:50,y:80});setSelected(null);map.current?.focus();};
 const enter=()=>{if(selected!==null)router.push(categories[selected].route);else {setSelected(0);map.current?.focus();}};
 useEffect(()=>{
  if(!open)return;
  const clear=()=>keys.current.clear();
  window.addEventListener("blur",clear);
  document.addEventListener("visibilitychange",clear);
  const timer=setInterval(()=>{
   let dx=0,dy=0;
   keys.current.forEach(k=>{const d=directions[k];if(d){dx+=d[0];dy+=d[1];}});
   if(!dx&&!dy)return;
   setPosition(p=>{const next={x:Math.max(6,Math.min(94,p.x+dx*1.2)),y:Math.max(57,Math.min(90,p.y+dy*1.2))};
    const nearest=categories.reduce((best,c,i)=>Math.abs(c.x-next.x)<Math.abs(categories[best].x-next.x)?i:best,0);
    setSelected(next.y<74?nearest:null);return next;});
  },40);
  return()=>{clearInterval(timer);clear();window.removeEventListener("blur",clear);document.removeEventListener("visibilitychange",clear);};
 },[open]);
 return <section className="world-section" aria-labelledby="world-title"><div className="world-heading"><div><p className="eyebrow">The interactive route</p><h3 id="world-title">Your work. In a pocket-sized world.</h3></div><button type="button" onClick={()=>{setOpen(!open);keys.current.clear();}}> {open?"Put console away ↑":"Power on →"}</button></div>
 {open&&<div className="world-console retro-console"><div className="console-topline"><span>ANDREW <b>POCKET</b></span><small>MODEL 03</small></div><div className="console-bezel"><div className="console-screen-label"><span className="console-power"/> POWER <i/> DOT MATRIX WITH COLOR</div><div className="world-toolbar"><span>ANDREW’S WORLD <b> / 3 AREAS</b></span><button onClick={()=>{setPosition({x:50,y:80});setSelected(null);map.current?.focus();}}>Reset</button></div><div className="world-map" ref={map} tabIndex={0} role="region" aria-label="Portfolio world. Use arrow keys or WASD to walk along the path, Enter to enter the nearest area, or click any building." onBlur={()=>keys.current.clear()} onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(directions[e.key]){e.preventDefault();keys.current.add(e.key);}if(e.key==="Enter"&&selected!==null){e.preventDefault();router.push(categories[selected].route);}if(e.key==="Escape"){setOpen(false);}}} onKeyUp={e=>keys.current.delete(e.key)}>
 <svg className="world-landscape" viewBox="0 0 1000 480" preserveAspectRatio="none" aria-hidden="true"><rect width="1000" height="480" fill="#e8f0e5"/><path d="M0 90Q160 0 330 80T650 65T1000 70V0H0Z" fill="#d3e3d2"/><path d="M0 410Q260 380 470 440T1000 410V480H0Z" fill="#c9dece"/><path d="M-30 330Q180 290 330 330T680 330T1030 330" fill="none" stroke="#f4e8cf" strokeWidth="45"/><path d="M500 330V160M220 330V225M780 330V225" stroke="#f4e8cf" strokeWidth="32"/>{[60,120,360,640,885,940].map((x,i)=><g key={x} transform={`translate(${x} ${i%2?150:215})`}><rect x="-4" y="0" width="8" height="40" fill="#a18b62"/><circle cy="-5" r="26" fill="#8eb59b"/><circle cx="-7" cy="-12" r="18" fill="#a6c5a6"/></g>)}<path d="M70 440Q150 390 220 450M800 60Q880 100 960 45" stroke="#b5d4d9" strokeWidth="15" fill="none"/></svg>
 {categories.map((c,i)=><Link key={c.id} className={`world-destination destination-${i}${selected===i?" active":""}`} href={c.route} style={{left:`${c.x}%`,top:`${c.y}%`}} onFocus={()=>setSelected(i)} onMouseEnter={()=>setSelected(i)} aria-label={`Enter ${c.title}, ${c.count}`}><svg viewBox="0 0 150 125" aria-hidden="true"><ellipse cx="75" cy="116" rx="65" ry="7" fill="#254e42" opacity=".12"/><path d={i===1?"M24 32H126V112H24Z":"M18 53L75 15L132 53V112H18Z"} fill={i===0?"#f1dfbb":i===1?"#d5deec":"#ead5bb"} stroke="#49635b" strokeWidth="3"/><path d={i===1?"M20 29H130V43H20Z":"M9 54L75 8L141 54L132 65L75 27L18 65Z"} fill={c.color}/><rect x="61" y="79" width="28" height="33" rx="3" fill="#3c5956"/><path d="M30 68H50V89H30ZM100 68H120V89H100Z" fill="#f5fbef" stroke="#688885" strokeWidth="3"/>{i===1&&<path d="M45 52H105M45 60H105" stroke="#5264b0" strokeWidth="4"/>}{i===2&&<path d="M74 37L83 51L74 65L65 51Z" fill="#a26433"/>}</svg><span><small>0{i+1} · {c.short}</small><strong>{c.title}</strong><em>Enter area ↗</em></span></Link>)}
 <span className="world-player" style={{left:`${position.x}%`,top:`${position.y}%`}} aria-hidden="true"><svg viewBox="0 0 24 34" shapeRendering="crispEdges"><ellipse cx="12" cy="32" rx="10" ry="2" fill="#36554b" opacity=".2"/><path d="M6 5H18V17H6Z" fill="#e9b68d"/><path d="M4 5H20V9H4ZM7 2H17V5H7Z" fill="#345952"/><path d="M8 11H10V13H8ZM15 11H17V13H15Z" fill="#263a38"/><path d="M6 18H18V27H6Z" fill="#227e9b"/><path d="M3 19H6V26H3ZM18 19H21V26H18Z" fill="#e9b68d"/><path d="M6 27H11V32H6ZM14 27H19V32H14Z" fill="#344742"/></svg></span>
 </div><div className="console-screen-status" aria-live="polite">{selected===null?"CHOOSE AN AREA · WALK OR TAP A BUILDING":`${categories[selected].title.toUpperCase()} · PRESS A TO ENTER`}</div></div>
 <div className="console-controls"><div className="console-dpad" aria-label="Directional controls">{[["ArrowLeft","←"],["ArrowUp","↑"],["ArrowDown","↓"],["ArrowRight","→"]].map(([key,label])=><button className={`console-${key}`} key={key} aria-label={`Move ${key.replace("Arrow","").toLowerCase()}`} onPointerDown={e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);keys.current.add(key);}} onPointerUp={()=>keys.current.delete(key)} onPointerCancel={()=>keys.current.delete(key)} onLostPointerCapture={()=>keys.current.delete(key)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();keys.current.add(key);}}} onKeyUp={()=>keys.current.delete(key)} onBlur={()=>keys.current.delete(key)}>{label}</button>)}<span aria-hidden="true"/></div>
 <div className="console-system-buttons"><button onClick={()=>{keys.current.clear();setSelected(i=>i===null?0:(i+1)%categories.length);}}><span/>SELECT</button><button onClick={reset}><span/>START</button></div>
 <div className="console-ab"><button onClick={()=>{keys.current.clear();setSelected(null);map.current?.focus();}} aria-label="B: clear selection"><span>B</span><small>BACK</small></button><button onClick={enter} aria-label={selected===null?"A: select first area":`A: enter ${categories[selected].title}`}><span>A</span><small>ENTER</small></button></div></div>
 <div className="console-bottom"><span>PRODUCT · SYSTEMS · IDEAS</span><div className="console-speaker" aria-hidden="true">{[0,1,2,3,4,5].map(i=><i key={i}/>)}</div></div>
 <p className="world-hint">WASD / arrows to walk · Select to choose an area · A / Enter to explore · Start to reset</p></div>}
 </section>
}
