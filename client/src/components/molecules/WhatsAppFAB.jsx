import { MessageCircle } from 'lucide-react'
import { openWhatsApp, whatsAppMessages } from '../../utils/whatsapp'

// message prop lets product pages pre-fill a product-specific enquiry
export default function WhatsAppFAB({ message = whatsAppMessages.general }) {
  return (
    <button
      onClick={() => openWhatsApp({ message })}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp text-white shadow-hover flex items-center justify-center active:scale-95 transition-transform pb-safe"
    >
      <MessageCircle size={26} className="fill-white text-whatsapp" />
    </button>
  )
}