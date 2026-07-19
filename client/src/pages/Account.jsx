import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils/formatPrice'
import api from '../utils/api'

export default function Account() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    api
      .get('/orders')
      .then(({ data }) => {
        setOrders(data)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [])

  const statusColors = {
    pending: 'bg-warm-cream text-slate',
    confirmed: 'bg-blush text-deep-rose',
    shipped: 'bg-rose text-cream',
    delivered: 'bg-success/20 text-success',
    cancelled: 'bg-error/20 text-error',
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl text-ink mb-2">My Account</h1>
      <p className="font-body text-slate mb-8">{user?.name} — {user?.email}</p>

      <h2 className="font-heading text-xl font-medium text-ink mb-4">Order History</h2>

      {status === 'loading' && <p className="font-body text-slate">Loading your orders…</p>}
      {status === 'error' && (
        <p className="font-body text-error">
          We couldn't load your orders. Check your connection and try again.
        </p>
      )}
      {status === 'success' && orders.length === 0 && (
        <p className="font-body text-slate">You haven't placed any orders yet.</p>
      )}

      {status === 'success' &&
        orders.map((order) => (
          <div key={order._id} className="border border-latte/40 rounded-card p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-sm text-slate">
                {new Date(order.createdAt).toLocaleDateString('en-KE', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <span
                className={`text-xs font-heading font-medium px-3 py-1 rounded-full capitalize ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>
            <p className="font-heading font-semibold text-ink">{formatPrice(order.totalPrice)}</p>
            <p className="font-body text-sm text-slate">{order.items.length} item(s)</p>
          </div>
        ))}
    </div>
  )
}