import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Approach } from "@/components/sections/Approach";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { IntelligenceCycle } from "@/components/sections/IntelligenceCycle";
import { GrowthEngine } from "@/components/sections/GrowthEngine";
import { AIAutomation } from "@/components/sections/AIAutomation";
import { Work } from "@/components/sections/Work";
import { Capabilities } from "@/components/sections/Capabilities";
import { WhyUs } from "@/components/sections/WhyUs";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ClientStrip />
        <WhatWeDo />
        <Ecosystem />
        <Approach />
        <BeforeAfter />
        <IntelligenceCycle />
        <GrowthEngine />
        <AIAutomation />
        <Work />
        <Capabilities />
        <WhyUs />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
