import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GlowCard } from "@/components/ui/GlowCard";

const faqs = [
  {
    question: "What counts as a minute?",
    answer: "Only time your agent spends on a call. Usage is measured to the second, not rounded up per call."
  },
  {
    question: "What happens if I go over my minutes?",
    answer: "Extra minutes are billed monthly at your plan's overage rate. We can alert you as you approach your allowance. [BUILD]"
  },
  {
    question: "Will callers know they're talking to AI?",
    answer: "Yes. Your agent introduces itself as an automated assistant, and callers can ask for a person at any time."
  },
  {
    question: "What about emergencies?",
    answer: "You decide which calls count as urgent. They are flagged and sent to your team by call transfer, SMS or both, using rules you approve."
  },
  {
    question: "What if the agent can't help?",
    answer: "It takes a message, or hands the caller to your team, depending on your rules."
  },
  {
    question: "Do I need a new phone number?",
    answer: "No. You can forward your existing line, or use a UK number we provide."
  },
  {
    question: "What happens to call data?",
    answer: "You choose what is stored and for how long. Recording and transcript retention are configurable, and personal data can be redacted. [CONFIRM your data processing agreement is ready to offer]"
  },
  {
    question: "Is there a contract?",
    answer: "Core has a 3-month minimum and Pro has a 6-month minimum. After that, you can move up, down or cancel with notice. [CONFIRM notice period]"
  },
  {
    question: "Which systems does it connect to?",
    answer: "Google Calendar, Calendly, HubSpot and GoHighLevel, plus supported booking and job tools. [CONFIRM exact list]"
  }
];

export const FAQ = () => {
  return (
    <section className="py-24 bg-card border-y border-black/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(185_100%_45%/0.03),transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Questions we get a lot
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlowCard className="p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlowCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 border-t border-black/5 pt-16"
        >
          <h3 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
            Why UK businesses choose Silverpath AI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h4 className="font-bold text-foreground mb-2">Built on proven voice AI</h4>
              <p className="text-sm text-muted-foreground">Powered by an enterprise-grade voice platform used to run thousands of phone agents worldwide. Low latency and natural UK voices.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-bold text-foreground mb-2">UK-first and compliance-aware</h4>
              <p className="text-sm text-muted-foreground">Designed around UK calling habits and configured to align with UK GDPR and PECR guidance.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-foreground mb-2">Guided setup, not DIY tech</h4>
              <p className="text-sm text-muted-foreground">We help you set up the call flow, AI configuration and telephony, so you don't have to build any of it.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
