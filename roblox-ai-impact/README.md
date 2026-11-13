# Roblox AI Impact Lab

An independent React/TypeScript research prototype by Nicolas Olmos exploring AI-assisted game creation, attention, creator monetization, and clear purchase design.

## Business question

Can easier game creation translate into a sustainable creator business, and which assumptions matter most between attracting visits and earning money?

This is a scenario model and research demonstration, not an earnings forecast or a Roblox-affiliated project.

## Implemented features

- An interactive earnings calculator connecting game releases, visits, estimated distinct players, purchases, creator Robux, and modeled cash value.
- Example presets showing different relationships between attention, conversion, and cost.
- Fictional clear-offer and pressure-tactic comparisons with explanatory commentary.
- An indexed processing-capacity scenario.
- Links to primary company/creator sources and academic research.
- Three calculation-test fixtures covering a documented earnings example, zero-visit revenue, and the capacity baseline.

## Run locally

From the repository root, with Node.js and npm installed:

```sh
cd roblox-ai-impact
npm install
npm run dev
```

Use the local address printed by Vite. Run the existing checks and build with:

```sh
npm test
npm run build
```

`npm test` runs Vitest. `npm run build` checks TypeScript and creates the production build.

## Model and test example

Visits = games × visits per game; estimated distinct players = floor(visits × distinct-player share); buyers = floor(players × buyer rate); Robux spent = buyers × purchases per buyer × Robux price; modeled creator Robux = floor(Robux spent × creator share); modeled cash value = creator Robux × assumed exchange rate; balance = cash value − entered costs.

One unit-test fixture uses 100,000 visits, a 50% distinct-player share, a 2% buyer rate, one 100-Robux purchase per buyer, a 70% creator share, an illustrative exchange rate of $0.0038, and $300 of costs. Its expected values are 1,000 buyers, 70,000 creator Robux, $266 of modeled cash value, and a −$34 balance. These are arithmetic fixtures, not observed creator results.

The capacity function calculates workload × effort per upload ÷ utilization and compares it with a baseline of 125 index units. These are index units, not dollars or actual Roblox infrastructure measurements.

## Research boundaries

- Keep company-reported figures, research findings, and scenario assumptions distinguishable.
- Visits, distinct players, buyers, and payments are different quantities.
- Creator-share and exchange-rate values are assumptions in the code. Check current official program terms before reusing them as factual guidance; qualification rules, taxes, fees, and other reward programs are not fully modeled.
- Do not infer that AI caused Roblox's financial growth from adoption or engagement figures alone.
- Fictional shop examples illustrate design questions. They do not establish that a named game uses manipulative practices.
- Do not fabricate conversion rates, observed earnings, or development-time savings.

## Repository structure

- `src/App.tsx`: interactive controls, scenarios, research sections, and source links.
- `src/calculations.ts`: pure earnings and capacity calculations.
- `src/calculations.test.ts`: unit-test fixtures for those calculations.
- `src/style.css`: prototype styling.
- `vite.config.ts`: build configuration, currently using `/roblox-ai-impact/` as its base path.

## Static demonstration and deployment

The portfolio homepage links to the separate [standalone HTML demonstration](../roblox-lab/README.md). The React source is a distinct implementation and is not automatically compiled into that page.

Before deploying a React build, match Vite's base path to the actual hosting path and verify navigation back to the portfolio. The presence of source code in this directory does not establish that its compiled output is deployed. Compatibility entry points and the archived earlier page are retained elsewhere in the repository.
