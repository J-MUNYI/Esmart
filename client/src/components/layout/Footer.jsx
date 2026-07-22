import { Link } from 'react-router-dom'
import { Camera, Link as LinkIcon, MessageCircle } from 'lucide-react'
import EsmartLogo from '../atoms/EsmartLogo'
import { openWhatsApp, whatsAppMessages } from '../../utils/whatsapp'

export default function Footer() {
  return (
    <footer className="bg-warm-cream border-t border-latte/40 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <EsmartLogo variant="light" />
          <p className="font-accent italic text-slate mt-2">Glow Naturally.</p>
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
          <button
            onClick={() => openWhatsApp({ message: whatsAppMessages.general })}
            className="flex items-center gap-2 text-sm font-body text-slate hover:text-whatsapp mb-3"
          >
            <MessageCircle size={16} /> Chat on WhatsApp
          </button>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="text-slate hover:text-deep-rose">
              <Camera size={20} />
            </a>
            <a href="#" aria-label="Facebook" className="text-slate hover:text-deep-rose">
              <LinkIcon size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-latte/40 py-4 text-center text-xs font-body text-mist">
        © {new Date().getFullYear()} Esmart Beauty. All rights reserved.
      </div>
    </footer>
  )
}