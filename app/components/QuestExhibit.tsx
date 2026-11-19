import { useState } from "react";
import Link from "next/link";
import { assetPath } from "@/lib/asset-path";
import { normalizeReportQuery, utilityReports } from "../data/utility-reports";
import PortfolioImage from "./PortfolioImage";

const reportSamples = utilityReports.slice(0, 3);

function ReportSearch() {
  const [query, setQuery] = useState("");
  const [report, setReport] = useState<(typeof reportSamples)[number]>();
  const matches = reportSamples.filter(item =>
    normalizeReportQuery(`${item.region} ${item.name} ${item.status}`).includes(normalizeReportQuery(query)),
  );

  return <>
    <p>At the service counter, find and open the Central region’s proof. This search uses sample reports.</p>
    <label className="quest-search-label">Search sample reports
      <input type="search" value={query} placeholder="Try Central" onChange={event => {
        setQuery(event.target.value);
        setReport(undefined);
      }} />
    </label>
    <div className="quest-report-results" aria-label="Matching reports">
      {matches.map(item => <button key={item.name} type="button" aria-pressed={item === report} onClick={() => setReport(item)}>
        <strong>{item.region}</strong><span>{item.name}</span><span>{item.status}</span>
      </button>)}
      {!matches.length && <p role="status">No matches. Try a region or status.</p>}
    </div>
    {report && <div className="quest-result" role="status">
      {report.region === "Central"
        ? <><strong>Central proof found.</strong> The redesigned portal uses searchable region names and visible status labels. In a retrospective evaluation with 20 participants, location lookup went from 30–60 seconds to 10–15 seconds.</>
        : <><strong>{report.region} · {report.status}.</strong> Try searching for Central to find the requested proof.</>}
    </div>}
  </>;
}

function TrafficMonitor() {
  const [answer, setAnswer] = useState<"requests" | "connectivity">();
  return <>
    <p>Which evidence tells you whether fewer requests reached the ordering server after the protection rollout?</p>
    <div className="quest-traffic-chart" aria-label="Average requests per minute reaching Apache">
      <div><span>Before</span><span className="quest-chart-track"><i style={{ width: "100%" }} /></span><strong>1,877/min</strong></div>
      <div><span>After</span><span className="quest-chart-track"><i style={{ width: "2.7%" }} /></span><strong>50.7/min</strong></div>
    </div>
    <div className="quest-demo-options" role="group" aria-label="Choose the evidence">
      <button type="button" aria-pressed={answer === "requests"} onClick={() => setAnswer("requests")}>Apache request counts</button>
      <button type="button" aria-pressed={answer === "connectivity"} onClick={() => setAnswer("connectivity")}>Browser access checks</button>
    </div>
    {answer && <div className="quest-result" role="status">{answer === "requests"
      ? <><strong>97.3% fewer requests reached Apache.</strong> The browser check answered a separate question about whether the customer-facing site could open.</>
      : <>The browser check confirmed that the site could open. Pick the evidence that counts requests reaching Apache.</>}</div>}
  </>;
}

const buildings = [
  { name: "Town Hall", view: "Dashboard", detail: "Review the household’s balances and monthly spending in one place." },
  { name: "Bank", view: "Planning", detail: "Plan bills, budgets, and savings goals." },
  { name: "ATM", view: "Transactions", detail: "Review individual purchases, deposits, and transfers." },
  { name: "School", view: "Manage lists", detail: "Organize the categories that power your budget and reports." },
  { name: "Observatory", view: "Future value", detail: "Compare what a one-time purchase could grow into if you invested the money instead." },
];

function FinanceWorld() {
  const [selection, setSelection] = useState<number>();
  const building = selection === undefined ? undefined : buildings[selection];
  return <>
    <p>Choose a building to see which part of the finance app it opens.</p>
    <PortfolioImage className="quest-demo-image quest-world-preview" src="/images/lumafi/city-park.webp" width={1110} height={700} alt="The five LumaFi buildings arranged around the City Park plaza" />
    <div className="quest-demo-options" role="group" aria-label="LumaFi buildings">
      {buildings.map(({ name }, index) => <button type="button" key={name} aria-pressed={index === selection} onClick={() => setSelection(index)}>{name}</button>)}
    </div>
    {building && <div className="quest-result" role="status"><strong>{building.view}.</strong> {building.detail}</div>}
    <a href={assetPath("/play/lumafi/world.html")}>Visit LumaFi World ↗</a>
  </>;
}

const packages = [
  { name: "Brand board", src: "gogi-packaging.webp", width: 1280, height: 853, alt: "Gogi wordmark, Korean stamp and pouch concepts", detail: "Explored wordmarks, colors, and stamp shapes for a consistent brand." },
  { name: "Pouch concepts", src: "gogi-pouch-iterations.webp", width: 1100, height: 880, alt: "Ten matte pouch designs with different label positions", detail: "Tested where to put flavor, origin copy, and the red seal." },
  { name: "Selected draft", src: "gogi-front-artwork.webp", width: 850, height: 1020, alt: "KBBQ 001 beef jerky chips front-panel draft", detail: "The selected front names both the flavor and the type of snack at a glance." },
];

function PackagingBench() {
  const [selection, setSelection] = useState(0);
  const { name, src, width, height, alt, detail } = packages[selection];
  return <>
    <div className="quest-demo-options" role="group" aria-label="Packaging iterations">
      {packages.map((item, index) => <button type="button" key={item.name} aria-pressed={index === selection} onClick={() => setSelection(index)}>{item.name}</button>)}
    </div>
    <figure className="quest-package-preview">
      <PortfolioImage className="quest-demo-image" src={`/images/personal-projects/${src}`} width={width} height={height} alt={alt} />
      <figcaption aria-live="polite"><strong>{name}.</strong> {detail}</figcaption>
    </figure>
  </>;
}

function SpellPractice() {
  const [cast, setCast] = useState(false);
  return <>
    <p>Try the Spellcaster’s Arc Spark on a practice slime.</p>
    <div className={`quest-battle${cast ? " is-cast" : ""}`} aria-hidden="true"
      style={{ backgroundImage: `url(${assetPath("/play/emberwake/assets/greenfields.webp")})` }}>
      <span className="quest-battle-mage" style={{ backgroundImage: `url(${assetPath("/play/emberwake/assets/spellcaster.webp")})` }} />
      <span className="quest-battle-slime" style={{ backgroundImage: `url(${assetPath("/play/emberwake/assets/slime.webp")})` }} />
      {cast && <span className="quest-arc-spark" />}
    </div>
    <div className="quest-demo-options">
      <button type="button" onClick={() => setCast(!cast)}>{cast ? "Reset practice" : "Cast Arc Spark"}</button>
    </div>
    {cast && <div className="quest-result quest-battle-result" role="status"><strong>Target hit.</strong> Position, projectile motion, and impact give the player feedback after a skill cast.</div>}
    <a href={assetPath("/play/emberwake/")}>Play the full demo stage ↗</a>
  </>;
}

export const questStations = [
  [{ label: "Service counter", action: "Find a report", kind: "counter", title: "Regional Utility Report Search", route: "/projects/customer-portal-redesign", Demo: ReportSearch }],
  [{ label: "Server rack", action: "Inspect traffic", kind: "rack", title: "Ordering Server Traffic", route: "/projects/customer-ordering-protection", Demo: TrafficMonitor }],
  [
    { label: "LumaFi model", action: "Explore LumaFi", kind: "model", title: "LumaFi World", route: "/projects/hearth", Demo: FinanceWorld },
    { label: "Gogi workbench", action: "Compare packaging", kind: "bench", title: "Gogi Packaging", route: "/projects/gogi-snacks", Demo: PackagingBench },
    { label: "EmberWake arcade", action: "Try a spell", kind: "arcade", title: "EmberWake Practice", route: "/projects/emberwake", Demo: SpellPractice },
  ],
];

export function QuestExhibit({ station, onBack }: {
  station: (typeof questStations)[number][number];
  onBack: () => void;
}) {
  const { Demo, route, title } = station;
  return <section className="quest-exhibit" aria-labelledby="quest-exhibit-title">
    <header>
      <h4 id="quest-exhibit-title" tabIndex={-1}>{title}</h4>
      <button type="button" onClick={onBack}>← Room</button>
    </header>
    <Demo />
    <footer><Link href={route}>Read the case study ↗</Link></footer>
  </section>;
}
