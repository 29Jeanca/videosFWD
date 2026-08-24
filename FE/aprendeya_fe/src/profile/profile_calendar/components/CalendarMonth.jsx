import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { getAllEvents } from "../services/validate";
import { useNavigate } from "react-router-dom";
import ModalCreateEvent from "./ModalCreateEvent";
import { fontFamilies, fontMono } from "../../../theme/theme";

// Semana en formato lunes-primero, igual que el mockup (Lun...Dom).
const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// Misma paleta fija de 5 colores que el selector de color de ModalCreateEvent
// (ColorSwatchPicker / COLORS), para que un evento se vea igual en el modal y
// en la grilla.
const EVENT_COLOR_HEX = {
  green: "#22c55e",
  red: "#ef4444",
  blue: "#3b82f6",
  orange: "#f97316",
  purple: "#a855f7",
};

function generateMonthGrid(current) {
  const year = current.getFullYear();
  const month = current.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  // getDay(): 0=Dom...6=Sáb. Convertimos a offset lunes-primero (0=Lun...6=Dom)
  // para que las columnas coincidan con el encabezado Lun...Dom del mockup.
  const startWeekDay = (firstOfMonth.getDay() + 6) % 7;

  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - startWeekDay);

  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatKey(d) {
  return d.toISOString().slice(0, 10);
}

export default function CalendarMonth({ initialDate = new Date() }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [infoEvent, setInfoEvent] = useState({
    title: "",
    description: "",
    date: "",
    color: "",
  });
  const [eventsInfo, setEventsInfo] = useState({});

  const [current, setCurrent] = useState(() => {
    const cl = new Date(initialDate);
    return new Date(cl.getFullYear(), cl.getMonth(), 1);
  });

  useEffect(() => {
    async function fetchEvents() {
      const response = await getAllEvents();

      if (response.detail === "Authentication credentials were not provided.") {
        navigate("/");
        return;
      }

      if (typeof response === "object" && !Array.isArray(response)) {
        setEventsInfo(response);
      } else {
        setEventsInfo({});
      }
    }
    fetchEvents();
  }, []);

  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  const days = useMemo(() => generateMonthGrid(current), [current]);

  const monthLabel = useMemo(() => {
    const raw = new Intl.DateTimeFormat("es-CR", {
      month: "long",
      year: "numeric",
    }).format(current);
    // "agosto de 2026" -> "Agosto 2026", para calzar con el estilo del título
    // del mockup.
    return raw.replace(" de ", " ").replace(/^./, (c) => c.toUpperCase());
  }, [current]);

  function prevMonth() {
    setCurrent((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  }
  function nextMonth() {
    setCurrent((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  }
  function goToday() {
    const t = new Date();
    setCurrent(new Date(t.getFullYear(), t.getMonth(), 1));
  }

  const handleSaveEvent = (eventData) => {
    // El modal ya persistió el evento en el backend (postEvent/patchEvent) —
    // acá solo lo reflejamos en el estado local para que aparezca al
    // instante, sin esperar a un refetch/recarga de página.
    const key = eventData.date;
    setEventsInfo((prev) => {
      const existing = prev[key] || [];
      const entry = {
        id: eventData.id,
        title: eventData.title,
        description: eventData.description,
        color: eventData.color,
        isOwn: true,
      };
      const withoutThisOne = eventData.id ? existing.filter((ev) => ev.id !== eventData.id) : existing;
      return { ...prev, [key]: [...withoutThisOne, entry] };
    });
    setShowModal(false);
  };

  const handleDeleteEvent = (eventId, date) => {
    setEventsInfo((prev) => ({
      ...prev,
      [date]: (prev[date] || []).filter((ev) => ev.id !== eventId),
    }));
    setShowModal(false);
  };

  const openCreateModal = (day) => {
    const key = formatKey(day);
    setSelectedDate(key);
    setInfoEvent({ title: "", description: "", date: key, color: "green" });
    setShowModal(true);
  };

  const openEditModal = (ev, key, e) => {
    e.stopPropagation();
    if (!ev.isOwn) return;
    setSelectedDate(key);
    setInfoEvent({
      id: ev.id,
      title: ev.title,
      description: ev.description || "",
      date: key,
      color: ev.color,
    });
    setShowModal(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Encabezado: rótulo + título del mes, navegación */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "grid", gap: "10px" }}>
          <Typography
            sx={{
              fontFamily: fontMono,
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            Calendario
          </Typography>
          <Typography
            sx={{
              fontFamily: fontFamilies.display,
              fontWeight: 600,
              fontSize: "34px",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "text.primary",
            }}
          >
            {monthLabel}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={prevMonth} size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={nextMonth} size="small">
            <ChevronRight />
          </IconButton>
          <Button variant="outlined" size="small" onClick={goToday}>
            Hoy
          </Button>
        </Box>
      </Box>

      {/* Calendar Grid */}
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "16px",
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        {/* Week headers */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            bgcolor: "background.default",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {WEEK_DAYS.map((d) => (
            <Box
              key={d}
              sx={{
                p: "12px",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              {d}
            </Box>
          ))}
        </Box>

        {/* Days */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {days.map((day, idx) => {
            const isCurrentMonth = day.getMonth() === current.getMonth();
            const isToday =
              day.getFullYear() === today.getFullYear() &&
              day.getMonth() === today.getMonth() &&
              day.getDate() === today.getDate();
            const dow = day.getDay();
            const isWeekend = dow === 0 || dow === 6;
            const isLastCol = idx % 7 === 6;
            const isLastRow = idx >= 35;

            const key = formatKey(day);
            const events = eventsInfo[key] || [];

            return (
              <Box
                key={key + idx}
                onClick={() => openCreateModal(day)}
                sx={{
                  p: "10px",
                  minHeight: 116,
                  display: "grid",
                  gap: "6px",
                  alignContent: "start",
                  bgcolor: isWeekend ? "action.hover" : "background.paper",
                  borderRight: isLastCol ? "none" : "1px solid",
                  borderBottom: isLastRow ? "none" : "1px solid",
                  borderColor: "divider",
                  cursor: "pointer",
                }}
              >
                {/* Day number */}
                {isToday ? (
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "999px",
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {day.getDate()}
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: !isCurrentMonth
                        ? (theme) => alpha(theme.palette.text.disabled, 0.6)
                        : isWeekend
                        ? "text.disabled"
                        : "text.primary",
                    }}
                  >
                    {day.getDate()}
                  </Typography>
                )}

                {/* Events — solo los propios (isOwn) se pueden tocar para
                    editar; el resto son de solo lectura (eventos globales de
                    la plataforma, no del usuario). stopPropagation evita que
                    el clic también dispare "crear evento" en la celda. */}
                {events.map((ev, i) => {
                  const hex = EVENT_COLOR_HEX[ev.color] || EVENT_COLOR_HEX.blue;
                  return (
                    <Box
                      key={ev.id ?? i}
                      onClick={ev.isOwn ? (e) => openEditModal(ev, key, e) : (e) => e.stopPropagation()}
                      title={ev.isOwn ? "Editar evento" : undefined}
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        p: "5px 8px",
                        borderRadius: "7px",
                        bgcolor: alpha(hex, 0.15),
                        color: hex,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: ev.isOwn ? "pointer" : "default",
                        transition: "box-shadow 120ms ease",
                        "&:hover": ev.isOwn ? { boxShadow: `inset 0 0 0 1.5px ${hex}` } : undefined,
                      }}
                    >
                      {ev.title}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Leyenda de colores */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        {[
          { label: "Clase inscrita", color: "primary.main" },
          { label: "En vivo / evento", color: "secondary.main" },
          { label: "Entrega", color: "warning.main" },
          { label: "Inicio de curso", color: "success.main" },
        ].map((item) => (
          <Box
            key={item.label}
            sx={{ display: "flex", alignItems: "center", gap: "8px", fontSize: 13, color: "text.secondary" }}
          >
            <Box sx={{ width: 12, height: 12, borderRadius: "4px", bgcolor: item.color }} />
            {item.label}
          </Box>
        ))}
      </Box>

      {showModal && (
        <ModalCreateEvent
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          date={selectedDate}
          infoEvent={infoEvent}
        />
      )}
    </Box>
  );
}
