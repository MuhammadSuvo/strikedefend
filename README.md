# StrikeDefend

Full-stack Next.js website for a cybersecurity services company. The public site is fully editable from a built-in admin panel.

**Services**
- Penetration Testing
- Load Testing
- Web Automation (Playwright + AI)

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth (credentials)
- Cloudinary image uploads
- Vercel-ready

## Quick start (local)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — PostgreSQL connection string (Neon, Supabase, Railway are all free-tier friendly)
   - `NEXTAUTH_SECRET` — `openssl rand -base64 32` (or any long random string)
   - `NEXTAUTH_URL` — `http://localhost:3000` for dev
   - `CLOUDINARY_*` — from https://cloudinary.com/console
   - `SEED_ADMIN_*` — used by the seed script for the first admin user

3. **Push schema and seed**

   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Run dev server**

   ```bash
   npm run dev
   ```

5. **Sign in to admin** at `http://localhost:3000/admin/login` with the email/password you set in `.env`.

## Project structure

```
src/
├─ app/
│  ├─ (public pages: /, /services, /about, /blog, /contact)
│  ├─ admin/        — admin dashboard (NextAuth-protected)
│  └─ api/          — leads, upload, NextAuth
├─ components/      — public + admin React components
├─ lib/             — prisma, auth, cloudinary, settings helpers
└─ middleware.ts    — protects /admin/*
prisma/
├─ schema.prisma
└─ seed.ts
```

## Admin features

| Page | What you can do |
|---|---|
| `/admin` | Dashboard counts |
| `/admin/home` | Edit hero text, image, CTAs, "Why choose us", process steps, CTA section |
| `/admin/services` | Add / edit / delete / publish / unpublish services |
| `/admin/testimonials` | CRUD + publish |
| `/admin/faq` | CRUD + publish |
| `/admin/blog` | CRUD + publish |
| `/admin/leads` | Read contact form messages, mark read, delete |
| `/admin/settings` | Logo, favicon, brand colors, contact info, footer text, social links |

All image uploads go through `/api/upload` (admin-only) and are stored in Cloudinary.

## Deploy to Vercel (free plan)

1. **Push the repo to GitHub.**

2. **Provision a free PostgreSQL database** at one of:
   - [Neon](https://neon.tech) (recommended, generous free tier)
   - [Supabase](https://supabase.com) → use the connection-pooled URL
   - [Railway](https://railway.app)

3. **Create the Cloudinary account** at https://cloudinary.com (free tier is plenty).

4. **Import the project on Vercel** and set these env vars in *Project Settings → Environment Variables*:

   ```
   DATABASE_URL
   NEXTAUTH_SECRET
   NEXTAUTH_URL=https://your-domain.vercel.app
   CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET
   SEED_ADMIN_EMAIL
   SEED_ADMIN_PASSWORD
   SEED_ADMIN_NAME
   ```

5. **First deploy** — Vercel will run `npm run build`, which runs `prisma generate` automatically.

6. **Run the seed once** (locally, pointing at the production `DATABASE_URL`):

   ```bash
   DATABASE_URL="<prod-url>" npm run db:push
   DATABASE_URL="<prod-url>" npm run db:seed
   ```

   On Windows PowerShell:

   ```powershell
   $env:DATABASE_URL="<prod-url>"; npm run db:push
   $env:DATABASE_URL="<prod-url>"; npm run db:seed
   ```

7. Visit `/admin/login` on your live site and sign in.

## Common scripts

```bash
npm run dev          # local dev
npm run build        # production build (runs prisma generate)
npm run start        # run built app
npm run db:push      # apply schema without migrations
npm run db:migrate   # create a migration (dev only)
npm run db:seed      # seed admin + sample content
npm run db:studio    # open Prisma Studio
```

## Notes & limits

- Single admin role — extend the `User.role` field if you need editor/viewer.
- Blog posts use plain text / soft Markdown. Swap in `react-markdown` for full Markdown rendering when needed.
- "Why choose us" and "process steps" are stored as JSON arrays. The admin UI uses a simple `title | text` (or `step | title | text`) line format.
- Email delivery is **not** wired in by default — leads are stored in the DB and shown in `/admin/leads`. Add Resend or SMTP if you want email notifications.

## License

MIT — use it freely.
