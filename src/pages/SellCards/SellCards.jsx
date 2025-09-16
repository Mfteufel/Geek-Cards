import React, { useState, useEffect } from 'react';
import './SellCards.css';

const SellCards = () => {
    const [cardImage, setCardImage] = useState(null);
    const [price, setPrice] = useState('');
    const [cardName, setCardName] = useState('');
    const [activeListings, setActiveListings] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Cargar las ventas activas al iniciar el componente
    useEffect(() => {
        loadActiveListings();
    }, []);

    const loadActiveListings = () => {
        const savedListings = localStorage.getItem('activeListings');
        if (savedListings) {
            try {
                const parsedListings = JSON.parse(savedListings);
                setActiveListings(parsedListings);
            } catch (error) {
                console.error('Error loading listings:', error);
                localStorage.setItem('activeListings', JSON.stringify([]));
            }
        }
    };

    const saveActiveListings = (listings) => {
        try {
            localStorage.setItem('activeListings', JSON.stringify(listings));
        } catch (error) {
            console.error('Error saving listings:', error);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCardImage(file);
            // Convertir la imagen a base64 para poder guardarla en localStorage
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!previewUrl || !cardName || !price) {
            alert('Por favor, complete todos los campos');
            return;
        }

        // Create new listing
        const newListing = {
            id: Date.now(),
            image: previewUrl,
            name: cardName,
            price: parseFloat(price),
            date: new Date().toLocaleDateString()
        };

        // Obtener las ventas actuales y agregar la nueva
        const currentListings = JSON.parse(localStorage.getItem('activeListings') || '[]');
        const updatedListings = [...currentListings, newListing];
        
        // Guardar en localStorage y actualizar el estado
        saveActiveListings(updatedListings);
        setActiveListings(updatedListings);

        // Reset form
        setCardImage(null);
        setPreviewUrl(null);
        setPrice('');
        setCardName('');
    };

    return (
        <div className="sell-cards-container">
            <h1>Vender Cartas</h1>
            
            <div className="sell-cards-content">
                <form onSubmit={handleSubmit} className="sell-card-form">
                    <div className="image-upload-section">
                        {previewUrl ? (
                            <div className="image-preview">
                                <img src={previewUrl} alt="Preview" />
                                <button type="button" onClick={() => {
                                    setCardImage(null);
                                    setPreviewUrl(null);
                                }}>
                                    Eliminar imagen
                                </button>
                            </div>
                        ) : (
                            <div className="upload-placeholder">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    id="card-image"
                                />
                                <label htmlFor="card-image">
                                    <span>Subir imagen de la carta</span>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="card-name">Nombre de la carta:</label>
                        <input
                            type="text"
                            id="card-name"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Precio (USD):</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Publicar Carta
                    </button>
                </form>

                <div className="active-listings">
                    <h2>Tus Ventas Activas</h2>
                    <div className="listings-grid">
                        {activeListings.map(listing => (
                            <div key={listing.id} className="listing-card">
                                <img src={listing.image} alt={listing.name} />
                                <div className="listing-details">
                                    <h3>{listing.name}</h3>
                                    <p className="price">USD ${listing.price}</p>
                                    <p className="date">Publicado: {listing.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellCards;
