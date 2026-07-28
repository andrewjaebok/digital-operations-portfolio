"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Position = {
  x: number;
  y: number;
};

type Project = {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  type: string;
  role: string;
  result: string;
  route: string;
  position: Position;
};

const projects: Project[] = [
  {
    id: "utility",
    number: "01",
    shortTitle: "Utility",
    title: "Regional Utility Customer Portal",
    type: "Customer portal",
    role: "Product Operations lead",
    result: "In a 20-person usability study, core report tasks were completed faster with fewer incorrect selections.",
    route: "/projects/customer-portal-redesign",
    position: { x: 1, y: 1 },
  },
  {
    id: "rx",
    number: "02",
    shortTitle: "RX",
    title: "Prescription Pad Ordering",
    type: "Regulated commerce",
    role: "Product Operations Manager",
    result: "July reached 30 orders while tracked repeat questions fell to zero in the measured categories.",
    route: "/projects/prescription-pad-ordering-portal",
    position: { x: 6, y: 1 },
  },
  {
    id: "hearth",
    number: "03",
    shortTitle: "Hearth",
    title: "Hearth Personal Finance Platform",
    type: "Product platform",
    role: "Product Owner / Product Operations",
    result: "A zero-to-one product built across product strategy, cloud architecture, release environments, and feedback systems.",
    route: "/projects/hearth",
    position: { x: 1, y: 4 },
  },
  {
    id: "operations",
    number: "04",
    shortTitle: "Systems",
    title: "Operational Systems & Automation",
    type: "Operational system",
    role: "Senior Product / Digital Operations",
    result: "Recurring production behaviors were standardized and a known source of proof-asset retrieval work was removed.",
    route: "/projects/operational-systems-automation",
    position: { x: 6, y: 4 },
  },
];

const startPosition = { x: 3, y: 3 };

export default function ProjectQuest() {
  const [started, setStarted] = useState(false);
  const [position, setPosition] = useState<Position>(startPosition);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);

  const selectedProject = projects.find((project) => project.id === selectedId) ?? null;
  const nearbyProject = projects.find(
    (project) =>
      Math.abs(project.position.x - position.x) +
        Math.abs(project.position.y - position.y) <=
      1,
  );

  useEffect(() => {
    if (started) {
      gameRef.current?.focus();
    }
  }, [started]);

  const move = (dx: number, dy: number) => {
    if (!started || selectedProject) return;
    setPosition((current) => ({
      x: Math.max(0, Math.min(7, current.x + dx)),
      y: Math.max(0, Math.min(5, current.y + dy)),
    }));
  };

  const selectProject = (project: Project) => {
    setSelectedId(project.id);
    setVisited((current) =>
      current.includes(project.id) ? current : [...current, project.id],
    );
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

  const clickStation = (project: Project) => {
    if (!started) setStarted(true);
    setPosition({
      x: project.position.x < 4 ? project.position.x + 1 : project.position.x - 1,
      y: project.position.y,
    });
    selectProject(project);
  };

  return (
    <section className="project-quest" aria-labelledby="project-quest-title">
      <div className="project-quest-intro">
        <p className="eyebrow">Choose your route</p>
        <h3 id="project-quest-title">Explore the work your way.</h3>
        <p>
          Take the quick route through the case-study cards, or step into a
          tiny, playable project archive.
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
          <span><kbd>WASD</kbd> or arrow keys to move</span>
          <span><kbd>Enter</kbd> to inspect</span>
          <span>Click and touch friendly</span>
        </div>
      </div>

      <div className="ops-handheld" aria-label="OPS-04 Portable project game">
        <div className="handheld-brand">
          <span>OPS-04</span>
          <small>Portable project archive</small>
        </div>
        <div
          className={`quest-screen${started ? " is-started" : ""}`}
          ref={gameRef}
          role="application"
          aria-label="Project Quest. Use arrow keys or WASD to move, and Enter to inspect a project."
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className="quest-screen-status" aria-live="polite">
            <span>{selectedProject ? "Mission brief" : nearbyProject ? `Press A: ${nearbyProject.shortTitle}` : "Project archive"}</span>
            <b>{visited.length}/4 found</b>
          </div>

          <div className="quest-map" aria-hidden={!started}>
            <span className="quest-floor-line line-horizontal" />
            <span className="quest-floor-line line-vertical" />
            <span className="quest-floor-detail detail-one" />
            <span className="quest-floor-detail detail-two" />
            <span className="quest-floor-detail detail-three" />

            {projects.map((project) => (
              <button
                className={`quest-station station-${project.id}${visited.includes(project.id) ? " is-visited" : ""}`}
                style={{
                  gridColumn: project.position.x + 1,
                  gridRow: project.position.y + 1,
                }}
                type="button"
                key={project.id}
                onClick={() => clickStation(project)}
                aria-label={`Inspect Project ${project.number}: ${project.title}`}
              >
                <i aria-hidden="true">{project.number}</i>
                <span>{project.shortTitle}</span>
              </button>
            ))}

            {started && (
              <span
                className="quest-character"
                style={{
                  gridColumn: position.x + 1,
                  gridRow: position.y + 1,
                }}
                aria-hidden="true"
              >
                <i />
              </span>
            )}
          </div>

          {!started && (
            <div className="quest-title-screen">
              <small>Andrew presents</small>
              <strong>PROJECT<br />QUEST</strong>
              <p>Four projects. Four operational challenges.</p>
              <button type="button" onClick={() => setStarted(true)}>
                Press start
              </button>
            </div>
          )}

          {selectedProject && (
            <div className={`quest-brief brief-${selectedProject.id}`} role="dialog" aria-label={`${selectedProject.title} mission brief`}>
              <div className="quest-brief-heading">
                <span>Project {selectedProject.number} · {selectedProject.type}</span>
                <button type="button" onClick={() => setSelectedId(null)} aria-label="Close mission brief">×</button>
              </div>
              <h4>{selectedProject.title}</h4>
              <dl>
                <div><dt>Role</dt><dd>{selectedProject.role}</dd></div>
                <div><dt>Result</dt><dd>{selectedProject.result}</dd></div>
              </dl>
              <div className="quest-brief-actions">
                <Link href={selectedProject.route}>Open case study <span aria-hidden="true">↗</span></Link>
                <button type="button" onClick={() => setSelectedId(null)}>B: Return</button>
              </div>
            </div>
          )}
        </div>

        <div className="handheld-controls" aria-label="Game controls">
          <div className="quest-dpad" aria-label="Directional controls">
            <button className="dpad-up" type="button" onClick={() => move(0, -1)} aria-label="Move up">▲</button>
            <button className="dpad-left" type="button" onClick={() => move(-1, 0)} aria-label="Move left">◀</button>
            <span aria-hidden="true" />
            <button className="dpad-right" type="button" onClick={() => move(1, 0)} aria-label="Move right">▶</button>
            <button className="dpad-down" type="button" onClick={() => move(0, 1)} aria-label="Move down">▼</button>
          </div>
          <button className="quest-start" type="button" onClick={() => setStarted(true)}>Start</button>
          <div className="quest-action-buttons">
            <button type="button" onClick={() => setSelectedId(null)} aria-label="Return">B</button>
            <button type="button" onClick={interact} aria-label="Inspect project">A</button>
          </div>
        </div>
        <div className="handheld-speaker" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      </div>
    </section>
  );
}
