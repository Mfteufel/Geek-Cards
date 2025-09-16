import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Explore from './pages/Explore/Explore'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import MiCuenta from './pages/Profile/MiCuenta'
import { CarritoProvider } from './context/CarritoContext'
import Carrito from './pages/Carrito/Carrito'
import Checkout from './pages/Checkout/Checkout'
import RequireLoginModal from "./pages/Auth/RequireLoginModal"
import SellCards from './pages/SellCards/SellCards'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Verificar si hay un usuario logueado al cargar la app
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('geekCardsCurrentUser') || sessionStorage.getItem('geekCardsCurrentUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    console.log('Usuario logueado:', userData)
  }

  const handleRegister = (userData) => {
    console.log('Usuario registrado:', userData)
    // El registro ya maneja la redirección internamente
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('geekCardsCurrentUser')
    sessionStorage.removeItem('geekCardsCurrentUser')
    console.log('Usuario deslogueado')
  }

  return (
    <Router>
      <CarritoProvider>
        <div className="App">
         <Header 
            isAuthenticated={isAuthenticated} 
            user={user} 
            onLogout={handleLogout} 
          />
          <main>
            <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/explore" element={<Explore />} />
              <Route 
                path="/auth/login" 
                element={
                  <Login 
                    onLogin={handleLogin}
                    onSwitchToRegister={() => window.location.href = '/auth/register'}
                  />
                } 
              />
              <Route 
                path="/auth/register" 
                element={
                  <Register 
                    onRegister={handleRegister}
                    onSwitchToLogin={() => window.location.href = '/auth/login'}
                  />
                } 
              />
              <Route 
                path="/perfil" 
                element={
                  <MiCuenta 
                    user={user}
                    onLogout={handleLogout}
                  />
                } 
              />
              <Route path="/ofertas" element={<div className="page-placeholder"><h1>Ofertas</h1><p>Página en construcción</p></div>} />
              <Route path="/novedades" element={<div className="page-placeholder"><h1>Novedades</h1><p>Página en construcción</p></div>} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/sell-cards" element={<RequireLoginModal isAuthenticated={isAuthenticated}><SellCards /></RequireLoginModal>} />
              <Route path="/checkout" element={<RequireLoginModal isAuthenticated={isAuthenticated}> <Checkout /></RequireLoginModal>}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </CarritoProvider>
    </Router>
  )
}

export default App
