import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/data";
import { Toolbar } from "@/components/admin/Toolbar";
import { BlogForm } from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const post = await getBlogPostById(params.id);
  if (!post) return notFound();
  return (
    <div>
      <Toolbar title="Edit Post" description={post.title} />
      <BlogForm post={post} />
    </div>
  );
}
