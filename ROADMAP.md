# Project roadmap

This page records planned work for Nicolas Olmos's independent portfolio. The existing [portfolio projects](README.md#projects) and their documentation describe what is currently implemented.

## Current focus

### Supplier and inventory decision lab

**Status:** specification and local Python/SQLite starter prepared; implementation has not yet been added to this repository.

**Business question:** which supplier meets a purchase need at a reasonable total cost, and under what conditions would that recommendation change?

The first release is scoped to:

- Supplier delivery, lead-time, quantity-fill, and committed-spend measures with explicit definitions.
- Line-level exceptions and reconciliation to source records.
- Quote comparisons that account for minimum order quantities, capacity, freight, and delivery deadlines.
- Scenarios that show how changes in price, quantity, or timing affect a recommendation.
- An inspectable dashboard and a short sourcing decision memo.

The case will use explicitly labeled synthetic operating data. It is designed to demonstrate sourcing and operations reasoning and does not imply access to an employer's internal information.

**Completion gate:** reproducible inputs, tested calculations, traceable recommendations, clear limitations, and a walkthrough explaining the tradeoff. A finished release should be linked here only after those elements exist in the repository.

Forecast backtesting and time-phased inventory planning are later extensions, separate from the first sourcing release.

## Other specified ideas

Two additional project specifications have been prepared outside this repository: a commercial strategy workbench and a service-incident workflow prototype. They are not implemented here. Development is currently focused on the supplier decision lab.

## Design direction for future work

Select project color palettes from [Coolors](https://coolors.co/?home). Choose the specific aesthetic to suit the workflow. The intended result is natural, readable, and purposeful, with clear hierarchy and plain language. Keep facts, assumptions, and simulated outcomes visibly distinguishable.
