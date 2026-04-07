
import CTASection from "../components/CTASection";
import FeaturesSection from "../components/FeaturesSection";
import GlobalStyles from "../components/GlobalStyles";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import StatsBar from "../components/StatsBar";

export default function LayoutPage() {
  return (
    <main className="bg-[#05070f] min-h-screen font-sans selection:bg-[#6c63ff]/30 selection:text-white">
      <GlobalStyles />
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      {/* <Footer /> */}
    </main>
  );
}