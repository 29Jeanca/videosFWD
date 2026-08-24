// src/theme/temaContextBase.js
// Pieza compartida entre TemaContext.jsx (provider) y useTema.js (hook) — separada en
// su propio archivo para que cada uno de esos dos solo exporte lo que le corresponde
// (react-refresh/only-export-components pide que un archivo de componente no mezcle
// exports de componentes con exports de valores/funciones sueltas).
import { createContext } from "react";

export const STORAGE_KEY = "29ay:tema";
export const TemaContext = createContext(null);

export function leerPrefGuardada() {
  if (typeof window === "undefined") return "system";
  try {
    const guardada = window.localStorage.getItem(STORAGE_KEY);
    return guardada === "light" || guardada === "dark" || guardada === "system"
      ? guardada
      : "system";
  } catch {
    // localStorage puede fallar en navegación privada estricta; no es crítico.
    return "system";
  }
}
