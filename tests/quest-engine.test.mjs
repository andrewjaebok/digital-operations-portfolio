import test from 'node:test';
import assert from 'node:assert/strict';
import {
  advance, advanceRoom, approachStation, doors, nearby, nearbyStation,
  roomSpawn, spawn, stationPositions, walkable,
} from '../app/components/quest-engine.mjs';

test('all three approaches highlight the matching entrance and clear when leaving', () => {
  for (const [index, door] of doors.entries()) {
    let point = { x: door.x, y: 330 };
    while (point.y > door.y + 28) point = advance(point, 0, -1, .02, 800, 400);
    assert.equal(nearby(point), index);
    for (let step = 0; step < 16; step++) point = advance(point, 0, 1, .02, 800, 400);
    assert.equal(nearby(point), null);
  }
});

test('grass and pathways stay traversable in all four directions', () => {
  for (const start of [spawn, { x: 296, y: 224 }, { x: 727, y: 121 }]) {
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const next = advance(start, dx, dy, .02, 800, 400);
      assert(Math.sign(next.x - start.x) === dx && Math.sign(next.y - start.y) === dy);
      assert(walkable(next));
    }
  }
  let point = { x: 300, y: 330 };
  for (let step = 0; step < 200; step++) point = advance(point, 0, -1, .02, 800, 400);
  assert(point.y >= 45 && point.y < 50, 'stop at the edge rather than the path');
  assert.equal(nearby(point), null);
});

test('diagonals and resized viewports preserve the 230 pixel/second movement speed', () => {
  for (const [width, height] of [[800, 400], [320, 320]]) {
    for (const move of [advance, advanceRoom]) {
      const speed = (point) =>
        Math.hypot((point.x - spawn.x) * width / 800, (point.y - spawn.y) * height / 400) / .02;
      assert(Math.abs(speed(move(spawn, 1, 0, .02, width, height)) - 230) < 1e-8);
      assert(Math.abs(speed(move(spawn, 1, -1, .02, width, height)) - 230) < 1e-8);
    }
  }
});

test('players can reach every station and leave its interaction range', () => {
  for (const [width, height] of [[800, 400], [300, 320]]) {
    for (const count of [2, 3]) {
      const stations = stationPositions(count);
      assert.equal(nearbyStation(roomSpawn, stations), null);
      for (const [index, x] of stations.entries()) {
        let point = roomSpawn;
        for (let step = 0; step < 240 && Math.abs(point.x - x) > 12; step += 1) {
          point = advanceRoom(point, Math.sign(x - point.x), 0, .02, width, height);
        }
        for (let step = 0; step < 240; step += 1) {
          point = advanceRoom(point, 0, -1, .02, width, height);
        }
        assert.equal(nearbyStation(point, stations), index);
        assert.equal(nearbyStation(approachStation(x), stations), index);
        for (let step = 0; step < 240; step += 1) {
          point = advanceRoom(point, 0, 1, .02, width, height);
        }
        assert.equal(nearbyStation(point, stations), null);
      }
    }
  }
});
