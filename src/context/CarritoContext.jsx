import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CarritoContext = createContext(null);

const ACTIONS = {
  AGREGAR: "AGREGAR",
  ELIMINAR: "ELIMINAR",
  CAMBIAR_CANT: "CAMBIAR_CANT",
  VACIAR: "VACIAR",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.AGREGAR: {
      const it = action.payload;
      const idx = state.items.findIndex(x => x.id === it.id);
      if (idx >= 0) {
        const items = state.items.map((x, i) =>
          i === idx ? { ...x, cantidad: x.cantidad + (it.cantidad || 1) } : x
        );
        return { ...state, items };
      }
      return { ...state, items: [...state.items, { ...it, cantidad: it.cantidad || 1 }] };
    }
    case ACTIONS.ELIMINAR:
      return { ...state, items: state.items.filter(x => x.id !== action.payload) };
    case ACTIONS.CAMBIAR_CANT: {
      const { id, cantidad } = action.payload;
      return {
        ...state,
        items: state.items.map(x => x.id === id ? { ...x, cantidad: Math.max(1, cantidad) } : x),
      };
    }
    case ACTIONS.VACIAR:
      return { ...state, items: [] };
    default:
      return state;
  }
}

const STORAGE_KEY = "carrito:v1";

export function CarritoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] }, () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { items: [] };
    } catch {
      return { items: [] };
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const api = useMemo(() => ({
    items: state.items,
    agregar: (item) => dispatch({ type: ACTIONS.AGREGAR, payload: item }),
    eliminar: (id) => dispatch({ type: ACTIONS.ELIMINAR, payload: id }),
    cambiarCantidad: (id, cantidad) =>
      dispatch({ type: ACTIONS.CAMBIAR_CANT, payload: { id, cantidad } }),
    vaciar: () => dispatch({ type: ACTIONS.VACIAR }),
    totalItems: state.items.reduce((a, b) => a + (b.cantidad || 1), 0),
    subtotal: state.items.reduce((a, b) => a + (Number(b.precio) || 0) * (b.cantidad || 1), 0),
  }), [state.items]);

  return <CarritoContext.Provider value={api}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}
