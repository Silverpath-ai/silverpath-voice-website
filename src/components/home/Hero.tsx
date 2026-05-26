import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { openBooking } = useBooking();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 noise-bg pointer-events-none" />
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-200/10 rounded-full blur-[80px] pointer-events-none"
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Column: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-widest mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Built for UK clinics and service businesses
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-foreground mb-6"
            >
              Never miss a <br className="hidden md:block" />
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">call again.</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-cyan-100/50 -z-10 -rotate-2" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10"
            >
              Silverpath AI gives your business a professional receptionist that answers every call, handles enquiries, and books appointments — 24 hours a day, 7 days a week. You keep doing what you do best.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button size="lg" className="w-full sm:w-auto text-base rounded-full px-8 shadow-lg hover:shadow-xl transition-shadow group" onClick={openBooking}>
                Book a 15-minute call
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-base rounded-full px-8 bg-transparent hover:bg-white hover:text-primary transition-colors group"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                Listen to a live demo
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Visualizer */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
              className="glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 z-0" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-8 w-full">
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-foreground tracking-widest uppercase">Live Voice Processing</span>
                  </div>
                  <div className="h-px bg-black/10 flex-1" />
                  <span className="text-xs font-mono text-muted-foreground">00:14</span>
                </div>

                {/* Animated Frequency Waves */}
                <div className="flex items-center justify-center gap-1.5 h-32 w-full mb-8">
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 rounded-full bg-primary"
                      animate={{
                        height: ["20%", "80%", "30%", "100%", "40%", "20%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>

                <div className="w-full bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-black/5">
                  <p className="text-sm font-medium text-foreground mb-1 text-left">Agent Analysis</p>
                  <p className="text-xs text-muted-foreground font-mono text-left opacity-70">
                    Intent: New Patient Booking<br/>
                    Status: Checking Calendar Availability...
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-black/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Appointment Booked</p>
                <p className="text-[10px] text-muted-foreground">Just now</p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
