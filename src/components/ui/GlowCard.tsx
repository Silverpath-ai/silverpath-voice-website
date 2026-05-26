import React from "react"
import { cn } from "@/lib/utils"

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-card border border-black/5 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,255,255,0.05)] hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {/* Subtle white-to-cyan hover gradient in the background */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          {children}
        </div>
      </div>
    )
  }
)
GlowCard.displayName = "GlowCard"
