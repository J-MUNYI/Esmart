import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { openWhatsApp, whatsAppMessages } from '../../utils/whatsapp'
import EsmartLogo from '../atoms/EsmartLogo'
import TikTokIcon from '../atoms/TikTokIcon'
import WhatsAppIcon from '../atoms/WhatsAppIcon'

export default function Footer() {
  return (
    <footer className="bg-warm-cream border-t border-latte/40 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <EsmartLogo variant="footer" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-wide text-ink">Esmart</span>
              <span className="font-heading text-[10px] tracking-[0.2em] text-slate -mt-0.5">
                BEAUTY
              </span>
            </div>
          </Link>
          <p className="text-sm font-body text-slate mt-3 max-w-xs">
            Clean, well suited and pocket friendly beauty essentials for every routine.
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
              <span>+254 118717850</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-deep-rose" />
              <span>esmartbeauty@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={24} className="text-deep-rose" />
              <span>Dubois Beauty Building shop G14, Juction Trade Centre shop G125.</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-deep-rose" />
              <span>Mon-Fri: 7:30am-6:30pm, Sat: 8:30am-6:30pm.</span>
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
              <WhatsAppIcon size={16} /> Chat on WhatsApp
            </button>
            <a href="https://tiktok.com/@jtc_g125" aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-body text-slate hover:text-deep-rose self-start">
              <TikTokIcon size={16} /> Engage with us on TikTok
            </a>
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