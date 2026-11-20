export const spawn = { x: 400, y: 315 };
export const doors = [{ x: 150, y: 172 }, { x: 410, y: 146 }, { x: 650, y: 230 }];
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
const stationRow = 224;
const workshopStations = [{ x: 392, y: 190 }, { x: 145, y: 233 }, { x: 650, y: 254 }];

export function stationPositions(count, room) {
  if (room === 2) return workshopStations;
  return Array.from({ length: count }, (_, index) => ({
    x: count === 1 ? 400 : 150 + 500 * index / (count - 1),
    y: stationRow,
  }));
}

export function approachStation(station) {
  return { x: station.x, y: station.y + 40 };
}

export function advanceRoom(p, dx, dy, seconds, width, height, room) {
  const length = Math.hypot(dx, dy);
  if (!length || width <= 0 || height <= 0) return p;
  const distance = 230 * Math.min(seconds, .05);
  const x = p.x + dx / length * distance * 800 / width;
  const y = p.y + dy / length * distance * 400 / height;
  const floorEdge = room === 2 ? 155 : stationRow + 25;
  return { x: Math.min(752, Math.max(48, x)), y: Math.min(345, Math.max(floorEdge, y)) };
}

export function nearbyStation(p, stations) {
  const index = stations.findIndex(station =>
    Math.abs(p.x - station.x) <= 96 && p.y >= station.y && p.y <= station.y + 70,
  );
  return index < 0 ? null : index;
}
