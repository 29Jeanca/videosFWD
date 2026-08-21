import { useEffect, useMemo, useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../services/validate";
import ModalCreateEvent from "./ModalCreateEvent";
import { fontFamilies, fontMono } from "../../../theme/theme";

// Antes esta vista tenía su propia grilla horaria (date-fns, franjas de 56px
// por hora) que esperaba eventos con `.start`/`.end`/`.category` — un modelo
// de datos que nunca existió: el backend solo guarda `date` (sin hora) +
// `color`, y el fetch de eventos ni siquiera llegaba a usarse (el chequeo
// `Array.isArray(response)` sobre un objeto agrupado por fecha siempre daba
// `[]`). Reescrita para usar exactamente la misma fuente de datos y el mismo
// modal que ya funcionan en CalendarMonth, solo que mostrando 7 días en vez
// de un mes completo.
const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const EVENT_COLOR_HEX = {
  green: "#22c55e",
  red: "#ef4444",
  blue: "#3b82f6",
  orange: "#f97316",
  purple: "#a855f7",
};

function startOfWeekMonday(d) {
  const s = new Date(d);
  const offset = (s.getDay() + 6) % 7; // getDay(): 0=Dom..6=Sáb -> días desde el lunes
  s.setDate(s.getDate() - offset);
  s.setHours(0, 0, 0, 0);
  return s;
}

function formatKey(d) {
  return d.toISOString().slice(0, 10);
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CalendarWeek({ initialDate = new Date() }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(() => startOfWeekMonday(new Date(initialDate)));
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

  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(current);
        d.setDate(current.getDate() + i);
        return d;
      }),
    [current]
  );

  const rangeLabel = useMemo(() => {
    const end = days[6];
    const sameMonth = current.getMonth() === end.getMonth();
    const startStr = new Intl.DateTimeFormat("es-CR", { day: "numeric", month: sameMonth ? undefined : "short" }).format(current);
    const endStr = new Intl.DateTimeFormat("es-CR", { day: "numeric", month: "long", year: "numeric" }).format(end);
    return capitalize(`${startStr} – ${endStr}`);
  }, [current, days]);

  function prevWeek() {
    setCurrent((c) => {
      const n = new Date(c);
      n.setDate(c.getDate() - 7);
      return n;
    });
  }
  function nextWeek() {
    setCurrent((c) => {
      const n = new Date(c);
      n.setDate(c.getDate() + 7);
      return n;
    });
  }
  function goToday() {
    setCurrent(startOfWeekMonday(new Date()));
  }

  const openModalFor = (day) => {
    setInfoEvent({ title: "", description: "", date: formatKey(day), color: "green" });
    setShowModal(true);
  };

  const handleSaveEvent = (eventData) => {
    const key = eventData.date;
    setEventsInfo((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { title: eventData.title, color: eventData.color }],
    }));
    setShowModal(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Encabezado: mismo patrón que CalendarMonth (rótulo + título + nav) */}
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
            {rangeLabel}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={prevWeek} size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={nextWeek} size="small">
            <ChevronRight />
          </IconButton>
          <Button variant="outlined" size="small" onClick={goToday}>
            Hoy
          </Button>
        </Box>
      </Box>

      {/* Grilla de 7 días — clic en un día abre el mismo modal que el mes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "16px",
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        {days.map((day, idx) => {
          const isToday = day.getTime() === today.getTime();
          const key = formatKey(day);
          const events = eventsInfo[key] || [];
          const isLastCol = idx === 6;

          return (
            <Box
              key={key}
              onClick={() => openModalFor(day)}
              sx={{
                p: "14px",
                minHeight: 280,
                display: "grid",
                gap: "8px",
                alignContent: "start",
                borderRight: isLastCol ? "none" : "1px solid",
                borderColor: "divider",
                cursor: "pointer",
                transition: "background-color 120ms ease",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "text.secondary",
                  }}
                >
                  {WEEK_DAYS[idx]}
                </Typography>
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
                  <Typography sx={{ fontSize: 13, color: "text.primary" }}>{day.getDate()}</Typography>
                )}
              </Box>

              {events.map((ev, i) => {
                const hex = EVENT_COLOR_HEX[ev.color] || EVENT_COLOR_HEX.blue;
                return (
                  <Box
                    key={i}
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

      {showModal && (
        <ModalCreateEvent
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
          infoEvent={infoEvent}
        />
      )}
    </Box>
  );
}
