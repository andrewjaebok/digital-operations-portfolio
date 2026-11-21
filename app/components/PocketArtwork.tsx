import { memo, type CSSProperties } from "react";
import { assetPath } from "../../lib/asset-path";
import type { Point } from "./quest-engine.mjs";

const artworkUrl = (name: string, version = 2) => `url("${assetPath(`/images/andrew-pocket/${name}.png`)}?v=${version}")`;
const artwork = (name: string) => ({ backgroundImage: artworkUrl(name) });
const directions = ["down", "left", "right", "up"] as const;
export type PocketFacing = (typeof directions)[number];

export const districtNames = ["Digital Studio", "Systems Station", "Ideas Workshop"];

export function scenePosition({ x, y }: Point): CSSProperties {
  return { left: `${x / 8}%`, top: `${y / 4}%` };
}

export const PocketTown = memo(function PocketTown() {
  return (
    <div className="pocket-scene pocket-town" style={{ "--town-art": artworkUrl("town", 3), "--town-phone-art": artworkUrl("town-phone", 3) } as CSSProperties} aria-hidden="true">
      {[{ x: 202, y: 244 }, { x: 440, y: 216 }, { x: 600, y: 260 }].map(({ x, y }, index) => (
        <span key={x} className="pocket-lantern-pixel" style={{
          left: `${x / 8}%`,
          top: `calc(${y / 4}% - var(--pocket-lamp-offset))`,
          animationDelay: `${index * -.9}s`,
        }} />
      ))}
    </div>
  );
});

export const PocketRoom = memo(function PocketRoom({ district }: { district: number }) {
  return <div className="pocket-scene" style={artwork(`room-${district}`)} aria-hidden="true" />;
});

export function PocketFacade({ district }: { district: number }) {
  return <span className="pocket-facade" style={{ backgroundImage: artworkUrl(`district-${district}`, 3) }} aria-hidden="true">
    {district === 1 && <i className="pocket-antenna-pixel" />}
  </span>;
}

export function PocketStation({ kind }: { kind: string }) {
  const animated = kind === "rack" || kind === "automation" || kind === "arcade";
  return <span className={`pocket-station-art${animated ? " pocket-station-art--animated" : ""}`} style={artwork(`station-${kind}`)} aria-hidden="true" />;
}

export function PocketAvatar({ position, facing, stride, layered }: {
  position: Point;
  facing: PocketFacing;
  stride: number;
  layered: boolean;
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
        zIndex: layered ? 20 + Math.floor(position.y) : 3,
      } as CSSProperties}
      aria-hidden="true"
    />
  );
}
