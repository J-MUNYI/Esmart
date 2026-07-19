import { BrowserRouter } from 'react-router-dom'
import { UIProvider } from './context/UIContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import AppRouter from './router/AppRouter'

// Provider order matters: WishlistContext reads from both AuthContext
// and UIContext (to open the auth modal + show toasts when a guest
// tries to wishlist something), so those must wrap it.
export default function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AppRouter />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </UIProvider>
    </BrowserRouter>
  )
}