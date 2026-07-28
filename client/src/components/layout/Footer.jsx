import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { openWhatsApp, whatsAppMessages } from '../../utils/whatsapp'
import EsmartLogo from '../atoms/EsmartLogo'

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v12M9 2h6M12 14v4M9 16h6" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h-9" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-warm-cream border-t border-latte/40 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <EsmartLogo variant="footer" />
          <p className="font-accent italic text-slate mt-2">Your one stop beauty shop.</p>
          <p className="text-sm font-body text-slate mt-3 max-w-xs">
            Clean, curated beauty essentials for every routine.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-medium text-ink mb-3">Shop</h4>
          <nav className="flex flex-col gap-2 text-sm font-body text-slate">
            <Link to="/shop" className="hover:text-deep-rose">All Products</Link>
            <Link to="/about" className="hover:text-deep-rose">About Us</Link>
            <Link to="/wishlist" className="hover:text-deep-rose">Wishlist</Link>
          </nav>
        </div>

        <div>
          <h4 className="font-heading font-medium text-ink mb-3">Get in Touch</h4>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => openWhatsApp({ message: whatsAppMessages.general })}
              className="flex items-center gap-2 text-sm font-body text-slate hover:text-whatsapp"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </button>
            <div className="flex gap-3">
              
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-latte/40 py-4 text-center text-xs font-body text-mist">
        © {new Date().getFullYear()} Esmart Beauty. All rights reserved.
        <p className="mt-2">A Muny1verse creation 🤍.</p>
      </div>
    </footer>
  )
}