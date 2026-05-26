import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, TrendingUp, Calculator } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

// ─── Constants ───────────────────────────────────────────────
const AI_MISSED_PERCENT = 3;
const RECOVERY_FACTOR = 0.8;
const WEEKS_PER_MONTH = 4.33;
const PLAN_PRICES: Record<string, number> = {
  starter: 297,
  professional: 597,
  growth: 1197,
};

const BUSINESS_TYPES = [
  { value: "", label: "Select your business type (optional)" },
  { value: "aesthetics", label: "Aesthetics / wellness clinic" },
  { value: "physio", label: "Physio / allied health clinic" },
  { value: "estate", label: "Estate agency / property management" },
  { value: "trades", label: "Trades / garage" },
  { value: "other", label: "Other service business" },
];

const BUSINESS_COPY: Record<string, string> = {
  aesthetics: "For a clinic like yours",
  physio: "For a practice like yours",
  estate: "For an agency like yours",
  trades: "For a business like yours",
  other: "For a business like yours",
  "": "Based on your numbers",
};



// ─── Animated Counter ───────────────────────────────────────
const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(Math.max(0, v)).toLocaleString("en-GB"));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v}${suffix}`;
      }
    });
    return unsubscribe;
  }, [display, prefix, suffix]);

  return <span ref={ref}>{prefix}{Math.round(Math.max(0, value)).toLocaleString("en-GB")}{suffix}</span>;
};

// ─── Custom Slider ──────────────────────────────────────────
interface SliderFieldProps {
  label: string;
  helper?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
}

const SliderField = ({
  label,
  helper,
  value,
  onChange,
  min,
  max,
  step,
  suffix = "",
  prefix = "",
}: SliderFieldProps) => {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        <span className="font-mono text-primary font-bold text-sm tabular-nums bg-primary/10 px-3 py-1 rounded-full">
          {prefix}
          {value.toLocaleString("en-GB")}
          {suffix}
        </span>
      </div>
      <div className="relative h-2 w-full">
        <div className="absolute inset-0 rounded-full bg-slate-200" />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/70 to-primary transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-md pointer-events-none transition-all duration-150"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
      {helper && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {helper}
        </p>
      )}
    </div>
  );
};

// ─── Number Input ───────────────────────────────────────────
interface NumberFieldProps {
  label: string;
  helper?: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  prefix?: string;
}

const NumberField = ({
  label,
  helper,
  value,
  onChange,
  placeholder,
  prefix,
}: NumberFieldProps) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-foreground block">
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
          {prefix}
        </span>
      )}
      <input
        type="number"
        min={0}
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white text-foreground ${prefix ? "pl-8" : ""}`}
      />
    </div>
    {helper && (
      <p className="text-xs text-muted-foreground leading-relaxed">{helper}</p>
    )}
  </div>
);

// ─── Main Component ─────────────────────────────────────────
export const ProblemROI = () => {
  const { openBooking } = useBooking();

  // Business type
  const [businessType, setBusinessType] = useState("");

  // Quick-mode inputs
  const [callsPerMonth, setCallsPerMonth] = useState(150);
  const [missedPercent, setMissedPercent] = useState(20);
  const [conversionPercent, setConversionPercent] = useState(25);
  const [revenuePerBooking, setRevenuePerBooking] = useState(150);
  const [plan, setPlan] = useState<string>("professional");

  // Advanced mode
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(18);

  // Results visibility
  const [showResults, setShowResults] = useState(false);

  // ─── Calculations (always live) ────────────────────────────
  const missedCalls = callsPerMonth * (missedPercent / 100);
  const potentialClientsFromMissed = missedCalls * (conversionPercent / 100);
  const lostRevenuePerMonth = potentialClientsFromMissed * revenuePerBooking;
  const lostRevenuePerYear = lostRevenuePerMonth * 12;

  const aiMissedCalls = callsPerMonth * (AI_MISSED_PERCENT / 100);
  const aiLostClients = aiMissedCalls * (conversionPercent / 100);
  const aiLostRevenue = aiLostClients * revenuePerBooking;

  const recoveredRevenuePerMonth = Math.max(
    0,
    (lostRevenuePerMonth - aiLostRevenue) * RECOVERY_FACTOR
  );

  // Labour savings
  const monthlyCallHours = hoursPerWeek * WEEKS_PER_MONTH;
  const labourSavingsPerMonth = showAdvanced
    ? monthlyCallHours * hourlyCost * 0.5
    : 0;

  // ROI
  const planMonthlyCost = PLAN_PRICES[plan] || 0;
  const netBenefitPerMonth =
    recoveredRevenuePerMonth + labourSavingsPerMonth - planMonthlyCost;
  const roiMultiple =
    planMonthlyCost > 0
      ? (recoveredRevenuePerMonth + labourSavingsPerMonth) / planMonthlyCost
      : 0;

  const planLabel =
    plan === "starter"
      ? "Starter"
      : plan === "professional"
        ? "Professional"
        : "Growth";

  const businessCopy = BUSINESS_COPY[businessType] || BUSINESS_COPY[""];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* ─── Left Column: Narrative ──────────────────────── */}
          <div className="flex-1 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8 leading-tight">
                Your voicemail is costing you more than you think
              </h2>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  For most UK service businesses, the phone still drives the
                  best leads — but those calls often land when you're in
                  treatment, on site, or already speaking to someone.
                </p>
                <p>
                  When the line is busy or the call goes to voicemail, most
                  people don't leave a message or call back. They tap the next
                  result on Google and book with a competitor instead.
                </p>
                <p className="font-semibold text-foreground">
                  Across clinics, trades and local services, that can easily add
                  up to thousands of pounds a month in missed work and wasted
                  marketing spend.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-3 text-primary">
                <Calculator className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wider">
                  Use the calculator to see your numbers →
                </span>
              </div>
            </motion.div>
          </div>

          {/* ─── Right Column: Calculator ────────────────────── */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlowCard className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-display font-bold text-foreground">
                    ROI Calculator
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-8">
                  See what missed calls are really costing you — and what
                  Silverpath AI could recover.
                </p>

                <div className="space-y-7">
                  {/* ── Business Type Selector ───────────────── */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground block">
                      What type of business do you run?
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white text-foreground appearance-none"
                    >
                      {BUSINESS_TYPES.map((bt) => (
                        <option key={bt.value} value={bt.value}>
                          {bt.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground">
                      We use this to customise your results. It's optional.
                    </p>
                  </div>

                  {/* ── Quick Inputs ─────────────────────────── */}
                  <SliderField
                    label="Inbound calls per month"
                    helper="Think of all phone enquiries — new and existing clients."
                    value={callsPerMonth}
                    onChange={setCallsPerMonth}
                    min={10}
                    max={1000}
                    step={10}
                  />

                  <SliderField
                    label="% of calls you miss or can't answer"
                    helper="Most UK service businesses miss 10–30% of calls at busy times or after hours."
                    value={missedPercent}
                    onChange={setMissedPercent}
                    min={5}
                    max={50}
                    step={5}
                    suffix="%"
                  />

                  <SliderField
                    label="% of answered calls that convert"
                    helper="For many clinics and trades, 20–40% of answered calls lead to paid work."
                    value={conversionPercent}
                    onChange={setConversionPercent}
                    min={5}
                    max={60}
                    step={5}
                    suffix="%"
                  />

                  <SliderField
                    label="Average value per new client / booking"
                    helper="First treatment value, average job value, or typical first-month spend."
                    value={revenuePerBooking}
                    onChange={setRevenuePerBooking}
                    min={20}
                    max={2000}
                    step={10}
                    prefix="£"
                  />

                  {/* ── Plan Selector ────────────────────────── */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground block">
                      Which Silverpath AI plan are you considering?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["starter", "professional", "growth"] as const).map(
                        (p) => (
                          <button
                            key={p}
                            onClick={() => setPlan(p)}
                            className={`py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                              plan === p
                                ? "bg-primary text-white border-primary shadow-md"
                                : "bg-white text-foreground border-black/10 hover:border-primary/30"
                            }`}
                          >
                            {p === "starter"
                              ? "Starter"
                              : p === "professional"
                                ? "Pro"
                                : "Growth"}
                            <span className="block text-[10px] mt-1 font-mono opacity-80">
                              £{PLAN_PRICES[p]}/mo
                            </span>
                          </button>
                        )
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You can change this later — we'll use it to compare ROI.
                    </p>
                  </div>

                  {/* ── Advanced Toggle ───────────────────────── */}
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-all"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""}`}
                    />
                    {showAdvanced
                      ? "Hide advanced options"
                      : "+ Advanced options (labour savings)"}
                  </button>

                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden space-y-6 border-t border-black/5 pt-6"
                      >
                        <SliderField
                          label="Staff hours/week spent on calls"
                          helper="Include answering, returning missed calls, and admin."
                          value={hoursPerWeek}
                          onChange={setHoursPerWeek}
                          min={1}
                          max={40}
                          step={1}
                          suffix="hrs"
                        />
                        <NumberField
                          label="Average fully-loaded hourly cost (£)"
                          helper="Include wages plus NI and pension. Often £15–25+/hour in the UK."
                          value={hourlyCost}
                          onChange={setHourlyCost}
                          placeholder="e.g. 18"
                          prefix="£"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── CTA Button ───────────────────────────── */}
                  {!showResults && (
                    <Button
                      size="lg"
                      className="w-full rounded-xl text-base h-14"
                      onClick={() => setShowResults(true)}
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate my ROI
                    </Button>
                  )}
                </div>

                {/* ─── Results Card (live-updating) ──────────── */}
                <AnimatePresence>
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                      className="mt-8 space-y-6"
                    >
                      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                      {/* Headline stat */}
                      <div className="bg-slate-950 rounded-2xl p-6 text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
                          {businessCopy}, you're currently losing
                        </p>
                        <div className="text-4xl md:text-5xl font-display font-bold text-white mb-1">
                          <AnimatedNumber value={lostRevenuePerMonth} prefix="£" />
                          <span className="text-lg text-slate-400 font-medium">
                            /month
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">
                          That's about{" "}
                          <strong className="text-slate-300">
                            <AnimatedNumber value={lostRevenuePerYear} prefix="£" />/year
                          </strong>{" "}
                          walking out the door.
                        </p>
                      </div>

                      {/* Recovery */}
                      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
                        <p className="text-sm font-semibold text-foreground mb-4">
                          With Silverpath AI on your{" "}
                          <span className="text-primary">{planLabel}</span> plan:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                              Recovered Revenue
                            </p>
                            <p className="text-2xl font-bold text-foreground">
                              <AnimatedNumber value={recoveredRevenuePerMonth} prefix="£" />
                              <span className="text-xs text-muted-foreground font-medium">
                                /mo
                              </span>
                            </p>
                          </div>
                          {showAdvanced && labourSavingsPerMonth > 0 && (
                            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                Labour Savings
                              </p>
                              <p className="text-2xl font-bold text-foreground">
                                <AnimatedNumber value={labourSavingsPerMonth} prefix="£" />
                                <span className="text-xs text-muted-foreground font-medium">
                                  /mo
                                </span>
                              </p>
                            </div>
                          )}
                          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                              Plan Cost
                            </p>
                            <p className="text-2xl font-bold text-muted-foreground">
                              -<AnimatedNumber value={planMonthlyCost} prefix="£" />
                              <span className="text-xs font-medium">/mo</span>
                            </p>
                          </div>
                          <div
                            className={`rounded-xl p-4 text-center shadow-sm ${netBenefitPerMonth >= 0 ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"}`}
                          >
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                              Net Gain
                            </p>
                            <p
                              className={`text-2xl font-bold ${netBenefitPerMonth >= 0 ? "text-emerald-600" : "text-red-600"}`}
                            >
                              <AnimatedNumber value={netBenefitPerMonth} prefix="£" />
                              <span className="text-xs font-medium">/mo</span>
                            </p>
                          </div>
                        </div>

                        {roiMultiple > 0 && (
                          <p className="text-sm text-foreground mt-4 text-center">
                            That's roughly{" "}
                            <strong className="text-primary">
                              {roiMultiple.toFixed(1)}x
                            </strong>{" "}
                            return on every £1 you invest in Silverpath AI.
                          </p>
                        )}
                      </div>

                      {/* Assumptions */}
                      <div className="text-xs text-muted-foreground bg-slate-50 rounded-xl p-4 leading-relaxed">
                        <p className="mb-2">
                          We've assumed your AI receptionist answers almost all
                          calls (around a 3% miss rate) and recovers roughly 80%
                          of revenue currently lost to voicemail or busy lines,
                          based on typical results for AI reception services.
                        </p>
                        <p>
                          On a short call we can plug in your actual call logs
                          and pricing to build a more precise model for your
                          business.
                        </p>
                      </div>

                      {/* CTA */}
                      <Button
                        size="lg"
                        className="w-full rounded-xl text-base h-14 shadow-lg"
                        onClick={openBooking}
                      >
                        Book a 15‑minute call to review your numbers
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
