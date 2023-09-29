import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/useAuthContext"
import { Button } from "@material-tailwind/react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useEffect } from "react"

export default function Dashboard() {
  const { users, getEmail } = useAuthContext()
  const navigate = useNavigate()

  const localItems = localStorage.getItem("user")

  useEffect(() => {
    if (localItems == null) navigate("/")
  }, [localItems])

  const user = users.find((user) => user.email === (getEmail || localItems))
  if (user == null) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.age}</h1>
      <h1>{user.email}</h1>
      <Button
        onClick={() => {
          signOut(auth)
          localStorage.removeItem("user")
          navigate("/")
        }}
        className="text-white-default bg-black-dark"
      >
        Logout
      </Button>
    </div>
  )
}
