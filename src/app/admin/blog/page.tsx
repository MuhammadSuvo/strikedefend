import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Toolbar } from "@/components/admin/Toolbar";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { deleteBlog, toggleBlogPublish } from "@/app/admin/actions";
import { Edit, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBlog() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <Toolbar title="Blog Posts" actionHref="/admin/blog/new" actionLabel="New Post" />
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
                    <SubmitButton className={`rounded-full px-2 py-1 text-xs ${p.published ? "bg-brand/20 text-brand" : "bg-white/10 text-white/60"}`}>
                      {p.published ? "Published" : "Draft"}
                    </SubmitButton>
                  </form>
                </td>
                <td className="px-4 py-3 text-white/60">
                  {new Date(p.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link href={`/admin/blog/${p.id}`} className="text-white/70 hover:text-white"><Edit className="h-4 w-4" /></Link>
                    <form action={deleteBlog}>
                      <input type="hidden" name="id" value={p.id} />
                      <SubmitButton className="text-white/70 hover:text-red-400" ariaLabel="Delete post"><Trash2 className="h-4 w-4" /></SubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td className="px-4 py-6 text-white/60" colSpan={5}>No blog posts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
