import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { RetellWebClient } from "retell-client-js-sdk";
import { Loader2, Mic, MicOff, PhoneOff, PhoneCall, Volume2 } from "lucide-react";

const retellWebClient = new RetellWebClient();

export const LiveDemo = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "active">("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  // Lead Gen Gate State
  const [gatePassed, setGatePassed] = useState(false);
  const [isSubmittingGate, setIsSubmittingGate] = useState(false);
  const [gateFormData, setGateFormData] = useState({
    name: "",
    email: "",
    businessType: ""
  });

  // Check if visitor has already unlocked the demo
  useEffect(() => {
    const passed = localStorage.getItem("silvia_gate_passed") === "true";
    setGatePassed(passed);
  }, []);

  const handleGateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setGateFormData({
      ...gateFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingGate(true);
    try {
      const response = await fetch("/api/capture-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: gateFormData.name,
          email: gateFormData.email,
          businessType: gateFormData.businessType
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to capture lead details");
      }

      localStorage.setItem("silvia_gate_passed", "true");
      setGatePassed(true);
    } catch (error) {
      console.error("Error capturing lead:", error);
      alert("Failed to unlock demo. Please check your connection and try again.");
    } finally {
      setIsSubmittingGate(false);
    }
  };

  useEffect(() => {
    retellWebClient.on("call_started", () => {
      setCallStatus("active");
    });

    retellWebClient.on("call_ended", () => {
      setIsCalling(false);
      setCallStatus("idle");
      setIsMuted(false);
    });

    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      setIsCalling(false);
      setCallStatus("idle");
      setIsMuted(false);
    });

    return () => {
      retellWebClient.off("call_started");
      retellWebClient.off("call_ended");
      retellWebClient.off("error");
    };
  }, []);

  // Timer Effect
  useEffect(() => {
    let interval: any;
    if (callStatus === "active") {
      interval = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleCall = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
      setIsCalling(false);
      setCallStatus("idle");
    } else {
      setIsCalling(true);
      setCallStatus("connecting");
      try {
        const response = await fetch("/api/create-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agentId: import.meta.env.VITE_RETELL_AGENT_ID || "YOUR_AGENT_ID", // The user can replace this
          }),
        });
        
        if (!response.ok) {
          throw new Error("Failed to get access token");
        }
        
        const data = await response.json();
        
        await retellWebClient.startCall({
          accessToken: data.access_token,
        });
      } catch (error) {
        console.error("Failed to start call:", error);
        setIsCalling(false);
        setCallStatus("idle");
        alert("Failed to start the call. Please make sure the API key and Agent ID are configured.");
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Standard web RTC audio track toggle could be added here if needed,
    // otherwise visual state update works cleanly as indicator.
  };

  return (
    <section id="demo" className="py-24 bg-card border-y border-black/5 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Speak with Silvia right now
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Now that you've seen the protocol, experience it for yourself. Call Silvia on our demo line or speak directly through your browser to see how she handles complex questions, qualifies your intent, and manages our calendar in real-time.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Demo Card */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlowCard className="p-8 text-center relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-secondary text-primary">
                    <Mic className="w-10 h-10" />
                  </div>

                  {!gatePassed ? (
                    <form onSubmit={handleGateSubmit} className="space-y-4 text-left bg-slate-50/50 p-5 rounded-2xl border border-black/5">
                      <div className="text-center mb-4 border-b border-black/5 pb-3">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em] mb-1">Demo Verification</p>
                        <p className="text-xs text-muted-foreground">Unlock both browser calls and direct dial-in numbers.</p>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Name</label>
                        <input 
                          required
                          type="text" 
                          name="name"
                          value={gateFormData.name}
                          onChange={handleGateInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-2.5 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all bg-white text-foreground"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Email</label>
                        <input 
                          required
                          type="email" 
                          name="email"
                          value={gateFormData.email}
                          onChange={handleGateInputChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all bg-white text-foreground"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Business Type</label>
                        <select 
                          required
                          name="businessType"
                          value={gateFormData.businessType}
                          onChange={handleGateInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all bg-white text-foreground appearance-none"
                        >
                          <option value="" disabled>Select your business type</option>
                          <option value="Aesthetics / Wellness Clinic">Aesthetics / Wellness Clinic</option>
                          <option value="Physiotherapy / Allied Health">Physiotherapy / Allied Health</option>
                          <option value="Estate Agent">Estate Agent</option>
                          <option value="Trades / Garage">Trades / Garage</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="pt-2">
                        <Button 
                          type="submit" 
                          size="lg" 
                          disabled={isSubmittingGate}
                          className="w-full rounded-xl text-base h-12 relative shadow-sm"
                        >
                          {isSubmittingGate ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin mr-2" />
                              Unlocking...
                            </>
                          ) : (
                            "Unlock Silvia Demo →"
                          )}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="mb-8">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Option 1: Call Demo Number</p>
                        <div className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-wider mb-2">
                          0800 123 4567
                        </div>
                      </div>

                      <div className="relative flex items-center py-4 mb-4">
                        <div className="flex-grow border-t border-black/10"></div>
                        <span className="flex-shrink-0 mx-4 text-sm text-muted-foreground font-medium uppercase tracking-widest">Or</span>
                        <div className="flex-grow border-t border-black/10"></div>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Option 2: Speak in Browser</p>
                        <Button 
                          size="lg" 
                          onClick={toggleCall}
                          className="w-full rounded-full text-base shadow-md group bg-primary hover:bg-primary/90 text-white"
                        >
                          <PhoneCall className="w-5 h-5 mr-2 animate-pulse" />
                          Tap to speak in browser
                        </Button>
                      </div>
                    </>
                  )}

                  <p className="text-xs text-muted-foreground px-4 border-t border-black/5 pt-6 mt-2">
                    Silvia is a demonstration agent. Your custom agent will be trained on your specific services, pricing, and booking rules during your onboarding.
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          </div>

        </div>
      </div>

      {/* CALL OVERLAY INTERFACE */}
      <AnimatePresence>
        {(callStatus === "connecting" || callStatus === "active") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/40 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-sm h-[580px] bg-white/80 border border-black/5 rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col justify-between p-8 text-center"
            >
              {/* Premium Top Bar Design */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <div className="flex justify-between items-center w-full px-4 text-xs font-semibold text-muted-foreground/60 tracking-wider">
                <span>SECURE AUDIO</span>
                <span className="flex items-center gap-1 text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Avatar section with glow halo animations */}
              <div className="my-auto flex flex-col items-center">
                <div className="relative mb-6">
                  {/* Dynamic Glowing Rings */}
                  <AnimatePresence>
                    {callStatus === "active" && (
                      <>
                        <motion.div
                          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full border border-primary/40 pointer-events-none"
                        />
                        <motion.div
                          animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                          transition={{ repeat: Infinity, duration: 2.5, delay: 0.8, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full border border-primary/20 pointer-events-none"
                        />
                      </>
                    )}
                  </AnimatePresence>
                  
                  {/* Static Ambient Glow */}
                  <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl pointer-events-none" />

                  {/* Rounded Profile Image container */}
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-secondary">
                    <img 
                      src="/silvia-avatar.png" 
                      alt="Silvia Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-foreground mb-1 tracking-tight">
                  Silvia
                </h3>
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-6">
                  Voice Agent Protocol
                </p>

                {/* Call Status Badge */}
                <div className="mb-4">
                  {callStatus === "connecting" ? (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Establishing Connection...
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold tracking-wider uppercase gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Connection Secured
                    </span>
                  )}
                </div>

                {/* Duration Timer */}
                <div className="text-3xl font-display font-bold text-foreground tracking-widest tabular-nums">
                  {formatTime(callSeconds)}
                </div>
              </div>

              {/* Action Buttons Tray */}
              <div className="flex flex-col items-center gap-6 mt-auto">
                <div className="flex gap-8 justify-center items-center">
                  
                  {/* Mute Button */}
                  <button 
                    onClick={toggleMute}
                    disabled={callStatus === "connecting"}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isMuted 
                        ? "bg-primary/20 text-primary border border-primary/30" 
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                    }`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  {/* Red Hang Up Button */}
                  <button 
                    onClick={toggleCall}
                    className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center text-white hover:bg-destructive/90 shadow-lg shadow-destructive/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>

                  {/* Speaker visualizer mock */}
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                    <Volume2 className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground/60 max-w-[240px] leading-relaxed">
                  Active browser session utilizing secure WebRTC voice protocol. Click the red button to terminate.
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
