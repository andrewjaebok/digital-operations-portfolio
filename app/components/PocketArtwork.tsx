import { memo, type CSSProperties } from "react";
import { assetPath } from "../../lib/asset-path";
import type { Point } from "./quest-engine.mjs";

const artwork = (name: string) => ({ backgroundImage: `url("${assetPath(`/images/andrew-pocket/${name}.png`)}")` });
const directions = ["down", "left", "right", "up"] as const;
export type PocketFacing = (typeof directions)[number];

export const districtNames = ["Digital Studio", "Systems Station", "Ideas Workshop"];

export function scenePosition({ x, y }: Point): CSSProperties {
  return { left: `${x / 8}%`, top: `${y / 4}%` };
}

export const PocketTown = memo(function PocketTown() {
  return (
    <div className="pocket-scene pocket-town" style={artwork("town")} aria-hidden="true">
      {[{ x: 138, y: 214 }, { x: 430, y: 188 }, { x: 662, y: 222 }].map((point, index) => (
        <span key={point.x} className="pocket-lantern-pixel" style={{ ...scenePosition(point), animationDelay: `${index * -.9}s` }} />
      ))}
    </div>
  );
});

export const PocketRoom = memo(function PocketRoom({ district }: { district: number }) {
  return <div className="pocket-scene" style={artwork(`room-${district}`)} aria-hidden="true" />;
});

export function PocketFacade({ district }: { district: number }) {
  return <span className="pocket-facade" style={artwork(`district-${district}`)} aria-hidden="true">
    {district === 1 && <i className="pocket-antenna-pixel" />}
  </span>;
}

export function PocketStation({ kind }: { kind: string }) {
  const animated = kind === "rack" || kind === "automation" || kind === "arcade";
  return <span className={`pocket-station-art${animated ? " pocket-station-art--animated" : ""}`} style={artwork(`station-${kind}`)} aria-hidden="true" />;
}

export function PocketAvatar({ position, facing, stride, inRoom }: {
  position: Point;
  facing: PocketFacing;
  stride: number;
  inRoom: boolean;
}) {
  return (
    <span
      className={`pocket-avatar${stride === 0 ? " pocket-avatar--idle" : ""}`}
      data-facing={facing}
      data-stride={stride}
      style={{
        ...artwork("andrew"),
        ...scenePosition(position),
        "--sprite-row": `${directions.indexOf(facing) * 100 / 3}%`,
        "--sprite-frame": `${stride * 25}%`,
        zIndex: inRoom ? 3 : 20 + Math.floor(position.y),
      } as CSSProperties}
      aria-hidden="true"
    />
  );
}
