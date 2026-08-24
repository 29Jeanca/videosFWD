// src/components/notifications/useNotify.js
// Hook para consumir el NotificationsContext (ver ./NotificationsProvider.jsx).
import { useContext } from "react";
import { NotificationsContext } from "./notificationsContextBase";

export function useNotify() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error("useNotify() debe usarse dentro de <NotificationsProvider>");
  }
  return ctx;
}
