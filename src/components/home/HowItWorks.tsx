import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

const steps = [
  {
    number: "01",
    title: "Start from a template built for your trade",
    body: "Pick plumbing and heating, electrical or property maintenance. Your call flow arrives ready-made, with the right questions, urgency levels and booking steps."
  },
  {
    number: "02",
    title: "Add your rules",
    body: "Enter your service areas, opening hours, emergency rules and FAQs in a short setup form. It takes about 30 minutes."
  },
  {
    number: "03",
    title: "Connect your diary",
    body: "Link Google Calendar or Calendly. On Pro, connect HubSpot or GoHighLevel too. Before it books anything, Silverpath checks your real availability."
  },
  {
    number: "04",
    title: "Test it, then switch on",
    body: "Call your agent and listen back, then adjust anything you don't like. When you're happy, forward your line. Every call is then answered, and every outcome shows up in your dashboard."
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
            How Silverpath Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a template, add your rules, connect your diary and switch on. Most businesses are taking calls within a week.
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
            Stuck on any step? Onboarding support is included.
          </div>
        </motion.div>
      </div>
    </section>
  );
};
