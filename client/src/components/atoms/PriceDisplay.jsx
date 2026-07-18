import { formatPrice } from '../../utils/formatPrice'

export default function PriceDisplay({ price, originalPrice, size = 'md' }) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`font-heading font-semibold text-ink ${sizes[size]}`}>
        {formatPrice(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-mist line-through font-body">
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  )
}