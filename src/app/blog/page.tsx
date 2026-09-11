import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedBlogPosts, getBlogPostBySlug } from "@/lib/data";
import { isBlogPublished } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog",
  description: "Practical posts on penetration testing and offensive security."
};

export default async function BlogPage() {
  if (!(await isBlogPublished())) return notFound();

  const posts = await getPublishedBlogPosts();

  return (
    <>
      <section className="border-b border-white/5">
        <div className="section py-20">
          <span className="tag">Blog</span>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Notes from the team</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Short, practical writing on penetration testing and offensive security.
          </p>
        </div>
      </section>

      <div className="section py-16">
        {posts.length === 0 ? (
          <p className="text-white/60">No posts yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="card group flex flex-col overflow-hidden p-0"
              >
                {p.coverImage ? (
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    width={600}
                    height={350}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-ink-700 to-ink-800" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-xs text-white/50">
                    {p.publishedAt
                      ? new Date(p.publishedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })
                      : ""}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold group-hover:text-brand">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-white/70">{p.excerpt}</p>
                  <div className="mt-4 text-xs text-white/50">By {p.author}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
