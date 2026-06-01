import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface BookingContextType {
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      
      if (params.get("book") === "true" || params.get("apply") === "true" || hash === "#booking" || hash === "#book") {
        setIsOpen(true);
        // Clean up URL parameters/hash without a page reload to prevent re-triggering
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const openBooking = () => setIsOpen(true);
  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
