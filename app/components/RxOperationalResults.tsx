const monthlyOrders = [
  { month: "March", orders: 20 },
  { month: "April", orders: 17 },
  { month: "May", orders: 20 },
  { month: "June", orders: 20 },
  { month: "July", orders: 30 },
];

const recurringQuestions = [
  { question: "Can I order for multiple prescribers?", before: "5.6", after: "0", change: "−100%" },
  { question: "What’s the turnaround time?", before: "10", after: "0", change: "−100%" },
  { question: "Do you have barcodes on your prescription pads?", before: "12.2", after: "0", change: "−100%" },
  { question: "How many prescriptions are included per pad?", before: "7", after: "0", change: "−100%" },
];

export default function RxOperationalResults() {
  return (
    <section className="rx-operational-results shell" id="operational-evidence" aria-labelledby="rx-operational-title">
      <div className="rx-operational-heading">
        <div>
          <p className="kicker">Operational follow-up</p>
          <h2 id="rx-operational-title">July orders rose 50% while tracked repeat questions fell 100%.</h2>
        </div>
        <p>
          Percentages make the direction easier to scan, while the underlying counts remain visible. Orders are a
          reported monthly trend; question frequency compares the earlier monthly baseline with a two-month
          post-change follow-up.
        </p>
      </div>

      <div className="rx-results-grid">
        <article className="rx-order-trend" aria-labelledby="rx-order-title">
          <div className="rx-result-card-heading">
            <div>
              <span>Observed business trend</span>
              <h3 id="rx-order-title">Orders from the prescription page</h3>
            </div>
            <strong><b>+50%</b> June to July</strong>
          </div>
          <div className="rx-order-chart" role="img" aria-label="Monthly prescription page orders: March 20, April 17, May 20, June 20, and July 30">
            {monthlyOrders.map(({ month, orders }) => (
              <div className={month === "July" ? "is-high" : ""} key={month}>
                <span>{orders}</span>
                <i style={{ height: `${(orders / 30) * 100}%` }} aria-hidden="true" />
                <small>{month.slice(0, 3)}</small>
              </div>
            ))}
          </div>
          <div className="rx-percentage-summary" aria-label="July order percentage comparisons">
            <div><strong>+50%</strong><span>vs. March, May, and June</span></div>
            <div><strong>+76%</strong><span>vs. April, the five-month low</span></div>
          </div>
          <p className="rx-result-note">
            July reached 30 orders, compared with 20 in June and 17 in April. These percentages describe the reported
            trend; they do not prove that the redesign or content work alone caused the increase.
          </p>
        </article>

        <article className="rx-question-results" aria-labelledby="rx-question-title">
          <div className="rx-result-card-heading">
            <div>
              <span>Measured self-service follow-up</span>
              <h3 id="rx-question-title">Recurring questions per month</h3>
            </div>
            <strong><b>−100%</b> all 4 types</strong>
          </div>
          <div className="rx-question-table" role="table" aria-label="Recurring customer questions before and after the content changes">
            <div className="rx-question-row rx-question-header" role="row">
              <span role="columnheader">Question type</span>
              <span role="columnheader">Before / month</span>
              <span role="columnheader">After / month</span>
              <span role="columnheader">Change</span>
            </div>
            {recurringQuestions.map(({ question, before, after, change }) => (
              <div className="rx-question-row" role="row" key={question}>
                <strong role="rowheader">{question}</strong>
                <span role="cell">{before}</span>
                <span className="after" role="cell">{after}</span>
                <span className="change" role="cell">{change}</span>
              </div>
            ))}
          </div>
          <p className="rx-result-note">
            The combined tracked baseline was 34.8 questions per month. During the two-month follow-up, none of these
            four question types were recorded, a 100% reduction within the tracked categories. This does not establish
            a reduction across all support contacts.
          </p>
        </article>
      </div>

      <aside className="rx-evidence-boundary">
        <b>Evidence boundary</b>
        <p>
          The order series is an observed post-launch signal. The question comparison is a measured operational
          follow-up for the four listed categories. Neither dataset is used to claim revenue attribution, total
          support-volume reduction, or sole causation.
        </p>
      </aside>
    </section>
  );
}
