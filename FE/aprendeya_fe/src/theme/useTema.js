// src/theme/useTema.js
// Hook para consumir el TemaContext (ver ./TemaContext.jsx).
import { useContext } from "react";
import { TemaContext } from "./temaContextBase";

export function useTema() {
  const ctx = useContext(TemaContext);
  if (!ctx) {
    throw new Error("useTema() debe usarse dentro de <TemaProvider>");
  }
  return ctx;
}
