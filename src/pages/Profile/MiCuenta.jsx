import React, { useEffect, useState } from "react";
import './MiCuenta.css';
import './ventas.css';

const avatarPlaceholder = "https://ui-avatars.com/api/?name=Usuario";

export default function MiCuenta({ user, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [compras, setCompras] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [calificaciones, setCalificaciones] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Usar datos del usuario logueado si están disponibles
        const userData = user || {
          nombre: "Usuario Demo",
          email: "demo@geekcards.com"
        };

        setPerfil({
          nombre: userData.name || userData.nombre,
          email: userData.email,
          avatar: avatarPlaceholder,
        });

        // Cargar compras simuladas
        setCompras([
          { nombre: "Carta Dragón", precio: "$1500", fecha: "2025-08-01" },
          { nombre: "Carta Fénix", precio: "$1200", fecha: "2025-07-15" },
        ]);

        // Cargar ventas activas desde localStorage
        const savedListings = localStorage.getItem('activeListings');
        const activeListings = savedListings ? JSON.parse(savedListings) : [];
        
        // Convertir las ventas activas al formato esperado
        const formattedListings = activeListings.map(listing => ({
          id: listing.id,
          nombre: listing.name,
          precio: `$${listing.price}`,
          estado: "En curso",
          fecha: listing.date,
          imagen: listing.image
        }));

        setVentas(formattedListings);
        setCalificaciones({ promedio: 4.7, total: 23 });
      } catch (err) {
        setError("Error al cargar los datos del perfil");
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  if (loading) return <div className="cuenta-loading">Cargando…</div>;
  if (error) return <div className="cuenta-error">{error}</div>;

  return (
    <div className="cuenta-container">
      <h2>Mi Cuenta</h2>
      <section className="cuenta-perfil">
        <img src={perfil?.avatar} alt="Avatar" className="cuenta-avatar" />
        <div>
          <h3>{perfil?.nombre}</h3>
          <p>{perfil?.email}</p>
          <div className="cuenta-actions">
            <button className="cuenta-editar">Editar perfil</button>
            <button className="cuenta-logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </section>
      <section className="cuenta-compras">
        <h4>Mis Compras</h4>
        {compras.length === 0 ? (
          <p>No hay datos disponibles</p>
        ) : (
          <ul>
            {compras.map((c, i) => (
              <li key={i}>
                <strong>{c.nombre}</strong> — {c.precio} <span>({c.fecha})</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="cuenta-ventas">
        <h4>Mis Ventas</h4>
        {ventas.length === 0 ? (
          <p>No hay ventas activas</p>
        ) : (
          <div className="ventas-grid">
            {ventas.map((venta) => (
              <div key={venta.id} className="venta-card">
                <img src={venta.imagen} alt={venta.nombre} className="venta-imagen" />
                <div className="venta-info">
                  <h5>{venta.nombre}</h5>
                  <p className="venta-precio">{venta.precio}</p>
                  <span className={`venta-estado ${venta.estado.toLowerCase().replace(' ', '-')}`}>
                    {venta.estado}
                  </span>
                  <p className="venta-fecha">Publicado: {venta.fecha}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="cuenta-calificaciones">
        <h4>Calificaciones</h4>
        {calificaciones ? (
          <p>
            Promedio: <strong>{calificaciones.promedio}</strong> / 5<br />
            Total de reseñas: <strong>{calificaciones.total}</strong>
          </p>
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </section>
    </div>
  );
}
