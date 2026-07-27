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
  assert.match(html, /Zero-to-one products/i);
  assert.match(html, /Andrew \| Senior Product Operations Portfolio/i);
  assert.doesNotMatch(html, /Project 04|Case study in development/i);
  assert.doesNotMatch(html, /Workflow automation|Production automation|Castle Press/i);
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
  assert.doesNotMatch(html, /Next iteration backlog/i);
  assert.doesNotMatch(html, /Castle Press/i);
});
