import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    label: "first step into AI call handling",
    setup: "£997 setup",
    price: "£297",
    period: "/month",
    included: "300 AI minutes included",
    subline: "For solo practitioners and small owner-operated UK businesses.",
    bullets: [
      "24/7 overflow and after-hours call handling",
      "One inbound AI receptionist",
      "Up to 10 FAQs answered (hours, pricing ranges, location, etc.)",
      "Booking into Google Calendar or Calendly",
      "One UK number or call-forwarding from your existing line",
      "Two rounds of revisions pre-launch",
      "30-day optimisation check-in",
      "Email support",
      "Overage minutes at £0.18/min"
    ],
    cta: "Talk about Starter",
    featured: false
  },
  {
    name: "Professional",
    label: "for growing clinics and service businesses",
    setup: "£1,997 setup",
    price: "£597",
    period: "/month",
    included: "800 AI minutes included",
    subline: "For UK clinics and service businesses that need deeper integration and higher volume.",
    bullets: [
      "Everything in Starter",
      "24/7 call handling for higher volume",
      "Integration with one supported CRM or booking system (e.g. HubSpot, GoHighLevel, Cliniko, Phorest, Fresha)",
      "Automatic lead capture and CRM updates from every call",
      "Call summaries by email/SMS after each conversation",
      "Up to 25 FAQs and more advanced call flows",
      "Priority email and WhatsApp support",
      "Quarterly performance review",
      "Overage minutes at £0.16/min"
    ],
    cta: "Talk about Professional",
    featured: true
  },
  {
    name: "Growth",
    label: "inbound, lead capture + warm reactivation",
    setup: "£3,497 setup",
    price: "£1,197",
    period: "/month",
    included: "1,500 AI minutes included",
    subline: "For established UK service businesses with larger client lists and marketing spend.",
    bullets: [
      "Everything in Professional",
      "Two agents: inbound receptionist + warm outbound reactivation",
      "Up to 500 warm outbound calls/month to existing clients/no-shows/unconverted leads (no cold calling; consented contacts only)",
      "Full CRM pipeline updates and outcome tagging",
      "Weekly performance reports (calls, bookings, reactivations, estimated revenue impact)",
      "Dedicated WhatsApp support line",
      "One in-depth optimisation sprint each quarter",
      "Overage minutes at £0.14/min"
    ],
    cta: "Talk about Growth",
    featured: false
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
            Every plan includes done-for-you setup, UK-specific call flows and 24/7 AI call handling powered by Retell AI. You can move up or down a plan as your call volume changes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
