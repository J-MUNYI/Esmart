import { Heart } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'

export default function WishlistButton({ product }) {
  const { toggleItem, isWishlisted } = useWishlist()
  const active = isWishlisted(product._id)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleItem(product)
      }}
      aria-label={active ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      aria-pressed={active}
      className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-cream/90 backdrop-blur-sm shadow-card hover:bg-cream transition-colors active:scale-95"
    >
      <Heart
        size={18}
        className={active ? 'fill-deep-rose text-deep-rose' : 'text-ink'}
      />
    </button>
  )
}