import { Toolbar } from "@/components/admin/Toolbar";
import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <Toolbar title="New Blog Post" />
      <BlogForm />
    </div>
  );
}
