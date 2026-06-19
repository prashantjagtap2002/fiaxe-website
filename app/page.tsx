import { Hero } from "@/components/Hero";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { Process } from "@/components/Process";
import { LiveDemo } from "@/components/LiveDemo";
import { AgentsStrip } from "@/components/AgentsStrip";
import { WhyFiaxe } from "@/components/WhyFiaxe";
import { CrmShowcase } from "@/components/CrmShowcase";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Cta } from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <Process />
      <LiveDemo />
      <AgentsStrip />
      <WhyFiaxe />
      <CrmShowcase />
      <Testimonials />
      <FAQ />
      <Cta />
    </>
  );
}
