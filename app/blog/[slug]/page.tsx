import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/Cta";
import { Reveal } from "@/components/primitives";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Fiaxe Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="relative pt-32 pb-4 md:pt-40">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-cream"
            >
              ← All posts
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[9px] tracking-[0.12em] text-faint uppercase">
                {post.category}
              </span>
              <time dateTime={post.date} className="font-mono text-[11px] tracking-wider text-faint uppercase">
                {formatDate(post.date)}
              </time>
              <span className="font-mono text-[11px] tracking-wider text-faint uppercase">
                {post.readTime}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance md:text-5xl">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">{post.excerpt}</p>
          </Reveal>
        </div>
      </article>

      {post.image && (
        <Reveal delay={0.18}>
          <div className="mx-auto max-w-5xl px-5 md:px-8 mb-12">
            <div className="overflow-hidden rounded-3xl border border-line bg-surface">
              <img
                src={post.image}
                alt={post.title}
                className="h-[300px] w-full object-cover md:h-[500px]"
              />
            </div>
          </div>
        </Reveal>
      )}

      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <Reveal>
          <div className="space-y-6 border-t border-line pt-10 text-[17px] leading-relaxed text-cream/90">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <Cta />
    </>
  );
}
