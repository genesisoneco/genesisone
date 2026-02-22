# HEARTBEAT.md — Autonomous Execution Plan (Genesis)

Run every heartbeat (5m). Keep actions lean and shipping-focused.

## Quiet hours
- Between 23:00-08:00 Asia/Seoul: only act on urgent/security issues.

## Continuous task queue behavior
- On each run, pick exactly one shippable next action and execute it.
- If blocked, log blocker + immediate unblock step in `memory/todo.json`.
- Do not wait for instruction when queue has actionable work.

## Priority loop (do in order)
1. **Ops board freshness**
   - Check `memory/todo.json` timestamp.
   - If stale (>3h) and there is new progress, update it.

2. **Mission shipping progress**
   - Advance one concrete artifact per run when possible:
     - storefront copy refinement
     - template improvements
     - packaging/checklist/docs
   - Save outputs in `products/starter-pack/`.

3. **Security hygiene checks**
   - Verify Telegram remains allowlist-only in `openclaw.json`.
   - Keep token-rotation task visible until done.

4. **Execution hygiene**
   - Keep `now/next/done/activity` current in `memory/todo.json`.
   - Commit meaningful file changes to git.

## Reporting behavior
- If no meaningful change: reply `HEARTBEAT_OK`.
- If meaningful change was made: send a short update with:
  - what changed
  - file paths
  - commit hash (if committed)

## Guardrails
- Do not send external/public messages unless explicitly requested.
- Do not delete user content without explicit instruction.
- Prefer incremental, reversible updates.
