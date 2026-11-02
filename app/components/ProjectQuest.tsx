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
  problemLabel: string;
  solutionLabel: string;
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
    problemLabel: "Manual report scanning",
    solutionLabel: "Search + status clarity",
  },
  {
    id: "rx",
    number: "02",
    shortTitle: "Prescription Pads",
    title: "Prescription Pad Ordering",
    capability: "Regulated Product & Growth",
    description:
      "Modernized a regulated ordering experience while preserving the existing operational and production foundation.",
    evidence: "+1,272% new users following the redesign and search-content program.",
    route: "/projects/prescription-pad-ordering-portal",
    building: { x: 10, y: 1 },
    door: { x: 11, y: 4 },
    problemLabel: "Questions + unclear steps",
    solutionLabel: "Guided compliant ordering",
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
    problemLabel: "Disconnected money tools",
    solutionLabel: "One financial world",
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
    problemLabel: "Recurring production jams",
    solutionLabel: "Repeatable automated flow",
  },
  {
    id: "finder",
    number: "05",
    shortTitle: "Logo Directory",
    title: "University Logo Directory",
    capability: "Discovery & Validation",
    description:
      "Turned a static 195-entry reference list into a searchable directory, then used a matched synthetic evaluation to guide a second iteration.",
    evidence:
      "Modeled pre-launch results: 11/11 synthetic thresholds met. This is decision-support modeling, not observed user research.",
    route: "/projects/university-logo-directory",
    building: { x: 6, y: 1 },
    door: { x: 7, y: 4 },
    problemLabel: "195 entries to scan",
    solutionLabel: "Searchable hierarchy",
  },
  {
    id: "protection",
    number: "06",
    shortTitle: "Ordering Protection",
    title: "Customer Ordering Protection",
    capability: "Infrastructure & Reliability",
    description: "Investigated automated traffic and implemented layered Cloudflare protection around the Apache and 4D customer ordering platform.",
    evidence: "Measured: 1,877 → 50.7 requests/minute, a 97.3% reduction. Further reduction to 12.7/minute (99.3% total) is projected, not verified.",
    route: "/projects/operational-systems-automation/#traffic-protection",
    building: { x: 6, y: 7 },
    door: { x: 7, y: 10 },
    problemLabel: "Unwanted traffic pressure",
    solutionLabel: "Layered traffic protection",
  },
];

const trees = [
  [0, 0], [1, 0], [2, 0], [5, 0], [6, 0], [9, 0], [10, 0], [13, 0], [14, 0], [15, 0],
  [0, 1], [15, 1], [0, 2], [15, 2], [0, 3], [15, 3], [0, 6], [15, 6],
  [0, 7], [15, 7], [0, 8], [15, 8], [0, 9], [15, 9], [0, 10], [15, 10],
  [0, 11], [1, 11], [2, 11], [5, 11], [6, 11], [9, 11], [10, 11], [13, 11], [14, 11], [15, 11],
] as const;

const flowers = [
  [6, 5], [9, 5],
] as const;

const startPosition = { x: 7, y: 6 };
const stepDuration = 118;
const storagePositionKey = "project-quest-position";
const storageViewedKey = "project-quest-viewed";
const storageEntryKey = "project-quest-entry";

function ProjectScene({ project }: { project: Project }) {
  const colors: Record<string, string> = { utility: "#548b9b", rx: "#ba7163", hearth: "#8b80a9", operations: "#a38a54", finder: "#5a947a", protection: "#557a98" };
  return <svg className="village-building" viewBox="0 0 140 100" aria-hidden="true">
    <ellipse cx="70" cy="88" rx="53" ry="7" fill="#203d2c" opacity=".12"/>
    <rect x="28" y="37" width="84" height="49" rx="2" fill="#f4edd9" stroke="#445847" strokeWidth="2"/>
    <path d="M19 40 38 15H102L121 40Z" fill={colors[project.id]} stroke="#445847" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M27 35H113M32 28H108M37 21H103" stroke="white" opacity=".18" strokeWidth="2"/>
    <rect x="89" y="9" width="9" height="16" fill="#d8c9ac" stroke="#445847" strokeWidth="2"/>
    <rect x="60" y="59" width="20" height="27" rx="2" fill="#596e59" stroke="#445847" strokeWidth="2"/>
    <circle cx="75" cy="73" r="1.5" fill="#e6ca7c"/>
    <g fill="#a9cdd0" stroke="#445847" strokeWidth="2"><rect x="36" y="51" width="15" height="17" rx="1"/><rect x="89" y="51" width="15" height="17" rx="1"/></g>
    <path d="M43.5 52V67M37 59.5H50M96.5 52V67M90 59.5H103" stroke="#e9f2e8" strokeWidth="1.5"/>
    <rect x="56" y="41" width="28" height="13" rx="3" fill="#fffcf1"/>
    <text x="70" y="51" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#445847">{project.number}</text>
    <path d="M55 88H85" stroke="#c3b79a" strokeWidth="4" strokeLinecap="round"/>
  </svg>;
}

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
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [enteringId, setEnteringId] = useState<string | null>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<Position>(startPosition);
  const startedRef = useRef(false);
  const viewedRef = useRef<string[]>([]);
  const selectedIdRef = useRef<string | null>(null);
  const selectionSourceRef = useRef<SelectionSource>(null);
  const activeInputsRef = useRef<Array<{ source: string; direction: Direction }>>([]);
  const movementTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        const savedViewed = window.localStorage.getItem(storageViewedKey)
          ?? window.sessionStorage.getItem(storageViewedKey);

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
          const validViewed = parsed.filter((id) => projects.some((project) => project.id === id));
          viewedRef.current = validViewed;
          setViewed(validViewed);
        }
      } catch {
        try {
          window.sessionStorage.removeItem(storagePositionKey);
          window.sessionStorage.removeItem(storageViewedKey);
          window.localStorage.removeItem(storageViewedKey);
        } catch {
          // Storage is optional; the district remains fully usable without it.
        }
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
      if (activationTimerRef.current) clearTimeout(activationTimerRef.current);
      if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
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

  const markProjectResolved = useCallback((project: Project) => {
    const nextViewed = Array.from(new Set([...viewedRef.current, project.id]));
    viewedRef.current = nextViewed;
    setViewed(nextViewed);
    try {
      window.localStorage.setItem(storageViewedKey, JSON.stringify(nextViewed));
    } catch {
      try {
        window.sessionStorage.setItem(storageViewedKey, JSON.stringify(nextViewed));
      } catch {
        // Storage is optional; the current visit still keeps its resolved state.
      }
    }
  }, []);

  const activateProject = useCallback(
    (project: Project) => {
      beginExperience();
      setHasInteracted(true);
      setSelection(project, "intentional");
      setActivatingId(project.id);
      markProjectResolved(project);
      if (activationTimerRef.current) clearTimeout(activationTimerRef.current);
      activationTimerRef.current = setTimeout(() => setActivatingId(null), 1500);
    },
    [beginExperience, markProjectResolved, setSelection],
  );

  const saveAndOpenProject = useCallback(
    (project: Project) => {
      if (enteringId) return;
      stopMovement();
      markProjectResolved(project);
      window.sessionStorage.setItem(
        storagePositionKey,
        JSON.stringify(positionRef.current),
      );
      window.sessionStorage.setItem(storageEntryKey, project.id);
      setEnteringId(project.id);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      navigationTimerRef.current = setTimeout(
        () => router.push(project.route),
        reduceMotion ? 80 : 860,
      );
    },
    [enteringId, markProjectResolved, router, stopMovement],
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

    if (["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"].includes(event.code)) {
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
      nextTarget.closest(".district-site, .quest-preview")
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
        <p className="eyebrow">Interactive operations district</p>
        <h3 id="project-quest-title">A small world. Real operational impact.</h3>
        <p>
          Explore six projects in an interactive district. Walk the map or choose a destination to discover the decisions, systems, and results behind the work.
        </p>
      </div>

      <div className="ops-handheld" aria-label="OPS-06 Interactive Operations District">
        <div className="handheld-brand">
          <span>OPS-06</span>
          <small>Operations District · six project destinations</small>
        </div>
        <div
          className={`quest-screen${started ? " is-started" : ""}`}
          ref={gameRef}
          role="region"
          aria-label="Interactive map of six Product Operations project destinations. Use WASD or arrow keys to move, number keys to select, and Enter to open. Tab reaches every destination."
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={() => stopMovement()}
        >
          <div className="quest-screen-status" aria-live="polite">
            <span>
              {selectedProject
                ? `${viewed.length}/${projects.length} transformed · Enter ${selectedProject.shortTitle}`
                : nearbyProject
                  ? `Enter · Preview ${nearbyProject.shortTitle}`
                  : `${viewed.length}/5 transformed · Choose a system`}
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
            <span className="quest-path path-finder" />
            
            <span className="quest-fence fence-top" />
            <span className="quest-fence fence-bottom" />
            
            
            

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
                    "district-site",
                    `site-${project.id}`,
                    isViewed ? "is-viewed" : "",
                    activatingId === project.id ? "is-activating" : "",
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
                  onClick={() => activateProject(project)}
                  aria-label={`Project ${project.number}: ${project.title}. ${project.capability}. ${project.problemLabel} becomes ${project.solutionLabel}.${isViewed ? " District transformed." : ""}`}
                  aria-pressed={isSelected}
                >
                  <ProjectScene project={project} />
                  <span className="site-sign" aria-hidden="true">
                    <b>{project.shortTitle}</b>
                    
                    {isViewed && <em>Transformed ✓</em>}
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
                <svg viewBox="0 0 24 32" className="explorer-sprite" shapeRendering="crispEdges">
                  <ellipse cx="12" cy="29" rx="9" ry="2" fill="#294b35" opacity=".2"/>
                  <path d="M6 5H18V8H20V16H17V18H7V16H4V8H6Z" fill="#e6b68b" stroke="#354f42" strokeWidth="1"/>
                  <path d="M5 5H7V3H17V5H19V9H5Z" fill="#355e58"/><path d="M5 8H20V10H5Z" fill="#e3bf69"/>
                  <path d="M8 12H10V14H8ZM15 12H17V14H15Z" fill="#263c34"/>
                  <path d="M7 18H17V26H7Z" fill="#578d9a" stroke="#354f42"/>
                  <path d="M4 19H7V25H4ZM17 19H20V25H17Z" fill="#e6b68b"/>
                  <path d="M7 26H11V30H6V28H7ZM13 26H17V28H18V30H13Z" fill="#354f42"/>
                  <path d="M7 18H17V20H7Z" fill="#e3bf69"/>
                </svg>
              </span>
            )}
          </div>

          {!started && (
            <div className="quest-title-screen">
              <span className="title-screen-hills" aria-hidden="true" />
              <small>Andrew presents</small>
              <strong>OPERATIONS<br />DISTRICT</strong>
              <p>Six destinations. Transform the friction.</p>
              <button type="button" onClick={beginExperience}>
                Press start
              </button>
            </div>
          )}

          {enteringId && (() => {
            const enteringProject = projects.find((project) => project.id === enteringId);
            return enteringProject ? <div className={`quest-entry-transition entry-${enteringProject.id}`} aria-live="polite">
              <span>Entering project {enteringProject.number}</span>
              <strong>{enteringProject.title}</strong>
              <i aria-hidden="true" />
            </div> : null;
          })()}
        </div>

        <div className="quest-detail-panel">
          <div className="quest-directory-heading"><span>PROJECT LIBRARY</span><b>{viewed.length} / {projects.length} explored</b></div>
          <label className="quest-picker-label" htmlFor="quest-project-picker">Jump to a destination</label>
          <select id="quest-project-picker" className="quest-project-picker" value={selectedId ?? ""} onChange={event => { const project = projects.find(item => item.id === event.target.value); if (project) { beginExperience(); selectProject(project, "intentional"); } }}>
            <option value="">Choose a project</option>
            {projects.map(project => <option key={project.id} value={project.id}>{project.number} · {project.shortTitle}</option>)}
          </select>
          {selectedProject && (
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
              <div className="quest-transformation-copy">
                <span>{selectedProject.problemLabel}</span>
                <i aria-hidden="true">→</i>
                <strong>{selectedProject.solutionLabel}</strong>
              </div>
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


          {!selectedProject && <div className="quest-empty-detail"><span>YOUR NEXT STOP</span><h4>Explore the work behind the world.</h4><p>Select a project above or move through the district. Each destination reveals the problem, the approach, and the evidence.</p><small>Six destinations. Choose your own route.</small></div>}
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
