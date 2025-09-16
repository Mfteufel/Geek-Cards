import React, { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext.jsx";
import "./Carrito.css";

export default function Carrito() {
  const { items, cambiarCantidad, eliminar, vaciar, subtotal } = useCarrito();

  const [cupon, setCupon] = useState("");
  const [estadoCupon, setEstadoCupon] = useState({ tipo: "", mensaje: "" });
  const [cuponValido, setCuponValido] = useState(false);

  const formatoPrecio = useCallback(
    (valor) =>
      new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(valor || 0),
    []
  );

  const iva = 0.21;
  const costoEnvio = 0;

  // Totales + descuento
  const { totalIva, totalBase, descuentoMonto, totalFinal } = useMemo(() => {
    const ivaCalc = subtotal * iva;
    const base = subtotal + ivaCalc + (costoEnvio || 0);
    const desc = cuponValido ? base * 0.10 : 0; // 10% sobre el total de la compra
    const final = Math.max(0, base - desc);
    return {
      totalIva: ivaCalc,
      totalBase: base,
      descuentoMonto: desc,
      totalFinal: final,
    };
  }, [subtotal, iva, costoEnvio, cuponValido]);

  // Aplicar cupón
  const manejarAplicarCupon = (e) => {
    e.preventDefault();
    if (cupon.trim().toUpperCase() === "DESCUENTO10") {
      setCuponValido(true);
      setEstadoCupon({
        tipo: "ok",
        mensaje: "Cupón aplicado: 10% de descuento",
      });
    } else {
      setCuponValido(false);
      setEstadoCupon({ tipo: "error", mensaje: "Cupón inválido" });
    }
  };

  return (
    <section className="carrito">
      <header className="carrito__header">
        <h1 className="carrito__titulo">Mi carrito</h1>
        {items.length > 0 && (
          <button
            className="carrito__vaciar btn btn--ghost"
            onClick={vaciar}
            aria-label="Vaciar carrito"
          >
            Vaciar carrito
          </button>
        )}
      </header>

      {items.length === 0 ? (
        <div className="carrito__vacio">
          <p>
            Tu carrito está vacío.
            <Link className="carrito__link" to="/explore">
              {" "}
              Seguir comprando
            </Link>
          </p>
        </div>
      ) : (
        <div className="carrito__contenedor">
          <ul className="carrito__lista" role="list">
            {items.map((it) => (
              <li key={it.id} className="carrito__item">
                <div className="carrito__media">
                  {it.imagen ? (
                    <img
                      className="carrito__img"
                      src={it.imagen}
                      alt={`Imagen de ${it.titulo}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="carrito__placeholder" aria-hidden="true" />
                  )}
                </div>

                <div className="carrito__info">
                  <div className="carrito__info__top">
                    <h2 className="carrito__nombre">{it.titulo}</h2>
                    {it.variante && (
                      <span className="carrito__variante">{it.variante}</span>
                    )}
                    {it.sku && <span className="carrito__sku">SKU: {it.sku}</span>}
                  </div>

                  <div className="carrito__acciones">
                    <div className="carrito__cantidad">
                      <label htmlFor={`cant-${it.id}`} className="sr-only">
                        Cantidad
                      </label>
                      <button
                        className="carrito__btn cantidad__menos"
                        onClick={() =>
                          cambiarCantidad(it.id, Math.max(1, it.cantidad - 1))
                        }
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <input
                        id={`cant-${it.id}`}
                        className="carrito__input"
                        type="number"
                        min={1}
                        value={it.cantidad}
                        onChange={(e) =>
                          cambiarCantidad(
                            it.id,
                            Math.max(1, Number(e.target.value))
                          )
                        }
                        aria-label={`Cantidad para ${it.titulo}`}
                      />
                      <button
                        className="carrito__btn cantidad__mas"
                        onClick={() => cambiarCantidad(it.id, it.cantidad + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="carrito__eliminar"
                      onClick={() => eliminar(it.id)}
                      aria-label={`Eliminar ${it.titulo}`}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="carrito__precio">
                  <span className="carrito__precioUnit">
                    {formatoPrecio(it.precio)}
                  </span>
                  <span className="carrito__precioTotal">
                    {formatoPrecio((Number(it.precio) || 0) * it.cantidad)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <aside className="carrito__resumen">
            <form className="carrito__cupon" onSubmit={manejarAplicarCupon}>
              <label htmlFor="cupon" className="carrito__label">
                ¿Tenés un cupón?
              </label>
              <div className="carrito__cuponRow">
                <input
                  id="cupon"
                  type="text"
                  className="carrito__cuponInput"
                  placeholder="INGRESA TU CUPON"
                  value={cupon}
                  onChange={(e) => setCupon(e.target.value)}
                />
                <button className="carrito__aplicar btn btn--prim" type="submit">
                  Aplicar
                </button>
              </div>
              {estadoCupon.mensaje && (
                <p
                  className={
                    "carrito__cuponMsg " +
                    (estadoCupon.tipo === "ok" ? "is-ok" : "is-error")
                  }
                  role="status"
                >
                  {estadoCupon.mensaje}
                </p>
              )}
            </form>

            <div className="carrito__totales">
              <div className="carrito__row">
                <span>Subtotal</span>
                <strong>{formatoPrecio(subtotal)}</strong>
              </div>
              <div className="carrito__row">
                <span>IVA (21%)</span>
                <strong>{formatoPrecio(totalIva)}</strong>
              </div>
              <div className="carrito__row">
                <span>Envío</span>
                <strong>{costoEnvio ? formatoPrecio(costoEnvio) : "Gratis"}</strong>
              </div>

              {cuponValido && (
                <div className="carrito__row carrito__row--descuento">
                  <span>Descuento (10%)</span>
                  <strong>-{formatoPrecio(descuentoMonto)}</strong>
                </div>
              )}

              <div className="carrito__divisor" />
              <div className="carrito__row carrito__row--total">
                <span>Total</span>
                <strong>{formatoPrecio(cuponValido ? totalFinal : totalBase)}</strong>
              </div>
            </div>

            <div className="carrito__botones">
              <Link className="btn btn--sec" to="/explore">
                Seguir comprando
              </Link>
              <Link className="btn btn--prim" to="/checkout">
                Ir a pagar
              </Link>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
