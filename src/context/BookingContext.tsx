import { createContext, useContext } from "react";
import type { ReactNode } from "react";

interface BookingContextType {
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const isOpen = false;
  const openBooking = () => {};
  const closeBooking = () => {};

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
