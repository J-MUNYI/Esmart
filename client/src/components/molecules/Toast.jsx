import { useUI } from '../../context/UIContext'

export default function Toast() {
  const { toast } = useUI()

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] transition-all duration-300 ${
        toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      {toast && (
        <div className="bg-ink text-cream px-5 py-3 rounded-full shadow-hover font-body text-sm whitespace-nowrap">
          {toast.message}
        </div>
      )}
    </div>
  )
}