import { Card, Input, Button, Typography } from "@material-tailwind/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/useAuthContext"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { error, success, LOGIN } = useAuthContext()

  const user = {
    email,
    password,
  }

  return (
    <main className="w-full px-1 h-screen flex items-center justify-center bg-white-default">
      <Card
        color="transparent"
        shadow={false}
        className="shadow-md transition-all ease-linear hover:shadow-lg py-4 px-6"
      >
        <Typography variant="h4" className="text-black-dark">
          Login
        </Typography>
        <Typography className="mt-1 font-normal text-black-dark/70">
          Enter your details to login.
        </Typography>
        {error && (
          <Typography color="red" className="mt-2 font-normal bg-red-50 p-1">
            {error}
          </Typography>
        )}
        {success && (
          <Typography
            color="green"
            className="mt-2 font-normal bg-green-50 p-1"
          >
            {success}
          </Typography>
        )}
        <form
          onSubmit={(e) => LOGIN(e, user)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              crossOrigin={undefined}
              size="lg"
              label="Email"
              required
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              crossOrigin={undefined}
              type="password"
              size="lg"
              label="Password"
              required
            />
          </div>

          <Button
            type="submit"
            className="mt-6 bg-black-dark text-white-default"
            fullWidth
          >
            Login
          </Button>
          <Typography className="mt-4 text-center font-normal text-black-dark/70">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-black-dark">
              Register here
            </Link>
          </Typography>
        </form>
      </Card>
    </main>
  )
}
