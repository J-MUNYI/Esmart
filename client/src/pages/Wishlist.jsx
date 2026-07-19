import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import ProductCard from '../components/molecules/ProductCard'
import Button from '../components/atoms/Button'
import { useWishlist } from '../context/WishlistContext'

export default function Wishlist() {
  const { items } = useWishlist()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl text-ink mb-6">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={40} className="text-mist mx-auto mb-4" />
          <p className="font-body text-slate mb-6">
            Nothing saved yet. Tap the heart on any product to add it here.
          </p>
          <Link to="/shop">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}