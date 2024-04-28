//Below we are making a component that redirects the unauthenticated user to the login screen. We pass in children in the params as a prop which refers to any component that is nested inside of ProtectedRoute tags.
import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({children}) {
    const { currentUser } = useAuth()


    //Below is a rare example of a good one-line return in a React component
    //If there is a currentUser, return the children. Otherwise, redirect to the login page:
  return currentUser ? children : <Navigate to='/login' />
}