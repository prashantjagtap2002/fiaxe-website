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
      <article className="relative flex min-h-[60vh] flex-col justify-end border-b border-line pb-16 pt-32 md:pb-24 md:pt-40">
        {post.image && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img src={post.image} alt="" className="h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/20" />
            <div className="absolute inset-0 bg-ink/10 backdrop-blur-[2px]" />
          </div>
        )}
        
        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 md:px-8">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-cream"
            >
              ← Back to all posts
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="rounded-full border border-blue/30 bg-blue/10 px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-blue uppercase">
                {post.category}
              </span>
              <time dateTime={post.date} className="font-mono text-[11px] tracking-wider text-faint uppercase">
                {formatDate(post.date)}
              </time>
              <span className="h-1 w-1 rounded-full bg-line-bright" />
              <span className="font-mono text-[11px] tracking-wider text-faint uppercase">
                {post.readTime}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.1] tracking-tight text-white md:text-6xl">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-cream/80 md:text-2xl">
              {post.excerpt}
            </p>
          </Reveal>
        </div>
      </article>

      <section className="relative mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <div className="space-y-8 text-[18px] leading-[1.8] text-muted md:text-[20px]">
            {post.content.map((para, i) => (
              <p 
                key={i} 
                className={i === 0 ? "text-xl font-medium leading-relaxed text-cream md:text-2xl" : ""}
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <Cta />
    </>
  );
}
