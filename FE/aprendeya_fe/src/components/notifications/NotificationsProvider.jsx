// src/components/notifications/NotificationsProvider.jsx
// Sistema global de notificaciones tipo "toast" — feedback breve para
// acciones como guardar un post, crear/editar/borrar un evento, etc.
// Usa el Snackbar + Alert que MUI ya trae (no se agregó ninguna librería
// nueva, el stack sigue siendo MUI v7 + react-router-dom v7).
//
// Uso: const notify = useNotify(); notify.success("Evento creado");
// (el hook vive en ./useNotify.js — separado de este archivo para no romper
// React Fast Refresh, mismo patrón que src/theme/TemaContext.jsx + useTema.js)
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { NotificationsContext } from "./notificationsContextBase";

export function NotificationsProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [open, setOpen] = useState(false);
  const idRef = useRef(0);

  const notify = useCallback((message, severity = "success") => {
    idRef.current += 1;
    setQueue((prev) => [...prev, { key: idRef.current, message, severity }]);
  }, []);

  // Una notificación a la vez: si ya hay una en pantalla y llega otra, se
  // cierra la actual primero y recién ahí entra la siguiente de la cola
  // (mismo patrón que el ejemplo oficial de MUI para snackbars consecutivos).
  useEffect(() => {
    if (queue.length && !current) {
      setCurrent(queue[0]);
      setQueue((prev) => prev.slice(1));
      setOpen(true);
    } else if (queue.length && current && open) {
      setOpen(false);
    }
  }, [queue, current, open]);

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleExited = () => setCurrent(null);

  const api = useMemo(
    () => ({
      notify,
      success: (msg) => notify(msg, "success"),
      error: (msg) => notify(msg, "error"),
      info: (msg) => notify(msg, "info"),
      warning: (msg) => notify(msg, "warning"),
    }),
    [notify]
  );

  return (
    <NotificationsContext.Provider value={api}>
      {children}
      <Snackbar
        key={current?.key}
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{ transition: { onExited: handleExited } }}
      >
        {current ? (
          <Alert onClose={handleClose} severity={current.severity} variant="filled" sx={{ width: "100%", boxShadow: 4 }}>
            {current.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </NotificationsContext.Provider>
  );
}
