---
name: ops-custodian
description: "Maintain execution hygiene: keep task boards current, log activity, update now/next/done, and enforce shipping cadence with lightweight check-ins. Use for operational upkeep, status hygiene, and momentum management."
---

# Ops Custodian

Keep operations clean, current, and execution-focused.

## Workflow
1. Read `memory/todo.json` and recent `memory/*.md` if needed.
2. Reconcile reality into `now`, `next`, `done`, `activity`.
3. Ensure one concrete next action exists.
4. Update stale timestamps and board-facing fields.
5. Commit meaningful changes with a clear message.

## Guardrails
- Do not invent completed work.
- Do not drop unresolved blockers.
- Preserve chronological activity entries.
- Prefer small, reversible updates.

## Standard checks
- Is `updatedAt` current?
- Is there exactly one top priority in `now[0]`?
- Does `next` reflect near-term execution?
- Are major outcomes logged in `done`?
