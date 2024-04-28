//We will create a React Context in this file that will house all authentication info (currentUser, login, logout). React contexts allow us to store information and transport that info to the components that use it. We could store this info in the App component and just pass props to send the user information to other components but this isn't ideal for larger apps. Instead, we create the context and a component that will communicate this context to its children. Think of this much like Session storage in a .NET application.
import React, {useState, useEffect, useContext} from 'react'
//below we will bring in the auth object we exported from base.js
import { auth } from '../components/base'
//below we import firebase functions needed for login/logout functionality
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

//Below we create a context (storage object) for all our auth info
const AuthContext = React.createContext()

//Below we we create a function that will allow us to use the context in components. We will import 
//this function any time we want the currentUser, Login or Logout objects.
export function useAuth(){
    return useContext(AuthContext)
}

//This component will provide the AuthContext info to the children components nested inside of it. 
//See App.jsx where we call to an instance of this component and nest all other components inside of it.
export default function AuthProvider({children}) {
    //Create a hook to store our currentUser info:
    const [currentUser, setCurrentUser] = useState()
    //This second hook tracks whether the login/logout process is still loading
    const [loading, setLoading] = useState(true)

    //login functionality
    //instantiate a GithubAuthProvider object
    const githubAuthProvider = new GithubAuthProvider()

    //Now that we have an instance of the githubAuthProvider, we can write the login function:
    async function login(){
        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            //Once we reach this point of code, we have successfully signed in. Let's log the data and setCurrentUser to the user property of the data we recieve
            console.log(authData)
            setCurrentUser(authData.user)
        }))
    }

    //now that we have login, we also get a currentUser. All that's left is writing the logout function:
    async function logout() {
        signOut(auth).then(setCurrentUser(null))
    }

    //The object below will hold the currentUser object and the login and logout functions. We will pass them as a prop in the return below so that the children of AuthProvider are able to receive them.
    const value= { currentUser, login, logout }

    useEffect(() => {
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange

    }, []);

    return (
    <AuthContext.Provider value={value}>
        {/* Below we must wait for the AuthContext info to populate before loading any child components to the UI. */}
        {!loading && children}
    </AuthContext.Provider>
  )
}