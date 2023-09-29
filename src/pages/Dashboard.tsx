import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/useAuthContext"
import { Button } from "@material-tailwind/react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useEffect } from "react"

export default function Dashboard() {
  const { users, getEmail } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (getEmail === "") navigate("/")
  }, [getEmail])

  const user = users.find((user) => user.email === getEmail)
  if (user == null) return null

  console.log(user)

  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.age}</h1>
      <h1>{user.email}</h1>
      <Button
        onClick={() => {
          signOut(auth)
          navigate("/")
        }}
      >
        Logout
      </Button>
    </div>
  )
}
