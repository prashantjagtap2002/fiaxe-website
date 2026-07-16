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
      <article className="mx-auto w-full max-w-4xl px-5 pt-32 pb-8 md:px-8 md:pt-40">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-faint uppercase transition-colors hover:text-cream"
          >
            ← Back to all posts
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
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
          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.15] tracking-tight text-cream sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            {post.excerpt}
          </p>
        </Reveal>

        {post.image && (
          <Reveal delay={0.18}>
            <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-ink shadow-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
              />
            </div>
          </Reveal>
        )}
      </article>

      <section className="mx-auto max-w-3xl px-5 py-12 pb-24 md:px-8 md:py-16 md:pb-32">
        <Reveal delay={0.22}>
          <div className="space-y-8 text-[16px] leading-[1.85] text-muted sm:text-[18px]">
            {post.content.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-[19px] font-medium leading-[1.75] text-cream sm:text-[22px]"
                    : ""
                }
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
