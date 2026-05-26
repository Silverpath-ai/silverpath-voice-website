import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

const verticals = [
  {
    title: "Aesthetics & wellness clinics",
    body: "Stop losing high-value treatment bookings when you're in session. We answer new patient enquiries, pre-screen them, and book consultations into your calendar or tools like Cliniko and Phorest."
  },
  {
    title: "Private physio & allied health",
    body: "Keep diaries full while you stay hands-on with patients. Your AI receptionist handles new patient calls, simple triage and bookings, and sends clear summaries to your team."
  },
  {
    title: "Estate agents & property managers",
    body: "Capture portal and phone enquiries around the clock. Turn missed calls into valuation visits and viewings — even on evenings and weekends when buyers are browsing listings."
  },
  {
    title: "Trades & garages",
    body: "Let an AI receptionist take bookings and quote requests while you're on site or in the workshop. You get WhatsApp and email summaries with jobs ready to schedule."
  }
];

export const Verticals = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">
            Who we're best for
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            The systems adapt. The methodology doesn't.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            CallCapture 24/7 is designed for call-driven UK service businesses where every missed call hurts. Right now, we're focused on:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verticals.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlowCard className="h-full group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {item.body}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
