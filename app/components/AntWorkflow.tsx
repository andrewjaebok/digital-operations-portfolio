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
      <svg viewBox="0 0 600 78" focusable="false" role="presentation">
        <defs>
          <g id="ant-silhouette">
            <ellipse cx="0" cy="0" rx="4.2" ry="3.3" />
            <ellipse cx="7.5" cy="0" rx="3" ry="2.7" />
            <circle cx="12.8" cy="0" r="2.35" />
            <path d="M4.5 -2.2 1 -6.3M5.8 -1.4 6.2 -6.3M4.5 2.2 1 6.3M5.8 1.4 6.2 6.3M9.7 -1.8 11.5 -5.5M9.7 1.8 11.5 5.5M14.2 -1.2 17.6 -4.5M14.2 1.2 17.6 4.5" />
          </g>
          <clipPath id="ant-river-clip">
            <path d="M270-2C262 12 279 24 268 38S278 64 270 80H306C316 65 298 53 308 38S298 12 306-2Z" />
          </clipPath>
        </defs>

        <g className="ant-scene-content">
          <path className="ant-ground-line" d="M0 54H600" />

          <g className="ant-river">
            <path className="ant-river-bank" d="M270-2C262 12 279 24 268 38S278 64 270 80H306C316 65 298 53 308 38S298 12 306-2Z" />
            <g clipPath="url(#ant-river-clip)" className="ant-river-current">
              <path d="M267 7q11 5 42 0M263 22q18 6 49 0M267 38q11 5 42 0M263 54q18 6 49 0M267 70q11 5 42 0" />
            </g>
            <path className="ant-river-edge" d="M270-2C262 12 279 24 268 38S278 64 270 80M306-2C316 12 298 24 308 38S298 64 306 80" />
          </g>

          <g className="ant-bread">
            <ellipse className="ant-bread-shadow" cx="518" cy="57" rx="26" ry="3.5" />
            <path className="ant-bread-piece" d="M496 53V39c0-7 8-12 18-12s19 5 19 12v14Z" />
            <path className="ant-bread-crust" d="M496 41c2-9 10-14 19-14s17 5 18 14" />
            <path className="ant-bread-score" d="m507 34 4 5m8-6 3 5" />
          </g>

          <g className="ant-bridge">
            <path className="ant-bridge-piece bridge-one" d="M265 50 278 47" />
            <path className="ant-bridge-piece bridge-two" d="M277 47 289 49" />
            <path className="ant-bridge-piece bridge-three" d="M288 49 300 46" />
            <path className="ant-bridge-piece bridge-four" d="M299 46 310 50" />
          </g>

          <g className="ant-material material-one"><path d="M-7 0H8" /><use href="#ant-silhouette" x="-13" y="5" /></g>
          <g className="ant-material material-two"><path d="M-7 0H8" /><use href="#ant-silhouette" x="-13" y="5" /></g>
          <g className="ant-material material-three"><path d="M-7 0H8" /><use href="#ant-silhouette" x="-13" y="5" /></g>
          <g className="ant-material material-four"><path d="M-7 0H8" /><use href="#ant-silhouette" x="-13" y="5" /></g>

          <g className="ant ant-one"><use href="#ant-silhouette" /></g>
          <g className="ant ant-two"><use href="#ant-silhouette" /></g>
          <g className="ant ant-three"><use href="#ant-silhouette" /></g>
          <g className="ant ant-four"><use href="#ant-silhouette" /></g>
          <g className="ant ant-five"><use href="#ant-silhouette" /></g>
          <g className="ant ant-six"><use href="#ant-silhouette" /></g>

          <g className="ant ant-inspector"><use href="#ant-silhouette" /></g>
          <g className="ant ant-validator"><use href="#ant-silhouette" /></g>

          <g className="ant-return return-one"><circle className="ant-crumb" cx="-7" cy="-5" r="2.1" /><use href="#ant-silhouette" /></g>
          <g className="ant-return return-two"><circle className="ant-crumb" cx="-7" cy="-5" r="2.1" /><use href="#ant-silhouette" /></g>
          <g className="ant-return return-three"><circle className="ant-crumb" cx="-7" cy="-5" r="2.1" /><use href="#ant-silhouette" /></g>

          <g className="ant ant-reuse-one"><use href="#ant-silhouette" /></g>
          <g className="ant ant-reuse-two"><use href="#ant-silhouette" /></g>
        </g>
      </svg>
    </span>
  );
}
