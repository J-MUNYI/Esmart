import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import { formatPrice } from '../utils/formatPrice'
import api from '../utils/api'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { showToast } = useUI()
  const navigate = useNavigate()

  const [form, setForm] = useState({ fullName: '', phone: '', address: '', city: '' })
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError(null)
    try {
      await api.post('/orders', {
        items: items.map((i) => ({
          product: i._id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        shippingAddress: form,
        totalPrice: total,
      })
      clearCart()
      showToast('Order placed! We will confirm payment via M-Pesa shortly.')
      navigate('/')
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't place your order. Check your details and try again."
      )
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl text-ink mb-6">Checkout</h1>

      <div className="bg-warm-cream rounded-card p-4 mb-6">
        <p className="font-body text-sm text-slate">
          Payment is confirmed manually via M-Pesa after you place your order — our
          team will reach out on the phone number below with till/paybill details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="text-sm font-body text-slate">
            Full name
          </label>
          <input
            id="fullName"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full mt-1 bg-white border border-latte rounded-xl px-4 py-3 font-body text-ink focus:outline-none focus:border-deep-rose"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-body text-slate">
            M-Pesa phone number
          </label>
          <input
            id="phone"
            type="tel"
            required
            placeholder="0712 345 678"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full mt-1 bg-white border border-latte rounded-xl px-4 py-3 font-body text-ink focus:outline-none focus:border-deep-rose"
          />
        </div>

        <div>
          <label htmlFor="address" className="text-sm font-body text-slate">
            Delivery address
          </label>
          <input
            id="address"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full mt-1 bg-white border border-latte rounded-xl px-4 py-3 font-body text-ink focus:outline-none focus:border-deep-rose"
          />
        </div>

        <div>
          <label htmlFor="city" className="text-sm font-body text-slate">
            City / Town
          </label>
          <input
            id="city"
            required
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full mt-1 bg-white border border-latte rounded-xl px-4 py-3 font-body text-ink focus:outline-none focus:border-deep-rose"
          />
        </div>

        <div className="flex items-center justify-between py-4 border-t border-latte/40">
          <span className="font-heading font-medium text-ink">Total</span>
          <span className="font-heading font-semibold text-xl text-ink">{formatPrice(total)}</span>
        </div>

        {error && (
          <p role="alert" className="text-sm text-error font-body">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Placing order…' : 'Place Order'}
        </Button>
      </form>
    </div>
  )
}