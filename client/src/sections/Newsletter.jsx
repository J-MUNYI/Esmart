import TikTokIcon from '../components/atoms/TikTokIcon'

export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="rounded-card bg-ink px-6 py-10 sm:px-12 sm:py-14 text-center">
        <h2 className="font-display text-3xl text-cream">Follow us on TikTok</h2>
        <p className="font-body text-cream/70 mt-2 max-w-md mx-auto">
          Join our TikTok community for beauty tutorials, product demos, and exclusive offers.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <a 
            href="https://www.tiktok.com/@jtc_g125?_r=1&_t=ZS-98Jxk1Ric1E"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[48px] bg-deep-rose text-cream hover:bg-[#b96868] shadow-card hover:shadow-hover inline-flex items-center justify-center gap-2 font-heading font-medium rounded-full transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-deep-rose focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-base px-6 py-3"
          >
            <TikTokIcon size={18} /> Follow on TikTok
          </a>
        </div>
        <p className="text-xs font-body text-cream/40 mt-3">For latest products and pure vibes.</p>
      </div>
    </section>
  )
}