import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Cta } from "@/components/Cta";
import { Reveal } from "@/components/primitives";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Fiaxe",
  description:
    "Notes on voice AI, conversation design, and running calling operations, from the team building custom AI voice agents for Indian businesses.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        index="00"
        label="Blog"
        title={
          <>
            Ideas on voice AI, <span className="underline-bar">from the team building it.</span>
          </>
        }
        copy="Notes on conversation design, calling operations, and what actually changes when a voice agent picks up the phone."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink shadow-sm transition-colors hover:border-line-bright"
              >
                {post.image && (
                  <div className="relative h-48 w-full overflow-hidden border-b border-line bg-surface">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[9px] tracking-[0.12em] text-faint uppercase">
                      {post.category}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-faint uppercase">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-xl font-medium leading-snug tracking-tight text-balance">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <time
                      dateTime={post.date}
                      className="font-mono text-[11px] tracking-wider text-faint uppercase"
                    >
                      {formatDate(post.date)}
                    </time>
                    <span className="text-sm font-medium text-blue transition-transform group-hover:translate-x-0.5">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
