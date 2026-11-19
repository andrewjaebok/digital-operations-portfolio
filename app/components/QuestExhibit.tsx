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

function PadOrder() {
  const [format, setFormat] = useState("Pocket");
  const [count, setCount] = useState(1);
  const [review, setReview] = useState(false);
  return <>
    <p>Configure a sample pad order and review the handoff. No order is placed.</p>
    <div className="quest-demo-options" role="group" aria-label="Pad format">
      {["Pocket", "Desk"].map(value => <button key={value} type="button" aria-pressed={format === value} onClick={() => {setFormat(value); setReview(false);}}>{value} pads</button>)}
    </div>
    <label className="quest-search-label">Number of prescribers
      <select value={count} onChange={event => {setCount(Number(event.target.value)); setReview(false);}}>
        {Array.from({length: 10}, (_, index) => <option key={index} value={index + 1}>{index + 1}</option>)}
      </select>
    </label>
    <button type="button" onClick={() => setReview(true)}>Review sample order</button>
    {review && <div className="quest-result" role="status"><strong>{format} pads · {count} {count === 1 ? "prescriber" : "prescribers"}.</strong> The selection is ready for the next step in the sample journey.</div>}
    <p><Link href="/projects/prescription-pad-ordering-portal#rx-prototype">Try the complete ordering prototype</Link></p>
  </>;
}

const sampleOrganizations = [
  {name: "Department of Mechanical Engineering", alias: "mech eng mechanical me", path: "Sample University / College of Engineering / Department of Mechanical Engineering"},
  {name: "University Library", alias: "lib libraries", path: "Sample University / Libraries / University Library"},
  {name: "Student Services Office", alias: "help desk student services", path: "Sample University / Student Affairs / Student Services Office"},
];
function DirectorySearch() {
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState<string>();
  const matches = sampleOrganizations.filter(item => (item.name + " " + item.alias).toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <p>Find an organization using a familiar name, then confirm its full path. Fictional sample records.</p>
    <label className="quest-search-label">Find an organization<input type="search" placeholder="Try mech eng" value={query} onChange={event => {setQuery(event.target.value); setSelection(undefined);}} /></label>
    <div className="quest-directory-results">{matches.map(item => <button key={item.name} type="button" onClick={() => setSelection(item.path)}>{item.name}</button>)}</div>
    {!matches.length && <div role="status"><p>No matching organizations.</p><button type="button" onClick={() => setQuery("")}>Clear search</button></div>}
    {selection && <div className="quest-result" role="status"><strong>Organization path</strong><p>{selection}</p></div>}
    <p><Link href="/projects/university-logo-directory#directory-prototype">Open the full directory prototype</Link></p>
  </>;
}

function ProofRevision() {
  const [revision, setRevision] = useState(0);
  const [replaced, setReplaced] = useState(false);
  return <>
    <p>Simulate a proof revision to see how the customer upload carries forward. This is a sample workflow.</p>
    <div className="quest-result" aria-live="polite"><strong>Proof {revision + 1}</strong><p>Attached file · {replaced ? "replacement-artwork.png" : "customer-artwork.png"}</p><p>{revision === 0 ? "The initial upload is attached." : "The current artwork stays attached when the proof is regenerated."}</p></div>
    <div className="quest-demo-options">
      <button type="button" onClick={() => setRevision(value => value + 1)}>Regenerate proof</button>
      <button type="button" onClick={() => {setReplaced(true); setRevision(value => value + 1);}}>Replace sample artwork</button>
      <button type="button" onClick={() => {setRevision(0); setReplaced(false);}}>Reset workflow</button>
    </div>
    <p>Preserving the upload reduces the need to retrieve it manually during revisions.</p>
  </>;
}

export const questStations = [
  [{ label: "Utility reports", action: "Find a report", kind: "counter", title: "Regional Utility Report Search", route: "/projects/customer-portal-redesign", Demo: ReportSearch },
    { label: "RX Pads", action: "Configure RX Pads", kind: "pads", title: "RX Pad Ordering", route: "/projects/prescription-pad-ordering-portal", Demo: PadOrder },
    { label: "Logo directory", action: "Search the directory", kind: "directory", title: "University Logo Directory", route: "/projects/university-logo-directory", Demo: DirectorySearch }],
  [{ label: "Server rack", action: "Inspect traffic", kind: "rack", title: "Ordering Server Traffic", route: "/projects/customer-ordering-protection", Demo: TrafficMonitor },
    { label: "Automation desk", action: "Revise a proof", kind: "automation", title: "Operational Systems & Automation", route: "/projects/operational-systems-automation", Demo: ProofRevision }],
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
