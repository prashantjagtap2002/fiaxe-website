import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookDemo } from "@/components/BookDemo";

export const metadata: Metadata = {
  title: "Book a Discovery Call | Fiaxe",
  description:
    "Book a free 30-minute discovery call. We'll build your first custom Fiaxe voice agent free, with your first 100 minutes on us.",
};

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        index="00"
        label="Book a Demo"
        title={
          <>
            Book your free <span className="underline-bar">discovery call.</span>
          </>
        }
        copy="Tell us a little about your business and pick a time that works. We'll show you how a custom Fiaxe agent would handle your calls, then build your first agent free, with the first 100 minutes on us."
      />
      <BookDemo />
    </>
  );
}
