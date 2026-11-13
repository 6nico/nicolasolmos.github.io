# Semiconductor supplier and inventory decision lab

## Product decision

Build a local decision-support tool that helps a sourcing analyst choose among supplier quotes and helps a planner understand delivery and inventory risk. The first release must answer a concrete sourcing question with auditable calculations. Forecasting and time-phased inventory planning are a separate second release.

Owner and primary builder: Nicolas Olmos. Status: implementation specification, not a completed project. Version 1.0, November 12, 2026.

## Purpose and internship alignment

The portfolio should demonstrate how Nicolas turns inventory experience and SQL analysis into a practical business recommendation.

- **Micron Semiconductor Global Category Supplier Management:** supplier performance, spend, cost comparison, category decisions, and risk. This is the P0 application target. [Reviewed posting](https://www.linkedin.com/jobs/view/4481110656/)
- **Marvell Supply Chain Intern:** demand/supply/backlog, forecasting, and planning. Complete P1 before claiming this coverage. [Reviewed posting](https://www.linkedin.com/jobs/view/4469732167/)
- **Analog Devices Supply Chain Analyst:** inventory/customer-delivery exceptions, root causes, dashboards, and recommendations. [Reviewed posting](https://www.linkedin.com/jobs/view/4457279447/)
- **Stryker Supply Chain:** purchasing/planning handoff and inventory targets. [Reviewed posting](https://www.linkedin.com/jobs/view/4480202143/)
- **Zipline Global Supply Management:** purchase-order execution and supplier reporting. [Reviewed posting](https://www.linkedin.com/jobs/view/4455774428/)
- **T-Mobile Supply Chain Planning:** device availability and inventory allocation; requires its own distribution example beyond P0. [Reviewed posting](https://www.linkedin.com/jobs/view/4489624163/)

These mappings are applications of the project, not claims of employer sponsorship or use of internal data.

## Users and decisions

The sourcing analyst needs to identify unreliable suppliers, inspect the underlying orders, compare eligible quotes, and recommend a purchase. The planner needs to distinguish inventory on order from inventory available before a specific need date. A recruiter needs to understand the problem and Nicolas's contribution in two minutes, then inspect the method in more detail.

Success means a user can name a recommended supplier, explain the cost/service tradeoff, and identify an assumption that would change the recommendation. More charts alone are not success.

## Starting point and design discretion

The existing `../supplier-decision-lab/` folder contains `run.py`, `analysis.sql`, `test_metrics.py`, and a README. It generates three suppliers, four SKUs, 180 PO lines, and 120 June daily-demand observations, with a June 30, 2026 snapshot. It exports supplier, overdue-order, and static inventory reports. Four targeted tests passed when the starter was delivered.

It does **not** contain a dashboard, alternate quote evaluation, a forecast backtest, time-phased inventory simulation, or a finished sourcing memo. Its SQL hard-codes the snapshot date. Its partially filled received lines are final closed lines, not outstanding partial shipments. Inspect and preserve these meanings or explicitly migrate them.

Reuse the Python/SQLite logic where appropriate. The implementing agent chooses the interface technology and visual style using the prior chats. A simple local interface and spreadsheet export are sufficient. No paid data, live ERP connection, cloud account, or LLM API is needed for P0.

## User journey

1. Open the local demonstration and choose the named synthetic dataset and snapshot date.
2. Inspect a data-quality summary before accepting the analysis.
3. Compare suppliers, with metric definitions and sample sizes available.
4. Select a supplier or SKU and inspect the contributing order lines and overdue orders.
5. Enter a purchase need, compare quotes under explicit constraints, and inspect disqualified alternatives.
6. Change one assumption and see whether the recommendation changes.
7. Export the analysis and a short decision memo that retains the assumptions and data label.

## Data contract

All P0 monetary values use USD; quantities use integer units; dates are ISO calendar dates. Operating data must be visibly labeled synthetic. Public industry context is stored separately with source URLs and retrieval dates. Missing dates, missing costs, and zero demand cannot be silently converted into good performance.

**Existing entities:** suppliers, SKU inventory snapshots, daily requested demand, and PO lines. Each record needs a stable identifier. Retain raw inputs separately from derived values. The snapshot is an input, never the computer's implicit current date.

**PO line fields:** line ID, supplier ID, SKU, order date, promised date, final received date if any, ordered quantity, final received quantity, unit cost, and explicit open/closed status. A received partial line is closed with a shortfall in P0; this must be documented. P1 may introduce a separate receipts table, but must not double-count final receipts during migration.

**Quotes:** quote ID, supplier ID, SKU, quoted unit cost, fixed freight per purchase, MOQ, order increment, maximum available quantity, lead days, valid-through date, and source/assumption label. Compare quotes only for the same SKU, currency, and unit basis. A new supplier can have unknown historical performance without being assigned an invented reliability score.

**Purchase need:** SKU, required units, order date, latest acceptable receipt date, and any user-imposed supplier constraints. Save the complete scenario with its results so it can be reproduced.

## P0 functional requirements

**SUP 01 Data loading and quality checks.** Load the bundled case without manual account setup. Validate IDs, references, positive ordered quantities, nonnegative receipts, receipts not exceeding ordered units, dates in valid order, and no future receipts counted before the snapshot. Surface rejected rows and reasons. Preserve previously valid data if a new import fails.

**SUP 02 Auditable supplier reporting.** Report committed PO spend, received-line count, completed-line on-time percentage, quantity-weighted received-line fill percentage, overdue open lines, and mean received lead time. Show the denominator and the applicable period. A supplier with no received lines has an unavailable rate, not 0% or 100%.

**SUP 03 Drill-down and reconciliation.** Every supplier measure must reconcile to filtered line-level records. State whether filtering is by order date, receipt date, or snapshot; do not mix these silently. Exports must use the same filters and unrounded underlying values as the displayed calculation. Round only for presentation.

**SUP 04 Inventory exceptions.** Show on-hand, backorders, open units, inventory position, days of coverage, and overdue inbound orders. Clearly distinguish on-hand coverage from a static inventory-position threshold. Late open orders must never be treated as stock available today. The current reorder proxy must be labeled an assumption-based heuristic, not an optimized service-level policy.

**SUP 05 Quote comparison.** For required units R, purchase Q = ceiling(max(R, MOQ) / order increment) times order increment. The increment must be positive; quantities, prices, and freight must be valid nonnegative values, with required units greater than zero. A quote is feasible only if Q is within available capacity, the quote is unexpired on the order date, and its expected arrival meets the requested deadline. Compare total purchase cash = Q times unit price plus fixed freight. Report excess units Q minus R. Do not confuse cash outlay with cost of units consumed, or add incomparable SKU prices into a supplier ranking.

**SUP 06 Recommendation and sensitivity.** Choose the lowest total-purchase-cash feasible quote, with ties displayed explicitly. Show delivery performance as supporting context. Optional weighted scores must be inspectable, user-adjustable, and labeled subjective; they cannot override a hard feasibility constraint without an explicit scenario change. If none are feasible, say so and show the binding constraints rather than fabricating a winner.

**SUP 07 Scenario comparison.** Compare baseline with a price, required quantity, or delivery-deadline change. For inventory proxies, reproduce the starter's 20% demand and 30% lead-time stress as a named scenario. Show input assumptions alongside outcome changes. Do not label simulated deltas actual savings.

**SUP 08 Decision export.** Export the supplier scorecard, underlying exceptions, quote comparison, assumptions, and data dictionary. Provide a one-page memo containing the decision, evidence, alternative considered, sensitivity result, and limitation. A readable Markdown memo plus CSV/spreadsheet exports satisfies P0; slide or PDF generation is optional.

## Metric definitions

- **Committed spend:** sum of ordered units times PO unit cost, including open lines. This is not invoiced expense or cash paid.
- **Completed-line on-time percentage:** received closed lines delivered on/before the promise divided by all received closed lines in scope. Open lines are excluded, so overdue open lines must appear beside it.
- **Received-line fill percentage:** total received quantity divided by total ordered quantity on received closed lines. This is quantity-weighted, not an average of percentages.
- **Overdue open line:** unreceived open line with promised date strictly before the snapshot. A line due today is not overdue until the date passes under this convention.
- **Received lead time:** calendar days from order to final receipt among received lines; disclose the exclusion of still-open orders.
- **Inventory position:** on-hand plus outstanding open units minus backorders. It is not a receipt-timing forecast.
- **Static reorder proxy:** daily requested demand times planned lead days plus assumed buffer days. It has no guaranteed service level.

## P1 planning extension

**PLAN 01 Forecast validation.** Supply at least 52 weekly requested-demand observations per SKU. Use the first 44 weeks for initial history and the last eight as a held-out evaluation period. Compare last-week naive and four-week moving-average forecasts with a rolling one-step-ahead evaluation. For each test week, use only observations already available before that week. Save actuals and predictions by week. A more complicated model is optional and must earn its inclusion.

Report MAE = mean absolute forecast error and WAPE = sum absolute errors divided by sum actual requested demand. When the denominator is zero, WAPE is unavailable. Do not silently drop zero-demand weeks. Show per-SKU results and aggregate WAPE computed from aggregate sums, not averaged percentages. Never require the moving average to outperform the baseline just to make a good story.

**PLAN 02 Forward inventory simulation.** Run an eight-week planning horizon separately from the historical backtest. Start with a documented inventory/backlog snapshot, then receive scheduled inbound units at the start of each week before serving demand. Available = beginning on-hand + due receipts; required = new demand + beginning backlog; shipped = min(available, required); ending on-hand = available - shipped; ending backlog = required - shipped. This MVP assumes unfilled demand is backordered, not lost. State this assumption in the output.

**PLAN 03 Policy comparison.** Compare a fixed baseline replenishment rule with one proposed rule under identical demand and lead-time scenarios. Use deterministic inputs or the same random seed. Report ending backlog, peak backlog, mean ending inventory, and cost only where a cost model is explicitly defined. Describe a stockout week precisely; do not call unfilled unit share a calibrated probability.

**PLAN 04 Employer-specific recommendation.** Complete a Marvell demand/supply/ramp planning memo or an Analog Devices delivery-exception memo using the new outputs. Extend to multi-location device allocation for T-Mobile only as an additional clearly scoped module.

## Non-goals

P0 does not implement an ERP, real procurement execution, multi-user permissions, full MRP, statistical safety-stock guarantees, autonomous ordering, or supplier outreach. P1 does not require machine learning. Do not claim to model a real semiconductor fabrication process or infer unit demand from company revenue without appropriate data.

## Acceptance criteria and fixtures

- **SUP A1:** A clean checkout runs the seeded case using documented commands. Two runs with the same inputs produce identical analytical results.
- **SUP A2:** A fixture with 10/10 units on time, 20/30 units late, and an open overdue order for 20 units, all at $2/unit, yields $120 committed spend, 50% completed-line on-time delivery, 75% received-line fill, and one overdue open line.
- **SUP A3:** A supplier with no receipts shows an unavailable on-time rate. An open line due on the snapshot is not counted overdue.
- **SUP A4:** Supplier totals reconcile to raw lines within one cent for money and exactly for quantities. Filters preserve those reconciliations.
- **SUP A5:** For a 100-unit need: Alpha quotes $10/unit, $50 freight, seven-day delivery; Beta quotes $9/unit, $100 freight, twelve-day delivery. Both have MOQ 1, increment 1, capacity 100+, and valid quotes. A ten-day deadline selects Alpha at $1,050 and excludes Beta. A fourteen-day deadline selects Beta at $1,000. The output explains the change.
- **SUP A6:** An expired quote, impossible capacity, or no feasible deadline produces an explicit exception. Invalid imports expose the row and reason and do not replace the last valid case.
- **SUP A6b:** A 20-unit need with MOQ 25 and order increment 10 yields a 30-unit purchase and 10 excess units. A zero order increment is rejected.
- **SUP A7:** A reader can follow a reported recommendation to its quote inputs and calculation, export the same filtered result, and identify which data is synthetic.
- **PLAN A1:** For actuals [10, 20] and forecasts [8, 25], MAE is 3.5 and WAPE is 7/30. An all-zero actual series returns unavailable WAPE.
- **PLAN A2:** Changing a future week's demand cannot change a forecast made before that week. Inspect the prediction ledger to prove the cutoff.
- **PLAN A3:** Start with 10 on hand and zero backlog. Week 1 has 5 receipts and demand 20: ship 15, end on-hand 0, backlog 5. Week 2 has 12 receipts and demand 4: ship 9, end on-hand 3, backlog 0. Quantities reconcile in every week.
- **PLAN A4:** Both policies use identical scenario inputs, and a losing proposed policy is reported honestly rather than hidden.

P0 is application-ready only after SUP A1 through A7 pass, the sourcing memo is complete, and Nicolas can explain a join, metric denominator, and decision tradeoff without assistance. P1 is complete only after the PLAN criteria pass and its memo is finished.

## Delivery package and interview demonstration

Deliver source code, SQL, fixtures, setup instructions, data dictionary, exports, dashboard screenshots, the decision memo, and a brief change log identifying Nicolas's contributions and AI assistance. Report which release is complete. Retain the starter's limitations unless explicitly addressed.

Two-minute demo: state the purchase decision; inspect one supplier exception; compare eligible quotes; change a deadline; explain why the recommendation changes; finish with one limitation. The planning demo adds held-out forecast error and a weekly stock/backlog reconciliation.

Only after completion, derive resume bullets from the actual dataset size and validated results. State when data is synthetic; do not claim that a fictional business saved money in production.
