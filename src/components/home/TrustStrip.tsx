import { motion } from "framer-motion";

export const TrustStrip = () => {
  return (
    <section className="border-y border-black/10 bg-white py-12 overflow-hidden relative z-20 shadow-sm">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center justify-center gap-12">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.25em]">
            Recognised Member Of
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 w-full max-w-5xl mx-auto">
            
            {/* TechBehemoths */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group flex flex-col items-center gap-5 cursor-pointer flex-1 py-8 px-4 rounded-3xl hover:bg-slate-50/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.12)] transition-all duration-500"
            >
              <div className="h-20 md:h-24 flex items-center justify-center">
                <img 
                  src="/techbehemoth.svg" 
                  alt="TechBehemoths Logo" 
                  className="max-h-12 md:max-h-16 w-auto object-contain grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-300" 
                />
              </div>
              <span className="uppercase font-mono text-xs tracking-[0.2em] text-slate-600 font-bold group-hover:text-primary transition-colors duration-300">
                TechBehemoths
              </span>
            </motion.div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-32 bg-black/5 shrink-0" />

            {/* ScotlandIS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group flex flex-col items-center gap-5 cursor-pointer flex-1 py-8 px-4 rounded-3xl hover:bg-slate-50/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.12)] transition-all duration-500"
            >
              <div className="h-20 md:h-24 flex items-center justify-center">
                <img 
                  src="/scotland-is.png" 
                  alt="ScotlandIS Logo" 
                  className="max-h-20 md:max-h-24 w-auto object-contain mix-blend-multiply grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-300" 
                />
              </div>
              <span className="uppercase font-mono text-xs tracking-[0.2em] text-slate-600 font-bold group-hover:text-primary transition-colors duration-300">
                ScotlandIS
              </span>
            </motion.div>
            
            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-32 bg-black/5 shrink-0" />

            {/* Enterprise Nation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group flex flex-col items-center gap-5 cursor-pointer flex-1 py-8 px-4 rounded-3xl hover:bg-slate-50/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.12)] transition-all duration-500"
            >
              <div className="h-20 md:h-24 flex items-center justify-center">
                <img 
                  src="/enterprise-nation.jpg" 
                  alt="Enterprise Nation Logo" 
                  className="max-h-14 md:max-h-20 w-auto object-contain mix-blend-multiply grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-300" 
                />
              </div>
              <span className="uppercase font-mono text-xs tracking-[0.2em] text-slate-600 font-bold group-hover:text-primary transition-colors duration-300">
                Enterprise Nation
              </span>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
