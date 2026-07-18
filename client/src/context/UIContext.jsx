import { createContext, useContext, useState, useCallback } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState('login') // 'login' | 'signup'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toast, setToast] = useState(null) // { message, type }

  const openAuthModal = useCallback((tab = 'login') => {
    setAuthModalTab(tab)
    setAuthModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => setAuthModalOpen(false), [])

  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((v) => !v), [])

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  return (
    <UIContext.Provider
      value={{
        authModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        mobileMenuOpen,
        toggleMobileMenu,
        toast,
        showToast,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => useContext(UIContext)