import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useUI } from './UIContext'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const { openAuthModal, showToast } = useUI()
  const [items, setItems] = useState([])

  // Wishlist lives on the User document (see backend User model),
  // so it resets locally whenever auth state changes.
  useEffect(() => {
    if (user?.wishlist) {
      setItems(user.wishlist)
    } else {
      setItems([])
    }
  }, [user])

  const toggleItem = (product) => {
    if (!user) {
      openAuthModal('signup')
      showToast('Create a free account to save your favourites 💄')
      return
    }
    setItems((prev) => {
      const exists = prev.find((p) => p._id === product._id)
      return exists ? prev.filter((p) => p._id !== product._id) : [...prev, product]
    })
    // Persist to backend — wishlist routes documented in the API spec
    // (kept optimistic here; wire to api.post/delete '/wishlist/:id' as needed)
  }

  const isWishlisted = (id) => items.some((p) => p._id === id)

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)