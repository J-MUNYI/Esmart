import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/molecules/ProductCard'
import { ProductCardSkeleton } from '../components/atoms/Skeleton'
import api from '../utils/api'

const categories = [
  { label: 'All', value: '' },
  { label: 'Skincare', value: 'skincare' },
  { label: 'Haircare', value: 'haircare' },
  { label: 'Makeup', value: 'makeup' },
  { label: 'Fragrance', value: 'fragrance' },
  { label: 'Body Care', value: 'bodycare' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    const query = activeCategory ? `?category=${activeCategory}` : ''
    api
      .get(`/products${query}`)
      .then(({ data }) => {
        if (!cancelled) {
          setProducts(data)
          setStatus('success')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [activeCategory])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-ink">Shop All</h1>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="md:hidden flex items-center gap-2 min-h-[44px] px-4 rounded-full bg-warm-cream font-body text-sm text-ink"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className={`md:block ${filtersOpen ? 'block' : 'hidden'}`}>
          <h3 className="font-heading font-medium text-ink mb-3">Category</h3>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSearchParams(cat.value ? { category: cat.value } : {})
                  setFiltersOpen(false)
                }}
                className={`text-left min-h-[44px] px-3 rounded-xl font-body text-sm transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-deep-rose text-cream'
                    : 'text-slate hover:bg-warm-cream'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="md:col-span-3">
          {status === 'loading' && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {status === 'error' && (
            <p className="text-sm font-body text-error">
              We couldn't load products. Check your connection and try again.
            </p>
          )}

          {status === 'success' && products.length === 0 && (
            <p className="text-sm font-body text-slate">
              No products found in this category yet.
            </p>
          )}

          {status === 'success' && products.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}