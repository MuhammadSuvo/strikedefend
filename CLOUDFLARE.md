# Cloudflare Workers Builds — exact settings

## Root cause (from your logs)

Cloudflare Build was:

```text
npx @opennextjs/cloudflare build
  → npm run build
  → next build && opennextjs-cloudflare build --skipNextBuild   ← OpenNext #1
  → then outer OpenNext continues                              ← OpenNext #2
```

Running OpenNext twice appends twice to `.open-next/cloudflare/next-env.mjs`, which causes:

```text
Multiple exports with the same name "production"
```

## Fix in Cloudflare Dashboard (do this now)

Worker → **Settings** → **Build** → edit:

| Field | Exact value |
|-------|-------------|
| **Build command** | `rm -rf .open-next && npx next build && npx opennextjs-cloudflare build --skipNextBuild` |
| **Deploy command** | `npx wrangler deploy` |

Why this works:

1. Deletes any bad/cached `.open-next`
2. Builds Next once
3. Runs OpenNext **once** (never nests a second OpenNext via `npm run build`)

Then **Save** → **Retry build**.

Optional: turn **Build output cache** off for one successful deploy, then turn it back on.

## Repo `package.json` (already correct on GitHub)

```json
"build": "next build"
```

Keep it that way. Do not put `opennextjs-cloudflare build` inside `npm run build` again.

## CONTENT_KV

Already set in `wrangler.jsonc`:

- id: `9d00671fffb148b589a195ed4b15ff30`
- preview_id: `303a689058e04ac4a42a460696be00e6`
