const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '254118717850'

export const openWhatsApp = ({ message }) => {
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer')
}

export const whatsAppMessages = {
  general: "Hi Esmart Beauty! I'd like to enquire about your products.",
  product: (name, price) =>
    `Hi! I'm interested in ${name} (KES ${price}). Is it available?`,
  order: ({ customerName, phone, address, city, items, total }) => {
    const itemsList = items.map(item => `• ${item.name} x${item.quantity} - KES ${item.price * item.quantity}/item`).join('\n')
    return `Hi! I'd like to place an order:

Name: ${customerName}
Phone: ${phone}
Location: ${address}, ${city}

Products:
${itemsList}

Total: KES ${total.toFixed(2)}

Thank you!`
  }
}