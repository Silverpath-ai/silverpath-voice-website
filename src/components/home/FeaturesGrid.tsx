import { motion } from "framer-motion";
import { Zap, CheckCircle, Calendar, Clock, Users, Star } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";

const features = [
  {
    title: "Instant response",
    description: "Your agent answers or places a call within 2 seconds of the trigger. [CONFIRM]",
    icon: Zap,
  },
  {
    title: "Smart job qualification",
    description: "Uses your rules, such as job type, postcode and urgency, to tell emergencies from routine work.",
    icon: CheckCircle,
  },
  {
    title: "Automated booking",
    description: "Books jobs and call-outs straight onto your live calendar, with no human involved.",
    icon: Calendar,
  },
  {
    title: "Follow-up that sticks",
    description: "Sends a tailored SMS or email straight after the call.",
    icon: Clock,
  },
  {
    title: "Connects to your tools",
    description: "Works with Google Calendar, Calendly, HubSpot and GoHighLevel. Supported job-management tools are available on Pro. [CONFIRM which job tools are actually supported]",
    icon: Users,
  },
  {
    title: "Urgent calls handled",
    description: "Emergencies are flagged and passed to your team straight away, any time of day.",
    icon: Star,
  }
];

export const FeaturesGrid = () => {
  return (
    <section className="py-24 bg-slate-50 border-b border-black/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4"
          >
            Everything you need. Nothing you don't.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Built to capture jobs, answer questions and protect revenue.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <GlowCard className="p-8 h-full bg-white flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
