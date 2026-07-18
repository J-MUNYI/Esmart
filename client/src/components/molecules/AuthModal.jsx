import { useState } from 'react'
import { X } from 'lucide-react'
import Button from '../atoms/Button'
import { useAuth } from '../../context/AuthContext'
import { useUI } from '../../context/UIContext'

export default function AuthModal() {
  const { authModalOpen, authModalTab, closeAuthModal, showToast } = useUI()
  const { login, register } = useAuth()

  const [tab, setTab] = useState(authModalTab)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [error, setError] = useState(null)

  // Sync tab when opened from different triggers (e.g. wishlist gate opens 'signup')
  if (authModalOpen && tab !== authModalTab && status === 'idle') {
    setTab(authModalTab)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError(null)
    try {
      if (tab === 'signup') {
        await register(form.name, form.email, form.password)
        showToast('Welcome to Esmart Beauty! 💄')
      } else {
        await login(form.email, form.password)
        showToast('Welcome back!')
      }
      setForm({ name: '', email: '', password: '' })
      closeAuthModal()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't complete that. Check your details and try again."
      )
      setStatus('error')
      return
    }
    setStatus('idle')
  }

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 transition-all duration-300 ${
        authModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={tab === 'signup' ? 'Sign up' : 'Log in'}
        className={`relative w-full max-w-md bg-cream rounded-card p-6 shadow-hover transition-all duration-300 ${
          authModalOpen ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
        }`}
      >
        <button
          onClick={closeAuthModal}
          aria-label="Close"
          className="absolute top-4 right-4 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full hover:bg-warm-cream"
        >
          <X size={20} />
        </button>

        <div className="flex gap-2 mb-6 bg-warm-cream rounded-full p-1">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 min-h-[44px] rounded-full font-heading text-sm font-medium transition-colors ${
              tab === 'login' ? 'bg-deep-rose text-cream' : 'text-ink'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 min-h-[44px] rounded-full font-heading text-sm font-medium transition-colors ${
              tab === 'signup' ? 'bg-deep-rose text-cream' : 'text-ink'
            }`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="font-display text-2xl text-ink mb-4">
          {tab === 'signup' ? 'Create your account' : 'Welcome back'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label htmlFor="name" className="text-sm font-body text-slate">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 bg-white border border-latte rounded-xl px-4 py-3 font-body text-ink focus:outline-none focus:border-deep-rose"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="text-sm font-body text-slate">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1 bg-white border border-latte rounded-xl px-4 py-3 font-body text-ink focus:outline-none focus:border-deep-rose"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-body text-slate">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mt-1 bg-white border border-latte rounded-xl px-4 py-3 font-body text-ink focus:outline-none focus:border-deep-rose"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-error font-body">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Please wait…' : tab === 'signup' ? 'Create Account' : 'Log In'}
          </Button>
        </form>
      </div>
    </div>
  )
}