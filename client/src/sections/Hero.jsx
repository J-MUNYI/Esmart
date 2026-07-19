import { Link } from 'react-router-dom'
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react'
import { formatPrice } from '../utils/formatPrice'

// Featured content is passed in as props from Home.jsx (real product data),
// with sensible fallbacks so the section never breaks if a field is missing.
export default function Hero({ heroProduct }) {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-6 pb-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* New Arrivals - tall card */}
        <div className="md:row-span-2 relative rounded-card overflow-hidden bg-gradient-to-br from-blush to-warm-cream min-h-[420px] flex flex-col justify-between p-6">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-ink">New Arrivals</h2>
          </div>

          {heroProduct ? (
            <>
              <img
                src={heroProduct.images?.[0]?.url}
                alt={heroProduct.name}
                className="absolute inset-x-8 top-20 bottom-24 mx-auto object-contain drop-shadow-2xl"
              />
              <div className="relative z-10 flex items-end justify-between">
                <div className="bg-cream/90 backdrop-blur-sm rounded-2xl px-4 py-2">
                  <p className="font-heading font-semibold text-ink">
                    {formatPrice(heroProduct.price)}
                  </p>
                  <p className="text-xs text-slate font-body">{heroProduct.name}</p>
                </div>
                <Link
                  to={`/product/${heroProduct.slug}`}
                  aria-label="View product"
                  className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full bg-deep-rose text-cream shadow-hover"
                >
                  <ShoppingBag size={18} />
                </Link>
              </div>
            </>
          ) : (
            <p className="text-slate font-body text-sm">New products coming soon.</p>
          )}
        </div>

        {/* Best Value Offers */}
        <div className="relative rounded-card overflow-hidden bg-gradient-to-br from-rose to-deep-rose min-h-[200px] p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="font-heading text-xl font-semibold text-cream">Best Value<br />Offers</h3>
            <Heart size={20} className="text-cream/80" />
          </div>
          <div>
            <span className="inline-block bg-cream text-deep-rose text-xs font-heading font-semibold px-3 py-1 rounded-full">
              Up to 70% off
            </span>
          </div>
        </div>

        {/* Glow Your Way */}
        <div className="relative rounded-card overflow-hidden bg-ink min-h-[200px] p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-cream">Glow Your Way</h3>
            <p className="text-sm font-body text-cream/70 mt-1">
              Personalise your routine just the way you want.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-heading font-medium text-cream"
          >
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}