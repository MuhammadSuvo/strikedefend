# Cloudflare deploy — current status

## Progress

| Step | Status |
|------|--------|
| OpenNext build (`.open-next/`) | Working |
| Deploy | Failing on invalid KV id |

Latest error:

```text
KV namespace 'REPLACE_WITH_KV_NAMESPACE_ID' is not valid. [code: 10042]
```

## Fix KV (required)

### Option A — Dashboard (easiest)

1. Cloudflare Dashboard → **Workers & Pages** → **KV**
2. **Create a namespace** named `strikedefend-content` (any name is fine)
3. Copy the **Namespace ID** (long hex string)
4. Create a second namespace for preview (optional but recommended), e.g. `strikedefend-content-preview`, copy its ID
5. Edit `wrangler.jsonc`:
   - `"id": "<production namespace id>"`
   - `"preview_id": "<preview namespace id>"` (or reuse production id temporarily)
6. Commit + push to `main`
7. Cloudflare → **Retry build**

### Option B — CLI (if logged in)

```bash
npx wrangler login
npx wrangler kv namespace create CONTENT_KV --binding CONTENT_KV --update-config
npx wrangler kv namespace create CONTENT_KV --preview --binding CONTENT_KV --update-config
git add wrangler.jsonc
git commit -m "chore: set real CONTENT_KV namespace ids"
git push
```

## Cloudflare Build settings (keep these)

| Field | Value |
|-------|--------|
| **Build command** | `npx @opennextjs/cloudflare build` |
| **Deploy command** | `npx @opennextjs/cloudflare deploy` |

(Your last log still used `npx wrangler deploy` for deploy — either works once OpenNext build succeeded; prefer the OpenNext deploy command.)

## After deploy succeeds

Seed content into KV (optional; app also auto-seeds from bundled `data/*.json` on first read):

```bash
npm run data:kv-seed -- --remote
```

Ensure dashboard **Variables / Secrets** still have:

- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (e.g. `https://strikedefend.net`)
- Cloudinary vars if you use uploads

`keep_vars: true` is set so dashboard vars are not wiped by Wrangler deploys.
