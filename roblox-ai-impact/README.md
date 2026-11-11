# Roblox AI Impact Lab (React prototype)

An independent student research project asking how AI-assisted Roblox creation affects new developers, attention, creator earnings, and game monetization. This is an interactive **scenario model**, not a creator earnings prediction or a Roblox-affiliated project.

## Start locally

```bash
npm install
npm run dev
npm test
npm run build
```

The Vite build uses `base: '/roblox-ai-impact/'` for deployment at that path on the existing GitHub Pages site. The legacy live `../roblox-ai-impact.html` page is preserved until the compiled React site is deployed.

## Money math

Visits = games × visits per game; distinct players = floor(visits × estimated distinct-player share); buyers = floor(distinct players × hypothetical buyer rate); gross Robux = buyers × purchases per buyer × Robux price; eligible creator Robux = floor(gross Robux × assumed creator share); possible cash value = Earned Robux × assumed DevEx rate; model balance = possible cash value − estimated costs. A visit is not necessarily a unique player or a payment. Roblox's actual rules, eligible sales types, requirements, exchange rates and payment terms must be checked against current official guidance. The model intentionally excludes engagement-based rewards and other monetization programs.

## Research standards

- Do not fabricate conversion rates, a creator's earnings, or game development time.
- Roblox financial numbers should be sourced directly from shareholder reports, with quarter and units verified; the unverified quarterly JSON in the draft supplied by another agent is **not used**.
- Spending psychology examples are fictional and intended to identify possible pressure tactics, not provide a strategy for exploiting players.
- A 2025 SOUPS study sampled a limited number of Roblox developers and games. It does not show that every Roblox game contains manipulative designs.

## Status

Complete source prototype with working simulator, psychological-design comparison, capacity scenario, and calculation tests. The separate static portfolio HTML remains the published page until deployment of this Vite build.
