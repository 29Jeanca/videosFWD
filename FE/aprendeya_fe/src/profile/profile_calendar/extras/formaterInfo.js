
const COLOR_MAP = {
  "#22c55e": "green",
  "#ef4444": "red",
  "#3b82f6": "blue",
  "#f97316": "orange",
  "#a855f7": "purple",
};

function normalizeEvent(event) {
  return {
    title: event.title,
    description: event.description,
    date: event.date,           // ❗ Importante: debe existir como string ISO
    color: event.color || "blue",
  };
}

function formatEvents(apiEvents) {
  const eventsByDate = {};

  apiEvents.forEach(event => {
    if (!event.date) return; // ❗ Si date viene undefined, lo ignorará

    const dateKey = event.date.split("T")[0]; // "2025-11-25"

    if (!eventsByDate[dateKey]) {
      eventsByDate[dateKey] = [];
    }

    eventsByDate[dateKey].push({
      id: event.id,
      title: event.title,
      description: event.description,
      color: event.color,
      // El endpoint "all-events" mezcla eventos globales (Event, sin dueño)
      // con eventos personales (UserEvent, sí tiene `user`) en una sola
      // lista sin marcar de dónde viene cada uno — la presencia de `user`
      // es la única forma de distinguirlos hoy. Solo los propios se pueden
      // editar/borrar (ver CalendarMonth/Week/Day).
      isOwn: Object.prototype.hasOwnProperty.call(event, "user"),
    });
  });

  return eventsByDate;
}

export { normalizeEvent, formatEvents };

