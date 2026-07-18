export default function EsmartLogo({ variant = 'light', className = '' }) {
  const markColor = variant === 'light' ? '#C97A7A' : '#FDF6F0'
  const textColor = variant === 'light' ? '#2C1A1A' : '#FDF6F0'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 9h11v3.2H14.4v3.4h6.4v3.2h-6.4v3.8H22V26H11z"
          fill={markColor}
        />
        <path
          d="M22 9c0 4-3 7-6 7 0-4 3-7 6-7z"
          fill={markColor}
          opacity="0.55"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl tracking-wide" style={{ color: textColor }}>
          Esmart
        </span>
        <span
          className="font-heading text-[9px] tracking-[0.2em] -mt-0.5"
          style={{ color: textColor, opacity: 0.7 }}
        >
          BEAUTY
        </span>
      </div>
    </div>
  )
}
