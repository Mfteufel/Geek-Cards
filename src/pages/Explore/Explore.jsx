import React, { useState, useMemo } from 'react'; 
import { useCarrito } from '../../context/CarritoContext';
import CardGrid from './CardGrid';
import './Explore.css';
import { useSearchParams } from 'react-router-dom'; // ⬅️ nuevo

const Explore = () => {
  const { agregar } = useCarrito();

  const [searchParams] = useSearchParams(); // ⬅️ nuevo
  const categoryParam = (searchParams.get('category') || '').toLowerCase(); // ⬅️ nuevo
  const CATEGORY_TO_TYPE = { // ⬅️ nuevo
    criaturas: 'Criatura',
    equipos: 'Equipo',
    hechizos: 'Hechizo',
    consumibles: 'Consumible',
  };
  const initialSelectedType = CATEGORY_TO_TYPE[categoryParam] || ''; // ⬅️ nuevo

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(initialSelectedType); // ⬅️ inicia con el tipo mapeado
  const [selectedRarity, setSelectedRarity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);

  // Demo data
  const allCards = [
  { id: '1', name: 'Dragón de Fuego', type: 'Criatura', rarity: 'Épica',      price: '150.00', image: '/images/cartaPokemon.png' },
  { id: '2', name: 'Hechizo de Curación', type: 'Hechizo', rarity: 'Común',   price: '50.00',  image: '/images/cartaPokemon.png' },
  { id: '3', name: 'Guerrero Legendario', type: 'Criatura', rarity: 'Legendaria', price: '300.00', image: '/images/cartaPokemon.png' },
  { id: '4', name: 'Armadura Mágica', type: 'Equipo', rarity: 'Rara',         price: '200.00', image: '/images/cartaPokemon.png' },
  { id: '5', name: 'Bola de Fuego', type: 'Hechizo', rarity: 'Común',         price: '75.00',  image: '/images/cartaPokemon.png' },
  { id: '6', name: 'Fénix Renacido', type: 'Criatura', rarity: 'Épica',       price: '180.00', image: '/images/cartaPokemon.png' },
  { id: '7', name: 'Espada del Destino', type: 'Equipo', rarity: 'Legendaria', price: '400.00', image: '/images/cartaPokemon.png' },
  { id: '8', name: 'Escudo Protector', type: 'Equipo', rarity: 'Rara',        price: '160.00', image: '/images/cartaPokemon.png' },
  { id: '9', name: 'Mago Arcano', type: 'Criatura', rarity: 'Rara',           price: '120.00', image: '/images/cartaPokemon.png' },
  { id: '10', name: 'Poción de Fuerza', type: 'Consumible', rarity: 'Común',   price: '30.00',  image: '/images/cartaPokemon.png' },
  { id: '11', name: 'Dragón de Hielo', type: 'Criatura', rarity: 'Épica',      price: '170.00', image: '/images/cartaPokemon.png' },
  { id: '12', name: 'Teletransporte', type: 'Hechizo', rarity: 'Rara',         price: '140.00', image: '/images/cartaPokemon.png' },
  { id: '13', name: 'Golem de Piedra', type: 'Criatura', rarity: 'Común',      price: '80.00',  image: '/images/cartaPokemon.png' },
  { id: '14', name: 'Anillo de Poder', type: 'Equipo', rarity: 'Legendaria',   price: '350.00', image: '/images/cartaPokemon.png' },
  { id: '15', name: 'Rayo Eléctrico', type: 'Hechizo', rarity: 'Común',        price: '60.00',  image: '/images/cartaPokemon.png' },
  { id: '16', name: 'Hada Mágica', type: 'Criatura', rarity: 'Rara',           price: '110.00', image: '/images/cartaPokemon.png' },
  { id: '17', name: 'Botas de Velocidad', type: 'Equipo', rarity: 'Común',     price: '90.00',  image: '/images/cartaPokemon.png' },
  { id: '18', name: 'Invisibilidad', type: 'Hechizo', rarity: 'Épica',         price: '190.00', image: '/images/cartaPokemon.png' },
  { id: '19', name: 'Lobo Salvaje', type: 'Criatura', rarity: 'Común',         price: '70.00',  image: '/images/cartaPokemon.png' },
  { id: '20', name: 'Pergamino de Sabiduría', type: 'Consumible', rarity: 'Rara', price: '130.00', image: '/images/cartaPokemon.png' },
  { id: '21', name: 'Demonio del Abismo', type: 'Criatura', rarity: 'Legendaria', price: '500.00', image: '/images/cartaPokemon.png' },
  { id: '22', name: 'Escudo de Hielo', type: 'Equipo', rarity: 'Épica',        price: '220.00', image: '/images/cartaPokemon.png' },
  { id: '23', name: 'Curación Mayor', type: 'Hechizo', rarity: 'Rara',         price: '150.00', image: '/images/cartaPokemon.png' },
  { id: '24', name: 'Ángel Guardián', type: 'Criatura', rarity: 'Legendaria',  price: '450.00', image: '/images/cartaPokemon.png' }
  ];

  const types = ['Todos', 'Criatura', 'Hechizo', 'Equipo', 'Consumible'];
  const rarities = ['Todas', 'Común', 'Rara', 'Épica', 'Legendaria'];

  const filteredCards = useMemo(() => {
    return allCards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === '' || selectedType === 'Todos' || card.type === selectedType;
      const matchesRarity = selectedRarity === '' || selectedRarity === 'Todas' || card.rarity === selectedRarity;
      return matchesSearch && matchesType && matchesRarity;
    });
  }, [allCards, searchTerm, selectedType, selectedRarity]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
  const handleTypeChange = (e) => { setSelectedType(e.target.value); setCurrentPage(1); };
  const handleRarityChange = (e) => { setSelectedRarity(e.target.value); setCurrentPage(1); };
  const clearFilters = () => { setSearchTerm(''); setSelectedType(''); setSelectedRarity(''); setCurrentPage(1); };

  const handleAddToCart = (card) => {
    const precioNum =
      Number(String(card.price).replace(/[^\d.,-]/g, '').replace(',', '.')) || 0;

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
    <div className="explore-container">
      <div className="explore-header">
        <h1 className="explore-title">Explorar Cartas</h1>
        <p className="explore-subtitle">Descubre tu próxima carta perfecta</p>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="  Buscar cartas..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div className="search-icon">🔍</div>
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>Tipo:</label>
            <select value={selectedType} onChange={handleTypeChange} className="filter-select">
              {types.map(type => (
                <option key={type} value={type === 'Todos' ? '' : type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Rareza:</label>
            <select value={selectedRarity} onChange={handleRarityChange} className="filter-select">
              {rarities.map(rarity => (
                <option key={rarity} value={rarity === 'Todas' ? '' : rarity}>{rarity}</option>
              ))}
            </select>
          </div>

          <button onClick={clearFilters} className="clear-filters-btn">
            Limpiar Filtros
          </button>
        </div>
      </div>

      <div className="results-info">
        <p>Mostrando {filteredCards.length} cartas</p>
        {filteredCards.length === 0 && (
          <p className="no-results">No se encontraron cartas con los filtros seleccionados</p>
        )}
      </div>

      <CardGrid
        cards={filteredCards}
        currentPage={currentPage}
        cardsPerPage={cardsPerPage}
        onPageChange={handlePageChange}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Explore;
