# Cloudflare Workers Builds

## Current correct setup

| Field | Value |
|-------|--------|
| **Build command** | `npx @opennextjs/cloudflare build` |
| **Deploy command** | `npx @opennextjs/cloudflare deploy` |

`package.json` must keep:

```json
"build": "next build"
```

OpenNext invokes that script itself. Do **not** put `opennextjs-cloudflare build` inside `npm run build` — that runs OpenNext twice and breaks deploy with:

```text
Multiple exports with the same name "production"
.open-next/cloudflare/next-env.mjs
```

## CONTENT_KV

Set real ids in `wrangler.jsonc` (already done for this project).

## Vars / secrets

`keep_vars: true` keeps dashboard vars. Also set:

- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- Cloudinary vars if needed
