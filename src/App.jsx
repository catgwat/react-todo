import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import ToDos from './components/ToDos/ToDos'
import About from './components/About/About'
import Categories from './components/Categories/Categories'
import Login from './components/Auth/Login'
import NotFound from './components/NotFound/NotFound'
import AuthProvider from './contexts/AuthContext'

import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'



export default function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<ProtectedRoute><ToDos /></ProtectedRoute> } />
            <Route path='/login' element={<Login />} />
            <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/about' element={<About />} />
            <Route path='/todos' element={<ProtectedRoute><ToDos /></ProtectedRoute> } />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}