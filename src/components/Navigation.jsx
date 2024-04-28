import Nav from "react-bootstrap/Nav"
import Navbar from 'react-bootstrap/Navbar'
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Navigation() {
    const {currentUser} = useAuth()
  
    return (
    <Navbar expand='md' data-bs-theme='dark' bg='dark' className="p-3" >
        <Navbar.Brand href='/'>React ToDo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Nav className="text-center">
                {!currentUser &&
                    <Link to='/login' className="nav-link">
                    Login
                    </Link>
                }
                <Link to='/categories' className="nav-link">
                    Categories
                </Link>
                <Link to='/todos' className="nav-link">
                    ToDos
                </Link>
                <Link to='/about' className="nav-link">
                    About
                </Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}