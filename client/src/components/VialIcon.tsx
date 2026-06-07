// Stylized peptide vial illustration used across product cards
export function VialIcon({ label = "MLP", size = 180 }: { label?: string; size?: number }) {
  const safeId = label.replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 240"
      fill="none"
      role="img"
      aria-label={`${label} research peptide vial`}
    >
      <defs>
        <linearGradient id={`glass-${safeId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8F0F8" />
          <stop offset="50%" stopColor="#C8DAEC" />
          <stop offset="100%" stopColor="#A6BFD8" />
        </linearGradient>
        <linearGradient id={`cap-${safeId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1628" />
          <stop offset="100%" stopColor="#1E3A5F" />
        </linearGradient>
        <linearGradient id={`label-${safeId}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0F5FA" />
        </linearGradient>
      </defs>
      {/* Cap */}
      <rect x="58" y="18" width="64" height="22" rx="3" fill={`url(#cap-${safeId})`} />
      <rect x="62" y="40" width="56" height="8" rx="1" fill="#C0C4CC" />
      {/* Neck */}
      <rect x="70" y="48" width="40" height="14" fill={`url(#glass-${safeId})`} />
      <ellipse cx="90" cy="62" rx="20" ry="3" fill="#8FA9C4" opacity="0.6" />
      {/* Body */}
      <rect x="46" y="62" width="88" height="158" rx="6" fill={`url(#glass-${safeId})`} />
      <rect x="46" y="62" width="88" height="158" rx="6" fill="none" stroke="#7E97B3" strokeWidth="1" opacity="0.5" />
      {/* Highlight */}
      <rect x="54" y="72" width="6" height="138" rx="3" fill="#FFFFFF" opacity="0.6" />
      {/* Label */}
      <rect x="50" y="96" width="80" height="92" rx="3" fill={`url(#label-${safeId})`} stroke="#D5DEEA" strokeWidth="0.75" />
      <rect x="50" y="96" width="80" height="14" fill="hsl(221 83% 53%)" />
      <text x="90" y="106" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#FFFFFF" letterSpacing="1">
        MORELIFE
      </text>
      <text x="90" y="148" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="800" fill="#0A1628" letterSpacing="0.5">
        {label}
      </text>
      <line x1="60" y1="158" x2="120" y2="158" stroke="#D5DEEA" strokeWidth="0.5" />
      <text x="90" y="172" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fontWeight="600" fill="#1E3A5F" letterSpacing="0.5">
        RESEARCH USE ONLY
      </text>
      <text x="90" y="182" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="5" fill="#64748B">
        Lyophilized · Sterile
      </text>
      {/* Liquid hint at bottom */}
      <rect x="46" y="200" width="88" height="20" rx="0" fill="hsl(221 83% 53%)" opacity="0.08" />
      <path d="M46 220 L134 220 L130 214 L50 214 Z" fill="hsl(221 83% 53%)" opacity="0.12" />
    </svg>
  );
}
