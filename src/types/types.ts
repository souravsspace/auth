import { ReactNode } from "react"

export type AuthContextProvider = {
  children: ReactNode
}

export type USER_TYPE = {
  name?: string
  age?: number
  email: string
  password: string
  passwordConfirm?: string
}

export type AuthContextType = {
  error: string
  success: string
  loading: boolean
  currentUser: USER_TYPE | null

  SIGN_UP(e: React.FormEvent<HTMLFormElement>, user: USER_TYPE): void
  LOGIN(e: React.FormEvent<HTMLFormElement>, user: USER_TYPE): void

  users: USER_TYPE[]
  userDashData: string

  setError: (value: string) => void
  setSuccess: (value: string) => void
  setLoading: (value: boolean) => void
}
