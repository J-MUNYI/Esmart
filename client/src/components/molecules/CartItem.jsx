// CartItem.jsx
import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'
import { useCart } from '../../context/CartContext'

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 py-4 border-b border-latte/40">
      <img
        src={item.images?.[0]?.url}
        alt={item.name}
        className="w-20 h-20 rounded-xl object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-medium text-ink truncate">{item.name}</h4>
        <p className="text-sm text-slate font-body">{formatPrice(item.price)}</p>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-latte rounded-full">
            <button
              onClick={() => updateQty(item._id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="min-h-[36px] min-w-[36px] flex items-center justify-center text-ink"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-body w-6 text-center" aria-live="polite">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item._id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="min-h-[36px] min-w-[36px] flex items-center justify-center text-ink"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item._id)}
            aria-label={`Remove ${item.name} from cart`}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center text-error"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="font-heading font-semibold text-ink shrink-0">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}