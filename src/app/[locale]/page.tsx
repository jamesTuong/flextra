import { CTA } from "@/components/landing/cta";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </div>
  );
};

export default HomePage;
