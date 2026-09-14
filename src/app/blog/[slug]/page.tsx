import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/data";
import { isBlogPublished } from "@/lib/settings";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  if (!(await isBlogPublished())) return {};
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.coverImage ? [post.coverImage] : undefined }
  };
}

export default async function BlogPostPage({ params }: Props) {
  if (!(await isBlogPublished())) return notFound();
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || !post.published) return notFound();

  return (
    <article className="section py-16">
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>
      <header className="mt-6 max-w-3xl">
        <h1 className="text-4xl font-bold md:text-5xl">{post.title}</h1>
        <div className="mt-4 text-sm text-white/60">
          By {post.author}
          {post.publishedAt && (
            <span> · {new Date(post.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
          )}
        </div>
      </header>
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1600}
          height={900}
          className="mt-8 w-full max-w-4xl rounded-xl object-cover"
        />
      )}
      <div className="prose-dark mt-8 max-w-3xl whitespace-pre-wrap">{post.content}</div>
    </article>
  );
}
