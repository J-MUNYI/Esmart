import { useState } from 'react'
import Button from '../components/atoms/Button'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | success

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    // Wire to a real newsletter endpoint when available; optimistic UI for now
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="rounded-card bg-ink px-6 py-10 sm:px-12 sm:py-14 text-center">
        <h2 className="font-display text-3xl text-cream">Stay in the Glow</h2>
        <p className="font-body text-cream/70 mt-2 max-w-md mx-auto">
          New arrivals, offers and skincare tips — straight to your inbox.
        </p>

        {status === 'success' ? (
          <p className="mt-6 font-body text-cream">You're on the list! 💌</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 min-h-[48px] bg-cream/10 border border-cream/20 rounded-full px-5 text-cream placeholder:text-cream/40 font-body focus:outline-none focus:border-cream/50"
            />
            <Button type="submit" variant="primary">
              Subscribe
            </Button>
          </form>
        )}
        <p className="text-xs font-body text-cream/40 mt-3">No spam, unsubscribe anytime.</p>
      </div>
    </section>
  )
}