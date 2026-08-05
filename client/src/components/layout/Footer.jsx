import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { openWhatsApp, whatsAppMessages } from '../../utils/whatsapp'
import EsmartLogo from '../atoms/EsmartLogo'

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v14M6 6h12M8 16h8" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h-9" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34V22C18.34 21.13 22 16.99 22 12z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-warm-cream border-t border-latte/40 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <EsmartLogo variant="footer" />
          <p className="font-accent italic text-slate mt-2">Your one stop beauty shop.</p>
          <p className="text-sm font-body text-slate mt-3 max-w-xs">
            Clean, curated beauty essentials for every routine.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-medium text-ink mb-3">Quick Links</h4>
          <nav className="flex flex-col gap-2 text-sm font-body text-slate">
            <Link to="/" className="hover:text-deep-rose">Home</Link>
            <Link to="/shop" className="hover:text-deep-rose">Shop All Products</Link>
            <Link to="/about" className="hover:text-deep-rose">About Us</Link>
            <Link to="/wishlist" className="hover:text-deep-rose">Wishlist</Link>
            <Link to="/account" className="hover:text-deep-rose">My Account</Link>
          </nav>
        </div>

        <div>
          <h4 className="font-heading font-medium text-ink mb-3">Contact Info</h4>
          <div className="flex flex-col gap-3 text-sm font-body text-slate">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-deep-rose" />
              <span>+254 11 871 785</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-deep-rose" />
              <span>info@esmartbeauty.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-deep-rose" />
              <span>123 Beauty Lane, Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-deep-rose" />
              <span>Mon-Fri: 9am-6pm, Sat: 9am-4pm</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-medium text-ink mb-3">Get in Touch</h4>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => openWhatsApp({ message: whatsAppMessages.general })}
              className="flex items-center gap-2 text-sm font-body text-slate hover:text-whatsapp self-start"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </button>
            <div className="flex gap-3">
              <a href="https://instagram.com/esmartbeauty" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-deep-rose">
                <InstagramIcon />
              </a>
              <a href="https://tiktok.com/@esmartbeauty" aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-deep-rose">
                <TikTokIcon />
              </a>
              <a href="https://facebook.com/esmartbeauty" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-deep-rose">
                <FacebookIcon />
              </a>
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