# Cloudflare Workers Builds — required settings

Source: https://opennext.js.org/cloudflare/howtos/dev-deploy

OpenNext does **not** use `npm run build` + `npx wrangler deploy` for CI.
`opennextjs-cloudflare build` already runs `npm run build` (`next build`), then writes `.open-next/`.
`opennextjs-cloudflare deploy` populates cache and deploys (it wraps Wrangler).

## Dashboard → Worker → Settings → Build

| Field | Exact value |
|-------|-------------|
| **Build command** | `npx @opennextjs/cloudflare build` |
| **Deploy command** | `npx @opennextjs/cloudflare deploy` |

Do **not** use:

- Build: `npm run build` alone (no `.open-next/` → deploy fails)
- Deploy: `npx wrangler deploy` alone after a Next-only build (missing OpenNext compile / cache init)

Equivalent CLI locally:

```bash
npm run deploy
# = opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

Also set Build variables/secrets for `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, Cloudinary, etc.
Ensure `wrangler.jsonc` has real `CONTENT_KV` namespace ids (not `REPLACE_WITH_...`).
