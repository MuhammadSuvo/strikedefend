import { saveBlog } from "@/app/admin/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FormCard, SaveBar } from "@/components/admin/Toolbar";

type B = {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string | null;
  author?: string;
  tags?: string;
  published?: boolean;
};

export function BlogForm({ post }: { post?: B }) {
  return (
    <form action={saveBlog} className="max-w-3xl">
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      <FormCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Title</label>
            <input className="input" name="title" defaultValue={post?.title} required />
          </div>
          <div>
            <label className="label">Slug (auto if empty)</label>
            <input className="input" name="slug" defaultValue={post?.slug} />
          </div>
        </div>
        <div className="mt-4">
          <label className="label">Excerpt</label>
          <input className="input" name="excerpt" defaultValue={post?.excerpt} required />
        </div>
        <div className="mt-4">
          <label className="label">Cover Image</label>
          <ImageUploader name="coverImage" defaultValue={post?.coverImage ?? ""} folder="strikedefend/blog" />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Author</label>
            <input className="input" name="author" defaultValue={post?.author ?? "StrikeDefend Team"} />
          </div>
          <div>
            <label className="label">Tags (comma separated)</label>
            <input className="input" name="tags" defaultValue={post?.tags ?? ""} />
          </div>
        </div>
        <div className="mt-4">
          <label className="label">Content</label>
          <textarea className="input font-mono text-xs" rows={16} name="content" defaultValue={post?.content} required />
          <p className="mt-1 text-xs text-white/40">Plain text or Markdown-style paragraphs.</p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input id="pubb" type="checkbox" name="published" defaultChecked={post?.published ?? false} />
          <label htmlFor="pubb" className="text-sm">Published</label>
        </div>
      </FormCard>
      <SaveBar saveLabel="Save Post" />
    </form>
  );
}
