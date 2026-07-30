"use client";

import { useEffect, useRef } from "react";

export default function AntWorkflow() {
  const sceneRef = useRef<HTMLSpanElement>(null);

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
      <svg viewBox="0 0 600 82" focusable="false" role="presentation">
        <defs>
          <g id="ant-silhouette">
            <ellipse cx="0" cy="0" rx="4.2" ry="3.3" />
            <ellipse cx="7.5" cy="0" rx="3" ry="2.7" />
            <circle cx="12.8" cy="0" r="2.35" />
            <path d="M4.5-2.2 1-6.3M5.8-1.4 6.2-6.3M4.5 2.2 1 6.3M5.8 1.4 6.2 6.3M9.7-1.8 11.5-5.5M9.7 1.8 11.5 5.5M14.2-1.2 17.6-4.5M14.2 1.2 17.6 4.5" />
          </g>
          <g id="builder-ant">
            <use href="#ant-silhouette" />
            <path className="ant-worn-hat" d="M9.5-3.2h7.1M10.7-3.4c.2-3.4 1.2-5.1 2.5-5.1s2.5 1.7 2.6 5.1Z" />
          </g>
          <clipPath id="ant-river-clip">
            <path d="M270-2C262 12 279 24 268 39S278 67 270 84H308C318 67 299 54 310 38S299 12 307-2Z" />
          </clipPath>
        </defs>

        <path className="ant-ground-line" d="M0 56H600" />

        <g className="ant-river">
          <path className="ant-river-bank" d="M270-2C262 12 279 24 268 39S278 67 270 84H308C318 67 299 54 310 38S299 12 307-2Z" />
          <g clipPath="url(#ant-river-clip)" className="ant-river-current">
            <path d="M266 6q15 6 46 0M262 22q21 7 53 0M267 39q14 6 44 0M263 56q21 7 52 0M267 73q15 6 45 0" />
          </g>
          <path className="ant-river-edge" d="M270-2C262 12 279 24 268 39S278 67 270 84M307-2C318 12 299 24 310 38S299 67 308 84" />
        </g>

        <g className="ant-cycle">
          <g className="ant-bread">
            <ellipse className="ant-bread-shadow" cx="521" cy="59" rx="27" ry="3.5" />
            <path className="ant-bread-piece" d="M498 55V40c0-7 8-12 18-12s20 5 20 12v15Z" />
            <path className="ant-bread-crust" d="M498 42c2-9 10-14 19-14s17 5 19 14" />
            <path className="ant-bread-score" d="m509 35 4 5m9-6 3 5" />
            <g className="ant-bread-loose-crumbs">
              <circle cx="498" cy="52" r="2" />
              <circle cx="503" cy="56" r="1.7" />
              <circle cx="509" cy="54" r="1.5" />
            </g>
            <g className="ant-bread-bites">
              <circle cx="500" cy="51" r="2.5" />
              <circle cx="505" cy="55" r="2.3" />
              <circle cx="510" cy="53" r="2" />
            </g>
          </g>

          <g className="ant-blueprint">
            <rect className="ant-blueprint-paper" x="220" y="62" width="33" height="13" rx="1.5" />
            <path className="ant-blueprint-sketch" d="M226 70h20m-17 0 3-5h9l3 5m-13-5v5m11-5v5" />
            <path className="ant-blueprint-roll" d="M252 62v13c5 0 5-13 0-13Z" />
          </g>

          <g className="ant-hat-cache">
            <path d="M223 52h7m-6-1c.2-3 1.1-4.2 2.4-4.2s2.2 1.2 2.4 4.2ZM233 52h7m-6-1c.2-3 1.1-4.2 2.4-4.2s2.2 1.2 2.4 4.2ZM243 52h7m-6-1c.2-3 1.1-4.2 2.4-4.2s2.2 1.2 2.4 4.2Z" />
          </g>

          <path className="ant-bridge-shadow" d="M264 54Q288 46 313 54" />
          <g className="ant-bridge">
            <path className="ant-bridge-piece bridge-one" d="M264 53 277 49" />
            <path className="ant-bridge-piece bridge-two" d="M276 49 289 51" />
            <path className="ant-bridge-piece bridge-three" d="M288 51 301 48" />
            <path className="ant-bridge-piece bridge-four" d="M300 48 313 53" />
          </g>

          <g className="ant-role ant-observer"><use href="#ant-silhouette" /></g>
          <g className="ant-role ant-planner"><use href="#ant-silhouette" /></g>
          <g className="ant-role ant-resource"><use href="#ant-silhouette" /></g>
          <g className="ant-role ant-wait-one"><use href="#ant-silhouette" /></g>
          <g className="ant-role ant-wait-two"><use href="#ant-silhouette" /></g>

          <g className="ant-hat-carrier">
            <g className="carried-hats">
              <path d="M-5-4h6m-5-1c.2-2.7 1-3.8 2.1-3.8S0-7.7.2-5ZM3-4h6M4-5c.2-2.7 1-3.8 2.1-3.8S8-7.7 8.2-5Z" />
            </g>
            <use href="#ant-silhouette" x="-11" y="4" />
          </g>

          <g className="ant-builder builder-one">
            <path className="builder-material" d="M-7 0H8" />
            <use href="#builder-ant" x="-13" y="5" />
          </g>
          <g className="ant-builder builder-two">
            <path className="builder-material" d="M-7 0H8" />
            <use href="#builder-ant" x="-13" y="5" />
          </g>
          <g className="ant-builder builder-three">
            <path className="builder-material" d="M-7 0H8" />
            <use href="#builder-ant" x="-13" y="5" />
          </g>
          <g className="ant-builder builder-four">
            <path className="builder-material" d="M-7 0H8" />
            <use href="#builder-ant" x="-13" y="5" />
          </g>

          <g className="ant-role ant-validator"><use href="#ant-silhouette" /></g>

          <g className="ant-role ant-colony-one"><use href="#ant-silhouette" /></g>
          <g className="ant-role ant-colony-two"><use href="#ant-silhouette" /></g>
          <g className="ant-role ant-colony-three"><use href="#ant-silhouette" /></g>
          <g className="ant-role ant-colony-four"><use href="#ant-silhouette" /></g>

          <g className="ant-return return-one"><circle className="ant-crumb" cx="-7" cy="-5" r="2.1" /><use href="#ant-silhouette" /></g>
          <g className="ant-return return-two"><circle className="ant-crumb" cx="-7" cy="-5" r="2.1" /><use href="#ant-silhouette" /></g>
          <g className="ant-return return-three"><circle className="ant-crumb" cx="-7" cy="-5" r="2.1" /><use href="#ant-silhouette" /></g>
        </g>
      </svg>
    </span>
  );
}
