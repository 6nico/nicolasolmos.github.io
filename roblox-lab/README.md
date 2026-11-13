# Roblox AI Impact Lab

A standalone browser research prototype by Nicolas Olmos examining how creation tools, attention, monetization, and purchase design relate to a creator's business outcomes.

## Research question

If creating a game becomes easier, what still has to happen for attention to turn into sustainable creator earnings?

The project separates company-reported context, hypothetical earnings assumptions, and fictional interface examples. It is independent and not affiliated with Roblox Corporation.

## Explore the demonstration

The [standalone page](index.html) contains:

- An earnings scenario calculator with adjustable game count, visits, distinct-player share, buyer rate, repeat purchases, purchase price, and costs.
- Presets illustrating how attention and purchases can lead to different outcomes.
- A comparison of clear and pressure-based fictional purchase offers.
- A simplified processing-capacity scenario expressed in index units.
- Research links and notes on interpretation.

From the repository root:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/roblox-lab/`. No build step is required. Fonts load from Google Fonts; calculations run in browser JavaScript.

## Model logic

The earnings scenario follows this sequence:

1. Visits = games released × visits per game.
2. Estimated distinct players = floor(visits × assumed distinct-player share).
3. Buyers = floor(estimated distinct players × assumed buyer rate).
4. Robux spent = buyers × purchases per buyer × Robux per purchase.
5. Modeled creator Robux = floor(Robux spent × assumed creator share).
6. Modeled cash value = modeled creator Robux × assumed exchange rate.
7. Balance after costs = modeled cash value − entered costs.

A visit is not automatically a distinct player or a purchase. The creator-share and exchange-rate constants are illustrative assumptions in the current code; they are not independently verified eligibility or payout promises. The model does not fully account for taxes, fees, qualification rules, all reward programs, or actual business costs.

The capacity model divides a workload index adjusted for effort per upload by a utilization assumption. Its reference baseline is 125 index units. It does not estimate Roblox's actual infrastructure spending.

## Evidence and interpretation

The page links to Roblox investor information, Creator Hub guidance, developer exchange documentation, and academic proceedings. Any company figures on the page need to be checked against the relevant dated primary source before being reused in a new report. More use of creation tools does not establish that AI caused revenue or profit growth.

Purchase examples are fictional demonstrations, with no real transactions. They are not evidence about a particular named game's behavior.

## Source versions

This folder contains the standalone HTML/CSS/JavaScript demonstration. The separate [React/TypeScript prototype](../roblox-ai-impact/README.md) includes pure calculation functions and unit-test fixtures. Those tests cover that implementation; they do not automatically test the inline JavaScript in this page. Keep model assumptions synchronized if developing both versions.
