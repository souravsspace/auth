import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/useAuthContext"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react"
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

  const user = users.find((pepole) => pepole.email === getEmail || localItems)
  if (user == null)
    return (
      <div className="bg-white-default w-full h-screen px-1">
        <div className="text-center bg-red-50 p-4 mx-1">no user found!</div>
      </div>
    )

  return (
    <main className="bg-white-default w-full h-screen flex items-center justify-center flex-col">
      <Card className="w-96 mx-1">
        <CardBody>
          <Typography>
            Hey there!{" "}
            <span className="text-green-400 text-lg font-bold">
              {user.name?.split(" ")[0]}
            </span>{" "}
            👋
          </Typography>
          <Typography>{user.email}</Typography>
        </CardBody>
        <CardFooter>
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
        </CardFooter>
      </Card>
    </main>
  )
}
