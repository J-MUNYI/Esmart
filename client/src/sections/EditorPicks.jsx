import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import ProductCard from '../components/molecules/ProductCard'
import { ProductCardSkeleton } from '../components/atoms/Skeleton'

// States: loading | success | error | empty — all handled explicitly
export default function EditorsPicks({ products, status }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-semibold text-ink">Editor's Picks For You</h2>
        <Link
          to="/shop"
          className="flex items-center gap-1 text-sm font-heading font-medium text-deep-rose"
        >
          View all <ChevronDown size={16} className="-rotate-90" />
        </Link>
      </div>

      {status === 'loading' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="text-sm font-body text-error">
          We couldn't load products right now. Check your connection and try again.
        </p>
      )}

      {status === 'success' && products.length === 0 && (
        <p className="text-sm font-body text-slate">No featured products yet — check back soon.</p>
      )}

      {status === 'success' && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}// EditorsPicks.jsx
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import ProductCard from '../components/molecules/ProductCard'
import { ProductCardSkeleton } from '../components/atoms/Skeleton'

// States: loading | success | error | empty — all handled explicitly
export default function EditorsPicks({ products, status }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-semibold text-ink">Editor's Picks For You</h2>
        <Link
          to="/shop"
          className="flex items-center gap-1 text-sm font-heading font-medium text-deep-rose"
        >
          View all <ChevronDown size={16} className="-rotate-90" />
        </Link>
      </div>

      {status === 'loading' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="text-sm font-body text-error">
          We couldn't load products right now. Check your connection and try again.
        </p>
      )}

      {status === 'success' && products.length === 0 && (
        <p className="text-sm font-body text-slate">No featured products yet — check back soon.</p>
      )}

      {status === 'success' && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}