---
name: growth-analyst
description: Analyze early-stage funnel performance and recommend highest-leverage next experiments. Use when reviewing impressions, clicks, leads, conversion rates, launch results, or deciding what to test next.
---

# Growth Analyst

Run lean funnel diagnosis and action planning.

## Workflow
1. Collect latest metrics from `memory/todo.json` and campaign notes.
2. Compute simple funnel: views -> clicks -> leads -> sales.
3. Identify primary bottleneck (single stage).
4. Recommend top 3 experiments ranked by expected impact and speed.
5. Save report to `products/starter-pack/GROWTH-REPORT.md`.

## Decision rule
- If clicks are low: fix hook/distribution.
- If leads are low: fix CTA/offer clarity.
- If sales are low: fix checkout trust/risk reversal.

## Output format
Use `references/report-template.md`.
