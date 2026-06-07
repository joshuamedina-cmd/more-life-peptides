// Logo system for More Life Peptides.
// Wordmark-led identity: "MORE" in navy, "LIFE" in blue, with a small
// molecular-cluster mark sitting atop the "i" in LIFE as a hidden signature.
// Below: "PEPTIDES" set in tracked-out uppercase.

const NAVY = "hsl(220 39% 11%)";   // #0A1628 family
const BLUE = "hsl(221 83% 53%)";   // #2563EB family

type LogoProps = {
  variant?: "horizontal" | "stacked" | "mono-dark" | "mono-light";
  height?: number;
  className?: string;
  showTagline?: boolean;
};

export function Logo({
  variant = "horizontal",
  height = 36,
  className = "",
  showTagline = true,
}: LogoProps) {
  const navy = variant === "mono-light" ? "#FFFFFF" : NAVY;
  const blue = variant === "mono-dark" ? NAVY : variant === "mono-light" ? "#FFFFFF" : BLUE;
  const subColor = variant === "mono-light" ? "rgba(255,255,255,0.7)" : variant === "mono-dark" ? NAVY : BLUE;

  if (variant === "stacked") {
    return (
      <StackedLogo height={height} className={className} navy={navy} blue={blue} subColor={subColor} showTagline={showTagline} />
    );
  }

  return (
    <HorizontalLogo height={height} className={className} navy={navy} blue={blue} subColor={subColor} showTagline={showTagline} />
  );
}

// ---- Horizontal lockup (default for site header) ----
function HorizontalLogo({
  height, className, navy, blue, subColor, showTagline,
}: { height: number; className: string; navy: string; blue: string; subColor: string; showTagline: boolean }) {
  // viewBox is sized to the visual bounds of the wordmark.
  // Wordmark: MORE LIFE — heavy geometric sans, custom drawn.
  // Below: PEPTIDES — letter-spaced small caps.
  return (
    <svg
      viewBox="0 0 340 96"
      height={height}
      role="img"
      aria-label="More Life Peptides"
      className={className}
      style={{ display: "block" }}
    >
      {/* MORE — navy */}
      <text
        x="0" y="56"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="56"
        fontWeight="900"
        letterSpacing="-2.5"
        fill={navy}
      >
        MORE
      </text>

      {/* LIFE — blue, positioned after MORE */}
      <text
        x="158" y="56"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="56"
        fontWeight="900"
        letterSpacing="-2.5"
        fill={blue}
      >
        LIFE
      </text>

      {/* Molecular cluster signature replacing the dot of the "i" in LIFE.
          The "i" stem sits roughly at x≈207 on the canvas. */}
      <g transform="translate(207 11)">
        {/* connecting bonds */}
        <line x1="0" y1="0" x2="-6" y2="-4" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="6" y2="-4" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="0" y2="5" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
        {/* central node */}
        <circle cx="0" cy="0" r="2.6" fill={blue} />
        {/* outer nodes */}
        <circle cx="-6" cy="-4" r="2" fill={blue} />
        <circle cx="6" cy="-4" r="2" fill={blue} />
      </g>

      {/* PEPTIDES — small tracked underline */}
      {showTagline && (
        <text
          x="0" y="86"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="14"
          fontWeight="600"
          letterSpacing="7"
          fill={subColor}
        >
          PEPTIDES
        </text>
      )}
    </svg>
  );
}

// ---- Stacked lockup (centered, for footers, badges) ----
function StackedLogo({
  height, className, navy, blue, subColor, showTagline,
}: { height: number; className: string; navy: string; blue: string; subColor: string; showTagline: boolean }) {
  return (
    <svg
      viewBox="0 0 260 110"
      height={height}
      role="img"
      aria-label="More Life Peptides"
      className={className}
      style={{ display: "block" }}
    >
      <text
        x="130" y="62"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="56"
        fontWeight="900"
        letterSpacing="-2.5"
      >
        <tspan fill={navy}>MORE </tspan>
        <tspan fill={blue}>LIFE</tspan>
      </text>

      {/* Molecular cluster above the "i" — for stacked layout the i sits near x≈177 */}
      <g transform="translate(186 17)">
        <line x1="0" y1="0" x2="-6" y2="-4" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="6" y2="-4" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="0" y2="5" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="0" cy="0" r="2.6" fill={blue} />
        <circle cx="-6" cy="-4" r="2" fill={blue} />
        <circle cx="6" cy="-4" r="2" fill={blue} />
      </g>

      {showTagline && (
        <text
          x="130" y="96"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="14"
          fontWeight="600"
          letterSpacing="8"
          fill={subColor}
        >
          PEPTIDES
        </text>
      )}
    </svg>
  );
}

// ---- Favicon mark (square, for browser tabs and tiny placements) ----
export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label="More Life Peptides"
      className={className}
    >
      <rect x="0" y="0" width="32" height="32" rx="6" fill={NAVY} />
      {/* M */}
      <text
        x="16" y="22"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="20"
        fontWeight="900"
        fill="#FFFFFF"
      >
        M
      </text>
      {/* molecular dot above */}
      <circle cx="22" cy="9" r="1.8" fill={BLUE} />
      <circle cx="18.5" cy="6.5" r="1.2" fill={BLUE} />
      <circle cx="25.5" cy="6.5" r="1.2" fill={BLUE} />
      <line x1="22" y1="9" x2="18.5" y2="6.5" stroke={BLUE} strokeWidth="0.8" />
      <line x1="22" y1="9" x2="25.5" y2="6.5" stroke={BLUE} strokeWidth="0.8" />
    </svg>
  );
}
