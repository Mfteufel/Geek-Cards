import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css"; 

export default function RequireLoginModal({ isAuthenticated, children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) setOpen(true);
  }, [isAuthenticated]);

  if (isAuthenticated) return children;

  return open ? (
    <div className="auth-modal-backdrop" onClick={() => navigate(-1)}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Acción requerida</h2>
        <p><strong>Debes iniciar sesión para continuar con la compra.</strong></p>

        <button
          className="btn-primary"
          onClick={() => navigate("/auth/login", { state: { from: location }, replace: true })}
        >
          Iniciar sesión
        </button>

        <button className="btn-ghost" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </div>
  ) : null;
}
