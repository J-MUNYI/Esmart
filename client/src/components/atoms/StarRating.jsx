import { Star } from 'lucide-react'

export default function StarRating({ rating = 0, size = 14 }) {
  return (
    <div
      className="inline-flex items-center gap-1 bg-cream/90 backdrop-blur-sm px-2 py-1 rounded-full"
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      <Star size={size} className="fill-[#E8A54A] text-[#E8A54A]" />
      <span className="text-xs font-body font-medium text-ink">{rating.toFixed(1)}</span>
    </div>
  )
}