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
          <linearGradient id="rock-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#a8b0ba" />
            <stop offset=".55" stopColor="#7d8793" />
            <stop offset="1" stopColor="#596573" />
          </linearGradient>
        </defs>

        <path className="ant-trail ant-trail-base" d="M4 41H218M302 41H516" />
        <path className="ant-trail ant-trail-explore-top" d="M218 41C231 41 230 11 259 11S287 27 302 41" />
        <path className="ant-trail ant-trail-solution" d="M218 41C231 41 230 11 259 11S287 27 302 41" />

        <g className="ant-rock">
          <ellipse cx="260" cy="44" rx="25" ry="4.5" className="ant-rock-shadow" />
          <path d="M238 42 242 29 251 23 267 22 278 29 282 42Z" fill="url(#rock-fill)" />
          <path d="m245 31 8-5 11-1 9 5-12-2Z" className="ant-rock-highlight" />
          <path d="m242 37 9-5 10 4 8-5 9 7" className="ant-rock-facet" />
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
