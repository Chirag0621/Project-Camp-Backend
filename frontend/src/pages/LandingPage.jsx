import React from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { LandingNavbar } from '../components/landing/LandingNavbar.jsx';
import { HeroSection } from '../components/landing/HeroSection.jsx';
import { TrustSection } from '../components/landing/TrustSection.jsx';
import { HowItWorksSection } from '../components/landing/HowItWorksSection.jsx';
import { FeaturesSection } from '../components/landing/FeaturesSection.jsx';
import { PricingSection } from '../components/landing/PricingSection.jsx';
import { TestimonialsSection } from '../components/landing/TestimonialsSection.jsx';
import { FAQSection } from '../components/landing/FAQSection.jsx';
import { FinalCTASection } from '../components/landing/FinalCTASection.jsx';
import { LandingFooter } from '../components/landing/LandingFooter.jsx';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-[#0e1116] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#e6fd53] selection:text-[#0d0f14]">
      {/* Top sticky Navbar */}
      <LandingNavbar />

      {/* Main landing content sections */}
      <main className="flex-1">
        <HeroSection isAuthenticated={isAuthenticated} />
        <TrustSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection isAuthenticated={isAuthenticated} />
        <TestimonialsSection />
        <FAQSection isAuthenticated={isAuthenticated} />
        <FinalCTASection isAuthenticated={isAuthenticated} />
      </main>

      {/* Footer */}
      <LandingFooter isAuthenticated={isAuthenticated} />
    </div>
  );
};
