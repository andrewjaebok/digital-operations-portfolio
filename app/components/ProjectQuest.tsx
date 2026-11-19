"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories } from "../data/categories";
import {
  advance, advanceRoom, approachStation, doors, nearby, nearbyStation, paths,
  roomSpawn, spawn, stationPositions, stationRow, type Point,
} from "./quest-engine.mjs";
import { QuestExhibit, questStations } from "./QuestExhibit";
import "./ProjectQuest.css";

const directions: Record<string, [number, number]> = {
  ArrowUp: [0, -1], KeyW: [0, -1], ArrowDown: [0, 1], KeyS: [0, 1],
  ArrowLeft: [-1, 0], KeyA: [-1, 0], ArrowRight: [1, 0], KeyD: [1, 0],
};
const dpad = [["ArrowLeft", "←"], ["ArrowUp", "↑"], ["ArrowDown", "↓"], ["ArrowRight", "→"]];

function QuestAvatar({ position, facing, walking }: { position: Point; facing: string; walking: boolean }) {
  return (
    <span className={`quest-avatar face-${facing}${walking?" walking":""}`} style={{left:`${position.x/8}%`,top:`${position.y/4}%`}} aria-hidden="true"><svg viewBox="0 0 24 34" shapeRendering="crispEdges"><ellipse cx="12" cy="32" rx="9" ry="2" fill="#304735" opacity=".2"/><g className="avatar-body"><path d="M6 6H18V17H6Z" fill="#e9b68d"/><path d="M4 5H20V9H4ZM7 2H17V5H7Z" fill="#345952"/>{facing!=="up"&&<path d={facing==="left"?"M6 11H9V14H6Z":facing==="right"?"M15 11H18V14H15Z":"M8 11H10V13H8ZM15 11H17V13H15Z"} fill="#263a38"/>}<path d="M6 18H18V27H6Z" fill="#227e9b"/>{facing==="up"&&<path d="M8 19H16V25H8Z" fill="#bb995a"/>}<path d="M3 19H6V25H3ZM18 19H21V25H18Z" fill="#e9b68d"/></g><path className="avatar-leg-left" d="M6 27H11V32H6Z" fill="#344742"/><path className="avatar-leg-right" d="M14 27H19V32H14Z" fill="#344742"/></svg></span>
  );
}

export default function ProjectQuest() {
  const [open, setOpen] = useState(true);
  const [position, setPosition] = useState(spawn);
  const [selected, setSelected] = useState<number | null>(null);
  const [room, setRoom] = useState<number | null>(null);
  const [exhibit, setExhibit] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [transition, setTransition] = useState<number | null>(null);
  const [facing, setFacing] = useState("down");
  const [walking, setWalking] = useState(false);
  const keys = useRef(new Set<string>());
  const pos = useRef(spawn);
  const hubPosition = useRef(spawn);
  const map = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const walkingBlocked = paused || transition !== null || exhibit !== null || mapOpen || guideOpen;
  const stations = room === null ? [] : questStations[room];
  const stationLocations = stationPositions(stations.length);

  const focus = (selector?: string) => requestAnimationFrame(() => {
    const target = selector ? map.current?.querySelector<HTMLElement>(selector) : map.current;
    target?.focus({ preventScroll: true });
  });

  const stop = () => {
    keys.current.clear();
    setWalking(false);
  };

  const place = (point: Point) => {
    pos.current = point;
    setPosition(point);
  };

  const reset = () => {
    stop();
    if (timer.current !== null) clearTimeout(timer.current);
    hubPosition.current = spawn;
    place(spawn);
    setSelected(null);
    setRoom(null);
    setExhibit(null);
    setTransition(null);
    setPaused(false);
    setMapOpen(false);
    setGuideOpen(false);
    setFacing("down");
    focus();
  };

  const enterRoom = (index: number) => {
    if (walkingBlocked) return;
    stop();
    setSelected(index);
    setTransition(index);
    setMapOpen(false);
    setGuideOpen(false);
    hubPosition.current = pos.current;
    timer.current = setTimeout(() => {
      place(roomSpawn);
      setFacing("up");
      setRoom(index);
      setSelected(null);
      setTransition(null);
      focus();
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280);
  };

  const openExhibit = (index: number) => {
    if (walkingBlocked) return;
    stop();
    place(approachStation(stationLocations[index]));
    setSelected(index);
    setFacing("up");
    setExhibit(index);
    focus("#quest-exhibit-title");
  };

  const activate = () => {
    if (walkingBlocked || selected === null) return;
    if (room === null) enterRoom(selected);
    else openExhibit(selected);
  };

  const back = () => {
    stop();
    if (timer.current !== null) clearTimeout(timer.current);
    setTransition(null);
    if (mapOpen || guideOpen) {
      setMapOpen(false);
      setGuideOpen(false);
      focus();
      return;
    }
    if (paused) {
      setPaused(false);
      focus(exhibit === null ? undefined : "#quest-exhibit-title");
      return;
    }
    if (exhibit !== null) {
      setExhibit(null);
    } else if (room !== null) {
      place(hubPosition.current);
      setRoom(null);
      setSelected(nearby(hubPosition.current));
      setFacing("down");
    } else {
      setSelected(null);
    }
    focus();
  };

  const cycle = () => {
    if (walkingBlocked) return;
    stop();
    if (room === null) {
      setSelected(current => {
        const next = current === null ? 0 : (current + 1) % categories.length;
        place({ x: doors[next].x, y: doors[next].y + 27 });
        return next;
      });
    } else {
      const index = selected === null ? 0 : (selected + 1) % stations.length;
      place(approachStation(stationLocations[index]));
      setFacing("up");
      setSelected(index);
    }
    focus();
  };

  const fastTravel = (index: number) => {
    stop();
    place({ x: doors[index].x, y: doors[index].y + 27 });
    setSelected(index);
    setFacing("up");
    setMapOpen(false);
    focus();
  };

  const togglePause = () => {
    if (transition !== null) return;
    stop();
    setPaused(!paused);
    focus(paused ? (exhibit === null ? undefined : "#quest-exhibit-title") : ".quest-pause button");
  };

  const move = (key: string) => {
    if (!walkingBlocked) keys.current.add(key);
  };

  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!open || walkingBlocked) return;
    const roomStations = room === null ? [] : stationPositions(questStations[room].length);
    const movePlayer = room === null ? advance : advanceRoom;
    let frame = 0;
    let last = 0;
    const clear = () => {
      keys.current.clear();
      setWalking(false);
    };
    const tick = (now: number) => {
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      const active = [...keys.current].map(key => directions[key]);
      const dx = Number(active.some(direction => direction[0] === 1)) - Number(active.some(direction => direction[0] === -1));
      const dy = Number(active.some(direction => direction[1] === 1)) - Number(active.some(direction => direction[1] === -1));
      const bounds = (dx || dy) && map.current?.getBoundingClientRect();

      if (bounds && bounds.width > 0 && bounds.height > 0) {
        setFacing(dx ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
        const next = movePlayer(pos.current, dx, dy, dt, bounds.width, bounds.height);
        const moved = next.x !== pos.current.x || next.y !== pos.current.y;
        if (moved) {
          pos.current = next;
          setPosition(next);
        }
        setWalking(moved);
        setSelected(room === null ? nearby(next) : nearbyStation(next, roomStations));
      } else {
        setWalking(false);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      cancelAnimationFrame(frame);
      clear();
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, [open, room, walkingBlocked]);

  const action = selected === null ? "" : room === null
    ? "Enter " + categories[selected].title : stations[selected].action;
  const status = mapOpen ? "Choose a district · Fast travel"
    : guideOpen ? "B · Close the guide"
    : paused ? "Paused · Start to resume"
    : exhibit !== null ? "B · Back to the room"
    : action ? "A · " + action
    : room === null ? "Follow a path or press Select" : "Walk to a station or press Select";

  return <section className="world-section" id="project-quest" aria-labelledby="world-title">
    <div className="world-heading">
      <div><p className="eyebrow">The interactive route</p><h3 id="world-title">A little world of real work.</h3></div>
      <button type="button" onClick={() => {
        stop();
        if (transition !== null && timer.current !== null) {
          clearTimeout(timer.current);
          setTransition(null);
        }
        setOpen(!open);
      }}>{open ? "Put console away ↑" : "Power on →"}</button>
    </div>
    {open && <div className="world-console retro-console quest-v2">
      <div className="console-topline"><span>ANDREW <b>POCKET</b></span><small>MODEL 03</small></div>
      <div className="console-bezel">
        <div className="console-screen-label"><span className="console-power"/> POWER <i/> DOT MATRIX WITH COLOR</div>
        <div className="world-toolbar">
          <span>{room === null ? "ANDREW’S WORLD / 3 AREAS" : categories[room].title.toUpperCase()}</span>
          <div className="quest-toolbar-actions">{room === null && <button type="button" aria-expanded={mapOpen} onClick={() => { stop(); setGuideOpen(false); setMapOpen(true); }}>MAP</button>}<button type="button" onClick={reset}>Reset</button></div>
        </div>
        <div className="quest-stage" ref={map} tabIndex={0} role="region" aria-label={room === null
          ? "Portfolio world. Arrow keys or WASD to walk. Enter to interact."
          : categories[room].title + " project room. Arrow keys to walk. Enter to interact. Escape to go back."}
          onBlur={stop}
          onKeyDown={event => {
            if (event.code === "KeyM" && room === null && !paused && transition === null) {
              event.preventDefault();
              stop();
              setGuideOpen(false);
              setMapOpen(current => !current);
              return;
            }
            if (event.code === "Escape") {
              event.preventDefault();
              back();
              return;
            }
            if (event.target !== event.currentTarget) return;
            if (directions[event.code]) {
              event.preventDefault();
              if (!event.repeat) move(event.code);
            } else if (event.code === "Enter" || event.code === "Space") {
              event.preventDefault();
              if (!event.repeat) activate();
            } else if (event.code === "KeyP") {
              event.preventDefault();
              if (!event.repeat) togglePause();
            }
          }}
          onKeyUp={event => keys.current.delete(event.code)}
        >
          <div className="quest-content" inert={paused || transition !== null}>
            {room === null ? <>
            <svg className="quest-terrain" viewBox="0 0 800 400" preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden="true">
              <rect width="800" height="400" fill="#b9cda1"/>
              <path d="M0 0H800V45H660V31H520V54H290V35H125V60H0ZM0 370H180V385H580V370H800V400H0Z" fill="#a0bc91"/>
              {paths.map((r,i)=><rect key={i} {...r} fill="#e7d4a5"/>)}
              {[70,278,526,730].map((x,i)=><g key={x} transform={`translate(${x} ${i%2?230:110})`}><path d="M-5 0H5V26H-5" fill="#7e7150"/><path d="M-24-30H-15V-42H15V-30H24V0H14V9H-14V0H-24Z" fill="#537f60"/><path d="M-15-30H-7V-38H10V-28H17V-12H-15Z" fill="#79a477"/></g>)}
              {[90,280,520,710].map(x=><path key={x} d={`M${x} 275h5v5h-5z M${x+10} 269h5v5h-5z`} fill="#739264"/>)}
              {[42,104,215,325,483,578,694,760].map((x,i)=><g className="quest-flower" key={x} style={{animationDelay:`${i * -.31}s`}} transform={`translate(${x} ${i%2?264:383})`}><rect x="-2" y="-7" width="4" height="11" fill="#59886b"/><rect x="-6" y="-11" width="12" height="7" fill={i%3===0?"#eea35b":i%3===1?"#f8e1a1":"#e0a4c4"}/><rect x="-2" y="-8" width="4" height="4" fill="#fff5ca"/></g>)}
              {[120,342,460,684].map((x,i)=><g key={x} transform={`translate(${x} ${i%2?372:268})`}><rect x="-18" y="0" width="36" height="6" fill="#826a51"/><rect x="-14" y="6" width="5" height="11" fill="#5a5e49"/><rect x="9" y="6" width="5" height="11" fill="#5a5e49"/></g>)}
              {[34,768].map(x=><g key={x} transform={`translate(${x} 306)`}><rect x="-3" y="-30" width="6" height="36" fill="#526b60"/><rect x="-10" y="-34" width="20" height="9" fill="#f5d58a"/><rect x="-7" y="-31" width="14" height="3" fill="#fff5c2"/></g>)}
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
              <button type="button" className="quest-guide" onClick={() => {stop(); setGuideOpen(true);}} aria-label="Talk to the town guide"><span className="quest-guide-sprite" aria-hidden="true">★</span><span className="quest-guide-label">GUIDE</span></button>
              <QuestAvatar position={position} facing={facing} walking={walking} />
            </> : exhibit !== null ? <QuestExhibit station={stations[exhibit]} onBack={back} />
              : <div className={"quest-interior quest-interior-" + room}>
                <header className="quest-interior-heading">
                  <div><h4>{categories[room].title}</h4><span>{stations.length} project stations</span></div><button type="button" onClick={back}>← Hub</button>
                </header>
                <div className="quest-room-rug" aria-hidden="true" />
                <div className="quest-room-details" aria-hidden="true"><span className="quest-room-window"/><span className="quest-room-window"/><span className="quest-room-shelf"/><span className="quest-room-plant"/></div>
                {stations.map((station, index) => <button
                  key={station.kind}
                  type="button"
                  className={"quest-room-prop station-" + station.kind + (selected === index ? " is-target" : "")}
                  style={{ left: stationLocations[index] / 8 + "%", top: stationRow / 4 + "%" }}
                  onFocus={() => setSelected(index)}
                  onClick={() => openExhibit(index)}
                  aria-label={station.action}
                >
                  <span className="quest-room-prop-art" aria-hidden="true"><i /><b /></span>
                  <span className="quest-room-prop-label">{station.label}</span>
                </button>)}
                <QuestAvatar position={position} facing={facing} walking={walking} />
                <Link className="quest-interior-index" href={categories[room].route}>Browse all projects in this room ↗</Link>
              </div>}
          </div>
          {mapOpen && room === null && <div className="quest-overlay quest-travel" role="dialog" aria-modal="true" aria-label="Choose a district"><div className="quest-dialog-head"><strong>WORLD MAP</strong><button type="button" onClick={() => {setMapOpen(false);focus();}}>×</button></div><p>Three districts. One world. Choose where to explore.</p><div className="quest-travel-grid">{categories.map((category,index)=><button type="button" key={category.id} onClick={() => fastTravel(index)}><span className={`quest-map-pin quest-map-pin-${index}`}>0{index+1}</span><strong>{category.title}</strong><small>{category.short}</small></button>)}</div></div>}
          {guideOpen && room === null && <div className="quest-overlay quest-guide-dialog" role="dialog" aria-modal="true" aria-label="Town guide"><div className="quest-dialog-head"><strong>TOWN GUIDE</strong><button type="button" onClick={() => {setGuideOpen(false);focus();}}>×</button></div><p>Welcome to Andrew Pocket! Every district tells a different part of the same story: making complex work simpler.</p><p>Visit the Digital Studio for customer experiences, Systems Station for infrastructure, or Ideas Workshop for independent projects.</p><button type="button" onClick={() => {setGuideOpen(false);setMapOpen(true);}}>Open the world map →</button></div>}
          {paused && <div className="quest-overlay quest-pause"><strong>PAUSED</strong><button type="button" onClick={togglePause}>Resume game</button></div>}
          {transition !== null && <div className="quest-overlay quest-arriving" role="status"><span>ENTERING</span><strong>{categories[transition].title}</strong></div>}
        </div>
        <div className="console-screen-status" aria-live="polite">{status}</div>
      </div>
      <div className="console-controls">
        <div className="console-dpad" aria-label="Directional controls">
          {dpad.map(([key, label]) => <button
            type="button" className={"console-" + key} key={key} aria-label={"Move " + key.replace("Arrow","").toLowerCase()}
            disabled={walkingBlocked}
            onPointerDown={event => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              move(key);
            }}
            onPointerUp={() => keys.current.delete(key)}
            onPointerCancel={() => keys.current.delete(key)}
            onLostPointerCapture={() => keys.current.delete(key)}
            onKeyDown={event => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (!event.repeat) move(key);
              }
            }}
            onKeyUp={() => keys.current.delete(key)}
            onBlur={() => keys.current.delete(key)}
          >{label}</button>)}
          <span aria-hidden="true" />
        </div>
        <div className="console-system-buttons">
          <button type="button" onClick={cycle} disabled={walkingBlocked}><span />SELECT</button>
          <button type="button" onClick={togglePause} disabled={transition !== null} aria-label={paused ? "Start: resume game" : "Start: pause game"}><span />START</button>
        </div>
        <div className="console-ab">
          <button type="button" onClick={back} aria-label="B: back or cancel"><span>B</span><small>BACK</small></button>
          <button type="button" onClick={activate} disabled={walkingBlocked || selected === null} aria-label={action ? "A: " + action : "A: approach an object or use Select"}><span>A</span><small>ENTER</small></button>
        </div>
      </div>
      <div className="console-bottom"><span>PRODUCT · SYSTEMS · IDEAS</span><div className="console-speaker" aria-hidden="true">{[0,1,2,3,4,5].map(i => <i key={i} />)}</div></div>
      <p className="world-hint">Arrows / WASD: move · Select: jump to a destination · M: world map · A / Enter: interact · B / Esc: back · Start / P: pause</p>
    </div>}
  </section>;
}
