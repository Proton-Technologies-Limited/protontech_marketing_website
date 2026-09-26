import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ApplyCta } from "@/components/sections/apply/ApplyCta";
import { BuiltFor } from "@/components/sections/BuiltFor";
import { Examples } from "@/components/sections/examples/Examples";
import { Hero } from "@/components/sections/hero/Hero";
import { HowItWorks } from "@/components/sections/how/HowItWorks";
import { Solutions } from "@/components/sections/solutions/Solutions";
import { WhyItMatters } from "@/components/sections/why/WhyItMatters";
import { landingSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD is static, trusted content; escape "<" defensively.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingSchema()).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main">
        <Hero />
        <BuiltFor />
        <WhyItMatters />
        <Solutions />
        <Examples />
        <HowItWorks />
        <ApplyCta />
      </main>
      <Footer />
    </>
  );
}
