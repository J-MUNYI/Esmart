import logoMark from '../../assets/logo-mark.png'

export default function EsmartLogo({ variant = 'navbar', className = '' }) {
  const sizes = {
    navbar: 'h-10',
    footer: 'h-14',
    hero: 'h-20',
  }

  return (
    <img
      src={logoMark}
      alt="Esmart Beauty"
      className={`${sizes[variant]} w-auto object-contain ${className}`}
      style={{ filter: 'brightness(0.6) contrast(1.0) drop-shadow(0 2px 4px rgba(201, 122, 122, 0.32)' }}
    />
  )
}