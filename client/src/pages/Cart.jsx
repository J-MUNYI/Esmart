import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import CartItem from '../components/molecules/CartItem'
import Button from '../components/atoms/Button'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { formatPrice } from '../utils/formatPrice'

export default function Cart() {
  const { items, total } = useCart()
  const { user } = useAuth()
  const { openAuthModal } = useUI()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      openAuthModal('login')
      return
    }
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={40} className="text-mist mx-auto mb-4" />
        <p className="font-body text-slate mb-6">Your cart is empty.</p>
        <Link to="/shop">
          <Button variant="primary">Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl text-ink mb-6">Your Cart</h1>

      <div>
        {items.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 mb-4">
        <span className="font-heading font-medium text-ink">Subtotal</span>
        <span className="font-heading font-semibold text-xl text-ink">{formatPrice(total)}</span>
      </div>

      <Button variant="primary" size="lg" className="w-full" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  )
}