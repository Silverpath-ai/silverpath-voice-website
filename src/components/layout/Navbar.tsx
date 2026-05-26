import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div
          className={`flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled ? "glass-panel px-6 py-3" : "bg-transparent px-2 py-0"
          }`}
        >
          <a href="#" className="flex items-center group">
            <img 
              src="/silverpath-ai-light-logo.svg" 
              alt="Silverpath AI" 
              className="h-7 md:h-8 w-auto transition-transform group-hover:scale-[1.02]" 
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              How it works
            </a>
            <a href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#demo" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Live Demo
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Button className="hidden md:inline-flex rounded-full" onClick={openBooking}>Book Call</Button>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-foreground z-50 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-black/5 shadow-xl flex flex-col p-6 gap-6 animate-in slide-in-from-top-2 duration-200">
            <a 
              href="#how-it-works" 
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it works
            </a>
            <a 
              href="#pricing" 
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#demo" 
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Live Demo
            </a>
            <Button 
              className="w-full rounded-xl py-6 text-lg" 
              onClick={() => {
                setMobileMenuOpen(false);
                openBooking();
              }}
            >
              Book Call
            </Button>
          </div>
        )}

      </div>
    </header>
  );
};
