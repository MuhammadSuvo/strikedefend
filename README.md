# StrikeDefend

Full-stack Next.js website for a cybersecurity / penetration testing company.  
Public pages are fully editable from a built-in **admin panel**. Content is stored as **JSON files** in the project (no database required to run).

**Live features**
- Service pages (Web, Mobile, API, Cloud, Network, Vulnerability Assessment, Continuous Monitoring)
- About, Pricing, Contact, Blog (draft/publish toggle)
- Admin CMS for all site content
- Contact form → leads inbox
- AI + Human penetration testing messaging across service pages

---

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS**
- **JSON file storage** (`data/*.json`) — easy to migrate to a DB later
- **NextAuth** (credentials / JWT)
- Optional **Cloudinary** (or local) image uploads
- Vercel-ready

---

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Minimum for local development:

```env
NEXTAUTH_SECRET="replace-me-with-a-long-random-string"
NEXTAUTH_URL="http://localhost:3000"
```

Cloudinary vars are optional if you use local uploads.

### 3. Run the dev server

```bash
npm run dev
```

Open **http://localhost:3000**

### 4. Admin login

| Field | Default |
|-------|---------|
| URL | http://localhost:3000/admin/login |
| Email | `admin@strikedefend.com` |
| Password | `ChangeMe123!` |

> Change the admin password after first login (edit `data/users.json` bcrypt hash or re-seed your own user).

---

## Project structure

```
├─ data/                 # All site content as JSON (source of truth)
│  ├─ site-settings.json
│  ├─ home.json
│  ├─ about.json
│  ├─ pricing.json
│  ├─ services.json
│  ├─ testimonials.json
│  ├─ faqs.json
│  ├─ blog-posts.json
│  ├─ leads.json
│  └─ users.json
├─ public/images/        # Static images
├─ src/
│  ├─ app/               # Public pages + /admin + API routes
│  ├─ components/        # UI (public + admin)
│  └─ lib/               # data layer, auth, content helpers
└─ prisma/               # Legacy schema/seed (optional / reference only)
```

---

## Data (JSON)

Site content lives in `data/`. Edit via **Admin** (recommended) or edit the JSON files directly.

| File | Contents |
|------|----------|
| `users.json` | Admin accounts |
| `site-settings.json` | Brand, contact, footer, blog visibility |
| `home.json` | Homepage hero & sections |
| `about.json` | About Us page |
| `pricing.json` | Pricing plans & comparison |
| `services.json` | Service pages + longform content |
| `testimonials.json` | Testimonials |
| `faqs.json` | FAQs |
| `blog-posts.json` | Blog posts |
| `leads.json` | Contact form submissions |

See `data/README.md` for more detail.

---

## Admin features

| Page | What you can do |
|------|-----------------|
| `/admin` | Dashboard counts |
| `/admin/home` | Homepage hero, CTAs, workflow, security section |
| `/admin/about` | About Us content + hero image |
| `/admin/pricing` | Plans & comparison table |
| `/admin/services` | Add / edit / publish services (incl. longform) |
| `/admin/testimonials` | CRUD + publish |
| `/admin/faq` | CRUD + publish |
| `/admin/blog` | Posts + public Blog page on/off |
| `/admin/leads` | Contact submissions |
| `/admin/settings` | Logo, colors, email, phone, social links |

---

## Scripts

```bash
npm run dev          # local development
npm run build        # production build
npm run start        # run production build
npm run lint         # ESLint
npm run data:export  # (optional) export old SQLite DB → data/*.json
```

---

## Deploy (e.g. Vercel)

1. Push this repo to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Set environment variables:

   ```
   NEXTAUTH_SECRET
   NEXTAUTH_URL=https://your-domain.vercel.app
   CLOUDINARY_CLOUD_NAME   # optional
   CLOUDINARY_API_KEY      # optional
   CLOUDINARY_API_SECRET   # optional
   ```

4. Deploy. Content ships with the `data/` folder in the repo.

**Note:** On serverless hosts, writes to `data/` (admin edits, new leads) may not persist across deploys. For production CMS/leads, migrate JSON → PostgreSQL (or similar) later. The JSON format maps cleanly to the old Prisma schema under `prisma/`.

---

## Migrating JSON → database later

When you are ready for a real database:

1. Use `prisma/schema.prisma` as the target schema.
2. Import each `data/*.json` file into matching tables.
3. Point the app’s data layer (`src/lib/data.ts`) at Prisma again.

---

## Security notes

- Never commit a real `.env` (already in `.gitignore`).
- Change the default admin password before going public.
- Leads may contain personal contact info — treat `data/leads.json` carefully.

---

## License

MIT — use it freely.
