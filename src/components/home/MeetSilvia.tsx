import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Phone, MessageSquare, Zap, UserCheck, Calendar } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "A Prospect Calls",
    description: "A potential client visits the Silverpath website and calls the main number to ask about AI agents.",
    icon: Phone,
    color: "from-cyan-400 to-cyan-600"
  },
  {
    number: 2,
    title: "Silvia Answers",
    description: "In under 2 seconds, Silvia answers with a natural, professional UK voice, ready to assist.",
    icon: MessageSquare,
    color: "from-cyan-500 to-cyan-700"
  },
  {
    number: 3,
    title: "Answers Questions",
    description: "The prospect asks about pricing and integrations. Silvia provides precise answers from our knowledge base.",
    icon: Zap,
    color: "from-cyan-300 to-cyan-500"
  },
  {
    number: 4,
    title: "Silvia Qualifies",
    description: "Silvia asks a few quick questions about call volume and business type to qualify the lead.",
    icon: UserCheck,
    color: "from-cyan-600 to-cyan-800"
  },
  {
    number: 5,
    title: "Silvia Books",
    description: "Once qualified, Silvia schedules a Voice Audit directly on our calendar and sends a confirmation SMS.",
    icon: Calendar,
    color: "from-cyan-400 to-cyan-500"
  }
];

export const MeetSilvia = () => {
  return (
    <section id="silvia-demo" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Meet Silvia: How She Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Silvia is our own front-line AI agent. She doesn't just answer phones; she handles 
            complex enquiries, qualifies potential clients, and drives revenue while you sleep.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-4 relative px-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className={`w-full lg:w-1/5 group transition-transform duration-500 ${
                index % 2 === 1 ? "lg:translate-y-12" : ""
              }`}
            >
              <GlowCard className="p-6 h-full flex flex-col items-center text-center relative bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-black/5 rounded-3xl">
                {/* Number Badge */}
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br ${step.color} text-white flex items-center justify-center font-mono font-bold shadow-lg z-20`}>
                  {step.number}
                </div>

                {/* Icon Container */}
                <div className="mt-4 mb-6 relative">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="w-8 h-8" />
                  </div>
                  {/* Subtle pulsing ring */}
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-ping opacity-20 scale-125" />
                </div>

                <h3 className="text-lg font-display font-bold text-foreground mb-3 px-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom decorative bar */}
                <div className={`mt-auto pt-6 w-12 h-1 bg-gradient-to-r ${step.color} rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Transition message to Live Demo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 lg:mt-32 text-center"
        >
          <div className="inline-flex items-center gap-3 text-primary font-semibold tracking-wide uppercase text-sm">
            <span className="w-8 h-px bg-primary/30" />
            Ready to hear her in action?
            <span className="w-8 h-px bg-primary/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
