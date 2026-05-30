import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { ProblemROI } from "@/components/home/ProblemROI";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Pricing } from "@/components/home/Pricing";
import { MeetSilvia } from "@/components/home/MeetSilvia";
import { LiveDemo } from "@/components/home/LiveDemo";
import { ComplianceBanner } from "@/components/home/ComplianceBanner";
import { Verticals } from "@/components/home/Verticals";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { BookingProvider } from "@/context/BookingContext";
import { BookingModal } from "@/components/ui/BookingModal";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <BookingModal />
        <ScrollToTop />
        <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <FeaturesGrid />
        <ProblemROI />
        <HowItWorks />
        <MeetSilvia />
        <LiveDemo />
        <ComplianceBanner />
        <Verticals />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
    </BookingProvider>
  );
}

export default App;
