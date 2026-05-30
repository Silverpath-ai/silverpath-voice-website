import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { RetellWebClient } from "retell-client-js-sdk";
import { Loader2, Mic, PhoneOff, PhoneCall, Volume2 } from "lucide-react";

const retellWebClient = new RetellWebClient();

export const LiveDemo = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "active">("idle");

  useEffect(() => {
    retellWebClient.on("call_started", () => {
      setCallStatus("active");
    });

    retellWebClient.on("call_ended", () => {
      setIsCalling(false);
      setCallStatus("idle");
    });

    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      setIsCalling(false);
      setCallStatus("idle");
    });

    return () => {
      retellWebClient.off("call_started");
      retellWebClient.off("call_ended");
      retellWebClient.off("error");
    };
  }, []);

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
                
                {/* Active Call Visualizer Effect */}
                <AnimatePresence>
                  {callStatus === "active" && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-primary/5 pointer-events-none"
                    >
                      <motion.div 
                        animate={{ 
                          boxShadow: ["0px 0px 0px 0px rgba(0,255,255,0)", "0px 0px 40px 20px rgba(0,255,255,0.1)", "0px 0px 0px 0px rgba(0,255,255,0)"] 
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-10">
                  <motion.div 
                    animate={callStatus === "active" ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${callStatus === "active" ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-secondary text-primary"}`}
                  >
                    {callStatus === "active" ? <Volume2 className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                  </motion.div>

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
                      disabled={callStatus === "connecting"}
                      className={`w-full rounded-full text-base shadow-md group transition-all duration-300 ${
                        callStatus === "active" 
                          ? "bg-destructive hover:bg-destructive/90 text-white" 
                          : callStatus === "connecting"
                            ? "bg-primary/80 cursor-wait"
                            : "bg-primary hover:bg-primary/90 text-white"
                      }`}
                    >
                      {callStatus === "idle" && (
                        <>
                          <PhoneCall className="w-5 h-5 mr-2 animate-pulse" />
                          Tap to speak in browser
                        </>
                      )}
                      {callStatus === "connecting" && (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Connecting...
                        </>
                      )}
                      {callStatus === "active" && (
                        <>
                          <PhoneOff className="w-5 h-5 mr-2" />
                          End Call
                        </>
                      )}
                    </Button>
                  </div>

                  {callStatus === "active" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-primary font-medium flex items-center justify-center gap-2 mb-4"
                    >
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                      Live connection established. Speak now.
                    </motion.div>
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
    </section>
  );
};
