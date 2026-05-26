# Voice Agency Website Build - Project Foundation

## 🚀 Overview
Build a high-fidelity, authoritative marketing website for an AI Voice & Conversational Agent agency. The site must feel premium, state-of-the-art, and "consultancy-grade," utilizing the heavy animation and interactive patterns from the Silverpath.ai architecture but adapted for a light-themed aesthetic.

## 🎨 Design System: "Light Premium"
Unlike the full dark-mode of Silverpath, this site uses a "Studio Light" aesthetic—clean, airy, and professional, with high-tech cyan accents.

- **Primary Background**: `hsl(0 0% 98%)` (Off-white / Soft Gray).
- **Secondary Background**: `hsl(0 0% 100%)` (Pure White for cards).
- **Accent Color**: `hsl(185 100% 45%)` (The Silverpath Cyan).
- **Text**: `hsl(222 47% 11%)` (Deep Navy/Charcoal for high readability).
- **Glassmorphism**: Use `backdrop-blur` with `bg-white/70` and extremely subtle `border-black/5`.
- **Glows**: Instead of neon glows, use soft, large-radius shadows with subtle cyan tints (`box-shadow: 0 20px 50px rgba(0, 255, 255, 0.05)`).

## 🛠 Tech Stack
- **Framework**: React 19 + Vite.
- **Styling**: Tailwind CSS.
- **Animations**: Framer Motion (Essential for the "premium" feel).
- **Components**: Shadcn UI (Radix Primitives).
- **Icons**: Lucide React.

## 🧩 Core UI Components to Replicate
1.  **Premium Hero**: Use parallax scroll effects. Features a "Live Voice Processing" visualizer animation.
2.  **Adaptive GlowCard**: A version of the Silverpath GlowCard that uses a subtle white-to-cyan gradient on hover rather than a dark-mode neon glow.
3.  **Process Timeline**: A vertical or horizontal "Protocol" stepper using `layoutId` transitions.
4.  **Audio Demo Cards**: Custom interactive cards for playing voice samples with animated frequency waves.
5.  **Final CTA**: A massive, full-width section with a high-contrast background to drive conversions (Lead Snapshots/Audits).

## 🎬 Animation Guidelines (Framer Motion)
- **Entrance**: Use a global `fadeUp` variant with a `spring` transition for all sections (`stiffness: 100, damping: 20`).
- **Scroll Trigger**: All sections must use `whileInView` with `viewport={{ once: true, margin: "-100px" }}`.
- **Staggered Lists**: Any grid or list of features must use `staggerChildren: 0.1` for a "revealing" effect.
- **Micro-interactions**: Every button and card should have a `whileHover={{ y: -5 }}` and `whileTap={{ scale: 0.98 }}` state.

## 📂 Implementation Workflow
1.  **Foundation**: Set up the `index.css` with the light-theme HSL variables first.
2.  **Layout**: Build the `Layout`, `Header`, and `Footer` with the "Light Premium" blur effects.
3.  **Hero**: Implement the main value proposition with an immediate high-fidelity visual (Voice visualization).
4.  **Service Layers**: Port the 3-system logic (Capture, Nurture, Reactivate) but rename and adapt them for Voice-specific offerings.
5.  **Verification**: Ensure 100% responsiveness on 15.6" laptops and mobile devices.

## 💡 AI Agent Instructions
- **MANDATORY**: Do not create a "Basic MVP." The design must look like a $10k+ custom consultancy site.
- **Typography**: Use `Outfit` for headings and `Inter` for body text.
- **Copywriting**: Maintain a "Process-first" authoritative tone. Avoid generic AI fluff.
- **Assets**: Use `generate_image` for bespoke 3D-style voice icons or abstract tech visuals if needed.
