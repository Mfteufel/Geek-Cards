import React from 'react'
import './ProductCard.css'

export const ProductCard = ({ card, onAddToCart }) => {
  const handleNavigate = () => {
    if (card.id) {
      window.location.href = `/card/${card.id}`;
    }
  };
  return (
    <div className="product-card">
      <img src={card.image || "/images/cartaPokemon.png"} alt={card.name} className="card-image" style={{cursor:'pointer'}} onClick={handleNavigate} />
      <h3 className="card-title" style={{cursor:'pointer'}} onClick={handleNavigate}>{card.name}</h3>
      <p className="card-type">{card.type}</p>
      <p className="card-rarity">{card.rarity}</p>
      <p className="card-price">${card.price || '120.00'}</p>
      <button className="card-button" onClick={() => onAddToCart && onAddToCart(card)}>
        Añadir al carrito
      </button>
    </div>
  )
}
