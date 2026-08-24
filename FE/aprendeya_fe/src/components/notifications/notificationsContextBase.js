// src/components/notifications/notificationsContextBase.js
// Mismo patrón que src/theme/temaContextBase.js: el createContext vive en su
// propio archivo para que NotificationsProvider.jsx (componente) y
// useNotify.js (hook) puedan cada uno exportar solo lo suyo — si conviven en
// un archivo, Vite/React Fast Refresh se rompe (react-refresh/only-export-components).
import { createContext } from "react";

export const NotificationsContext = createContext(null);
