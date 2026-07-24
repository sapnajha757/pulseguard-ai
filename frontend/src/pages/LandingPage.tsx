import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import AiPolygon from '@/components/landing/AiPolygon';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AiPolygon />
      </main>
      <Footer />
    </div>
  );
}
