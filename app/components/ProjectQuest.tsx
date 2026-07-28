"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Position = {
  x: number;
  y: number;
};

type Direction = "up" | "down" | "left" | "right";
type SelectionSource =
  | "proximity"
  | "hover"
  | "keyboard"
  | "shortcut"
  | "intentional"
  | null;

type Project = {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  capability: string;
  description: string;
  evidence?: string;
  route: string;
  building: Position;
  door: Position;
};

const projects: Project[] = [
  {
    id: "utility",
    number: "01",
    shortTitle: "Regional Utility",
    title: "Regional Utility Portal",
    capability: "Customer Workflow",
    description:
      "Redesigned a recurring report-review workflow around faster discovery, clearer status visibility, and structured navigation.",
    evidence:
      "20-person evaluation: core report tasks were completed faster with fewer incorrect selections.",
    route: "/projects/customer-portal-redesign",
    building: { x: 2, y: 1 },
    door: { x: 3, y: 4 },
  },
  {
    id: "rx",
    number: "02",
    shortTitle: "Prescription Pads",
    title: "Prescription Pad Ordering",
    capability: "Regulated Product & Growth",
    description:
      "Modernized a regulated ordering experience while preserving the existing operational and production foundation.",
    evidence: "+1,272% new users after the redesign and article program.",
    route: "/projects/prescription-pad-ordering-portal",
    building: { x: 10, y: 1 },
    door: { x: 11, y: 4 },
  },
  {
    id: "hearth",
    number: "03",
    shortTitle: "Hearth",
    title: "Hearth",
    capability: "0→1 Product Development",
    description:
      "Built and iterated a privacy-first personal finance product across strategy, UX, cloud architecture, and release operations.",
    route: "/projects/hearth",
    building: { x: 2, y: 7 },
    door: { x: 3, y: 10 },
  },
  {
    id: "operations",
    number: "04",
    shortTitle: "Operations",
    title: "Operational Systems & Automation",
    capability: "Operational Systems",
    description:
      "Turned recurring digital-production friction into more repeatable workflows through automation, root-cause analysis, and QA.",
    route: "/projects/operational-systems-automation",
    building: { x: 10, y: 7 },
    door: { x: 11, y: 10 },
  },
];

const trees = [
  [0, 0], [1, 0], [2, 0], [5, 0], [6, 0], [9, 0], [10, 0], [13, 0], [14, 0], [15, 0],
  [0, 1], [15, 1], [0, 2], [15, 2], [0, 3], [15, 3], [0, 6], [15, 6],
  [0, 7], [15, 7], [0, 8], [15, 8], [0, 9], [15, 9], [0, 10], [15, 10],
  [0, 11], [1, 11], [2, 11], [5, 11], [6, 11], [9, 11], [10, 11], [13, 11], [14, 11], [15, 11],
] as const;

const flowers = [
  [6, 2], [7, 2], [8, 2], [9, 2], [6, 9], [7, 9], [8, 9], [9, 9],
] as const;

const startPosition = { x: 7, y: 6 };
const stepDuration = 118;
const storagePositionKey = "project-quest-position";
const storageViewedKey = "project-quest-viewed";

const directionVectors: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const keyDirections: Record<string, Direction> = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

const tileStyle = (x: number, y: number) =>
  ({ "--tile-x": x, "--tile-y": y }) as CSSProperties;

const isPassable = (position: Position) => {
  if (
    position.x < 1 ||
    position.x > 14 ||
    position.y < 1 ||
    position.y > 10
  ) {
    return false;
  }

  return !projects.some(
    (project) =>
      position.x >= project.building.x &&
      position.x <= project.building.x + 3 &&
      position.y >= project.building.y &&
      position.y <= project.building.y + 2,
  );
};

const findNearbyProject = (position: Position) =>
  projects.find(
    (project) =>
      Math.abs(project.door.x - position.x) +
        Math.abs(project.door.y - position.y) <=
      2,
  ) ?? null;

export default function ProjectQuest() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [position, setPosition] = useState<Position>(startPosition);
  const [direction, setDirection] = useState<Direction>("down");
  const [walking, setWalking] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewed, setViewed] = useState<string[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<Position>(startPosition);
  const startedRef = useRef(false);
  const selectedIdRef = useRef<string | null>(null);
  const selectionSourceRef = useRef<SelectionSource>(null);
  const activeInputsRef = useRef<Array<{ source: string; direction: Direction }>>([]);
  const movementTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? null,
    [selectedId],
  );
  const nearbyProject = useMemo(() => findNearbyProject(position), [position]);

  const setSelection = useCallback(
    (project: Project | null, source: SelectionSource) => {
      selectedIdRef.current = project?.id ?? null;
      selectionSourceRef.current = project ? source : null;
      setSelectedId(project?.id ?? null);
    },
    [],
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const savedPosition = window.sessionStorage.getItem(storagePositionKey);
        const savedViewed = window.sessionStorage.getItem(storageViewedKey);

        if (savedPosition) {
          const parsed = JSON.parse(savedPosition) as Position;
          if (
            Number.isInteger(parsed.x) &&
            Number.isInteger(parsed.y) &&
            isPassable(parsed)
          ) {
            positionRef.current = parsed;
            setPosition(parsed);
            startedRef.current = true;
            setStarted(true);
            setHasInteracted(true);
            const restoredProject = findNearbyProject(parsed);
            if (restoredProject) setSelection(restoredProject, "proximity");
          }
        }

        if (savedViewed) {
          const parsed = JSON.parse(savedViewed) as string[];
          setViewed(parsed.filter((id) => projects.some((project) => project.id === id)));
        }
      } catch {
        window.sessionStorage.removeItem(storagePositionKey);
        window.sessionStorage.removeItem(storageViewedKey);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [setSelection]);

  useEffect(() => {
    if (started) {
      gameRef.current?.focus({ preventScroll: true });
    }
  }, [started]);

  useEffect(
    () => () => {
      if (movementTimerRef.current) clearInterval(movementTimerRef.current);
      if (stepEndTimerRef.current) clearTimeout(stepEndTimerRef.current);
    },
    [],
  );

  const stopMovement = useCallback((finishStep = false) => {
    activeInputsRef.current = [];
    if (movementTimerRef.current) {
      clearInterval(movementTimerRef.current);
      movementTimerRef.current = null;
    }
    if (stepEndTimerRef.current) clearTimeout(stepEndTimerRef.current);
    if (finishStep) {
      stepEndTimerRef.current = setTimeout(() => {
        setWalking(false);
      }, stepDuration);
    } else {
      setWalking(false);
    }
  }, []);

  const beginExperience = useCallback(() => {
    startedRef.current = true;
    setStarted(true);
    requestAnimationFrame(() => gameRef.current?.focus({ preventScroll: true }));
  }, []);

  const attemptStep = useCallback((nextDirection: Direction) => {
    if (!startedRef.current) return;

    setHasInteracted(true);
    setDirection(nextDirection);
    const vector = directionVectors[nextDirection];
    const current = positionRef.current;
    const next = { x: current.x + vector.x, y: current.y + vector.y };

    if (!isPassable(next)) {
      setWalking(false);
      return;
    }

    if (
      selectionSourceRef.current === "keyboard" ||
      selectionSourceRef.current === "shortcut"
    ) {
      setSelection(null, null);
    }

    if (stepEndTimerRef.current) clearTimeout(stepEndTimerRef.current);
    positionRef.current = next;
    setPosition(next);
    setWalking(true);

    if (
      selectionSourceRef.current !== "hover" &&
      selectionSourceRef.current !== "intentional"
    ) {
      const nextNearbyProject = findNearbyProject(next);
      if (nextNearbyProject) {
        setSelection(nextNearbyProject, "proximity");
      } else if (selectionSourceRef.current === "proximity") {
        setSelection(null, null);
      }
    }
  }, [setSelection]);

  const startMovement = useCallback((source: string, nextDirection: Direction) => {
    if (
      !startedRef.current ||
      activeInputsRef.current.some((input) => input.source === source)
    ) {
      return;
    }

    activeInputsRef.current = [
      ...activeInputsRef.current,
      { source, direction: nextDirection },
    ];
    attemptStep(nextDirection);

    if (!movementTimerRef.current) {
      movementTimerRef.current = setInterval(() => {
        const activeDirection = activeInputsRef.current.at(-1)?.direction;
        if (activeDirection) attemptStep(activeDirection);
      }, stepDuration);
    }
  }, [attemptStep]);

  const endMovement = useCallback((source: string) => {
    activeInputsRef.current = activeInputsRef.current.filter(
      (input) => input.source !== source,
    );

    if (activeInputsRef.current.length === 0) {
      if (movementTimerRef.current) {
        clearInterval(movementTimerRef.current);
        movementTimerRef.current = null;
      }
      setWalking(false);
    }
  }, []);

  const saveAndOpenProject = useCallback(
    (project: Project) => {
      stopMovement();
      const nextViewed = Array.from(new Set([...viewed, project.id]));
      setViewed(nextViewed);
      window.sessionStorage.setItem(
        storagePositionKey,
        JSON.stringify(positionRef.current),
      );
      window.sessionStorage.setItem(storageViewedKey, JSON.stringify(nextViewed));
      router.push(project.route);
    },
    [router, stopMovement, viewed],
  );

  const selectProject = useCallback(
    (project: Project, source: Exclude<SelectionSource, "proximity" | null>) => {
      beginExperience();
      setHasInteracted(true);
      setSelection(project, source);
    },
    [beginExperience, setSelection],
  );

  const interact = useCallback(() => {
    if (!startedRef.current) {
      beginExperience();
      return;
    }
    if (selectedIdRef.current) {
      const project = projects.find((item) => item.id === selectedIdRef.current);
      if (project) saveAndOpenProject(project);
      return;
    }
    const project = findNearbyProject(positionRef.current);
    if (project) setSelection(project, "proximity");
  }, [beginExperience, saveAndOpenProject, setSelection]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.target !== event.currentTarget &&
      (event.target as HTMLElement).closest("a, button")
    ) {
      return;
    }

    const nextDirection = keyDirections[event.code];
    if (nextDirection) {
      event.preventDefault();
      if (!event.repeat) startMovement(`key-${event.code}`, nextDirection);
      return;
    }

    if (event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      interact();
      return;
    }

    if (event.code === "Escape" || event.code === "KeyB") {
      event.preventDefault();
      setSelection(null, null);
      return;
    }

    if (event.code === "KeyR") {
      event.preventDefault();
      resetPosition();
      return;
    }

    if (["Digit1", "Digit2", "Digit3", "Digit4"].includes(event.code)) {
      event.preventDefault();
      const project = projects[Number(event.code.slice(-1)) - 1];
      if (project) selectProject(project, "shortcut");
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (keyDirections[event.code]) {
      event.preventDefault();
      endMovement(`key-${event.code}`);
    }
  };

  const resetPosition = useCallback(() => {
    stopMovement();
    startedRef.current = true;
    setStarted(true);
    setHasInteracted(true);
    setSelection(null, null);
    positionRef.current = startPosition;
    setPosition(startPosition);
    setDirection("down");
    window.sessionStorage.removeItem(storagePositionKey);
    requestAnimationFrame(() => gameRef.current?.focus({ preventScroll: true }));
  }, [setSelection, stopMovement]);

  const clearTemporarySelection = useCallback((
    source: "hover" | "keyboard",
    nextTarget?: EventTarget | null,
  ) => {
    if (selectionSourceRef.current !== source) return;

    if (
      nextTarget instanceof Element &&
      nextTarget.closest(".quest-house, .quest-preview")
    ) {
      return;
    }

    const project = findNearbyProject(positionRef.current);
    if (project) {
      setSelection(project, "proximity");
    } else {
      setSelection(null, null);
    }
  }, [setSelection]);

  return (
    <section
      className={`project-quest${hasInteracted ? " has-interacted" : ""}`}
      id="project-quest"
      aria-labelledby="project-quest-title"
    >
      <div className="project-quest-intro">
        <p className="eyebrow">Choose your route</p>
        <h3 id="project-quest-title">Explore the work.</h3>
        <p>
          Move through four areas of Product Operations work, or use the
          project cards below for the quick route.
        </p>
        <div className="project-quest-actions">
          <button
            className="quest-play-button"
            type="button"
            onClick={beginExperience}
          >
            Explore the map <span aria-hidden="true">▶</span>
          </button>
          <a className="quest-browse-link" href="#case-studies">
            Browse case studies <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="quest-instructions" aria-label="Project map instructions">
          <span><kbd>WASD</kbd> <span>or arrows · Move</span></span>
          <span><kbd>Enter</kbd> <span>View selected project</span></span>
          <span><kbd>1–4</kbd> <span>Select a project · R resets</span></span>
          <span><kbd>Mouse</kbd> <span>Hover or click a destination</span></span>
        </div>
      </div>

      <div className="ops-handheld" aria-label="OPS-04 Portable project navigator">
        <div className="handheld-brand">
          <span>OPS-04</span>
          <small>Interactive project navigator</small>
        </div>
        <div
          className={`quest-screen${started ? " is-started" : ""}`}
          ref={gameRef}
          role="region"
          aria-label="Interactive map of four Product Operations case studies. Use WASD or arrow keys to move, number keys to select, and Enter to open. Tab reaches every destination."
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={() => stopMovement()}
        >
          <div className="quest-screen-status" aria-live="polite">
            <span>
              {selectedProject
                ? `Enter · View ${selectedProject.shortTitle}`
                : nearbyProject
                  ? `Enter · Preview ${nearbyProject.shortTitle}`
                  : "Four projects · Choose a direction"}
            </span>
            <button type="button" onClick={resetPosition} aria-label="Reset character position">
              R · Reset
            </button>
          </div>

          <div className="quest-map" aria-hidden={!started}>
            <span className="quest-path path-horizontal" />
            <span className="quest-path path-vertical" />
            <span className="quest-path path-utility" />
            <span className="quest-path path-rx" />
            <span className="quest-path path-hearth" />
            <span className="quest-path path-operations" />
            <span className="quest-pond"><i /><i /><i /></span>
            <span className="quest-fence fence-top" />
            <span className="quest-fence fence-bottom" />
            <span className="quest-town-sign">4 PROJECTS<br />1 APPROACH</span>
            <span className="quest-mailbox" />
            <span className="quest-npc"><i /></span>

            {trees.map(([x, y]) => (
              <span
                className="quest-tree"
                style={tileStyle(x, y)}
                key={`tree-${x}-${y}`}
              />
            ))}

            {flowers.map(([x, y], index) => (
              <span
                className={`quest-flower flower-${(index % 3) + 1}`}
                style={tileStyle(x, y)}
                key={`flower-${x}-${y}`}
              />
            ))}

            {projects.map((project) => {
              const isSelected = selectedProject?.id === project.id;
              const isNearby = nearbyProject?.id === project.id;
              const isViewed = viewed.includes(project.id);

              return (
                <button
                  className={[
                    "quest-house",
                    `house-${project.id}`,
                    isViewed ? "is-viewed" : "",
                    isSelected ? "is-selected" : "",
                    isNearby ? "is-nearby" : "",
                  ].filter(Boolean).join(" ")}
                  style={tileStyle(project.building.x, project.building.y)}
                  type="button"
                  key={project.id}
                  onMouseEnter={() => selectProject(project, "hover")}
                  onMouseLeave={(event) =>
                    clearTemporarySelection("hover", event.relatedTarget)
                  }
                  onFocus={() => selectProject(project, "keyboard")}
                  onBlur={(event) =>
                    clearTemporarySelection("keyboard", event.relatedTarget)
                  }
                  onClick={() => selectProject(project, "intentional")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      saveAndOpenProject(project);
                    }
                  }}
                  aria-label={`Project ${project.number}: ${project.title}. ${project.capability}.${isViewed ? " Viewed." : ""}`}
                  aria-pressed={isSelected}
                >
                  <span className="house-chimney" aria-hidden="true" />
                  <span className="house-roof" aria-hidden="true" />
                  <span className="house-front" aria-hidden="true">
                    <i className="house-window window-left" />
                    <i className="house-window window-right" />
                    <i className="house-door">{project.number}</i>
                  </span>
                  <span className="house-sign" aria-hidden="true">
                    <b>{project.shortTitle}</b>
                    <small>{project.capability}</small>
                    {isViewed && <em>Viewed ✓</em>}
                  </span>
                </button>
              );
            })}

            {started && (
              <span
                className={`quest-character faces-${direction}${walking ? " is-walking" : ""}`}
                style={tileStyle(position.x, position.y)}
                aria-hidden="true"
              >
                <i className="character-shadow" />
                <i className="character-head">
                  <b className="character-cap" />
                  <b className="character-hair" />
                  <b className="character-face" />
                </i>
                <i className="character-body">
                  <b className="character-scarf" />
                  <b className="character-pack" />
                </i>
                <i className="character-arms"><b className="character-hands" /></i>
                <i className="character-feet" />
              </span>
            )}
          </div>

          {!started && (
            <div className="quest-title-screen">
              <span className="title-screen-hills" aria-hidden="true" />
              <small>Andrew presents</small>
              <strong>PROJECT<br />QUEST</strong>
              <p>Four projects. Four capabilities.</p>
              <button type="button" onClick={beginExperience}>
                Press start
              </button>
            </div>
          )}

          {started && selectedProject && (
            <aside
              className={`quest-preview preview-${selectedProject.id}`}
              aria-live="polite"
              onMouseLeave={(event) =>
                clearTemporarySelection("hover", event.relatedTarget)
              }
            >
              <div className="quest-preview-heading">
                <span>Project {selectedProject.number}</span>
                <strong>{selectedProject.capability}</strong>
              </div>
              <h4>{selectedProject.title}</h4>
              <p>{selectedProject.description}</p>
              {selectedProject.evidence && <b>{selectedProject.evidence}</b>}
              <div className="quest-preview-actions">
                <button
                  type="button"
                  onClick={() => saveAndOpenProject(selectedProject)}
                >
                  Enter · View case study <span aria-hidden="true">↗</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelection(null, null)}
                  aria-label="Close project preview"
                >
                  Close
                </button>
              </div>
            </aside>
          )}
        </div>

        <div className="handheld-controls" aria-label="Optional handheld controls">
          <div className="quest-dpad" aria-label="Directional controls">
            <button className="dpad-up" type="button" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); startMovement("dpad-up", "up"); }} onPointerUp={() => endMovement("dpad-up")} onPointerCancel={() => endMovement("dpad-up")} aria-label="Move up">▲</button>
            <button className="dpad-left" type="button" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); startMovement("dpad-left", "left"); }} onPointerUp={() => endMovement("dpad-left")} onPointerCancel={() => endMovement("dpad-left")} aria-label="Move left">◀</button>
            <span aria-hidden="true" />
            <button className="dpad-right" type="button" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); startMovement("dpad-right", "right"); }} onPointerUp={() => endMovement("dpad-right")} onPointerCancel={() => endMovement("dpad-right")} aria-label="Move right">▶</button>
            <button className="dpad-down" type="button" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); startMovement("dpad-down", "down"); }} onPointerUp={() => endMovement("dpad-down")} onPointerCancel={() => endMovement("dpad-down")} aria-label="Move down">▼</button>
          </div>
          <button className="quest-start" type="button" onClick={resetPosition}>
            Reset
          </button>
          <div className="quest-action-buttons">
            <button type="button" onClick={() => setSelection(null, null)} aria-label="Close project preview">B</button>
            <button
              type="button"
              onClick={interact}
              aria-label={selectedProject ? "Open selected case study" : "Select nearby project"}
            >
              A
            </button>
          </div>
        </div>
        <div className="handheld-speaker" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      </div>
    </section>
  );
}
