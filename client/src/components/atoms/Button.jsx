export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-heading font-medium rounded-full transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-deep-rose focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[48px]'

  const variants = {
    primary: 'bg-deep-rose text-cream hover:bg-[#b96868] shadow-card hover:shadow-hover',
    ghost: 'bg-transparent text-ink hover:bg-blush',
    outline: 'bg-transparent border border-latte text-ink hover:bg-warm-cream',
    icon: 'bg-warm-cream text-ink hover:bg-blush rounded-full p-3 min-w-[48px]',
    whatsapp: 'bg-whatsapp text-white hover:brightness-95 shadow-card',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  }

  const sizeClass = variant === 'icon' ? '' : sizes[size]

  return (
    <button
      className={`${base} ${variants[variant]} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} />}
    </button>
  )
}