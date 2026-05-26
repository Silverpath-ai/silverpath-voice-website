import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./button";
import { useBooking } from "@/context/BookingContext";

export const BookingModal = () => {
  const { isOpen, closeBooking } = useBooking();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    callVolume: "",
    businessType: ""
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset form if closed
      setTimeout(() => setStep(1), 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay (this will later hook into n8n)
    setTimeout(() => {
      console.log("Lead captured:", formData);
      setIsSubmitting(false);
      setStep(2);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={closeBooking}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black/5 bg-slate-50/50">
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                {step === 1 ? "Book Your Voice Audit" : "Pick a Time"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {step === 1 
                  ? "Tell us a bit about your business before we speak."
                  : "Thanks — pick a time for your 15‑minute call below."}
              </p>
            </div>
            <button 
              onClick={closeBooking}
              className="p-2 rounded-full hover:bg-black/5 text-muted-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Name *</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Business Name *</label>
                    <input 
                      required
                      type="text" 
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                      placeholder="Acme Clinic"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email *</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Phone *</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                      placeholder="07700 900000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Roughly how many calls do you get each month? *</label>
                  <select 
                    required
                    name="callVolume"
                    value={formData.callVolume}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white text-foreground appearance-none"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Fewer than 100">Fewer than 100 calls per month</option>
                    <option value="100 - 300">100 – 300 calls per month</option>
                    <option value="301 - 600">301 – 600 calls per month</option>
                    <option value="601 - 1000">601 – 1,000 calls per month</option>
                    <option value="More than 1000">More than 1,000 calls per month</option>
                    <option value="Not sure">Not sure / it varies a lot</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Which best describes your business? (Optional)</label>
                  <input 
                    type="text" 
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white placeholder:text-muted-foreground/50"
                    placeholder="Aesthetics / Clinic / Estate agent / Trades / etc."
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full rounded-xl text-base h-14 relative"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Details...
                      </>
                    ) : (
                      "Continue to Calendar"
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    We'll never share your details with third parties.
                  </p>
                </div>
              </form>
            ) : (
              <div className="w-full h-[500px] md:h-[600px] bg-white rounded-xl overflow-hidden border border-black/5">
                <iframe 
                  src="https://cal.com/silverpath.ai/15min" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen 
                  className="w-full h-full"
                  title="Schedule a call"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
