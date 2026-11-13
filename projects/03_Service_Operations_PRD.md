# Service operations incident workflow prototype

## Product decision

Build a local prototype that helps a field technician submit a complete service incident and helps an operations coordinator request missing information, track the handoff, and close a record with an explanation. Demonstrate workflow and data-quality improvements through a small measured pilot.

Owner and primary builder: Nicolas Olmos. Status: implementation specification for an independent portfolio prototype. Version 1.0, November 12, 2026.

## Purpose and internship alignment

This project targets **Bloom Energy Service Operations Intern in San Jose**. The reviewed posting describes field-service process improvements, documentation, operations data, Salesforce/Quickbase applications, and an anticipated incident-management project. [Reviewed posting](https://www.linkedin.com/jobs/view/4490061884/)

Nicolas's retail operations and customer-facing experience support the process-improvement story. This prototype must add demonstrable workflow design, structured data, validation, and a proposed systems handoff. It must not imply experience implementing a real Salesforce or Quickbase integration unless that work is actually completed later.

The workflow is a fictional administrative exercise. It does not reproduce proprietary Bloom terminology or criteria, authorize equipment operation, or replace an operational safety approval.

## Users and outcomes

**Technician:** records a fictional incident on a small screen, understands what information is missing, saves work, and submits a complete record.

**Operations coordinator:** inspects the queue, identifies records needing information, assigns ownership, records the next action, and closes the administrative record with a reason.

**Reviewer:** follows a record's history and understands how the structured workflow compares with a simple free-text intake baseline.

Success means records are complete enough for handoff, state changes are consistent, exports reconcile, and any efficiency claim is supported by the actual pilot. It does not require an impressive AI feature.

## Design and implementation discretion

The implementing agent chooses the visual style, layout, framework, and local persistence technology using the previous chats. No theme, typography, color palette, or fixed screen composition is prescribed. The prototype must be usable with keyboard input and on a narrow viewport without horizontal scrolling for the primary intake flow.

Use synthetic sites, technicians, incidents, and parts. P0 must work locally without a Salesforce account, Quickbase account, paid platform, voice provider, or LLM API. Clearly indicate that any CRM field mapping is a proposed mock integration.

Simulated technician/coordinator roles are sufficient; real authentication, permissions, and production deployment are not part of P0. Do not claim role switching provides actual access control.

## User journey

1. A technician starts a new draft or reopens a saved draft.
2. The form guides them through required incident information and checks invalid values.
3. The technician submits; the coordinator sees the record in the queue.
4. The coordinator either requests specific missing information or marks the administrative handoff ready for review.
5. The technician amends the record if more information is requested and resubmits.
6. The coordinator closes the record with a disposition and explanation.
7. A reviewer inspects the event history and exports the structured record and queue metrics.

## Data contract

**Incident:** stable ID; site ID; technician ID; equipment reference; category; observed timestamp; concise description; parts-impact flag; conditional parts details; current status; assigned coordinator; and created/updated timestamps.

Use fictional reference lists for sites, technicians, and equipment. Validate that the equipment belongs to the selected site. No private customer or employee information is needed.

**Parts details:** when parts are needed, require a recognized part ID, requested integer quantity greater than zero, and a reason. This is an administrative request only; P0 does not reserve inventory or place an order.

**Review details:** information-request message when returning a record; next action and owner when preparing the handoff; closure disposition and note when closing.

**Event:** event ID, incident ID, timestamp with timezone, simulated actor, event type, previous and new status, and the relevant changed fields. Preserve event sequence. A local event history is not a tamper-proof compliance audit system.

## State model

- **Draft:** editable incomplete record; required-field checks do not prevent saving a draft.
- **Submitted:** a complete intake awaiting coordinator review.
- **Needs information:** coordinator requests a specific correction; technician may amend and resubmit.
- **Ready for review:** administrative handoff is complete with an owner and next action. This is not permission to operate equipment.
- **Closed:** administrative review concluded with a disposition and note.

Allowed P0 transitions: Draft to Submitted; Submitted to Needs information; Needs information to Submitted; Submitted to Ready for review; Ready for review to Needs information; Ready for review to Closed. Editing an allowed record produces an event even if status is unchanged. Closed records are read-only in P0; reopening is a P1 extension.

The coordinator must not close a Draft or Needs information record directly. A technician must not set Ready for review or Closed through the ordinary user workflow.

## P0 functional requirements

**OPS 01 Persistent drafts.** Create a draft, save it locally, refresh/reopen the prototype, and continue editing without losing entered fields. Clearly distinguish saved drafts from submitted records. Failed persistence must show an error rather than false success.

**OPS 02 Submission validation.** Require valid site, technician, site-compatible equipment, category, observed timestamp, and description on submission. Reject an observed time later than the current demonstration clock. Require conditional parts fields only when the parts-impact flag is true. Show the specific field to fix without clearing other entries.

**OPS 03 Stable submission.** Repeated clicks on submit must not create duplicate incidents or duplicate submission events. Preserve the incident ID and created timestamp during resubmission. Use a controllable demo clock or equivalent test mechanism for deterministic workflow tests.

**OPS 04 Coordinator queue.** Filter records by status, site, category, and owner. Show queue age with a documented definition. Opening a record exposes its details, relevant missing information, and event history. Metrics must reconcile to the same filtered record set.

**OPS 05 Review transitions.** Enforce the state model. Requesting information requires an explanatory message. Marking Ready for review requires an owner and next action. Closing requires a disposition and closure note, and sets a closure timestamp. Explain invalid transitions without changing the record.

**OPS 06 Event history.** Log record creation, substantive edits, submission/resubmission, information requests, handoff preparation, and closure. Preserve previous values needed to understand what changed. Do not expose ordinary user controls to edit or erase event history.

**OPS 07 Structured exports and mapping.** Export incidents and their events with consistent IDs, timestamp conventions, and CSV/JSON schema documentation. Supply a proposed mapping of fields to a generic service-appointment object and a generic incident record. Label this a design proposal; do not claim compatibility with actual Salesforce/Quickbase schemas without checking their real definitions in a later integration.

**OPS 08 Operational reporting.** Report record count by status, submitted records awaiting review, records needing information, and time from first submission to closure for closed records. Separate drafts and unresolved records from closed-case duration metrics. Display the relevant period, denominator, and units.

**OPS 09 Baseline comparison.** Include a simple free-text intake baseline and a structured intake route for a small comparison pilot. Both must ask for the same underlying incident information. The pilot measures real tasks rather than assuming fewer fields or clicks means less work.

## Metric definitions

- **First-submission completeness:** records whose first submitted version contains all scenario-required information divided by records first submitted in the pilot. Retain first-version values so this can be checked.
- **Administrative return rate:** records receiving at least one Needs information event divided by records first submitted in the selected cohort. Do not divide total return events by record count and call it a record rate.
- **Time to complete intake:** wall-clock duration from opening the task to successfully submitting it; saving a draft does not end the task. Record abandoned tasks separately.
- **Time to close:** closure timestamp minus first-submission timestamp for closed records. Show unresolved-case count alongside it so fast closed cases do not conceal backlog.
- **Submitted queue age:** current demo time minus latest submission/resubmission time for records currently Submitted. It is not the same as total case age.

Do not set a target such as a 30% efficiency improvement before measuring. A prototype with no timing improvement can still demonstrate useful completeness gains or expose a design problem worth explaining.

## Synthetic demonstration and pilot

Bundle at least twelve fictional incidents across four sites, multiple categories, and all relevant states. Include a missing equipment reference, parts needed without a quantity, a future observation time, and at least one repeated request for information. These are explicit validation/workflow fixtures, not real incidents.

For the pilot, complete at least five equivalent scenario tasks through each intake approach. Counterbalance or alternate the order to reduce practice effects, record participant count, and distinguish Nicolas's self-test from testing with other people. Capture completion time, completeness, corrections, and task outcome. Report median times and the actual sample sizes; a small pilot is not evidence of company-wide productivity gains.

## P1 and optional extensions

After P0, consider reopening closed records with a required reason; draft attachments using synthetic files; a more detailed parts-request handoff; or an actual platform sandbox integration if appropriate access is separately available.

Voice/transcript-assisted intake is optional. A pasted sample transcript can demonstrate extraction into a draft without any live voice service. Extracted fields must be reviewed and confirmed by a person before submission. It must not invent missing equipment, parts, or operating criteria. AI is not necessary to establish the P0 value.

## Non-goals

No real equipment control, emergency dispatch, safety certification, operating approval, production CRM integration, automated purchase order, employee performance scoring, or actual customer incident handling. Do not use proprietary company records or infer engineering acceptance criteria from the job description.

## Acceptance criteria

- **OPS A1:** Create an incomplete draft, reload, and recover the same incident ID and entered values. A draft may remain incomplete.
- **OPS A2:** Submitting without a required field shows a useful validation error and preserves the user's other fields. Required conditional parts fields behave correctly when the flag changes.
- **OPS A3:** An equipment/site mismatch, nonpositive parts quantity, or future observed timestamp is rejected. An optional unused field does not block submission.
- **OPS A4:** Rapidly activating Submit twice produces one incident and one submission event.
- **OPS A5:** Draft cannot transition directly to Closed. Needs information cannot transition directly to Ready for review. Each rejected action leaves state and history unchanged.
- **OPS A6:** Request information, amend, resubmit, prepare handoff, and close a record. The event history shows the correct sequence, actors, reasons, and timestamps; the closed record is read-only.
- **OPS A7:** At 10:00, first-submit record A. Request information at 10:10 and resubmit at 10:20. At 10:30, its Submitted queue age is 10 minutes. Close it at 11:00 after preparing the handoff: its time to close is 60 minutes, not 40.
- **OPS A8:** In a three-record submitted cohort with two closed records taking 30 and 90 minutes, report median closed-case duration of 60 minutes and one unresolved record. If one record is returned twice for information, the record-based return rate is 1/3, not 2/3.
- **OPS A9:** Filtered queue counts match exported records. Every event references a real incident. Dates have consistent timezone representation.
- **OPS A10:** Complete the primary intake using a keyboard and on a narrow viewport. Error messages and status meaning are understandable without relying on color alone.
- **OPS A11:** Deliver a pilot summary with actual observations, sample sizes, method, and limitations. Do not substitute generated timing values for measured results.
- **OPS A12:** The demo and exports clearly identify synthetic incidents, simulated roles, and mock CRM mapping. No output claims an actual production integration or operational approval.

P0 is complete when the workflow and data criteria pass, the pilot is recorded, and Nicolas can explain the process improvement and its limits.

## Delivery and demonstration

Deliver the local prototype, setup instructions, synthetic seed records, schema and event definitions, workflow validation checks, exports, proposed integration mapping, pilot report, and a short operations recommendation. Include a contribution note distinguishing implemented work from optional extensions.

Two-minute demonstration: start a draft; trigger and fix a field error; submit; request information as coordinator; correct and resubmit; show the event history; explain the measured pilot result and one limitation. The intended project is a credible operations case, not a claim to have rebuilt Bloom's internal system.

Allow approximately 6 to 10 focused hours for a narrow P0, with the pilot and evidence treated as part of completion. Reduce optional features before sacrificing validation or measured results.
