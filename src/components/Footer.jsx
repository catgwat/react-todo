import { useAuth } from "../contexts/AuthContext"
import Logout from "./Auth/Logout"

export default function Footer() {
  const {currentUser} = useAuth()

  return (
    <>
      {currentUser && <Logout />}
      <footer className="text-center bg-warning p-4">
          <strong>React ToDo - {new Date().getFullYear()} </strong>
      </footer>
    </>
  )
}