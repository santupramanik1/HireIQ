import CTASection from "../components/ui/CTASection";
import FeaturesSection from "../components/ui/FeaturesSection";
import Footer from "../components/ui/Footer";
import GlobalStyles from "../components/ui/GlobalStyles";
import HeroSection from "../components/ui/HeroSection";
import HowItWorks from "../components/ui/HowItWorks";
import Navbar from "../components/ui/Navbar";
import StatsBar from "../components/ui/StatsBar";


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
      <Footer />
    </main>
  );
}