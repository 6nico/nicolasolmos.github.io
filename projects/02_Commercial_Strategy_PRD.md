# AI infrastructure commercial strategy workbench

## Product decision

Build a local research and scenario-modeling workspace that turns source-backed evidence into a commercial recommendation. It must support two distinct case types: customer-segment prioritization and international market entry. Complete one case first; reuse the workspace for the second only after gathering the evidence it requires.

Owner and primary builder: Nicolas Olmos. Status: implementation specification, not completed research. Version 1.0, November 12, 2026.

## Purpose and internship alignment

This project should demonstrate Nicolas's ability to structure an ambiguous business problem, evaluate evidence, build a transparent model, and communicate a decision. His Business Economics studies, company analysis, retail customer experience, and Omny Pro outreach provide the background; the deliverable must show his own new reasoning.

**Customer-segment case:** prioritize customer opportunities, analyze commercial alternatives, and prepare a sales-planning recommendation.

**Market-entry case:** compare potential international markets and produce an expansion playbook addressing opportunity, ecosystem, constraints, options, and open questions.

The underlying research workspace may be shared. The two cases must have separate questions, models, evidence coverage, recommendations, and executive narratives. Do not relabel one analysis with a different company name.

## Users and desired outcome

An analyst needs to store evidence, separate facts from assumptions, compare options, and reproduce calculations. A business leader needs to see the recommendation, alternatives, uncertainty, and next diligence steps. A recruiter needs a concise explanation and the ability to inspect the sources behind the conclusion.

A successful case makes a recommendation that remains traceable to evidence and assumptions. It also identifies when the evidence is too weak to choose. The tool must never create an appearance of certainty merely by assigning numeric scores.

## Design and technology discretion

The implementing agent selects visual style, information layout, and interface framework using the previous chats. No palette, typography, page composition, or design system is prescribed. A local interactive workspace with spreadsheet-compatible exports is sufficient; it does not require a production SaaS architecture.

AI infrastructure is the subject matter, not a requirement to build an LLM product. P0 can use manually verified public sources and deterministic calculations. AI-assisted research or drafting is optional and must record human verification. No API key, autonomous web agent, scraped private database, or paid research subscription is required.

## P0 scope

Deliver one complete case with a working evidence register, option comparison, deterministic scenario model, sensitivity analysis, and executive output. Prefer three customer segments for the customer-segment case or two international markets with multiple entry options for the market-entry case. Choose a narrower question if there is insufficient credible evidence.

Do not claim to have found the employer's actual confidential sales strategy. Use a clearly identified independent business case. Public facts must be real and dated; scenario operating assumptions may be hypothetical and labeled.

## User journey

1. Define a business question, decision horizon, relevant product category, and options.
2. Add sources and the specific claims they support.
3. Classify each important statement as a verified fact, assumption, inference, or unresolved question.
4. Compare evidence across options and identify missing decision-critical information.
5. Enter model assumptions, inspect the formulas, and compare base/upside/downside scenarios.
6. Change a key assumption or constraint and inspect the effect on the recommendation.
7. Export a source register, model, five-slide narrative, and one-page recommendation.

## Data model

**Case:** ID, target role, research question, product/category scope, analysis date, horizon, currency, options, and completion status. Do not mix different years or currencies without a recorded conversion basis.

**Source:** ID, publisher, title, direct URL, publication date if known, retrieval date, source type, and relevance note. Unknown publication dates remain unknown. Prefer company filings, company technical/investor materials, official statistics, and other primary sources for technical or regulatory assertions.

**Claim:** ID, concise statement, classification, relevant option, supporting source IDs and location, verification status, verifier note, date checked, and any contradiction. A source about general market growth does not automatically support a specific company's obtainable sales.

**Assumption:** name, meaning, value/range, units, period, rationale, scenario, and any evidence link. Store uncertain values as ranges where appropriate. An analyst choice is not promoted to a fact because AI repeated it.

**Option:** segment or market, qualitative opportunity, operational constraints, evidence gaps, and hard decision gates. An option may remain unranked when critical evidence is missing.

**Recommendation:** proposed action, alternatives, supporting claims, model result, conditions that change the action, unresolved questions, and next diligence step. Preserve the inputs used for an exported recommendation.

## P0 functional requirements

**STR 01 Case framing.** Capture a measurable decision rather than a broad company overview. Examples: which of three customer segments deserves a limited commercial effort budget, or which of two markets deserves deeper expansion diligence. Record what would count as evidence against the preferred option.

**STR 02 Evidence register.** Add, edit, filter, and export sources and claims. Every decision-driving factual assertion must link to a verified source that actually supports it. A draft or unverified claim must remain visibly distinguishable and cannot be silently included as verified evidence in the final export.

**STR 03 Evidence quality and contradictions.** Record date, scope, directness, and limitations for evidence. Show conflicting claims with their sources. Do not collapse a disagreement into an unsupported average or a single unexplained confidence percentage. A low source count is not itself proof of a weak claim; source relevance matters.

**STR 04 Comparison.** Support option-specific opportunity drivers, customer/partner ecosystem, commercial obstacles, resource needs, and unknowns. For market entry, include manufacturing/partner constraints and a regulatory-diligence section where relevant. Record questions requiring expert review without inventing legal conclusions.

**STR 05 Transparent scenario model.** Compute base/upside/downside outcomes from explicit inputs. Display units, period, formula, and assumptions. Missing critical values block a financial recommendation rather than being defaulted to zero. Positive and negative outcomes must both be retained.

**STR 06 Sensitivity and constraints.** Change at least two decision-driving assumptions and show the consequences. Separate hard gates, such as unavailable partner capacity or unresolved eligibility to enter a market, from preferences. A favorable weighted score cannot clear an unresolved hard gate. Weighted qualitative ratings are optional and must disclose weights and sensitivity.

**STR 07 Human review of AI assistance.** If an AI tool helps summarize, suggest claims, or draft an executive narrative, preserve an assistance note and mark the resulting claims unverified until checked. Calculations remain deterministic. No generated citation may be treated as evidence until the linked source has been read and confirmed.

**STR 08 Executive output.** Produce a one-page recommendation and a five-slide content package with sources near the claims they support. Use the slide sequence: decision and recommendation; evidence and opportunity; options and model; sensitivity and risks; next steps and open questions. The implementing agent chooses the visual presentation. An actual slide file is optional for P0; a complete exportable slide manuscript satisfies the content requirement.

**STR 09 Persistence and export.** Save a case locally and reopen it without losing sources, assumptions, or scenarios. Export machine-readable inputs and a spreadsheet-compatible model. Include a reproducibility note so a reader can recompute every numerical conclusion without access to an AI conversation.

## Commercial scenario definitions

For a customer-segment case, an acceptable bottom-up model is:

`modeled revenue opportunity = addressable accounts × annual units per account × assumed attainable unit share × unit price`

The assumptions must refer to one consistent product and annual period. The share applies to addressable units, not automatically to account count or total industry revenue. Label the result a scenario opportunity, not contracted revenue, an employer forecast, or a verified market size.

An optional contribution calculation is:

`modeled contribution = modeled revenue × (1 − variable cost rate) − commercial effort cost − entry cost`

Define which costs are included and ensure all costs refer to the same horizon. Do not call this accounting profit or cash flow without the corresponding model. Costs may be omitted if unsupported; the tool must then avoid a profit-based recommendation.

For a market-entry case, compare a small set of explicit structural options, such as partner-led entry, direct commercial presence, or deferring entry. These are hypothetical business alternatives, not recommendations about what the named employer legally can or should do. If market evidence does not justify a quantitative revenue model, provide a transparent qualitative diligence recommendation rather than fabricating numbers.

## Case-specific outputs

### Customer-segment case

- Define one product/category context and three clearly distinct customer archetypes.
- Identify customer needs and relevant competitive alternatives with dated sources.
- Compare opportunity ranges and the assumed commercial effort required.
- Recommend a priority and explain a condition that changes it.
- Finish with an example account-planning brief and three validation questions. Do not invent actual customer buying intentions.

### Market-entry case

- Compare two markets using demand drivers, ecosystem, manufacturing/partner capacity, and commercial constraints.
- Evaluate at least two viable paths per market, including deferral if appropriate.
- Cite official sources for technical or regulatory claims and identify unsettled questions.
- Recommend which market merits the next diligence effort, not an unsupported irrevocable launch decision.
- Deliver a concise playbook with options, risks/rewards, open questions, and the next research action.

## P1 extensions

Add the second case, automated spreadsheet generation, evidence-change history, or a richer sensitivity model after one case is complete. A source-ingestion assistant is optional. It must preserve original URLs, human review, and known coverage limitations. Live market feeds and autonomous fact generation are not P0 requirements.

## Non-goals

The first release is not a generic AI chat interface, an automated investment advisor, a predictive revenue engine trained on private sales data, a legal opinion, or a claim of employer consulting work. Do not implement contact scraping, outreach, CRM access, account creation, or external publishing as part of this PRD.

## Acceptance criteria

- **STR A1:** A user can create one case, enter sources/claims/assumptions, save it, and reopen it with the same values and calculations.
- **STR A2:** Every decision-driving fact in the final memo and slide content has a verified supporting source. Assumptions and inferences are labeled; unverified facts are excluded or explicitly retained as unresolved.
- **STR A3:** A fixture with 10 accounts, 100 annual units per account, 20% attainable unit share, and a $50 unit price produces a $10,000 annual modeled opportunity. Increasing unit share to 30% produces $15,000. The output retains the assumed nature of the share.
- **STR A4:** For $10,000 modeled revenue, a 40% variable-cost rate, $1,000 effort cost, and $500 entry cost, modeled contribution is $4,500. A missing variable-cost rate prevents a contribution comparison; it is not treated as zero cost.
- **STR A5:** Shares outside 0 to 1, incompatible units, or mismatched horizons produce useful validation errors. Display rounding does not alter the stored calculation.
- **STR A6:** An option with an unresolved hard entry gate is shown as requiring diligence even if its financial scenario ranks highest.
- **STR A7:** Changing a key assumption can change the recommendation or demonstrates why it remains robust. The result includes the exact inputs used.
- **STR A8:** The five-slide content package and one-page memo contain a recommendation, alternative, sensitivity, source trail, limitation, and next action. No fabricated customer commitments or company results appear.
- **STR A9:** A reader can reproduce a numerical result from the export without an AI model. Nicolas can explain why a source supports a claim and why the recommendation follows.

Do not set an arbitrary minimum market-growth rate, revenue opportunity, or recommendation confidence to make the project look successful. The acceptance standard is evidence quality and decision clarity.

## Build sequence and delivery

**First milestone:** choose the case and a narrow decision question; assemble the source register and enough evidence to establish the comparison dimensions. If evidence is insufficient, narrow the question before coding more tooling.

**Second milestone:** implement persistence, evidence review, deterministic scenario calculations, and two sensitivity changes. Validate the acceptance fixtures.

**Third milestone:** write the recommendation and five-slide narrative, audit the source trail, and record a two-minute walkthrough. A first complete case is expected to take roughly 6 to 10 focused hours; actual research availability determines scope.

Deliver source files if a tool is built, setup instructions, the evidence register, model inputs and formulas, completed case exports, executive outputs, limitations, and an AI-assistance/contribution note. State which case is complete. Do not describe the work as completed for both cases when only one has evidence.
