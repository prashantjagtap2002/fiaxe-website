import type { Metadata } from "next";
import { Schibsted_Grotesk, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InlineScript } from "@/components/InlineScript";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jb",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fiaxe | Voice AI Calling Agents That Sound Human",
  description:
    "Power thousands of inbound and outbound calls every minute with human-like, multilingual voice AI, wired straight into your CRM. Build, test, deploy, and scale AI calling agents in minutes.",
  keywords: [
    "AI calling",
    "voice AI",
    "AI voice agents",
    "outbound calling automation",
    "AI phone calls",
    "Fiaxe",
  ],
  openGraph: {
    title: "Fiaxe | Voice AI Calling Agents That Sound Human",
    description:
      "Build, test, deploy, and scale conversational voice AI agents. Go from idea to live calls in minutes, not weeks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${schibsted.variable} ${hanken.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        {/* Dark is the FIAXE default; honor a saved preference if one exists. */}
        <InlineScript
          html={`(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark");}catch(e){}})();`}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
