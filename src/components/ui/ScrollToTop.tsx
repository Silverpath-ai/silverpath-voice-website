import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3.5 bg-white/90 border border-black/5 hover:border-primary/20 hover:text-primary text-muted-foreground backdrop-blur-md rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-lg"
          style={{
            boxShadow: "0 15px 40px rgba(0, 255, 255, 0.08)",
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
