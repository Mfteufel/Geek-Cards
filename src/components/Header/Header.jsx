import { NavBar } from "./NavBar";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ImgLogo from '../../assets/img/Logo.png';
import { useCarrito } from '../../context/CarritoContext.jsx'; 
import './Header.css';

export const Header = ({ isAuthenticated, user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCarrito();

  return (
    <header>
      <div className="header-content">
        <Link to="/" className="logo-link">
          <img className="logo" src={ImgLogo} alt="Logo" />
        </Link>
        <h1>Geek Cards</h1>
        <div className="login-buttons">
          <Link to="/carrito" className="cart">
            <i className="bi bi-cart"></i>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          {isAuthenticated ? (
            <div className="user-menu">
              <Link to="/perfil" className="profile-btn">
                Mi Perfil
              </Link>
              <span className="user-name">Hola, {user?.name}</span>
              <button className="logout-btn" onClick={onLogout}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => navigate("/auth/register")} className="register-btn">Registrarse</button>
              <button onClick={() => navigate("/auth/login")} className="login-btn">Iniciar Sesion</button>
            </>
          )}
        </div>
      </div>

      <Link to="/" className={`opciones ${location.pathname === '/' ? 'active' : ''}`}>
        <b>Inicio</b>
      </Link>
      <Link to="/explore" className={`opciones ${location.pathname === '/explore' ? 'active' : ''}`}>
        <b>Explorar Cartas</b>
      </Link>
      <Link to="/ofertas" className={`opciones ${location.pathname === '/ofertas' ? 'active' : ''}`}>
        <b>Ofertas</b>
      </Link>
      <Link to="/novedades" className={`opciones ${location.pathname === '/novedades' ? 'active' : ''}`}>
        <b>Novedades</b>
      </Link>
    </header>
  );
};
