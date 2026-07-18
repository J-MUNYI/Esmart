import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import Badge from '../atoms/Badge'
import StarRating from '../atoms/StarRating'
import PriceDisplay from '../atoms/PriceDisplay'
import WishlistButton from './WishlistButton'
import { useCart } from '../../context/CartContext'
import { useUI } from '../../context/UIContext'

// States handled: default, hover (CSS group), out-of-stock, image fallback
export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { showToast } = useUI()
  const outOfStock = product.stock === 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (outOfStock) return
    addItem(product)
    showToast(`${product.name} added to cart`)
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block rounded-card overflow-hidden bg-white shadow-card hover:shadow-hover transition-all duration-250"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-warm-cream">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          width={400}
          height={533}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            outOfStock ? 'grayscale opacity-60' : ''
          }`}
          loading="lazy"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badges?.map((b) => (
            <Badge key={b} type={b} />
          ))}
          {outOfStock && <Badge type="low-stock" />}
        </div>

        <div className="absolute top-3 right-3">
          <WishlistButton product={product} />
        </div>

        <div className="absolute top-3 right-14">
          <StarRating rating={product.rating} />
        </div>

        {/* Hover overlay CTA */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-250">
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            aria-label={`Add ${product.name} to cart`}
            className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-deep-rose text-cream rounded-full font-heading font-medium text-sm shadow-hover active:scale-95 transition-transform disabled:opacity-50"
          >
            <ShoppingBag size={16} />
            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-heading font-medium text-ink truncate">{product.name}</h3>
        <div className="mt-1">
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} />
        </div>
      </div>
    </Link>
  )
}