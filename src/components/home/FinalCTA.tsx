import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";

export const FinalCTA = () => {
  const { openBooking } = useBooking();
  return (
    <section className="py-32 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(185_100%_45%/0.15),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-background mb-6 leading-tight">
            Your next client is calling. <br className="hidden md:block" />
            <span className="text-primary">Will you be ready?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Ready to stop losing money to voicemail? Book a free 15-minute discovery call and we'll show you how many calls and bookings Silverpath AI could recover for your business each month.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto rounded-full text-base h-14 px-8 shadow-xl shadow-primary/20" onClick={openBooking}>
              Book a 15‑minute call
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto text-base rounded-full px-8 bg-transparent text-background border-background/20 hover:bg-white/10 hover:text-background transition-colors group"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Listen to a live demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
