"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const { Bodies, Body, Composite, Engine, Sleeping } = Matter;
const colors = ["#9252f5", "#ff6735", "#149ef4", "#f9c700"];
const outlines = [
  "M0 0H80V80H0ZM20 20V60H60V20Z",
  "M0 0H30V50H80V80H0Z",
  "M0 0H80V30H55V80H25V30H0Z",
  "M0 0H80V80H0Z",
];
// The fixtures use the same 80-unit grid as the dotted artwork.
const fixtures = [
  [[40, 40, 78, 78]],
  [[15, 40, 28, 78], [55, 65, 48, 28]],
  [[40, 15, 78, 28], [40, 55, 28, 48]],
  [[40, 40, 78, 78]],
];
const blockCount = 24;
const step = 1000 / 60;

type Point = { x: number; y: number };
const cap = (value: number, limit: number) => Math.max(-limit, Math.min(value, limit));

export default function FooterBlocks() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<SVGSVGElement>(null);
  const shuffleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const art = artRef.current;
    const shuffle = shuffleRef.current;
    if (!field || !art || !shuffle) return;

    const elements = Array.from(art.querySelectorAll<SVGGElement>("[data-block]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const engine = Engine.create({ enableSleeping: true });
    let blocks: Matter.Body[] = [];
    let origins: Point[] = [];
    let visible = false;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let width = 0;
    let height = 0;
    let size = 0;
    let pointer: Point | null = null;
    let lastSweep: Point | null = null;
    let pendingSweep = false;
    let touchStart: (Point & { id: number }) | null = null;

    function paint() {
      blocks.forEach(({ position, angle }, index) => {
        elements[index].setAttribute(
          "transform",
          `translate(${position.x} ${position.y}) rotate(${angle * 180 / Math.PI}) scale(${size / 80}) translate(${-origins[index].x} ${-origins[index].y})`,
        );
      });
    }

    function tick(now: number) {
      frame = 0;
      elapsed += previous ? Math.min(50, now - previous) : step;
      previous = now;
      if (pendingSweep && pointer) {
        stir(lastSweep ?? pointer, pointer);
        lastSweep = pointer;
        pendingSweep = false;
      }
      while (elapsed >= step) {
        Engine.update(engine, step);
        elapsed -= step;
      }
      paint();
      if (blocks.some(block => !block.isSleeping)) wake();
      else stop();
    }

    function wake() {
      if (!frame && visible && !preference.matches) frame = requestAnimationFrame(tick);
    }

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      elapsed = 0;
    }

    function clearPointer() {
      pointer = null;
      lastSweep = null;
      pendingSweep = false;
      touchStart = null;
    }

    function stir(from: Point, to: Point) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.hypot(dx, dy);
      const directionX = length ? dx / length : 0;
      const directionY = length ? dy / length : 0;
      const radius = size * .79;
      const strength = Math.min(10.5, 3.2 + length * .2);

      // Sweep the full path between frames so quick passes still move blocks they cross.
      for (const body of blocks) {
        const { x, y } = body.position;
        const along = Math.max(0, Math.min(length, (x - from.x) * directionX + (y - from.y) * directionY));
        const offsetX = x - (from.x + directionX * along);
        const offsetY = y - (from.y + directionY * along);
        const distance = Math.hypot(offsetX, offsetY);
        if (distance >= radius) continue;

        const weight = (1 - distance / radius) ** 1.35;
        const spread = Math.max(size * .22, distance);
        const pushX = (directionX * .62 + offsetX / spread * .86) * weight * strength;
        const pushY = (directionY * .32 + offsetY / spread * .42 - .8) * weight * strength;
        if (Math.hypot(pushX, pushY) < .12) continue;

        const { velocity, angularVelocity } = body;
        Sleeping.set(body, false);
        Body.setVelocity(body, {
          x: cap(velocity.x + pushX, 16),
          y: cap(velocity.y + pushY, 15),
        });
        Body.setAngularVelocity(body, cap(angularVelocity + pushX / size * .48, .22));
      }
    }

    function build(scatter = false) {
      const nextWidth = art!.clientWidth;
      const nextHeight = art!.clientHeight;
      if (!nextWidth || !nextHeight) return;
      if (!scatter && nextWidth === width && nextHeight === height) return;
      stop();
      clearPointer();
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      width = nextWidth;
      height = nextHeight;
      const columns = Math.max(3, Math.min(12, Math.floor(width / 73)));
      const cell = width / columns;
      size = Math.min(78, cell * .87);
      art!.setAttribute("viewBox", `0 0 ${width} ${height}`);
      const boundaries = [
        Bodies.rectangle(width / 2, height + 24, width + 100, 48, { isStatic: true }),
        Bodies.rectangle(-24, height / 2, 48, height + 120, { isStatic: true }),
        Bodies.rectangle(width + 24, height / 2, 48, height + 120, { isStatic: true }),
        Bodies.rectangle(width / 2, -24, width + 100, 48, { isStatic: true }),
      ];
      origins = [];
      blocks = Array.from({ length: columns * 2 }, (_, index) => {
        const row = Math.floor(index / columns);
        const variance = scatter ? Math.random() * .7 - .35 : [.04, -.12, .09, .2, -.16][index % 5];
        const stagger = row ? [0, .29, -.24, .2, -.28][index % 5] : 0;
        const x = (index % columns + .5 + stagger + variance * .18) * cell;
        const y = preference.matches
          ? height - size * (.53 + row * 1.06)
          : height - size * (.62 + row * 1.6 + Math.abs(variance) * 1.7);
        const scale = size / 80;
        const parts = fixtures[index % fixtures.length].map(([cx, cy, w, h]) =>
          Bodies.rectangle(cx, cy, w, h),
        );
        const body = Body.create({
          parts,
          angle: 0,
          restitution: .28,
          friction: .35,
          frictionAir: .018,
          sleepThreshold: 42,
        });
        origins.push({ ...body.position });
        Body.scale(body, scale, scale);
        Body.setPosition(body, {
          x: x + (body.position.x - 40) * scale,
          y: y + (body.position.y - 40) * scale,
        });
        Body.setAngle(body, variance);
        return body;
      });
      elements.forEach((element, index) => {
        element.style.display = index < blocks.length ? "" : "none";
      });
      Composite.add(engine.world, [...boundaries, ...blocks]);
      field!.dataset.interactive = String(!preference.matches);
      paint();
      wake();
    }

    function point(event: PointerEvent): Point {
      const rect = art!.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    function move(event: PointerEvent) {
      if (preference.matches || event.pointerType === "touch" || event.buttons !== 0) return;
      const next = point(event);
      if (pointer && Math.hypot(next.x - pointer.x, next.y - pointer.y) < .5) return;
      pointer = next;
      pendingSweep = true;
      wake();
    }

    function startTap(event: PointerEvent) {
      if (event.pointerType === "touch" && !preference.matches) {
        touchStart = { ...point(event), id: event.pointerId };
      }
    }

    function endTap(event: PointerEvent) {
      if (touchStart?.id !== event.pointerId) return;
      const next = point(event);
      const isTap = event.type === "pointerup" && Math.hypot(next.x - touchStart.x, next.y - touchStart.y) < 10;
      touchStart = null;
      if (isTap) {
        stir(next, next);
        wake();
      }
    }

    function resetMotion() { build(true); }

    const resize = new ResizeObserver(() => build());
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        clearPointer();
        stop();
      }
    });
    resize.observe(art);
    intersection.observe(art);
    preference.addEventListener("change", resetMotion);
    shuffle.addEventListener("click", resetMotion);
    art.addEventListener("pointermove", move);
    art.addEventListener("pointerleave", clearPointer);
    art.addEventListener("pointerdown", startTap);
    art.addEventListener("pointerup", endTap);
    art.addEventListener("pointercancel", endTap);
    build();

    return () => {
      resize.disconnect();
      intersection.disconnect();
      preference.removeEventListener("change", resetMotion);
      shuffle.removeEventListener("click", resetMotion);
      art.removeEventListener("pointermove", move);
      art.removeEventListener("pointerleave", clearPointer);
      art.removeEventListener("pointerdown", startTap);
      art.removeEventListener("pointerup", endTap);
      art.removeEventListener("pointercancel", endTap);
      stop();
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div className="footer-playfield" ref={fieldRef}>
      <div className="footer-play-controls">
        <span className="footer-hover-hint" aria-hidden="true">Move your cursor through the blocks</span>
        <span className="footer-touch-hint" aria-hidden="true">Tap the blocks to scatter them</span>
        <button ref={shuffleRef} type="button">Shuffle blocks</button>
      </div>
      <svg className="footer-blocks" ref={artRef} viewBox="0 0 1200 260" aria-hidden="true">
        <defs>
          {colors.map((color, index) => (
            <pattern key={color} id={`footer-dots-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="3.7" fill={color} />
            </pattern>
          ))}
        </defs>
        {Array.from({ length: blockCount }, (_, index) => (
          <g key={index} data-block={index} transform={`translate(${12 + (index % 12) * 99} ${index < 12 ? 178 : 90})`}>
            <path d={outlines[index % outlines.length]} fill={`url(#footer-dots-${(index + Math.floor(index / outlines.length)) % colors.length})`} fillRule="evenodd" />
          </g>
        ))}
      </svg>
    </div>
  );
}
