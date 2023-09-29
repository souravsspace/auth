import { Routes, Route } from "react-router-dom"
import AuthContextProvider from "./context/useAuthContext"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
import Dashboard from "./pages/Dashboard"


export default function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthContextProvider>
  )
}
