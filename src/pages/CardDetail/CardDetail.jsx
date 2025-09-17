import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CardDetail.css';

// Demo: catálogo simulado (debería venir de contexto/API)
const demoCards = [
  { id: '1', name: 'Dragón de Fuego', type: 'Criatura', rarity: 'Épica', price: '150.00', image: '/images/cartaPokemon.png', description: 'Un dragón legendario con poder de fuego.' },
  { id: '2', name: 'Guerrero Legendario', type: 'Criatura', rarity: 'Legendaria', price: '300.00', image: '/images/cartaPokemon.png', description: 'Guerrero con habilidades únicas.' },
  { id: '3', name: 'Espada del Destino', type: 'Equipo', rarity: 'Legendaria', price: '400.00', image: '/images/cartaPokemon.png', description: 'Espada mágica que otorga gran poder.' },
  // ...agrega más cartas si lo necesitas
];

export default function CardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = demoCards.find(c => c.id === id);

  if (!card) {
    return <div className="card-detail-error">Carta no encontrada</div>;
  }

    return (
      <div className="card-detail-container">
        <div className="card-detail-content">
          <img src={card.image} alt={card.name} className="card-detail-image" />
          <div className="card-detail-info">
            <h2>{card.name}</h2>
            <p><strong>Tipo:</strong> {card.type}</p>
            <span className="card-detail-rarity">{card.rarity}</span>
            <span className="card-detail-price">${card.price}</span>
            <div className="card-detail-description">{card.description}</div>
          </div>
        </div>
        <button className="card-detail-back card-detail-back-bottom" onClick={() => navigate('/explore')}>Volver</button>
      </div>
    );
}
