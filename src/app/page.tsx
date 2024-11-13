import BTCMasterySection from "@/app/components/sections/landing-btc-mastery";
import CurriculumSection from "@/app/components/sections/landing-curriculum";
import FeaturesSection from "@/app/components/sections/landing-features";
import HeroSection from "@/app/components/sections/landing-hero";
import OpenSourceSection from "@/app/components/sections/landing-open-source";
import { auth } from "@/auth";
import LandingPageLayout from "./components/layout/landing-page-layout";

export default async function Home() {
  const session = await auth();
  const authenticated = !!session;

  return (
    <LandingPageLayout>
      <HeroSection />
      <BTCMasterySection />
      <FeaturesSection />
      <CurriculumSection />
      <OpenSourceSection />
    </LandingPageLayout>
  );
}
