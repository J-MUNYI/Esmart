import { createContext, useContext, useReducer, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext(null)

const initialState = {
  user: null,
  isLoading: true,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true }
    case 'LOGIN':
      return { user: action.payload, isLoading: false }
    case 'LOGOUT':
      return { user: null, isLoading: false }
    case 'DONE_LOADING':
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // On mount, check if a valid session cookie already exists
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get('/auth/me')
        dispatch({ type: 'LOGIN', payload: data })
      } catch {
        dispatch({ type: 'DONE_LOADING' })
      }
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    dispatch({ type: 'LOGIN', payload: data })
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    dispatch({ type: 'LOGIN', payload: data })
    return data
  }

  const logout = async () => {
    await api.post('/auth/logout')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)