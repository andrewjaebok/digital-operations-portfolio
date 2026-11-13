"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "../data/categories";
import { advance, doors, nearby, paths, spawn } from "./quest-engine.mjs";

const directions: Record<string, [number, number]> = {
  ArrowUp: [0,-1], KeyW: [0,-1], ArrowDown: [0,1], KeyS: [0,1],
  ArrowLeft: [-1,0], KeyA: [-1,0], ArrowRight: [1,0], KeyD: [1,0],
};
const projects = [
  [
    {title:"Regional Utility Portal", description:"Search, status clarity, and a simpler customer workflow.", route:"/projects/customer-portal-redesign"},
    {title:"Prescription Pad Ordering", description:"Clearer guidance for regulated ordering.", route:"/projects/prescription-pad-ordering-portal"},
    {title:"University Logo Directory", description:"Searchable organizational paths and modeled validation.", route:"/projects/university-logo-directory"},
  ],
  [
    {title:"Systems & Automation", description:"Practical improvements to internal workflows.", route:"/projects/operational-systems-automation"},
    {title:"Customer Ordering Protection", description:"Investigating and reducing automated server traffic.", route:"/projects/operational-systems-automation/#traffic-protection"},
  ],
  [{title:"Hearth / Lumafi", description:"An independent personal finance product, from idea to delivery.", route:"/projects/hearth"}],
];
export default function ProjectQuest() {
  const [open,setOpen]=useState(true);
  const [position,setPosition]=useState(spawn);
  const [selected,setSelected]=useState<number|null>(null);
  const [room,setRoom]=useState<number|null>(null);
  const [project,setProject]=useState(0);
  const [paused,setPaused]=useState(false);
  const [transition,setTransition]=useState<number|null>(null);
  const [facing,setFacing]=useState("down");
  const [walking,setWalking]=useState(false);
  const keys=useRef(new Set<string>());
  const pos=useRef(spawn);
  const map=useRef<HTMLDivElement>(null);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const router=useRouter();
  const focus=()=>requestAnimationFrame(()=>map.current?.focus({preventScroll:true}));
  const stop=()=>{keys.current.clear();setWalking(false);};
  const reset=()=>{
    stop();if(timer.current)clearTimeout(timer.current);
    pos.current={...spawn};setPosition({...spawn});setSelected(null);setRoom(null);
    setTransition(null);setPaused(false);setProject(0);setFacing("down");focus();
  };
  const enterRoom=(i:number)=>{
    if(paused||transition!==null)return;
    stop();setSelected(i);setTransition(i);
    timer.current=setTimeout(()=>{setRoom(i);setProject(0);setTransition(null);focus();},
      window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:280);
  };
  const activate=()=>{
    if(paused||transition!==null)return;
    if(room!==null)router.push(projects[room][project].route);
    else if(selected!==null)enterRoom(selected);
  };
  const back=()=>{
    stop();if(timer.current)clearTimeout(timer.current);
    setTransition(null);
    if(paused)setPaused(false);
    else if(room!==null){setRoom(null);setSelected(nearby(pos.current));}
    else setSelected(null);
    focus();
  };
  const cycle=()=>{
    if(paused||transition!==null)return;
    stop();if(room!==null)setProject(p=>(p+1)%projects[room].length);
    else setSelected(s=>s===null?0:(s+1)%categories.length);
    focus();
  };
  const togglePause=()=>{if(transition!==null)return;stop();setPaused(p=>!p);focus();};
  const move=(key:string)=>{
    if(paused||transition!==null)return;
    if(room!==null){const d=directions[key];setProject(p=>(p+(d[0]+d[1]>0?1:-1)+projects[room].length)%projects[room].length);}
    else keys.current.add(key);
  };
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  useEffect(()=>{
    if(!open||paused||room!==null||transition!==null)return;
    let frame=0,last=0;
    const clear=()=>{keys.current.clear();setWalking(false);};
    const tick=(now:number)=>{
      const dt=last?(now-last)/1000:0;last=now;
      const active=[...keys.current].map(k=>directions[k]);
      const dx=Number(active.some(d=>d?.[0]===1))-Number(active.some(d=>d?.[0]===-1));
      const dy=Number(active.some(d=>d?.[1]===1))-Number(active.some(d=>d?.[1]===-1));
      if(dx||dy){
        setFacing(Math.abs(dx)>0?(dx>0?"right":"left"):(dy>0?"down":"up"));
        const bounds=map.current?.getBoundingClientRect();
        if(bounds){
          const next=advance(pos.current,dx,dy,dt,bounds.width,bounds.height);
          const changed=next.x!==pos.current.x||next.y!==pos.current.y;
          setWalking(changed);pos.current=next;setPosition(next);setSelected(nearby(next));
        }
      }else setWalking(false);
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    window.addEventListener("blur",clear);document.addEventListener("visibilitychange",clear);
    return()=>{cancelAnimationFrame(frame);clear();window.removeEventListener("blur",clear);document.removeEventListener("visibilitychange",clear);};
  },[open,paused,room,transition]);
  const status=paused?"PAUSED · START TO RESUME":room!==null?`${project+1}/${projects[room].length} · A: OPEN CASE STUDY · B: HUB`:selected===null?"FOLLOW A PATH · OR SELECT AN AREA":`${categories[selected].title.toUpperCase()} · A: ENTER`;
  return <section className="world-section" aria-labelledby="world-title">
    <div className="world-heading"><div><p className="eyebrow">The interactive route</p><h3 id="world-title">A little world of real work.</h3></div><button onClick={()=>{stop();setOpen(o=>!o);}}>{open?"Put console away ↑":"Power on →"}</button></div>
    {open&&<div className="world-console retro-console quest-v2">
      <div className="console-topline"><span>ANDREW <b>POCKET</b></span><small>MODEL 03</small></div>
      <div className="console-bezel"><div className="console-screen-label"><span className="console-power"/> POWER <i/> DOT MATRIX WITH COLOR</div>
        <div className="world-toolbar"><span>{room===null?"ANDREW’S WORLD / 3 AREAS":categories[room].title.toUpperCase()}</span><button onClick={reset}>Reset</button></div>
        <div className="quest-stage" ref={map} tabIndex={0} role="region" aria-label={room===null?"Portfolio world. Arrow keys or WASD to walk; Enter to enter; P to pause; Escape to cancel.":`${categories[room].title} project room. Arrow keys to choose, Enter to open, Escape to return.`}
          onBlur={stop} onKeyDown={e=>{
            if(e.target!==e.currentTarget)return;
            if(directions[e.code]){e.preventDefault();if(!e.repeat)move(e.code);}
            else if(e.code==="Enter"||e.code==="Space"){e.preventDefault();if(!e.repeat)activate();}
            else if(e.code==="Escape"){e.preventDefault();back();}
            else if(e.code==="KeyP"){e.preventDefault();if(!e.repeat)togglePause();}
          }} onKeyUp={e=>keys.current.delete(e.code)}>
          <div className="quest-content" inert={paused||transition!==null}>
          {room===null?<>
            <svg className="quest-terrain" viewBox="0 0 800 400" preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden="true">
              <rect width="800" height="400" fill="#b9cda1"/>
              <path d="M0 0H800V45H660V31H520V54H290V35H125V60H0ZM0 370H180V385H580V370H800V400H0Z" fill="#a0bc91"/>
              {paths.map((r,i)=><rect key={i} {...r} fill="#e7d4a5"/>)}
              {[70,278,526,730].map((x,i)=><g key={x} transform={`translate(${x} ${i%2?230:110})`}><path d="M-5 0H5V26H-5" fill="#7e7150"/><path d="M-24-30H-15V-42H15V-30H24V0H14V9H-14V0H-24Z" fill="#537f60"/><path d="M-15-30H-7V-38H10V-28H17V-12H-15Z" fill="#79a477"/></g>)}
              {[90,280,520,710].map(x=><path key={x} d={`M${x} 275h5v5h-5z M${x+10} 269h5v5h-5z`} fill="#739264"/>)}
            </svg>
            {categories.map((c,i)=><button key={c.id} className={`quest-building building-${i}${selected===i?" is-target":""}`} style={{left:`${doors[i].x/8}%`,top:`${doors[i].y/4}%`}} onFocus={()=>setSelected(i)} onClick={()=>enterRoom(i)} aria-label={`Enter ${c.title} room`}>
              <span className="quest-building-label">{c.title}</span>
              <svg viewBox="0 0 100 90" shapeRendering="crispEdges" aria-hidden="true">
                <path d={i===0?"M8 26H92V84H8Z":i===1?"M16 10H84V84H16Z":"M10 34H90V84H10Z"} fill={i===1?"#bfc6d7":"#ead8ac"} stroke="#3d594d" strokeWidth="3"/>
                <path d={i===0?"M4 20H96V31H4Z":i===1?"M12 6H88V17H12Z":"M3 34V26H15V18H28V10H72V18H85V26H97V34Z"} fill={c.color}/>
                {i===0?<><path d="M18 43H82V57H18Z" fill="#448997"/><path d="M34 43V57M65 43V57" stroke="#d2e5d0" strokeWidth="3"/></>:i===1?<><path d="M27 25H42V55H27ZM58 25H73V55H58Z" fill="#46556d"/><path d="M30 31H37M61 31H68M30 42H37M61 42H68" stroke="#a4d0a3" strokeWidth="3"/></>:<><path d="M20 45H35V61H20ZM65 45H80V61H65Z" fill="#eebf67"/><path d="M46 25H54V38H46Z" fill="#9a5c34"/></>}
                <path d="M42 63H58V84H42Z" fill={selected===i?"#f1cc65":"#30483f"}/><path d="M38 85H62V90H38Z" fill="#f4e4b4"/>
              </svg><span className="quest-door-glow"/>
            </button>)}
            <span className={`quest-avatar face-${facing}${walking?" walking":""}`} style={{left:`${position.x/8}%`,top:`${position.y/4}%`}} aria-hidden="true"><svg viewBox="0 0 24 34" shapeRendering="crispEdges"><ellipse cx="12" cy="32" rx="9" ry="2" fill="#304735" opacity=".2"/><g className="avatar-body"><path d="M6 6H18V17H6Z" fill="#e9b68d"/><path d="M4 5H20V9H4ZM7 2H17V5H7Z" fill="#345952"/>{facing!=="up"&&<path d={facing==="left"?"M6 11H9V14H6Z":facing==="right"?"M15 11H18V14H15Z":"M8 11H10V13H8ZM15 11H17V13H15Z"} fill="#263a38"/>}<path d="M6 18H18V27H6Z" fill="#227e9b"/>{facing==="up"&&<path d="M8 19H16V25H8Z" fill="#bb995a"/>}<path d="M3 19H6V25H3ZM18 19H21V25H18Z" fill="#e9b68d"/></g><path className="avatar-leg-left" d="M6 27H11V32H6Z" fill="#344742"/><path className="avatar-leg-right" d="M14 27H19V32H14Z" fill="#344742"/></svg></span>
          </>:<div className={`quest-room room-${room}`}><div className="quest-room-heading"><span>0{room+1} / {categories[room].short}</span><button onClick={back}>← Hub</button></div><h4>{categories[room].title}</h4><div className="quest-room-projects">{projects[room].map((p,i)=><Link key={p.route} href={p.route} className={project===i?"is-project-selected":""} onFocus={()=>setProject(i)} onMouseEnter={()=>setProject(i)}><span className="quest-cartridge" aria-hidden="true">0{i+1}</span><span><strong>{p.title}</strong><small>{p.description}</small></span><b aria-hidden="true">↗</b></Link>)}</div><Link className="quest-room-all" href={categories[room].route}>Browse this category →</Link></div>}
          </div>
          {paused&&<div className="quest-overlay"><strong>PAUSED</strong><button onClick={togglePause}>Resume game</button></div>}
          {transition!==null&&<div className="quest-overlay quest-arriving" role="status"><span>ENTERING</span><strong>{categories[transition].title}</strong></div>}
        </div>
        <div className="console-screen-status" aria-live="polite">{status}</div>
      </div>
      <div className="console-controls"><div className="console-dpad" aria-label="Directional controls">{[["ArrowLeft","←"],["ArrowUp","↑"],["ArrowDown","↓"],["ArrowRight","→"]].map(([key,label])=><button className={`console-${key}`} key={key} aria-label={`Move ${key.replace("Arrow","").toLowerCase()}`} disabled={paused||transition!==null} onPointerDown={e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);move(key);}} onPointerUp={()=>keys.current.delete(key)} onPointerCancel={()=>keys.current.delete(key)} onLostPointerCapture={()=>keys.current.delete(key)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();if(!e.repeat)move(key);}}} onKeyUp={()=>keys.current.delete(key)} onBlur={()=>keys.current.delete(key)}>{label}</button>)}<span aria-hidden="true"/></div>
      <div className="console-system-buttons"><button onClick={cycle} disabled={paused||transition!==null}><span/>SELECT</button><button onClick={togglePause} disabled={transition!==null} aria-label={paused?"Start: resume game":"Start: pause game"}><span/>START</button></div>
      <div className="console-ab"><button onClick={back} aria-label="B: back or cancel"><span>B</span><small>BACK</small></button><button onClick={activate} disabled={paused||transition!==null||(room===null&&selected===null)} aria-label={room!==null?`A: open ${projects[room][project].title}`:selected!==null?`A: enter ${categories[selected].title}`:"A: approach a doorway or use Select"}><span>A</span><small>ENTER</small></button></div></div>
      <div className="console-bottom"><span>PRODUCT · SYSTEMS · IDEAS</span><div className="console-speaker" aria-hidden="true">{[0,1,2,3,4,5].map(i=><i key={i}/>)}</div></div>
      <p className="world-hint">Arrows / WASD: move · Select: choose · A / Enter: open · B / Esc: back · Start / P: pause</p>
    </div>}
  </section>;
}
