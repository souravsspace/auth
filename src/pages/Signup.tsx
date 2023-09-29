import { Card, Input, Button, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/useAuthContext"
import { useState } from "react"

export function Signup() {
  const [name, setName] = useState("")
  const [age, setAge] = useState<number>()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const { SIGN_UP, error, loading, success } = useAuthContext()

  const user = {
    name,
    age,
    email,
    password,
    passwordConfirm,
  }

  return (
    <main className="w-full h-screen flex items-center justify-center bg-white-default">
      <Card
        color="transparent"
        shadow={false}
        className="shadow-md transition-all ease-linear hover:shadow-lg py-4 px-6"
      >
        <Typography variant="h4" className="text-black-dark">
          Sign Up
        </Typography>
        <Typography className="mt-1 font-normal text-black-dark/70">
          Enter your details to register.
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
          onSubmit={(e) => SIGN_UP(e, user)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              crossOrigin={undefined}
              size="lg"
              label="Name"
              required
            />
            <Input
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              crossOrigin={undefined}
              size="lg"
              label="Age"
              required
            />
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
            <Input
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              crossOrigin={undefined}
              type="password"
              size="lg"
              label="Confirm password"
              required
            />
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="mt-6 bg-black-dark text-white-default"
            fullWidth
          >
            Register
          </Button>
          <Typography className="mt-4 text-center font-normal text-black-dark/70">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-black-dark">
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </main>
  )
}
