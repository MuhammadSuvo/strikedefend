# Site data (JSON)

All public site content and admin-managed data is stored here as JSON files.

| File | Contents |
|------|----------|
| `users.json` | Admin login accounts |
| `site-settings.json` | Site name, contact info, footer, blog visibility |
| `home.json` | Homepage hero, sections, workflow |
| `about.json` | About Us page content |
| `pricing.json` | Pricing plans and comparison table |
| `services.json` | All service pages + longform content |
| `testimonials.json` | Testimonials |
| `faqs.json` | FAQs |
| `blog-posts.json` | Blog posts |
| `leads.json` | Contact form submissions |

Edit via **Admin panel** (recommended) or edit these files directly.

To migrate from the old SQLite database once: `npm run data:export`
