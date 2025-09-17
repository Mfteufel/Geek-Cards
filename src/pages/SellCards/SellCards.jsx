import React, { useState, useEffect } from 'react';
import './SellCards.css';

const DEFAULT_CATEGORIES = ['Juegos', 'Coleccionables', 'Figuras', 'Otros'];
const TIPOS = ['Criatura', 'Hechizo', 'Equipo', 'Consumible'];
const RAREZAS = ['Comun', 'Rara', 'Epica', 'Legendaria'];

const SellCards = () => {
    const [images, setImages] = useState([]); // array of base64 strings
    const [price, setPrice] = useState('');
    const [cardName, setCardName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
    const [tipo, setTipo] = useState(TIPOS[0]);
    const [rareza, setRareza] = useState(RAREZAS[0]);
    const [stock, setStock] = useState(1);
    const [activeListings, setActiveListings] = useState([]);

    useEffect(() => {
        loadActiveListings();
    }, []);

    const loadActiveListings = () => {
        const savedListings = localStorage.getItem('activeListings');
        if (savedListings) {
            try {
                let parsedListings = JSON.parse(savedListings);
                // Migrar datos antiguos: si solo tienen 'image', convertir a 'images'
                parsedListings = parsedListings.map(l => ({
                    ...l,
                    images: l.images ? l.images : l.image ? [l.image] : [],
                }));
                setActiveListings(parsedListings);
                localStorage.setItem('activeListings', JSON.stringify(parsedListings));
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

    const handleImagesUpload = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        // Read all files as base64 and append to images
        const readers = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readers)
            .then(results => setImages(prev => [...prev, ...results]))
            .catch(err => console.error('Error reading images', err));
    };

    const removeImageAt = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!images.length || !cardName || !price || !category) {
            alert('Por favor complete: imagen(es), nombre, precio y categoría');
            return;
        }

        const newListing = {
            id: Date.now(),
            images,
            name: cardName,
            price: parseFloat(price),
            description,
            category,
            tipo,
            rareza,
            stock: Number(stock) || 0,
            date: new Date().toLocaleDateString()
        };

        const currentListings = JSON.parse(localStorage.getItem('activeListings') || '[]');
        const updatedListings = [...currentListings, newListing];

        saveActiveListings(updatedListings);
        setActiveListings(updatedListings);

        // reset form
        setImages([]);
        setPrice('');
        setCardName('');
        setDescription('');
        setCategory(DEFAULT_CATEGORIES[0]);
        setTipo(TIPOS[0]);
        setRareza(RAREZAS[0]);
        setStock(1);
    };

    const deleteListing = (id) => {
        const updated = activeListings.filter(l => l.id !== id);
        saveActiveListings(updated);
        setActiveListings(updated);
    };

    const changeStock = (id, delta) => {
        const updated = activeListings.map(l => {
            if (l.id !== id) return l;
            const newStock = Math.max(0, (Number(l.stock) || 0) + delta);
            return { ...l, stock: newStock };
        });
        saveActiveListings(updated);
        setActiveListings(updated);
    };

    return (
        <div className="sell-cards-container">
            <h1>Vender Cartas</h1>

            <div className="sell-cards-content">
                <form onSubmit={handleSubmit} className="sell-card-form">
                    <div className="image-upload-section">
                        {images.length ? (
                            <div className="image-preview-multiple">
                                {images.map((src, idx) => (
                                    <div className="thumb" key={idx}>
                                        <img src={src} alt={`Preview ${idx}`} />
                                        <button type="button" onClick={() => removeImageAt(idx)}>Eliminar</button>
                                    </div>
                                ))}
                                <div style={{marginTop:10}}>
                                    <input type="file" accept="image/*" multiple onChange={handleImagesUpload} id="card-images" />
                                </div>
                            </div>
                        ) : (
                            <div className="upload-placeholder">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImagesUpload}
                                    id="card-images"
                                />
                                <label htmlFor="card-images">
                                    <span>Subir imagenes de la carta (puedes seleccionar varias)</span>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="card-name">Nombre del producto:</label>
                        <input
                            type="text"
                            id="card-name"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tipo">Tipo:</label>
                        <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            {TIPOS.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="rareza">Rareza:</label>
                        <select id="rareza" value={rareza} onChange={(e) => setRareza(e.target.value)}>
                            {RAREZAS.map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
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

                    <div className="form-group">
                        <label htmlFor="stock">Stock:</label>
                        <input
                            type="number"
                            id="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            min="0"
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Publicar Producto
                    </button>
                </form>

                <div className="active-listings">
                    <h2>Tus Ventas Activas</h2>
                    <div className="listings-grid">
                        {activeListings.map(listing => (
                            <div key={listing.id} className="listing-card">
                                <div className="listing-carousel">
                                    {listing.images && listing.images.length ? (
                                        listing.images.map((src, i) => (
                                            <img key={i} src={src} alt={`${listing.name} ${i}`} />
                                        ))
                                    ) : (
                                        <div className="no-image">Sin imagen</div>
                                    )}
                                </div>
                                <div className="listing-details">
                                    <h3>{listing.name}</h3>
                                    <p className="desc">{listing.description}</p>
                                    <p className="category">Categoría: {listing.category}</p>
                                    <p className="tipo">Tipo: {listing.tipo}</p>
                                    <p className="rareza">Rareza: {listing.rareza}</p>
                                    <p className="price">USD ${listing.price}</p>
                                    <p className="stock">Stock: {listing.stock}</p>
                                    <p className="date">Publicado: {listing.date}</p>
                                    <div className="listing-actions">
                                        <button type="button" onClick={() => changeStock(listing.id, 1)}>+</button>
                                        <button type="button" onClick={() => changeStock(listing.id, -1)}>-</button>
                                        <button type="button" onClick={() => deleteListing(listing.id)}>Eliminar</button>
                                    </div>
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