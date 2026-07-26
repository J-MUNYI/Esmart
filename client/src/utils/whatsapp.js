const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '254722462032'

export const openWhatsApp = ({ message }) => {
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer')
}

export const whatsAppMessages = {
  general: "Hi Esmart Beauty! I'd like to enquire about your products.",
  product: (name, price) =>
    `Hi! I'm interested in ${name} (KES ${price}). Is it available?`,
}