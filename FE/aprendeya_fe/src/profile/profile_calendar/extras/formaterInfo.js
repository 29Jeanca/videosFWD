
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
      title: event.title,
      color: event.color,
    });
  });

  return eventsByDate;
}

export { normalizeEvent, formatEvents };

