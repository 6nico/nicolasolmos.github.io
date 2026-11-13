# Semiconductor supply chain scenarios

An independent scenario demonstration by Nicolas Olmos, a Business Economics student at UC San Diego.

## Business question

How might changing demand, supplier constraints, and inventory buffers affect product availability and a sourcing recommendation?

The case uses NVIDIA and the semiconductor industry as context. It is not affiliated with NVIDIA or the suppliers named on the page.

## Current implementation

The [standalone HTML page](../nvidia-supply-chain.html) includes three selectable scenarios, a demand visualization, supplier comparisons, and an inventory-strategy comparison. HTML, CSS, and JavaScript run directly in the browser.

Selecting a scenario changes predefined demand values, growth labels, market-share assumptions, and the line graphic. The supplier table and inventory-strategy comparisons are fixed illustrative inputs; they are not recalculated by the scenario selector.

## What the demonstration establishes

The project presents supply chain tradeoffs in an interactive format and organizes a case around demand, supply concentration, lead times, and inventory. The code makes the displayed scenario values inspectable.

The current browser implementation does not establish a statistically validated demand forecast, an optimized inventory policy, or a measured reduction in business risk.

## Assumptions and limits

- Supplier capacities, reliability percentages, risk labels, market-share values, and policy outcomes are illustrative case assumptions unless independently sourced and documented.
- Named suppliers should not be interpreted as verified qualified substitutes for a particular NVIDIA component or manufacturing process.
- Scenario values are predefined rather than estimated from an included historical dataset.
- The displayed stockout and inventory comparisons have no accompanying backtest or reproducible inventory simulation in this repository.
- Recommendations are case illustrations, not operational recommendations to NVIDIA or claims of achieved savings.
- The page references an Excel download, but the workbook is not included in the repository. The browser page is the available demonstration.

## Run locally

From the repository root:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/nvidia-supply-chain.html`.

## Next development step

The planned [supplier and inventory decision lab](../ROADMAP.md) will add explicit input data, documented metrics, reproducible SQL, feasible quote comparisons, and tested recommendations. Forecast validation and time-phased inventory are separate extensions. Those capabilities are not part of this browser demonstration yet.
