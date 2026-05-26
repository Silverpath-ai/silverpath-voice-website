import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

const steps = [
  {
    number: "01",
    title: "We map your ideal call flow",
    body: "We start with a 60–90 minute session to understand your services, pricing ranges, booking rules and FAQs. Together we design how your AI receptionist should greet callers, what questions to ask, and when to hand over to a human."
  },
  {
    number: "02",
    title: "We set up your AI receptionist",
    body: "We configure a natural‑sounding UK‑voiced agent on your line, powered with low‑latency voice stack, so conversations feel fast and human, not robotic."
  },
  {
    number: "03",
    title: "We connect your calendar and systems",
    body: "We plug the agent into your Google Calendar or Calendly, and for Professional and Growth clients we connect supported systems like Cliniko, Phorest, HubSpot or GoHighLevel so calls become real bookings and leads, not just messages."
  },
  {
    number: "04",
    title: "You start answering every call, 24/7",
    body: "Within 2–3 weeks, your AI receptionist is live — catching overflow and after‑hours calls, booking appointments, logging leads in your CRM, and sending your team clear summaries after each conversation."
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-card border-y border-black/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(185_100%_45%/0.03),transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            How Silverpath AI Voice Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A frictionless deployment process designed to get your AI receptionist live in weeks, not months.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 relative z-10 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="h-full"
            >
              <GlowCard className="p-8 h-full flex flex-col justify-start">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-mono font-bold text-xl">
                    {step.number}
                  </div>
                  <div className="h-px bg-black/5 flex-1" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {step.body}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-secondary px-6 py-3 rounded-full text-sm font-medium text-foreground">
            No new hardware. No scripts for you to write. We do the heavy lifting; you keep the calls and revenue.
          </div>
        </motion.div>
      </div>
    </section>
  );
};
