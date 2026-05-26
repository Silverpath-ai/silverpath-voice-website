import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";

export const LiveDemo = () => {
  return (
    <section id="demo" className="py-24 bg-card border-y border-black/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Speak with Silvia right now
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Now that you've seen the protocol, experience it for yourself. Call Silvia on our demo line to see how she handles complex questions, qualifies your intent, and manages our calendar in real-time.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Demo Card */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlowCard className="p-8 text-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>

                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Demo Number</p>
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 tracking-wider">
                  0800 123 4567
                </div>

                <Button size="lg" className="w-full mb-6 rounded-full text-base shadow-md group">
                  <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Tap to call the demo
                </Button>

                <button className="text-sm text-primary font-medium hover:underline flex items-center justify-center gap-2 mx-auto mb-6 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Prefer a quick listen? Play a sample call recording.
                </button>

                <p className="text-xs text-muted-foreground px-4 border-t border-black/5 pt-6">
                  Silvia is a demonstration agent. Your custom agent will be trained on your specific services, pricing, and booking rules during your onboarding.
                </p>
              </GlowCard>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
