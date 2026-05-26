import { motion } from "framer-motion";
import { ShieldCheck, Lock, Server, FileBadge, EyeOff } from "lucide-react";

const complianceItems = [
  {
    icon: ShieldCheck,
    title: "ICO Registered",
    subtitle: "Data Protection Act 2018"
  },
  {
    icon: Lock,
    title: "UK GDPR & PECR",
    subtitle: "Built for strict compliance"
  },
  {
    icon: Server,
    title: "AWS Hosted",
    subtitle: "Encrypted infrastructure"
  },
  {
    icon: FileBadge,
    title: "SOC Type I & II",
    subtitle: "Enterprise-grade voice platform"
  },
  {
    icon: EyeOff,
    title: "PII Redaction",
    subtitle: "Configurable data storage"
  }
];

export const ComplianceBanner = () => {
  return (
    <section className="py-16 bg-slate-950 border-y border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.25em]">
            Enterprise-Grade Security & Compliance
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {complianceItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-primary mb-4 shadow-lg group-hover:scale-110 group-hover:bg-slate-800 group-hover:border-primary/30 transition-all duration-300">
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="text-slate-200 font-bold text-sm tracking-wide mb-1">
                {item.title}
              </h4>
              <p className="text-slate-500 text-xs">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
