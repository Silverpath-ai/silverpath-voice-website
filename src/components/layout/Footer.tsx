export const Footer = () => {
  return (
    <footer className="bg-card border-t border-black/5 pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          {/* Brand & Details */}
          <div>
            <div className="flex items-center mb-6 group">
              <img 
                src="/silverpath-ai-light-logo.svg" 
                alt="Silverpath AI" 
                className="h-8 w-auto transition-transform group-hover:scale-[1.02]" 
              />
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1 mb-8">
              <p className="font-medium text-foreground">Silverpath AI Ltd</p>
              <p>Based in Glasgow, operating UK wide</p>
              <p>Company No: 16670495</p>
              <p>ICO Reg No: ZC099845</p>
              <a href="mailto:growth@silverpath.ai" className="text-primary hover:underline mt-2 inline-block">
                growth@silverpath.ai
              </a>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded">ScotlandIS Member</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded">TechBehemoth Listed</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded">Registered UK Ltd</span>
            </div>
          </div>

          {/* Navigation/Links */}
          <div className="flex flex-col md:items-end justify-between">
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full mb-8 md:mb-0">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">SYSTEM OPERATIONAL</span>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a>
              <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
              <a href="#demo" className="hover:text-primary transition-colors">Live Demo</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2025 Silverpath AI Ltd. All rights reserved. Registered in Scotland, United Kingdom.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <span className="hidden md:inline">·</span>
            <span>We will never share your data or send you anything you have not asked for.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
