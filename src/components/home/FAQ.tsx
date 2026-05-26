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
    question: "How quickly can we go live?",
    answer: "Most clients go live within 2–3 weeks. That includes mapping your call flows, setting up your AI receptionist, connecting calendars/systems and running a short test period."
  },
  {
    question: "Will this replace my reception team?",
    answer: "For many businesses, Silverpath AI complements humans rather than replacing them. The AI catches overflow and after-hours calls and handles simple bookings and FAQs; your team focuses on in-person service and complex cases."
  },
  {
    question: "Does it work with my booking system/CRM?",
    answer: "Starter connects to Google Calendar/Calendly. Professional and Growth include one supported integration (e.g. Cliniko, Phorest, HubSpot, GoHighLevel); we can discuss others on a call."
  },
  {
    question: "What if the AI doesn't understand someone?",
    answer: "If the AI gets stuck or detects frustration, it can apologise, gather basic details and hand over a message. We review early calls with you and tune the agent to your callers."
  },
  {
    question: "What about UK accents?",
    answer: "Retell AI is built for natural conversational speech and performs well with a wide range of UK accents. We test with your team to catch any edge cases."
  },
  {
    question: "Where is call data stored, and is it GDPR-compliant?",
    answer: "Calls are processed via encrypted infrastructure and can be configured with PII redaction and limited retention. We'll walk you through how we handle call recordings and transcripts and help you update your privacy notice so you stay firmly inside UK GDPR expectations."
  },
  {
    question: "Can we stop if it isn't a fit?",
    answer: "We start with a minimum term (3 or 6 months depending on plan). If after the initial period you're not seeing clear value, you can cancel with 30 days' notice."
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
              <p className="text-sm text-muted-foreground">Powered by an enterprise-grade voice platform used to run thousands of phone agents worldwide. Low-latency, natural UK voices.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-bold text-foreground mb-2">UK-first and compliance-aware</h4>
              <p className="text-sm text-muted-foreground">Designed around UK calling habits. Configured to align with UK GDPR and PECR guidance for inbound and warm outbound calls.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-foreground mb-2">Done-for-you, not DIY tech</h4>
              <p className="text-sm text-muted-foreground">We handle call-flow design, AI configuration, telephony setup and optimisation. Your team just sees more booked appointments.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
