// src/theme/TemaContext.jsx
// Provider de tema de 29AprendeYa (ver docs/HANDOFF.md "Patrón de modo claro/oscuro").
// El hook para consumirlo vive en ./useTema (separado para que este archivo solo
// exporte el componente, por react-refresh/only-export-components).
import { useMemo, useState, useCallback } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TemaContext, STORAGE_KEY, leerPrefGuardada } from "./temaContextBase";

export function TemaProvider({ children }) {
  const sistemaPrefiereOscuro = useMediaQuery("(prefers-color-scheme: dark)");
  const [pref, setPrefState] = useState(leerPrefGuardada);

  const setPref = useCallback((nuevaPref) => {
    setPrefState(nuevaPref);
    try {
      window.localStorage.setItem(STORAGE_KEY, nuevaPref);
    } catch {
      // si falla el guardado, la preferencia igual queda activa en memoria.
    }
  }, []);

  const ciclarTema = useCallback(() => {
    setPref(pref === "system" ? "light" : pref === "light" ? "dark" : "system");
  }, [pref, setPref]);

  const mode = pref === "system" ? (sistemaPrefiereOscuro ? "dark" : "light") : pref;

  const value = useMemo(
    () => ({ pref, setPref, mode, ciclarTema }),
    [pref, setPref, mode, ciclarTema]
  );

  return <TemaContext.Provider value={value}>{children}</TemaContext.Provider>;
}
