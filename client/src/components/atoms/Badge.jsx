const variants = {
  new: 'bg-deep-rose text-cream',
  sale: 'bg-[#E8A54A] text-cream',
  bestseller: 'bg-slate text-cream',
  'low-stock': 'bg-error text-cream',
}

const labels = {
  new: 'New',
  sale: 'Sale',
  bestseller: 'Bestseller',
  'low-stock': 'Low Stock',
}

export default function Badge({ type = 'new' }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-medium ${variants[type]}`}
    >
      {labels[type]}
    </span>
  )
}