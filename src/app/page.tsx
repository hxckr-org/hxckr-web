import Navbar from "@/app/components/primitives/navbar";
import BTCMasterySection from "@/app/components/sections/landing-btc-mastery";
import CurriculumSection from "@/app/components/sections/landing-curriculum";
import FeaturesSection from "@/app/components/sections/landing-features";
import HeroSection from "@/app/components/sections/landing-hero";
import OpenSourceSection from "@/app/components/sections/landing-open-source";
import Footer from "@/app/components/sections/footer";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const authenticated = !!session;

  return (
    <main className="flex text-black flex-col items-center justify-between mx-auto">
      <div className="w-full">
        <Navbar />
        <HeroSection />
        <BTCMasterySection />
        <FeaturesSection />
        <CurriculumSection />
        <OpenSourceSection />
        <Footer />
      </div>
    </main>
  );
}
