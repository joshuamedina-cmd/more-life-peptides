export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`} data-testid="logo">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-label="More Life Peptides logo">
        <circle cx="17" cy="17" r="16" stroke="hsl(221 83% 53%)" strokeWidth="1.5" />
        <circle cx="17" cy="9" r="2.4" fill="hsl(221 83% 53%)" />
        <circle cx="9.5" cy="20.5" r="2.4" fill="hsl(221 83% 53%)" />
        <circle cx="24.5" cy="20.5" r="2.4" fill="hsl(221 83% 53%)" />
        <circle cx="17" cy="17" r="1.6" fill="hsl(217 91% 60%)" />
        <path d="M17 11.4L17 15.4M15.6 16.4L11.4 19.4M18.4 16.4L22.6 19.4" stroke="hsl(221 83% 53%)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-[15px] tracking-tight" style={{ color: "hsl(220 39% 11%)" }}>
          More<span style={{ color: "hsl(221 83% 53%)" }}>Life</span>
        </span>
        <span className="text-[9px] font-medium tracking-[0.15em] uppercase" style={{ color: "hsl(220 9% 46%)" }}>
          Peptides
        </span>
      </div>
    </div>
  );
}
