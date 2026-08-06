import TikTokLogo from '../../assets/icons/icons8-tiktok-logo-50.png'

export default function TikTokIcon({ size = 20, className = '' }) {
  return (
    <img
      src={TikTokLogo}
      alt="TikTok"
      style={{ width: size, height: size }}
      className={className}
    />
  )
}