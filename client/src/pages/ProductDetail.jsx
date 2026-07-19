import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MessageCircle, ShoppingBag } from 'lucide-react'
import Button from '../components/atoms/Button'
import StarRating from '../components/atoms/StarRating'
import PriceDisplay from '../components/atoms/PriceDisplay'
import WishlistButton from '../components/molecules/WishlistButton'
import { Skeleton } from '../components/atoms/Skeleton'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import { openWhatsApp, whatsAppMessages } from '../utils/whatsapp'
import api from '../utils/api'

export default function ProductDetail() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const { showToast } = useUI()
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    api
      .get(`/products/${slug}`)
      .then(({ data }) => {
        if (!cancelled) {
          setProduct(data)
          setActiveImage(0)
          setStatus('success')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (status === 'loading') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  if (status === 'error' || !product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="font-body text-slate mb-4">
          We couldn't find that product. It may have been removed.
        </p>
        <Link to="/shop" className="font-heading text-deep-rose">
          Back to Shop
        </Link>
      </div>
    )
  }

  const outOfStock = product.stock === 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-card overflow-hidden bg-warm-cream mb-3">
            <img
              src={product.images?.[activeImage]?.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${
                    activeImage === i ? 'border-deep-rose' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-3xl text-ink">{product.name}</h1>
            <WishlistButton product={product} />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <StarRating rating={product.rating} />
            {outOfStock && <span className="text-sm font-body text-error">Out of stock</span>}
          </div>

          <div className="mt-4">
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" />
          </div>

          <p className="font-body text-slate mt-4 leading-relaxed">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              variant="primary"
              size="lg"
              icon={ShoppingBag}
              disabled={outOfStock}
              onClick={() => {
                addItem(product)
                showToast(`${product.name} added to cart`)
              }}
              className="flex-1"
            >
              {outOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button
              variant="whatsapp"
              size="lg"
              icon={MessageCircle}
              onClick={() =>
                openWhatsApp({ message: whatsAppMessages.product(product.name, product.price) })
              }
              className="flex-1"
            >
              Enquire
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}