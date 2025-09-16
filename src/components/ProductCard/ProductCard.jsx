import React from 'react'
import './ProductCard.css'

export const ProductCard = ({ card, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={card.image || "/images/cartaPokemon.png"} alt={card.name} className="card-image" />
      <h3 className="card-title">{card.name}</h3>
      <p className="card-type">{card.type}</p>
      <p className="card-rarity">{card.rarity}</p>
      <p className="card-price">${card.price || '120.00'}</p>
      <button className="card-button" onClick={() => onAddToCart && onAddToCart(card)}>
        Añadir al carrito
      </button>
    </div>
  )
}
