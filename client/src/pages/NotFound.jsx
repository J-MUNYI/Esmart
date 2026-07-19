import { Link } from 'react-router-dom'
import Button from '../components/atoms/Button'

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <p className="font-display text-6xl text-deep-rose mb-4">404</p>
      <h1 className="font-heading text-xl text-ink mb-2">This page doesn't exist.</h1>
      <p className="font-body text-slate mb-8">Head back home and let's find what you need.</p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  )
}