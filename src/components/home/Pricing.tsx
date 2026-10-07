import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Core",
    label: "For call-driven UK trades and service businesses",
    setup: "£597 one-off setup",
    minTerm: "3-month minimum",
    price: "£497",
    period: "/month",
    included: "600 AI minutes included",
    subline: "For clinics, aesthetics, physio, estate agents, trades, and local services.",
    bullets: [
      "24/7 inbound call handling for your main line (overflow and after-hours)",
      "One inbound AI agent, using your business name",
      "Booking into Google Calendar, Calendly, Cliniko or Phorest",
      "Integration with one supported CRM or booking system",
      "Automatic lead capture and updates from every call",
      "Call summaries by email",
      "Up to 20 FAQs configured",
      "One UK number provided, or call forwarding",
      "Two rounds of call-flow revisions before launch",
      "30-day optimisation check-in",
      "Email support and a monthly outcomes report",
      "Extra minutes at £0.35/min"
    ],
    cta: "Talk about Core",
    featured: false
  },
  {
    name: "Pro",
    label: "For growing trades and multi-site businesses",
    setup: "£997 one-off setup",
    minTerm: "6-month minimum",
    price: "£997",
    period: "/month",
    included: "1,500 AI minutes included",
    subline: "For businesses wanting to recover revenue from existing lists, not just protect inbound.",
    bullets: [
      "Everything in Core",
      "Consent-based follow-up calls (up to 300 a month), such as quote follow-ups and service reminders",
      "Inbound agent plus a follow-up agent",
      "Up to two CRM or booking integrations",
      "Full pipeline updates and outcome tagging",
      "Advanced flows: multi-step urgency triage, conditional routing",
      "Up to 40 FAQs",
      "Weekly performance reports",
      "Priority support",
      "Monthly review of call outcomes and call flow",
      "Extra minutes at £0.30/min",
      "Heavier campaigns quoted separately"
    ],
    cta: "Talk about Pro",
    featured: true
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Choose a plan that fits your call volume
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every plan includes guided setup, UK call flows and 24/7 AI call handling, powered by Retell AI. You can move up or down as your call volume changes. Prices exclude VAT.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex h-full ${plan.featured ? "md:-mt-4 md:mb-4" : ""}`}
            >
              <GlowCard className={`w-full flex flex-col p-8 ${plan.featured ? "border-primary/50 shadow-[0_0_30px_rgba(0,255,255,0.1)] relative" : ""}`}>
                
                {plan.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-6 h-8">{plan.label}</p>
                  
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="text-foreground font-medium">{plan.setup}</span>
                    <span className="text-muted-foreground font-medium">{plan.minTerm}</span>
                    <span className="text-primary font-medium">{plan.included}</span>
                  </div>
                </div>

                <p className="text-sm text-foreground font-medium mb-6 min-h-[40px]">
                  {plan.subline}
                </p>

                <div className="h-px bg-black/5 w-full mb-6" />

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={bullet.includes("Everything in") ? "font-semibold text-foreground" : ""}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.featured ? "default" : "outline"} 
                  className={`w-full ${plan.featured ? "shadow-lg" : ""}`}
                >
                  {plan.cta}
                </Button>

              </GlowCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            * Minutes are measured to the second. Usage alerts at 70%, 90% and 100% of your allowance. Unused minutes don't roll over.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-xl">
            <strong className="text-foreground">Early-adopter founder pricing</strong> is available for the first three UK clients we onboard, in exchange for a detailed case study and testimonial. Ask about founder pricing on your discovery call.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
