"use client";

import { useEffect, useRef } from "react";

export default function AntWorkflow() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => scene.toggleAttribute("data-paused", !entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={sceneRef} className="ant-workflow" aria-hidden="true">
      <svg viewBox="0 0 520 70" focusable="false" role="presentation">
        <defs>
          <g id="ant-silhouette">
            <ellipse cx="0" cy="0" rx="4.8" ry="3.7" />
            <ellipse cx="8.5" cy="0" rx="3.4" ry="3" />
            <circle cx="14.5" cy="0" r="2.6" />
            <path d="M5 -2.4 1 -7M6.5 -1.5 7 -7M5 2.4 1 7M6.5 1.5 7 7M11 -2 13 -6M11 2 13 6M16 -1.5 20 -5M16 1.5 20 5" />
          </g>
          <linearGradient id="leaf-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f97316" />
            <stop offset=".55" stopColor="#d95d16" />
            <stop offset="1" stopColor="#9b451f" />
          </linearGradient>
        </defs>

        <path className="ant-trail ant-trail-base" d="M4 41H218M302 41H516" />
        <path className="ant-trail ant-trail-explore-top" d="M218 41C231 41 230 17 259 17S287 29 302 41" />
        <path className="ant-trail ant-trail-explore-bottom" d="M218 41C231 41 232 64 260 64S289 51 302 41" />
        <path className="ant-trail ant-trail-solution" d="M218 41C231 41 230 17 259 17S287 29 302 41" />

        <g className="ant-leaf">
          <path d="M0 0C13-13 29-8 35-22 42-5 32 13 12 15 4 13-1 8 0 0Z" fill="url(#leaf-fill)" />
          <path d="M6 10C16 4 24-5 33-18M17 1l-1-9M24-6l8 1" />
        </g>

        <g className="ant ant-one"><use href="#ant-silhouette" /></g>
        <g className="ant ant-two"><use href="#ant-silhouette" /></g>
        <g className="ant ant-three"><use href="#ant-silhouette" /></g>
        <g className="ant ant-four"><use href="#ant-silhouette" /></g>
        <g className="ant ant-five"><use href="#ant-silhouette" /></g>
        <g className="ant ant-six"><use href="#ant-silhouette" /></g>
      </svg>
    </span>
  );
}
