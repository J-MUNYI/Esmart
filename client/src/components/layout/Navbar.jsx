import { Link, NavLink } from 'react-router-dom'
import { Heart, ShoppingBag, Menu, X, User } from 'lucide-react'
import SearchBar from '../molecules/SearchBar'
import EsmartLogo from '../atoms/EsmartLogo'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useUI } from '../../context/UIContext'

const categories = [
  { label: 'Make-up', value: 'makeup' },
  { label: 'Bags', value: 'bags' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Hair', value: 'hair' },
  { label: 'Body Care', value: 'bodycare' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const { openAuthModal, mobileMenuOpen, toggleMobileMenu } = useUI()

  return (
    <header className="sticky top-0 z-30 bg-cream/95 backdrop-blur-sm border-b border-latte/40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0 flex items-center gap-2">
            <EsmartLogo variant="navbar" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-wide text-ink">Esmart</span>
              <span className="font-heading text-[8px] tracking-[0.2em] text-slate -mt-0.5">
                BEAUTY
              </span>
            </div>
          </Link>

        <div className="hidden md:block flex-1 max-w-md">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="min-h-[44px] min-w-[44px] hidden sm:flex items-center justify-center rounded-full hover:bg-warm-cream"
          >
            <Heart size={20} className="text-ink" />
          </Link>

          <Link
            to="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-warm-cream"
          >
            <ShoppingBag size={20} className="text-ink" />
            {count > 0 && (
              <span className="absolute top-1 right-1 bg-deep-rose text-cream text-[10px] font-heading font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <div className="w-9 h-9 rounded-full bg-deep-rose text-cream flex items-center justify-center font-heading text-sm">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <button onClick={logout} className="text-sm font-body text-slate hover:text-ink">
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="hidden sm:block text-sm font-heading font-medium text-deep-rose hover:text-[#b96868] px-2"
            >
              Sign In
            </button>
          )}

          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-warm-cream"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Category pill row */}
      <div className="hidden md:block border-t border-latte/30">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <NavLink
              key={cat.value}
              to={`/shop?category=${cat.value}`}
              className={({ isActive }) =>
                `shrink-0 px-4 py-2 rounded-full text-sm font-body transition-colors ${
                  isActive ? 'bg-deep-rose text-cream' : 'text-slate hover:bg-warm-cream'
                }`
              }
            >
              {cat.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-latte/40 bg-cream px-4 py-4 space-y-4">
          <SearchBar />
          <nav className="flex flex-col gap-1">
            {categories.map((cat) => (
              <NavLink
                key={cat.value}
                to={`/shop?category=${cat.value}`}
                onClick={toggleMobileMenu}
                className="min-h-[48px] flex items-center px-3 rounded-xl font-body text-ink hover:bg-warm-cream"
              >
                {cat.label}
              </NavLink>
            ))}
            <NavLink
              to="/wishlist"
              onClick={toggleMobileMenu}
              className="min-h-[48px] flex items-center gap-2 px-3 rounded-xl font-body text-ink hover:bg-warm-cream"
            >
              <Heart size={18} /> Wishlist
            </NavLink>
            {user ? (
              <button
                onClick={() => {
                  logout()
                  toggleMobileMenu()
                }}
                className="min-h-[48px] flex items-center gap-2 px-3 rounded-xl font-body text-ink hover:bg-warm-cream text-left"
              >
                <User size={18} /> Log out
              </button>
            ) : (
              <button
                onClick={() => {
                  openAuthModal('login')
                  toggleMobileMenu()
                }}
                className="min-h-[48px] flex items-center gap-2 px-3 rounded-xl font-body text-deep-rose text-left"
              >
                <User size={18} /> Sign In
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}