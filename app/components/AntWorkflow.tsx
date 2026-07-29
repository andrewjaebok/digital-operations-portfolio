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
          <linearGradient id="frog-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#9bcf69" />
            <stop offset="1" stopColor="#4f8a45" />
          </linearGradient>
        </defs>

        <path className="ant-trail ant-trail-base" d="M4 41H218M302 41H516" />
        <path className="ant-trail ant-trail-explore-top" d="M218 41C231 41 230 17 259 17S287 29 302 41" />
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
        <g className="frog-route">
          <g className="frog-hop">
            <ellipse className="frog-hind-leg frog-hind-leg-back" cx="-8.2" cy="2.3" rx="5.8" ry="3.7" transform="rotate(-16 -8.2 2.3)" />
            <path className="frog-hind-foot" d="M-11.5 3.2C-15.7 4.6-17.2 7.4-15.2 8.1c1.2.5 3.1-1 4.4-2.1-.8 1.9-.3 3.6.9 3.3 1.6-.4 2.6-3.7 3.2-5.2Z" />
            <ellipse className="frog-body" cx="0" cy=".2" rx="9.2" ry="6.2" />
            <ellipse className="frog-head" cx="6.2" cy="-3.2" rx="7.2" ry="5.6" />
            <circle className="frog-eye" cx="3.6" cy="-7.2" r="2.45" />
            <circle className="frog-eye" cx="9.2" cy="-6.7" r="2.45" />
            <circle className="frog-pupil" cx="4.1" cy="-7.25" r=".9" />
            <circle className="frog-pupil" cx="9.7" cy="-6.7" r=".9" />
            <path className="frog-mouth" d="M5.2-1.7c2.1 1.6 4.6 1.5 6.3-.2" />
            <ellipse className="frog-hind-leg frog-hind-leg-front" cx="-4.8" cy="4.2" rx="6.2" ry="3.5" transform="rotate(17 -4.8 4.2)" />
            <path className="frog-hind-foot" d="M-8 5.2c-4.8 1.2-6.9 3.8-4.9 4.8 1.3.6 3.5-.7 5-1.8-1.1 1.9-.7 3.9.7 3.6 1.8-.4 3.1-3.8 3.9-5.6Z" />
            <path className="frog-front-leg" d="M4.5 1.2c2.9.2 5 1.8 5.9 4.5l3.2 1.1c1.4.5 1 2-.4 1.8l-4.5-.7C7.5 6 6 4.9 3.5 4.6Z" />
          </g>
        </g>
      </svg>
    </span>
  );
}
