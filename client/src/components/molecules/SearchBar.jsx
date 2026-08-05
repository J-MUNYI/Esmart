import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import { formatPrice } from '../../utils/formatPrice'
import api from '../../utils/api'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [open, setOpen] = useState(false)
  const debounced = useDebounce(query, 300)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!debounced.trim()) {
      setResults([])
      setStatus('idle')
      return
    }
    setStatus('loading')
    api
      .get(`/products?search=${encodeURIComponent(debounced)}`)
      .then(({ data }) => {
        setResults(data.slice(0, 5))
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [debounced])

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md group">
      <div className="flex items-center bg-warm-cream rounded-full px-4 gap-2 py-2 transition-shadow duration-200 hover:shadow-[0_0_0_2px_rgba(201,122,122,0.7)]">
        <Search size={18} className="text-slate shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products"
          className="flex-1 bg-transparent border-2 border-transparent rounded-full px-3 py-1.5 text-base font-body text-ink placeholder:text-slate focus:ring-0 focus:outline-none"
          aria-label="Search products"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="p-1 text-slate hover:text-ink"
          >
            <X size={16} />
          </button>
        )}
        <button
          aria-label="Search"
          className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-deep-rose text-cream shrink-0"
        >
          <Search size={16} />
        </button>
      </div>

      {open && query.trim() && (
        <div
          role="listbox"
          className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-hover overflow-hidden z-40"
        >
          {status === 'loading' && (
            <div className="p-4 text-sm text-slate font-body">Searching…</div>
          )}
          {status === 'error' && (
            <div className="p-4 text-sm text-error font-body">
              Couldn't load results. Check your connection and try again.
            </div>
          )}
          {status === 'success' && results.length === 0 && (
            <div className="p-4 text-sm text-slate font-body">
              No products found for "{query}"
            </div>
          )}
          {status === 'success' &&
            results.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 hover:bg-blush transition-colors"
              >
                <img
                  src={product.images?.[0]?.url}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-heading text-ink truncate">{product.name}</p>
                  <p className="text-xs text-slate font-body">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}