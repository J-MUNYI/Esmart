import { Link } from 'react-router-dom'

const categories = [
  { label: 'Skincare', value: 'skincare', color: 'from-blush to-warm-cream' },
  { label: 'Haircare', value: 'haircare', color: 'from-rose to-blush' },
  { label: 'Makeup', value: 'makeup', color: 'from-deep-rose to-rose' },
  { label: 'Fragrance', value: 'fragrance', color: 'from-latte to-warm-cream' },
]

export default function CategoriesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="font-heading text-2xl font-semibold text-ink mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.value}
            to={`/shop?category=${cat.value}`}
            className={`group relative rounded-card overflow-hidden bg-gradient-to-br ${cat.color} aspect-square flex items-end p-4 transition-transform duration-250 hover:-translate-y-1`}
          >
            <span className="font-heading font-medium text-ink">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}