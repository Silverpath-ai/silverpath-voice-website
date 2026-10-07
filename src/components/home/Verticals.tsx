import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

const verticals = [
  {
    title: "Plumbing, heating and gas engineers",
    body: "Never lose a call-out because you were on a job. Your agent takes the details, flags emergencies and books the visit. Urgent calls are passed to your team straight away."
  },
  {
    title: "Electricians and multi-trade firms",
    body: "Capture quote requests and job details while you work. You get a summary by email or WhatsApp, with the job ready to schedule."
  },
  {
    title: "Property maintenance and lettings",
    body: "Take tenant and landlord repair calls around the clock. Log the issue, classify urgency and send it to the right person."
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
            Built for businesses that win work by phone.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Silverpath is built first for UK trades and property maintenance firms, where every missed call is a lost job.
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center max-w-3xl mx-auto space-y-4"
        >
          <p className="text-base text-foreground font-medium">
            Also works for: clinics, physio and allied health, estate agents and garages.
          </p>
          <p className="text-xs text-muted-foreground">
            Silverpath doesn't give technical or safety advice. For emergencies, your agent follows instructions you approve, such as directing gas emergencies to the National Gas Emergency Service on 0800 111 999.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
