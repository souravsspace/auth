import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth, fireStore } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"
import { AuthContextProvider, AuthContextType, USER_TYPE } from "../types/types"
import { addDoc, collection, getDocs } from "firebase/firestore"

const AuthContext = createContext({} as AuthContextType)
export const useAuthContext = () => useContext(AuthContext)

export default function AuthContextProvider({ children }: AuthContextProvider) {
  const [currentUser, setCurrentUser] = useState<USER_TYPE | null>(null)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<USER_TYPE[]>([])
  const [getEmail, setGetEmail] = useState("")

  const navigate = useNavigate()

  const usersCollectionRef = collection(fireStore, "user_data")

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollectionRef)
        setUsers(
          data.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as USER_TYPE),
          }))
        )
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  }, [getEmail])

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
      await addDoc(usersCollectionRef, {
        name: user.name,
        age: user.age,
        email: user.email,
        password: user.password,
      })

      navigate("/")
    } catch {
      setError("Failed to create an account")
      setSuccess("")
    }
    setLoading(false)
    setError("")
    setSuccess("")
  }

  async function LOGIN(e: React.FormEvent<HTMLFormElement>, user: USER_TYPE) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)

      const email = user.email
      const password = user.password

      const userAuth = { email, password }
      await loginAuth(userAuth)

      setGetEmail(user.email)
      setSuccess("Logged in successfully")

      localStorage.setItem("user", userAuth.email)

      setTimeout(() => {
        navigate("/dashboard")
      }, 1000)
    } catch {
      setError("Failed to login")
    }
    setLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("")
      setSuccess("")
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [error, success])

  return (
    <AuthContext.Provider
      value={{
        SIGN_UP,
        LOGIN,
        currentUser,
        error,
        loading,
        success,
        users,
        getEmail,

        setError,
        setLoading,
        setSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
