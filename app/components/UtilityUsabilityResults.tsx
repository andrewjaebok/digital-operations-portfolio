"use client";

import { useState } from "react";

type TaskResult = {
  id: string;
  number: string;
  label: string;
  prompt: string;
  beforeTime: string;
  afterTime: string;
  beforeErrors?: string;
  afterErrors?: string;
  beforeEase: string;
  afterEase: string;
  takeaway: string;
};

const tasks: TaskResult[] = [
  {
    id: "location",
    number: "01",
    label: "Find a location",
    prompt: "Find the report for a specified location.",
    beforeTime: "30–60 sec",
    afterTime: "10–15 sec",
    beforeErrors: "1.86",
    afterErrors: "0.32",
    beforeEase: "2.4",
    afterEase: "4.8",
    takeaway: "Clearer organization and search reduced scanning and incorrect report choices.",
  },
  {
    id: "region",
    number: "02",
    label: "Find a region",
    prompt: "Navigate to a report in a specified geographic region.",
    beforeTime: "20–30 sec",
    afterTime: "5–10 sec",
    beforeErrors: "1.86",
    afterErrors: "0",
    beforeEase: "1.9",
    afterEase: "4.6",
    takeaway: "Region and batch organization produced the strongest reduction in selection errors.",
  },
  {
    id: "status",
    number: "03",
    label: "Identify status",
    prompt: "Identify a report’s current production or proofing status.",
    beforeTime: "30–60 sec",
    afterTime: "10–15 sec",
    beforeErrors: "1.86",
    afterErrors: "0.32",
    beforeEase: "2.4",
    afterEase: "4.8",
    takeaway: "Labels and interactive status guidance made the existing color system easier to interpret.",
  },
  {
    id: "language",
    number: "04",
    label: "Open a language file",
    prompt: "Open the correct English or Spanish report.",
    beforeTime: "5–40 sec",
    afterTime: "5–10 sec",
    beforeEase: "4.0",
    afterEase: "4.0",
    takeaway: "The redesign made completion time more consistent, while the ease rating remained unchanged.",
  },
];

function Metric({
  label,
  before,
  after,
  scale,
}: {
  label: string;
  before: string;
  after: string;
  scale?: string;
}) {
  return (
    <article className="utility-result-metric">
      <span>{label}</span>
      <div>
        <p><small>Before</small><strong>{before}</strong></p>
        <b aria-hidden="true">→</b>
        <p><small>After</small><strong>{after}</strong>{scale && <em>{scale}</em>}</p>
      </div>
    </article>
  );
}

export default function UtilityUsabilityResults() {
  const [activeId, setActiveId] = useState(tasks[0].id);
  const active = tasks.find((task) => task.id === activeId) ?? tasks[0];

  return (
    <section className="utility-study shell" id="usability-results" aria-labelledby="utility-study-title">
      <div className="utility-study-heading">
        <div>
          <p className="kicker">Retrospective usability evaluation</p>
          <h2 id="utility-study-title">The redesign was tested against the original workflow.</h2>
        </div>
        <p>Twenty participants completed the same core CCR report tasks in the original and redesigned portals. Results below are usability-test findings, not live product analytics.</p>
      </div>

      <div className="utility-study-summary" aria-label="Evaluation summary">
        <article><strong>20</strong><span>Participants</span></article>
        <article><strong>4</strong><span>Core task scenarios</span></article>
        <article><strong>3 of 4</strong><span>Tasks with higher ease ratings</span></article>
        <article><strong>Search</strong><span>Preferred path for most participants</span></article>
      </div>

      <div className="utility-task-picker" aria-label="Choose a task result">
        {tasks.map((task) => (
          <button
            type="button"
            key={task.id}
            className={task.id === active.id ? "active" : ""}
            aria-pressed={task.id === active.id}
            onClick={() => setActiveId(task.id)}
          >
            <b>{task.number}</b>
            <span>{task.label}</span>
          </button>
        ))}
      </div>

      <div className="utility-result-panel" aria-live="polite">
        <div className="utility-result-context">
          <span>Task {active.number}</span>
          <h3>{active.label}</h3>
          <p>{active.prompt}</p>
          <aside>{active.takeaway}</aside>
        </div>
        <div className="utility-result-metrics">
          <Metric label="Completion time" before={active.beforeTime} after={active.afterTime} />
          {active.beforeErrors && active.afterErrors && (
            <Metric label="Average incorrect selections" before={active.beforeErrors} after={active.afterErrors} />
          )}
          <Metric label="Average ease-of-use rating" before={active.beforeEase} after={active.afterEase} scale="/ 5" />
        </div>
      </div>

      <div className="utility-search-callout">
        <span aria-hidden="true">⌕</span>
        <div><b>A new path became the natural path.</b><p>Search was unavailable in the original portal. In the redesigned version, most participants used the search bar to complete their tasks and responded positively to it.</p></div>
      </div>

      <p className="utility-method-note"><strong>Reading the results:</strong> Completion time is shown as the observed range provided for each task. Incorrect selections and ease-of-use are participant averages. The language-file task did not include an incorrect-selection measure.</p>
    </section>
  );
}
