import React from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useCarrito } from '../../context/CarritoContext.jsx'; 
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { agregar } = useCarrito();                          
  // Cartas destacadas para la página de inicio (igual que antes)
  const featuredCards = [
    { id: '1', name: 'Dragón de Fuego', type: 'Criatura', rarity: 'Épica',     price: '150.00', image: '/images/cartaPokemon.png' },
    { id: '2', name: 'Guerrero Legendario', type: 'Criatura', rarity: 'Legendaria', price: '300.00', image: '/images/cartaPokemon.png' },
    { id: '3', name: 'Espada del Destino', type: 'Equipo',   rarity: 'Legendaria', price: '400.00', image: '/images/cartaPokemon.png' },
    { id: '4', name: 'Anillo de Poder', type: 'Equipo',     rarity: 'Legendaria', price: '350.00', image: '/images/cartaPokemon.png' },
  ];

  const handleAddToCart = (card) => {
    const precioNum = Number(String(card.price).replace(/[^\d.,-]/g,'').replace(',', '.')) || 0;
    agregar({
      id: card.name,        
      titulo: card.name,
      precio: precioNum,
      imagen: card.image,
      sku: card.sku,
      variante: card.type,
      cantidad: 1,
    });
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a Geek Cards</h1>
          <p className="hero-subtitle">Descubre las mejores cartas coleccionables del mundo geek</p>
          <div className="hero-buttons">
            <Link className="btn-primary" to="/explore">Explorar Cartas</Link>
            <Link className="btn-secondary" to="/ofertas">Ver Ofertas</Link>
          </div>
        </div>
      </section>

      <section className="quick-access-section">
        <div className="container">
          <h2 className="section-title">Acceso Rápido</h2>
          <div className="quick-access-grid">
            <Link to="/explore" className="quick-access-card">
              <div className="quick-access-icon">🔍</div>
              <h3>Explorar Cartas</h3>
              <p>Descubre nuestra colección completa</p>
            </Link>
            <Link to="/sell-cards" className="quick-access-card">
              <div className="quick-access-icon">💰</div>
              <h3>Vender Cartas</h3>
              <p>Publica tus cartas a la venta</p>
            </Link>
            <Link to="/carrito" className="quick-access-card">
              <div className="quick-access-icon">🛒</div>
              <h3>Tu Carrito</h3>
              <p>Gestiona tus compras</p>
            </Link>
            <Link to="/perfil" className="quick-access-card">
              <div className="quick-access-icon">👤</div>
              <h3>Tu Perfil</h3>
              <p>Administra tu cuenta</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Cartas Destacadas</h2>
          <p className="section-subtitle">Las cartas más populares de nuestra colección</p>

          <div className="cards-grid">
            {featuredCards.map((card, index) => (
              <ProductCard
                key={index}
                card={card}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Categorías</h2>
          <div className="categories-grid">
            <Link to="/explore?category=criaturas" className="category-card" aria-label="Filtrar por Criaturas">
              <div className="category-icon">🃏</div>
              <h3>Criaturas</h3>
              <p>Dragones, bestias y seres mágicos</p>
            </Link>

            <Link to="/explore?category=equipos" className="category-card" aria-label="Filtrar por Equipos">
              <div className="category-icon">⚔️</div>
              <h3>Equipos</h3>
              <p>Armas, armaduras y objetos mágicos</p>
            </Link>

            <Link to="/explore?category=hechizos" className="category-card" aria-label="Filtrar por Hechizos">
              <div className="category-icon">✨</div>
              <h3>Hechizos</h3>
              <p>Magia y poderes sobrenaturales</p>
            </Link>

            <Link to="/explore?category=consumibles" className="category-card" aria-label="Filtrar por Consumibles">
              <div className="category-icon">🧪</div>
              <h3>Consumibles</h3>
              <p>Pociones y objetos especiales</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
