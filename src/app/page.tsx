import { Hero } from "@/components/home/Hero";
import { TrustBand } from "@/components/home/TrustBand";
import { SmartGrid } from "@/components/home/SmartGrid";
import { AboutUs } from "@/components/home/AboutUs";
import { ScrollyStats } from "@/components/home/ScrollyStats";
import { Testimonials } from "@/components/home/Testimonials";
import { GlobalOffices } from "@/components/home/GlobalOffices";
import { CTAStrip } from "@/components/home/CTAStrip";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Spacer bridges the Rate Calculator card's negative overflow into the next section */}
      <div className="pt-36 lg:pt-52 bg-freight-paper">
        <TrustBand />
      </div>
      <SmartGrid />
      <AboutUs />
      <ScrollyStats />
      <Testimonials />
      <GlobalOffices />
      <CTAStrip />
    </>
  );
}
