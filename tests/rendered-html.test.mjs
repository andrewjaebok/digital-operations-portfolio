import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /Project 03/i);
  assert.match(html, /Project 04/i);
  assert.match(html, /Zero-to-one products/i);
  assert.match(html, /Operational Systems &amp; Automation/i);
  assert.match(html, /Play Project Quest/i);
  assert.match(html, /Browse case studies/i);
  assert.match(html, /Project Quest · Town Edition/i);
  assert.match(html, /walk through a tiny 8-bit town/i);
  assert.match(html, /Enter Project 01/i);
  assert.match(html, /Enter Project 04/i);
  assert.match(html, /Andrew \| Senior Product Operations Portfolio/i);
  assert.doesNotMatch(html, /Case study in development|Castle Press/i);
});

test("renders the Hearth case study directly", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("hearth-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/projects/hearth", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Hearth: Building a Privacy-First Personal Finance Platform/i);
  assert.match(html, /Product images coming soon/i);
  assert.match(html, /Business significance/i);
  assert.doesNotMatch(html, /Screenshot needed|Visual evidence needed/i);
});

test("renders unique case-study metadata and evidence-safe utility results", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("metadata-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const routes = [
    ["/how-i-work", /How I Work \| Product Operations Framework/i],
    ["/projects/customer-portal-redesign", /Regional Utility CCR Portal \| Product Operations Case Study/i],
    ["/projects/prescription-pad-ordering-portal", /Prescription Pad Ordering \| Product Operations Case Study/i],
    ["/projects/hearth", /Hearth \| Zero-to-One Product Operations Case Study/i],
    ["/projects/operational-systems-automation", /Operational Systems &amp; Automation \| Product Operations Case Study/i],
  ];

  for (const [path, title] of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, /<meta[^>]+name=["']description["'][^>]+content=/i);
    assert.doesNotMatch(html, /Castle Press/i);
    if (path === "/projects/customer-portal-redesign") {
      assert.match(html, /Twenty participants completed the same core CCR report tasks/i);
      assert.match(html, /30–60 sec/i);
      assert.match(html, /1\.86/i);
      assert.match(html, /Most participants used the search bar/i);
      assert.match(html, /Results below are usability-test findings, not live product analytics/i);
      assert.match(html, /Core report tasks were completed faster/i);
      assert.match(html, /20 participants.*4 core tasks.*Original vs redesigned portal/is);
      assert.match(html, /Reports are reviewed in batches/i);
      assert.match(html, /Workflow evidence determined what mattered first/i);
      assert.match(html, /evaluation occurred after implementation/i);
      assert.match(html, /Discovery.*prioritization.*execution.*validation.*iteration/is);
    }
    if (path === "/projects/operational-systems-automation") {
      assert.match(html, /Operational signal.*Workflow assessment.*Root-cause analysis.*Prioritization.*Requirements.*System improvement.*QA.*Rollout.*Measurement.*Standardization/is);
      assert.match(html, /Production Workflow Automation/i);
      assert.match(html, /Proof Asset Persistence/i);
      assert.match(html, /Verified implementation/i);
      assert.match(html, /Directional impact/i);
      assert.match(html, /Future measurement/i);
      assert.match(html, /No percentage or time-saving claim is made/i);
      assert.doesNotMatch(html, /hours saved:\s*\d|reduction:\s*\d+%|customers:\s*\d/i);
    }
  }
});

test("renders the RX growth roadmap with honest statuses and target KPIs", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("rx-roadmap-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/projects/prescription-pad-ordering-portal", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Growth roadmap and measurement plan/i);
  assert.match(html, /Delivered/i);
  assert.match(html, /In progress/i);
  assert.match(html, /Planned/i);
  assert.match(html, /Revenue attributed to organic search/i);
  assert.match(html, /July orders rose 50% while tracked repeat questions fell 100%/i);
  assert.match(html, /March 20, April 17, May 20, June 20, and July 30/i);
  assert.match(html, /\+76%.*April, the five-month low/is);
  assert.match(html, /What’s the turnaround time\?/i);
  assert.match(html, /combined tracked baseline was 34\.8 questions per month/i);
  assert.match(html, /100% reduction within the tracked categories/i);
  assert.match(html, /do not prove that the redesign or content work alone caused the increase/i);
  assert.doesNotMatch(html, /Next iteration backlog/i);
  assert.doesNotMatch(html, /Castle Press/i);
});
