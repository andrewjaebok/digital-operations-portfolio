"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type Position = {
  x: number;
  y: number;
};

type Direction = "up" | "down" | "left" | "right";

type Project = {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  type: string;
  role: string;
  result: string;
  route: string;
  building: Position;
  door: Position;
};

const projects: Project[] = [
  {
    id: "utility",
    number: "01",
    shortTitle: "Utility",
    title: "Regional Utility Customer Portal",
    type: "Customer portal",
    role: "Product Operations lead",
    result:
      "In a 20-person usability study, core report tasks were completed faster with fewer incorrect selections.",
    route: "/projects/customer-portal-redesign",
    building: { x: 2, y: 1 },
    door: { x: 3, y: 4 },
  },
  {
    id: "rx",
    number: "02",
    shortTitle: "RX",
    title: "Prescription Pad Ordering",
    type: "Regulated commerce",
    role: "Product Operations Manager",
    result:
      "July reached 30 orders while tracked repeat questions fell to zero in the measured categories.",
    route: "/projects/prescription-pad-ordering-portal",
    building: { x: 10, y: 1 },
    door: { x: 11, y: 4 },
  },
  {
    id: "hearth",
    number: "03",
    shortTitle: "Hearth",
    title: "Hearth Personal Finance Platform",
    type: "Product platform",
    role: "Product Owner / Product Operations",
    result:
      "A zero-to-one product built across product strategy, cloud architecture, release environments, and feedback systems.",
    route: "/projects/hearth",
    building: { x: 2, y: 7 },
    door: { x: 3, y: 10 },
  },
  {
    id: "operations",
    number: "04",
    shortTitle: "Systems",
    title: "Operational Systems & Automation",
    type: "Operational system",
    role: "Senior Product / Digital Operations",
    result:
      "Recurring production behaviors were standardized and a known source of proof-asset retrieval work was removed.",
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

const tileStyle = (x: number, y: number) =>
  ({ "--tile-x": x, "--tile-y": y }) as CSSProperties;

const positionMatches = (a: Position, b: Position) =>
  a.x === b.x && a.y === b.y;

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

export default function ProjectQuest() {
  const [started, setStarted] = useState(false);
  const [position, setPosition] = useState<Position>(startPosition);
  const [direction, setDirection] = useState<Direction>("down");
  const [walking, setWalking] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const walkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedProject =
    projects.find((project) => project.id === selectedId) ?? null;
  const nearbyProject = projects.find(
    (project) =>
      Math.abs(project.door.x - position.x) +
        Math.abs(project.door.y - position.y) <=
      1,
  );

  useEffect(() => {
    if (started) {
      gameRef.current?.focus();
    }
  }, [started]);

  useEffect(
    () => () => {
      if (walkTimer.current) clearTimeout(walkTimer.current);
    },
    [],
  );

  const selectProject = (project: Project) => {
    setSelectedId(project.id);
    setVisited((current) =>
      current.includes(project.id) ? current : [...current, project.id],
    );
  };

  const move = (dx: number, dy: number) => {
    if (!started || selectedProject || walking) return;

    const nextDirection: Direction =
      dx < 0 ? "left" : dx > 0 ? "right" : dy < 0 ? "up" : "down";
    setDirection(nextDirection);

    const next = { x: position.x + dx, y: position.y + dy };
    if (!isPassable(next)) return;

    setWalking(true);
    setPosition(next);
    if (walkTimer.current) clearTimeout(walkTimer.current);
    walkTimer.current = setTimeout(() => {
      setWalking(false);
      const enteredProject = projects.find((project) =>
        positionMatches(project.door, next),
      );
      if (enteredProject) selectProject(enteredProject);
    }, 180);
  };

  const interact = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (selectedProject) {
      setSelectedId(null);
      return;
    }
    if (nearbyProject) selectProject(nearbyProject);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key.toLowerCase();
    const directions: Record<string, [number, number]> = {
      arrowup: [0, -1],
      w: [0, -1],
      arrowdown: [0, 1],
      s: [0, 1],
      arrowleft: [-1, 0],
      a: [-1, 0],
      arrowright: [1, 0],
      d: [1, 0],
    };

    if (directions[key]) {
      event.preventDefault();
      move(...directions[key]);
      return;
    }

    if (key === "enter" || key === " ") {
      event.preventDefault();
      interact();
      return;
    }

    if (key === "escape" || key === "b") {
      event.preventDefault();
      setSelectedId(null);
    }
  };

  const enterBuilding = (project: Project) => {
    if (!started) setStarted(true);
    setPosition(project.door);
    setDirection("up");
    selectProject(project);
  };

  const resetGame = () => {
    setStarted(true);
    setSelectedId(null);
    setPosition(startPosition);
    setDirection("down");
    gameRef.current?.focus();
  };

  return (
    <section className="project-quest" aria-labelledby="project-quest-title">
      <div className="project-quest-intro">
        <p className="eyebrow">Choose your route</p>
        <h3 id="project-quest-title">Explore the work your way.</h3>
        <p>
          Browse the case studies directly, or walk through a tiny 8-bit town
          and enter a project house.
        </p>
        <div className="project-quest-actions">
          <button
            className="quest-play-button"
            type="button"
            onClick={() => setStarted(true)}
          >
            Play Project Quest <span aria-hidden="true">▶</span>
          </button>
          <a className="quest-browse-link" href="#case-studies">
            Browse case studies <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="quest-instructions">
          <span><kbd>WASD</kbd> or arrow keys to walk</span>
          <span><kbd>Enter</kbd> at a door to enter</span>
          <span>Click a house or use the touch controls</span>
        </div>
      </div>

      <div className="ops-handheld" aria-label="OPS-04 Portable project game">
        <div className="handheld-brand">
          <span>OPS-04</span>
          <small>Project Quest · Town Edition</small>
        </div>
        <div
          className={`quest-screen${started ? " is-started" : ""}`}
          ref={gameRef}
          role="application"
          aria-label="Project Quest town. Use arrow keys or WASD to walk into a project house, and Enter to inspect it."
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className="quest-screen-status" aria-live="polite">
            <span>
              {selectedProject
                ? `${selectedProject.shortTitle} House`
                : nearbyProject
                  ? `A: Enter ${nearbyProject.shortTitle}`
                  : "Project Town"}
            </span>
            <b>{visited.length}/4 visited</b>
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
            <span className="quest-town-sign">PROJECT<br />TOWN</span>
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

            {projects.map((project) => (
              <button
                className={`quest-house house-${project.id}${visited.includes(project.id) ? " is-visited" : ""}`}
                style={tileStyle(project.building.x, project.building.y)}
                type="button"
                key={project.id}
                onClick={() => enterBuilding(project)}
                aria-label={`Enter Project ${project.number}: ${project.title}`}
              >
                <span className="house-chimney" aria-hidden="true" />
                <span className="house-roof" aria-hidden="true" />
                <span className="house-front" aria-hidden="true">
                  <i className="house-window window-left" />
                  <i className="house-window window-right" />
                  <i className="house-door">{project.number}</i>
                </span>
                <span className="house-sign" aria-hidden="true">
                  {project.shortTitle}
                </span>
              </button>
            ))}

            {started && (
              <span
                className={`quest-character faces-${direction}${walking ? " is-walking" : ""}`}
                style={tileStyle(position.x, position.y)}
                aria-hidden="true"
              >
                <i className="character-head" />
                <i className="character-body" />
                <i className="character-feet" />
              </span>
            )}
          </div>

          {!started && (
            <div className="quest-title-screen">
              <span className="title-screen-hills" aria-hidden="true" />
              <small>Andrew presents</small>
              <strong>PROJECT<br />QUEST</strong>
              <p>Explore four operational challenges.</p>
              <button type="button" onClick={() => setStarted(true)}>
                Press start
              </button>
            </div>
          )}

          {selectedProject && (
            <div
              className={`quest-brief brief-${selectedProject.id}`}
              role="dialog"
              aria-label={`${selectedProject.title} project house`}
            >
              <div className="quest-brief-heading">
                <span>Project {selectedProject.number} · {selectedProject.type}</span>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label="Leave project house"
                >
                  ×
                </button>
              </div>
              <h4>{selectedProject.title}</h4>
              <dl>
                <div><dt>Role</dt><dd>{selectedProject.role}</dd></div>
                <div><dt>Result</dt><dd>{selectedProject.result}</dd></div>
              </dl>
              <div className="quest-brief-actions">
                <Link href={selectedProject.route}>
                  Open case study <span aria-hidden="true">↗</span>
                </Link>
                <button type="button" onClick={() => setSelectedId(null)}>
                  B: Leave
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="handheld-controls" aria-label="Game controls">
          <div className="quest-dpad" aria-label="Directional controls">
            <button className="dpad-up" type="button" onClick={() => move(0, -1)} aria-label="Walk up">▲</button>
            <button className="dpad-left" type="button" onClick={() => move(-1, 0)} aria-label="Walk left">◀</button>
            <span aria-hidden="true" />
            <button className="dpad-right" type="button" onClick={() => move(1, 0)} aria-label="Walk right">▶</button>
            <button className="dpad-down" type="button" onClick={() => move(0, 1)} aria-label="Walk down">▼</button>
          </div>
          <button className="quest-start" type="button" onClick={resetGame}>
            Start
          </button>
          <div className="quest-action-buttons">
            <button type="button" onClick={() => setSelectedId(null)} aria-label="Leave project house">B</button>
            <button type="button" onClick={interact} aria-label="Enter project house">A</button>
          </div>
        </div>
        <div className="handheld-speaker" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      </div>
    </section>
  );
}
