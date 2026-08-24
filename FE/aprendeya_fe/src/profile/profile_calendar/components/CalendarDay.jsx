import { useEffect, useMemo, useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../services/validate";
import ModalCreateEvent from "./ModalCreateEvent";
import { fontFamilies, fontMono } from "../../../theme/theme";

// Antes esperaba una lista `events` por prop (que nadie le pasaba) con
// `.start`/`.end`/`.category`, el mismo modelo inexistente que CalendarWeek
// — nunca mostraba nada y no tenía forma de crear un evento. Reescrita para
// buscar sus propios eventos y crear con el mismo modal que Mes/Semana.
const EVENT_COLOR_HEX = {
  green: "#22c55e",
  red: "#ef4444",
  blue: "#3b82f6",
  orange: "#f97316",
  purple: "#a855f7",
};

function formatKey(d) {
  return d.toISOString().slice(0, 10);
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CalendarDay({ initialDate = new Date() }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(() => {
    const d = new Date(initialDate);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [eventsInfo, setEventsInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [infoEvent, setInfoEvent] = useState({ title: "", description: "", date: "", color: "" });

  useEffect(() => {
    async function fetchEvents() {
      const response = await getAllEvents();

      if (response?.detail === "Authentication credentials were not provided.") {
        navigate("/");
        return;
      }

      setEventsInfo(typeof response === "object" && !Array.isArray(response) ? response : {});
    }
    fetchEvents();
  }, [navigate]);

  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  const isToday = current.getTime() === today.getTime();
  const key = formatKey(current);
  const events = eventsInfo[key] || [];

  const dayLabel = useMemo(
    () => capitalize(new Intl.DateTimeFormat("es-CR", { weekday: "long", day: "numeric", month: "long" }).format(current)),
    [current]
  );

  function prevDay() {
    setCurrent((c) => {
      const n = new Date(c);
      n.setDate(c.getDate() - 1);
      return n;
    });
  }
  function nextDay() {
    setCurrent((c) => {
      const n = new Date(c);
      n.setDate(c.getDate() + 1);
      return n;
    });
  }
  function goToday() {
    const t = new Date();
    setCurrent(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
  }

  const openModal = () => {
    setInfoEvent({ title: "", description: "", date: key, color: "green" });
    setShowModal(true);
  };

  const openEditModal = (ev) => {
    if (!ev.isOwn) return;
    setInfoEvent({
      id: ev.id,
      title: ev.title,
      description: ev.description || "",
      date: key,
      color: ev.color,
    });
    setShowModal(true);
  };

  const handleSaveEvent = (eventData) => {
    setEventsInfo((prev) => {
      const existing = prev[eventData.date] || [];
      const entry = {
        id: eventData.id,
        title: eventData.title,
        description: eventData.description,
        color: eventData.color,
        isOwn: true,
      };
      const withoutThisOne = eventData.id ? existing.filter((ev) => ev.id !== eventData.id) : existing;
      return { ...prev, [eventData.date]: [...withoutThisOne, entry] };
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
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
              fontSize: "28px",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "text.primary",
            }}
          >
            {dayLabel}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={prevDay} size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={nextDay} size="small">
            <ChevronRight />
          </IconButton>
          <Button variant="outlined" size="small" onClick={goToday}>
            Hoy
          </Button>
          <Button variant="contained" size="small" onClick={openModal}>
            Nuevo evento
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "16px",
          bgcolor: "background.paper",
          p: "20px",
          display: "grid",
          gap: "12px",
          minHeight: 280,
          alignContent: "start",
        }}
      >
        {isToday && (
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: 12, fontWeight: 600, color: "primary.main" }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "999px", bgcolor: "primary.main" }} />
            Hoy
          </Box>
        )}

        {events.length === 0 ? (
          <Box sx={{ display: "grid", gap: 1, placeItems: "center", py: 6, color: "text.secondary" }}>
            <EventOutlinedIcon sx={{ fontSize: 28, opacity: 0.5 }} />
            <Typography sx={{ fontSize: 14 }}>No hay eventos este día.</Typography>
            <Button size="small" onClick={openModal}>
              Añadir uno
            </Button>
          </Box>
        ) : (
          events.map((ev, i) => {
            const hex = EVENT_COLOR_HEX[ev.color] || EVENT_COLOR_HEX.blue;
            return (
              <Box
                key={ev.id ?? i}
                onClick={ev.isOwn ? () => openEditModal(ev) : undefined}
                title={ev.isOwn ? "Editar evento" : undefined}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  p: "14px 16px",
                  borderRadius: "12px",
                  bgcolor: alpha(hex, 0.1),
                  border: "1px solid",
                  borderColor: alpha(hex, 0.3),
                  cursor: ev.isOwn ? "pointer" : "default",
                  transition: "box-shadow 120ms ease",
                  "&:hover": ev.isOwn ? { boxShadow: `inset 0 0 0 1.5px ${hex}` } : undefined,
                }}
              >
                <Box sx={{ width: 10, height: 10, borderRadius: "999px", bgcolor: hex, flexShrink: 0 }} />
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: "text.primary", flex: 1 }}>{ev.title}</Typography>
                {ev.isOwn && <EditOutlinedIcon sx={{ fontSize: 16, color: hex, opacity: 0.7 }} />}
              </Box>
            );
          })
        )}
      </Box>

      {showModal && (
        <ModalCreateEvent
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          infoEvent={infoEvent}
        />
      )}
    </Box>
  );
}
