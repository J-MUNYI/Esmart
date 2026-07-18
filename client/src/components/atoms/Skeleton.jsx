export default function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-warm-cream rounded-xl ${className}`} />
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-card overflow-hidden bg-white shadow-card">
      <Skeleton className="w-full aspect-[3/4] rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full mt-3" />
      </div>
    </div>
  )
}