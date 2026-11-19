export const spawn = { x: 400, y: 330 };
export const doors = [{ x: 168, y: 190 }, { x: 400, y: 164 }, { x: 632, y: 190 }];
export const paths = [
  { x: 60, y: 300, width: 680, height: 60 },
  ...doors.map(d => ({ x: d.x - 26, y: d.y, width: 52, height: 140 + (190 - d.y) })),
];
// Grass and paths are both traversable. Only the outer world boundary blocks walking.
export function walkable(p) {
  return p.x >= 20 && p.x <= 780 && p.y >= 45 && p.y <= 375;
}
export function advance(p, dx, dy, seconds, width, height) {
  const length = Math.hypot(dx, dy);
  if (!length) return p;
  const distance = 230 * Math.min(seconds, .05);
  const x = p.x + dx / length * distance * 800 / width;
  const y = p.y + dy / length * distance * 400 / height;
  let next = walkable({x,y}) ? {x,y} : p;
  if (next === p) {
    if (walkable({x,y:p.y})) next = {x,y:p.y};
    if (walkable({x:next.x,y})) next = {x:next.x,y};
  }
  return next;
}
export function nearby(p) {
  const index = doors.findIndex(d => Math.abs(p.x-d.x) <= 24 && p.y >= d.y && p.y <= d.y+38);
  return index < 0 ? null : index;
}

export const roomSpawn = { x: 400, y: 324 };
export const stationRow = 224;

export function stationPositions(count) {
  return count === 1 ? [400] : Array.from({ length: count }, (_, index) => 150 + 500 * index / (count - 1));
}

export function approachStation(x) {
  return { x, y: stationRow + 50 };
}

export function advanceRoom(p, dx, dy, seconds, width, height) {
  const length = Math.hypot(dx, dy);
  if (!length || width <= 0 || height <= 0) return p;
  const distance = 230 * Math.min(seconds, .05);
  const x = p.x + dx / length * distance * 800 / width;
  const y = p.y + dy / length * distance * 400 / height;
  return { x: Math.min(752, Math.max(48, x)), y: Math.min(345, Math.max(stationRow + 25, y)) };
}

export function nearbyStation(p, stations) {
  const index = stations.findIndex(x =>
    Math.abs(p.x - x) <= 96 && p.y >= stationRow && p.y <= stationRow + 78,
  );
  return index < 0 ? null : index;
}
