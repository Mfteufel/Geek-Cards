/**
 * Footer.jsx
 * Componente que representa el pie de página de la aplicación Geek Cards.
 * Contiene enlaces de navegación, información de contacto y redes sociales.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  // Hook para manejar la navegación programática
  const navigate = useNavigate();

  /**
   * Función para realizar un scroll suave hacia la parte superior de la página
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Maneja la navegación y el scroll hacia arriba
   * @param {string} path - Ruta a la que se navegará
   */
  const handleNavigation = (path) => {
    navigate(path);
    // Pequeño delay para asegurar que la navegación se complete antes del scroll
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Sección izquierda - Enlaces principales */}
        <div className="footer-section footer-left">
          <div className="footer-nav">
            <Link to="/" className="footer-link" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/');
            }}>Inicio</Link>
            <Link to="/explore" className="footer-link">Explorar cartas</Link>
            <Link to="/sell-cards" className="footer-link">Vender cartas</Link>
          </div>
        </div>

        {/* Sección central - Contacto y redes sociales */}
        <div className="footer-section footer-center">
          {/* Información de contacto */}
          <div className="contact-section">
            <h3>Contacto</h3>
            <a href="mailto:contacto@geekcards.com">contacto@geekcards.com</a>
          </div>
          
          {/* Enlaces a redes sociales */}
          <div className="social-section">
            <h3>Síguenos</h3>
            <div className="social-links">
              <a href="https://instagram.com/geekcards" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com/geekcards" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Sección derecha - Enlaces secundarios */}
        <div className="footer-section footer-right">
          <div className="footer-nav">
            <Link to="/ofertas" className="footer-link" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/ofertas');
            }}>Ofertas</Link>
            <Link to="/novedades" className="footer-link" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/novedades');
            }}>Novedades</Link>
          </div>
        </div>
      </div>

      {/* Sección inferior - Derechos de autor */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Geek Cards. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;