# Nicolas Olmos

I'm a Business Economics student at the University of California, San Diego, with an expected graduation date of June 2028. My interests are supply chain analytics, business operations, and commercial strategy.

My experience in technology retail and inventory operations shapes the questions I work on: how to keep products available, evaluate tradeoffs, and turn analysis into a practical decision. This repository brings together independent case studies and interactive prototypes.

[About me](about.html) · [LinkedIn](https://www.linkedin.com/in/nicolasolmosba/) · [GitHub](https://github.com/6nico)

## Projects

### Semiconductor supply chain scenarios

An interactive browser demonstration of demand scenarios, supplier comparisons, and inventory-policy tradeoffs. It explores how changes in assumptions affect a supply chain recommendation.

The current page uses predefined illustrative scenarios. Its supplier values and recommendations should be read as case assumptions, not verified NVIDIA operating data or results from a validated forecasting model. The Excel workbook referenced by the page is not included in this repository.

[Project documentation](nvidia-supply-chain/README.md) · [Page source](nvidia-supply-chain.html)

### Roblox AI Impact Lab

An independent research prototype exploring AI-assisted creation, attention, monetization, and transparent purchase design. Its scenario calculator separates visits, estimated distinct players, purchases, creator Robux, and modeled cash value.

The repository contains a standalone browser demonstration and a separate React/TypeScript prototype with calculation tests. They are distinct implementations; changes to one do not automatically update the other.

[Browser demonstration documentation](roblox-lab/README.md) · [React prototype and tests](roblox-ai-impact/README.md)

### Supplier and inventory decision lab

The next project focuses on supplier delivery performance, quote feasibility, total purchase cost, and sourcing recommendations. A specification and local Python/SQLite starter have been prepared; that implementation is not yet part of this repository.

[Project roadmap](ROADMAP.md)

## Approach

- Start with a business question and a decision the analysis should support.
- Keep sourced facts, assumptions, and simulated outcomes distinguishable.
- Document formulas, units, and limitations so the reasoning can be inspected.
- Use scenarios to test how a recommendation changes when conditions change.

These are independent student projects. They do not imply employment by, sponsorship from, or access to confidential information from the companies discussed.

## Run the static portfolio locally

From the repository root, using an installed Python 3 runtime:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/` for the portfolio, `http://127.0.0.1:8000/nvidia-supply-chain.html` for the supply chain demonstration, or `http://127.0.0.1:8000/roblox-lab/` for the standalone Roblox demonstration. The Roblox page loads fonts from Google Fonts; its scenario calculations run in the browser.

The React prototype has separate setup and test instructions in its [README](roblox-ai-impact/README.md).

## Repository guide

- `index.html` and `about.html`: portfolio introduction and background.
- `style.css`: shared portfolio styling.
- `nvidia-supply-chain.html`: standalone semiconductor scenario demonstration.
- `nvidia-supply-chain/README.md`: scope, assumptions, and limitations of that demonstration.
- `roblox-lab/`: standalone Roblox demonstration and its documentation.
- `roblox-ai-impact/`: React/TypeScript source, calculation tests, and development configuration.
- `roblox-ai-impact.html` and `roblox-ai-impact/index.html`: compatibility entry points.
- `ROADMAP.md`: planned work and implementation status.
- `archive/`: an earlier version retained for reference.
