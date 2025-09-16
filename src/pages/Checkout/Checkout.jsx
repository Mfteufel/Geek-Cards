import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import "./Checkout.css";

export default function Checkout() {
  const { subtotal, vaciar } = useCarrito();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    tarjeta: "",
  });
  const [showModal, setShowModal] = useState(false);

  const formatoPrecio = (v) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(v || 0);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Validación mínima
    if (!form.nombre || !form.apellido || !form.email || !form.tarjeta) {
      alert("Completá todos los campos.");
      return;
    }
    setShowModal(true);
    vaciar();
  };

  const cerrarModal = () => {
    setShowModal(false);
    navigate("/"); 
  };

  return (
    <section className="checkout">
      <header className="checkout__header">
        <h1 className="checkout__titulo">Finalizar compra</h1>
        <span className="checkout__total">Total: {formatoPrecio(subtotal * 1.21)}</span>
      </header>

      <form className="checkout__form" onSubmit={onSubmit}>
        <div className="checkout__grid">
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={onChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="apellido">Apellido</label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              value={form.apellido}
              onChange={onChange}
              required
            />
          </div>

          <div className="field field--full">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="field field--full">
            <label htmlFor="tarjeta">Número de tarjeta</label>
            <input
              id="tarjeta"
              name="tarjeta"
              inputMode="numeric"
              pattern="[0-9 ]*"
              placeholder="0000 0000 0000 0000"
              value={form.tarjeta}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="checkout__acciones">
          <button type="button" className="btn btn--sec" onClick={() => navigate("/carrito")}>
            Volver al carrito
          </button>
          <button type="submit" className="btn btn--prim">
            Finalizar compra
          </button>
        </div>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal__content">
            <h2>¡Compra confirmada!</h2>
            <p>Las cartas ya son tuyas 💫</p>
            <button className="btn btn--prim" onClick={cerrarModal}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
