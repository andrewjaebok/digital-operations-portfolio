"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories } from "../data/categories";
import {
  advance, advanceRoom, approachStation, doors, nearby, nearbyStation,
  roomSpawn, spawn, stationPositions, type Point,
} from "./quest-engine.mjs";
import { QuestExhibit, questStations } from "./QuestExhibit";
import { districtNames, PocketAvatar, PocketFacade, PocketRoom, PocketStation, PocketTown, scenePosition, type PocketFacing } from "./PocketArtwork";
import "./ProjectQuest.css";

const directions: Record<string, [number, number]> = {
  ArrowUp: [0, -1], KeyW: [0, -1], ArrowDown: [0, 1], KeyS: [0, 1],
  ArrowLeft: [-1, 0], KeyA: [-1, 0], ArrowRight: [1, 0], KeyD: [1, 0],
};
const dpad = [["ArrowLeft", "←"], ["ArrowUp", "↑"], ["ArrowDown", "↓"], ["ArrowRight", "→"]];

export default function ProjectQuest() {
  const [open, setOpen] = useState(true);
  const [position, setPosition] = useState(spawn);
  const [selected, setSelected] = useState<number | null>(null);
  const [room, setRoom] = useState<number | null>(null);
  const [exhibit, setExhibit] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [transition, setTransition] = useState<number | null>(null);
  const [facing, setFacing] = useState<PocketFacing>("down");
  const [stride, setStride] = useState(0);
  const travel = useRef(0);
  const keys = useRef(new Set<string>());
  const pendingTaps = useRef(new Set<string>());
  const pos = useRef(spawn);
  const hubPosition = useRef(spawn);
  const map = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const walkingBlocked = paused || transition !== null || exhibit !== null || mapOpen;
  const stations = room === null ? [] : questStations[room];
  const stationLocations = stationPositions(stations.length, room);

  const focus = (selector?: string) => requestAnimationFrame(() => {
    const target = selector ? map.current?.querySelector<HTMLElement>(selector) : map.current;
    target?.focus({ preventScroll: true });
  });

  const stop = () => {
    keys.current.clear();
    pendingTaps.current.clear();
    travel.current = 0;
    setStride(0);
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
    setFacing("down");
    focus();
  };

  const enterRoom = (index: number) => {
    if (walkingBlocked) return;
    stop();
    setSelected(index);
    setMapOpen(false);
    hubPosition.current = pos.current;
    const revealRoom = () => {
      place(roomSpawn);
      setFacing("up");
      setRoom(index);
      setSelected(null);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealRoom();
      focus();
      return;
    }
    setTransition(index);
    timer.current = setTimeout(() => {
      revealRoom();
      timer.current = setTimeout(() => {
        timer.current = null;
        setTransition(null);
        focus();
      }, 130);
    }, 265);
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
    if (mapOpen) {
      setMapOpen(false);
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
      const next = selected === null ? 0 : (selected + 1) % categories.length;
      place({ x: doors[next].x, y: doors[next].y + 27 });
      setFacing("up");
      setSelected(next);
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

  const toggleMap = () => {
    stop();
    setMapOpen(!mapOpen);
    focus(mapOpen ? undefined : ".quest-travel-grid button");
  };

  const togglePause = () => {
    if (transition !== null || mapOpen) return;
    stop();
    setPaused(!paused);
    focus(paused ? (exhibit === null ? undefined : "#quest-exhibit-title") : ".quest-pause button");
  };

  const move = (key: string) => {
    if (walkingBlocked) return;
    keys.current.add(key);
    pendingTaps.current.add(key);
  };

  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!open || walkingBlocked) return;
    const roomStations = room === null ? [] : stationPositions(questStations[room].length, room);
    let frame = 0;
    let last = 0;
    const clear = () => {
      keys.current.clear();
      pendingTaps.current.clear();
      travel.current = 0;
      setStride(0);
    };
    const tick = (now: number) => {
      const dt = last ? (now - last) / 1000 : 1 / 60;
      last = now;
      // A quick tap can end between frames. Let it move once even if it has already lifted.
      const active = [...new Set([...keys.current, ...pendingTaps.current])].map(key => directions[key]);
      pendingTaps.current.clear();
      const dx = Number(active.some(direction => direction[0] === 1)) - Number(active.some(direction => direction[0] === -1));
      const dy = Number(active.some(direction => direction[1] === 1)) - Number(active.some(direction => direction[1] === -1));
      const bounds = (dx || dy) && map.current?.getBoundingClientRect();

      if (bounds && bounds.width > 0 && bounds.height > 0) {
        setFacing(dx ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
        const next = room === null
          ? advance(pos.current, dx, dy, dt, bounds.width, bounds.height)
          : advanceRoom(pos.current, dx, dy, dt, bounds.width, bounds.height, room);
        const distance = Math.hypot(
          (next.x - pos.current.x) * bounds.width / 800,
          (next.y - pos.current.y) * bounds.height / 400,
        );
        if (distance > 0) {
          travel.current = (travel.current + distance) % 64;
          setStride([1, 2, 3, 2][Math.floor(travel.current / 16)]);
          pos.current = next;
          setPosition(next);
        } else {
          travel.current = 0;
          setStride(0);
        }
        setSelected(room === null ? nearby(next) : nearbyStation(next, roomStations));
      } else if (travel.current) {
        travel.current = 0;
        setStride(0);
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
    : paused ? "Paused · Start to resume"
    : exhibit !== null ? "B · Back to the room"
    : action ? "A · " + action
    : room === null ? "Walk anywhere · Select to jump to a district" : "Walk to a station or press Select";

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
    {open && <div className="world-console retro-console quest-v2 pocket-console">
      <div className="console-topline">
        <span>ANDREW <b>POCKET</b></span>
        <small><i className="console-power" aria-hidden="true" /> MODEL 03</small>
      </div>
      <div className="console-bezel">
        <div className="world-toolbar">
          <span>{room === null ? "Andrew’s town" : districtNames[room]}</span>
          <div className="quest-toolbar-actions">
            {room === null ? (
              <button type="button" aria-expanded={mapOpen} disabled={paused || transition !== null} onClick={toggleMap}>Map</button>
            ) : (
              <>
                {exhibit === null && <Link href={categories[room].route}>Case studies</Link>}
                <button type="button" disabled={paused || transition !== null} onClick={back}>{exhibit === null ? "Town" : "Room"}</button>
              </>
            )}
            <button type="button" onClick={reset}>Reset</button>
          </div>
        </div>
        <div className={`quest-stage${exhibit !== null ? " pocket-exhibit-stage" : ""}`} ref={map} tabIndex={0} role="region" aria-label={room === null
          ? "Portfolio world. Arrow keys or WASD to walk. Enter to interact."
          : categories[room].title + " project room. Arrow keys to walk. Enter to interact. Escape to go back."}
          onBlur={stop}
          onKeyDown={event => {
            if (event.code === "KeyM" && room === null && !paused && transition === null && !event.repeat) {
              event.preventDefault();
              toggleMap();
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
          <div className="quest-content" inert={paused || transition !== null || mapOpen}>
            {room === null ? <>
              <PocketTown />
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  type="button"
                  className={`quest-building quest-building-${index}${selected === index ? " is-target" : ""}${transition === index ? " is-opening" : ""}`}
                  style={{ ...scenePosition(doors[index]), zIndex: 20 + doors[index].y }}
                  onFocus={() => setSelected(index)}
                  onClick={() => enterRoom(index)}
                  aria-label={`Enter ${category.title} room`}
                >
                  <PocketFacade district={index} />
                  <span className="quest-building-label"><b>{category.title}</b></span>
                  {selected === index && <span className="pocket-entrance-prompt" aria-hidden="true">A</span>}
                </button>
              ))}
              <PocketAvatar position={position} facing={facing} stride={stride} layered />
            </> : exhibit !== null ? <QuestExhibit station={stations[exhibit]} onBack={back} />
              : <div className={"quest-interior quest-interior-" + room}>
                <PocketRoom district={room} />
                {stations.map((station, index) => <button
                  key={station.kind}
                  type="button"
                  className={"quest-room-prop station-" + station.kind + (selected === index ? " is-target" : "")}
                  style={{
                    ...scenePosition(stationLocations[index]),
                    zIndex: room === 2 ? 20 + stationLocations[index].y : 2,
                  }}
                  onFocus={() => setSelected(index)}
                  onClick={() => openExhibit(index)}
                  aria-label={station.action}
                >
                  <PocketStation kind={station.kind} />
                  <span className="quest-room-prop-label">{station.label}</span>
                </button>)}
                <PocketAvatar position={position} facing={facing} stride={stride} layered={room === 2} />
              </div>}
          </div>
          {mapOpen && room === null && <div className="quest-overlay quest-travel" role="dialog" aria-label="Choose a district"><div className="quest-dialog-head"><strong>WORLD MAP</strong><button type="button" aria-label="Close world map" onClick={toggleMap}>×</button></div><p>Three districts. One world. Choose where to explore.</p><div className="quest-travel-grid">{categories.map((category,index)=><button type="button" key={category.id} onClick={() => fastTravel(index)}><span className={`quest-map-pin quest-map-pin-${index}`}>0{index+1}</span><strong>{category.title}</strong><small>{category.short}</small></button>)}</div></div>}
          {paused && <div className="quest-overlay quest-pause"><strong>PAUSED</strong><button type="button" onClick={togglePause}>Resume game</button></div>}
          {transition !== null && <div className="pocket-transition" role="status" aria-label={`Entering ${categories[transition].title}`} />}
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
          <button type="button" onClick={togglePause} disabled={transition !== null || mapOpen} aria-label={paused ? "Start: resume game" : "Start: pause game"}><span />START</button>
        </div>
        <div className="console-ab">
          <button type="button" onClick={back} aria-label="B: back or cancel"><span>B</span><small>BACK</small></button>
          <button type="button" onClick={activate} disabled={walkingBlocked || selected === null} aria-label={action ? "A: " + action : "A: approach an object or use Select"}><span>A</span><small>ENTER</small></button>
        </div>
      </div>
      <p className="world-hint">Arrows / WASD: move · Enter: interact · Esc: back · M: map · P: pause</p>
    </div>}
  </section>;
}
