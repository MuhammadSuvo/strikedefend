import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import { Toolbar } from "@/components/admin/Toolbar";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { deleteBlog, toggleBlogPublish, toggleBlogPagePublish } from "@/app/admin/actions";
import { isBlogPublished } from "@/lib/settings";
import { Edit, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBlog() {
  const [posts, blogPublished] = await Promise.all([
    getBlogPosts(),
    isBlogPublished()
  ]);

  return (
    <div>
      <Toolbar
        title="Blog Posts"
        description="Draft or publish the public Blog page, then manage individual posts."
        actionHref="/admin/blog/new"
        actionLabel="New Post"
      />

      <div className="mb-6 rounded-xl border border-white/10 bg-ink-800 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Public Blog page</h2>
            <p className="mt-1 text-sm text-white/60">
              When drafted, Blog is hidden from the menu and <code className="text-white/80">/blog</code> is not public.
            </p>
          </div>
          <form action={toggleBlogPagePublish}>
            <SubmitButton
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                blogPublished ? "bg-brand/20 text-brand" : "bg-white/10 text-white/70"
              }`}
            >
              {blogPublished ? "Published" : "Draft"}
            </SubmitButton>
          </form>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-800">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-left text-white/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-white/60">{p.author}</td>
                <td className="px-4 py-3">
                  <form action={toggleBlogPublish}>
                    <input type="hidden" name="id" value={p.id} />
                    <SubmitButton
                      className={`rounded-full px-2 py-1 text-xs ${
                        p.published ? "bg-brand/20 text-brand" : "bg-white/10 text-white/60"
                      }`}
                    >
                      {p.published ? "Published" : "Draft"}
                    </SubmitButton>
                  </form>
                </td>
                <td className="px-4 py-3 text-white/60">{new Date(p.updatedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link href={`/admin/blog/${p.id}`} className="text-white/70 hover:text-white">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <form action={deleteBlog}>
                      <input type="hidden" name="id" value={p.id} />
                      <SubmitButton className="text-white/70 hover:text-red-400" ariaLabel="Delete post">
                        <Trash2 className="h-4 w-4" />
                      </SubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-white/60" colSpan={5}>
                  No blog posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
