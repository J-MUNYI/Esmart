import WhatsAppLogo from '../../assets/icons/icons8-whatsapp-logo-48.png'

export default function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <img
      src={WhatsAppLogo}
      alt="WhatsApp"
      style={{ width: size, height: size }}
      className={className}
    />
  )
}