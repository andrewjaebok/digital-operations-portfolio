"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const { Bodies, Body, Composite, Constraint, Engine, Sleeping } = Matter;
const colors = ["#087eaa", "#0b1f33", "#c65b18"];
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

type Grab = {
  pointerId: number;
  joint: Matter.Constraint;
  body: Matter.Body;
  x: number;
  y: number;
  time: number;
  vx: number;
  vy: number;
};

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
    let origins: { x: number; y: number }[] = [];
    let visible = false;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let width = 0;
    let height = 0;
    let size = 0;
    let grab: Grab | null = null;

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
      while (elapsed >= step) {
        Engine.update(engine, step);
        elapsed -= step;
      }
      paint();
      if (grab || blocks.some(block => !block.isSleeping)) wake();
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

    function drop(throwBlock: boolean) {
      if (!grab) return;
      const { joint, body, pointerId, vx, vy, time } = grab;
      grab = null;
      Composite.remove(engine.world, joint);
      if (art!.hasPointerCapture(pointerId)) art!.releasePointerCapture(pointerId);
      field!.removeAttribute("data-grabbing");
      if (throwBlock && performance.now() - time < 90) {
        Body.setVelocity(body, { x: vx, y: vy });
      }
      wake();
    }

    function build(scatter = false) {
      const nextWidth = art!.clientWidth;
      const nextHeight = art!.clientHeight;
      if (!nextWidth || !nextHeight) return;
      if (!scatter && nextWidth === width && nextHeight === height) return;
      stop();
      drop(false);
      stop();
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

    function point(event: PointerEvent) {
      const rect = art!.getBoundingClientRect();
      return {
        x: Math.max(size * .35, Math.min(width - size * .35, event.clientX - rect.left)),
        y: Math.max(size * .35, Math.min(height - size * .35, event.clientY - rect.top)),
      };
    }

    function pickUp(event: PointerEvent) {
      if (preference.matches || grab || event.button !== 0 || !(event.target instanceof Element)) return;
      const piece = event.target.closest<SVGGElement>("[data-block]");
      if (!piece) return;
      const body = blocks[Number(piece.dataset.block)];
      if (!body) return;
      const position = point(event);
      const joint = Constraint.create({
        pointA: position,
        bodyB: body,
        pointB: { x: position.x - body.position.x, y: position.y - body.position.y },
        length: 0,
        stiffness: .29,
        damping: .18,
      });
      Sleeping.set(body, false);
      Composite.add(engine.world, joint);
      grab = { pointerId: event.pointerId, joint, body, ...position, time: performance.now(), vx: 0, vy: 0 };
      art!.setPointerCapture(event.pointerId);
      field!.dataset.grabbing = "true";
      wake();
    }

    function pull(event: PointerEvent) {
      if (!grab || grab.pointerId !== event.pointerId) return;
      const position = point(event);
      const now = performance.now();
      const factor = step / Math.max(8, now - grab.time);
      const clamp = (value: number) => Math.max(-18, Math.min(18, value));
      grab.vx = clamp((position.x - grab.x) * factor);
      grab.vy = clamp((position.y - grab.y) * factor);
      grab.x = position.x;
      grab.y = position.y;
      grab.time = now;
      grab.joint.pointA = position;
    }

    function release(event: PointerEvent) {
      if (grab?.pointerId === event.pointerId) drop(event.type === "pointerup");
    }

    function resetMotion() { build(true); }

    const resize = new ResizeObserver(() => build());
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        drop(false);
        stop();
      }
    });
    resize.observe(art);
    intersection.observe(art);
    preference.addEventListener("change", resetMotion);
    shuffle.addEventListener("click", resetMotion);
    art.addEventListener("pointerdown", pickUp);
    art.addEventListener("pointermove", pull);
    art.addEventListener("pointerup", release);
    art.addEventListener("pointercancel", release);
    art.addEventListener("lostpointercapture", release);
    build();

    return () => {
      resize.disconnect();
      intersection.disconnect();
      preference.removeEventListener("change", resetMotion);
      shuffle.removeEventListener("click", resetMotion);
      art.removeEventListener("pointerdown", pickUp);
      art.removeEventListener("pointermove", pull);
      art.removeEventListener("pointerup", release);
      art.removeEventListener("pointercancel", release);
      art.removeEventListener("lostpointercapture", release);
      drop(false);
      stop();
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div className="footer-playfield" ref={fieldRef}>
      <div className="footer-play-controls">
        <span aria-hidden="true">Drag the blocks</span>
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
            <path d={outlines[index % outlines.length]} fill={`url(#footer-dots-${index % colors.length})`} fillRule="evenodd" />
          </g>
        ))}
      </svg>
    </div>
  );
}
