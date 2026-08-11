"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    label: "Problem",
    title: "A dense matrix forced manual scanning.",
    copy: "Users had to visually inspect rows, decode color alone, and keep region and language context in memory.",
  },
  {
    number: "02",
    label: "Intervention",
    title: "Search turns the matrix into a direct route.",
    copy: "The same report structure stays intact, while filename, region, version, status, language, and path become searchable.",
  },
  {
    number: "03",
    label: "System clarity",
    title: "Status and language become active controls.",
    copy: "Interactive status filters and English or Spanish tabs remove interpretation work without changing production terminology.",
  },
  {
    number: "04",
    label: "Measured result",
    title: "The improved route is faster and more accurate.",
    copy: "In a 20-participant retrospective evaluation, the find-region task moved from 20–30 seconds to 5–10 seconds, with incorrect selections falling from 1.86 to 0.",
  },
];

export default function UtilityScrollTransformation() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveStep(Number((visible.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-34% 0px -42% 0px", threshold: [0, 0.15, 0.45, 0.75] },
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return <section className="utility-scroll-story" id="workflow-transformation" aria-labelledby="workflow-transformation-title">
    <div className="shell utility-scroll-intro">
      <p className="kicker">Scroll through the transformation</p>
      <h2 id="workflow-transformation-title">The interface changes as the workflow becomes clearer.</h2>
      <p>Scroll normally. The visual follows the decision sequence without controlling your pace or locking the page.</p>
    </div>

    <div className="shell utility-scroll-layout">
      <div className="utility-scroll-visual-column" aria-hidden="true">
        <div className={`utility-transform-screen is-stage-${activeStep}`}>
          <div className="utility-transform-browser"><i /><i /><i /><span>Regional report portal</span></div>
          <div className="utility-transform-toolbar">
            <span className="utility-transform-search">⌕ <b>Search reports, regions, status…</b></span>
            <span className="utility-transform-language"><b>English</b><b>Spanish</b></span>
          </div>
          <div className="utility-transform-status">
            <b>All</b><b>Waiting</b><b>Proof ready</b><b>Approved</b>
          </div>
          <div className="utility-transform-grid">
            {Array.from({ length: 30 }, (_, index) => <i key={index} className={`cell-${(index % 5) + 1}`} />)}
          </div>
          <div className="utility-transform-focus"><span>Region 04</span><strong>Correct report found</strong></div>
          <div className="utility-transform-result">
            <span>Find a region</span>
            <strong>20–30s <i>→</i> 5–10s</strong>
            <small>Incorrect selections: 1.86 → 0</small>
          </div>
          <div className="utility-transform-cursor">⌕</div>
        </div>
        <div className="utility-transform-progress" aria-hidden="true">
          {steps.map((step, index) => <i className={index <= activeStep ? "is-active" : ""} key={step.number} />)}
        </div>
      </div>

      <ol className="utility-scroll-steps">
        {steps.map((step, index) => <li
          className={activeStep === index ? "is-active" : ""}
          data-step={index}
          ref={(element) => { stepRefs.current[index] = element; }}
          key={step.number}
        >
          <span>{step.number} · {step.label}</span>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
        </li>)}
      </ol>
    </div>
    <p className="shell utility-scroll-evidence"><strong>Evidence boundary:</strong> This sequence visualizes the delivered workflow and retrospective usability findings. It does not represent live production analytics.</p>
  </section>;
}
