import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { auth } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

type AuthContextProvider = {
  children: ReactNode
}

type USER_TYPE = {
  name?: string
  age?: number
  email: string
  password: string
  passwordConfirm?: string
}

type AuthContextType = {
  error: string
  success: string
  loading: boolean
  currentUser: USER_TYPE | null

  SIGN_UP(e: React.FormEvent<HTMLFormElement>, user: USER_TYPE): void
  LOGIN(e: React.FormEvent<HTMLFormElement>, user: USER_TYPE): void
}

const AuthContext = createContext({} as AuthContextType)
export const useAuthContext = () => useContext(AuthContext)

export default function AuthContextProvider({ children }: AuthContextProvider) {
  const [currentUser, setCurrentUser] = useState<USER_TYPE | null>(null)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function singupAuth(user: USER_TYPE) {
    return createUserWithEmailAndPassword(auth, user.email, user.password)
  }

  function loginAuth(user: USER_TYPE) {
    return signInWithEmailAndPassword(auth, user.email, user.password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user as object as USER_TYPE)
    })
    return unsubscribe
  }, [])

  async function SIGN_UP(e: React.FormEvent<HTMLFormElement>, user: USER_TYPE) {
    e.preventDefault()

    if (user.password !== user.passwordConfirm)
      return setError("Passwords do not match")
    if (user.password.length < 8)
      return setError("Password must be 8+ characters")

    try {
      setError("")
      setLoading(true)
      setSuccess("Account created successfully")

      const email = user.email
      const password = user.password

      const userAuth = { email, password }
      await singupAuth(userAuth)
      navigate("/dashboard")
    } catch {
      setError("Failed to create an account")
      setSuccess("")
    }
    setLoading(false)
  }

  async function LOGIN(e: React.FormEvent<HTMLFormElement>, user: USER_TYPE) {
    e.preventDefault()

    try {
      const email = user.email
      const password = user.password

      setError("")
      setLoading(true)
      setSuccess("Logged in successfully")

      const userAuth = { email, password }
      await loginAuth(userAuth)
      navigate("/dashboard")
    } catch {
      setError("Failed to login")
      setSuccess("")
    }
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        SIGN_UP,
        LOGIN,
        currentUser,
        error,
        loading,
        success,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
