// CalendarWeek.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  startOfWeek,
  addWeeks,
  addDays,
  format,
  parseISO,
  differenceInCalendarDays,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";
import ModalCreateWeekEvent from "./ModalCreateWeekEvent";
import { getAllEvents } from "../services/validate";

/* ------------------------------------- CONFIG ------------------------------------- */

const HOUR_START = 7;
const HOUR_END = 22;
const HOURS = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i);
const ROW_HEIGHT = 56;
const MIN_EVENT_HEIGHT = 32;
const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const CATEGORY_STYLES = {
  Comunidad: { bg: "rgba(219,234,254,0.95)", text: "#1e40af", border: "rgba(191,219,254,1)" },
  "Front-end": { bg: "rgba(220,252,231,0.95)", text: "#166534", border: "rgba(187,247,208,1)" },
  Entrega: { bg: "rgba(254,226,226,0.95)", text: "#9f1239", border: "rgba(254,202,202,1)" },
  default: { bg: "rgba(238,238,238,0.95)", text: "#374151", border: "rgba(230,230,230,1)" },
};

/* ------------------------------------- HELPERS ------------------------------------- */

function clamp(v, a, b) {
  return Math.min(Math.max(v, a), b);
}

function computeEventLayout(ev, weekStart) {
  const start = parseISO(ev.start);
  const end = parseISO(ev.end);

  const dayIndex = differenceInCalendarDays(
    new Date(start.getFullYear(), start.getMonth(), start.getDate()),
    new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate())
  );

  const startHour = start.getHours() + start.getMinutes() / 60;
  const endHour = end.getHours() + end.getMinutes() / 60;

  const vs = clamp(startHour, HOUR_START, HOUR_END);
  const ve = clamp(endHour, HOUR_START, HOUR_END);

  if (ve <= vs) return null;

  const top = (vs - HOUR_START) * ROW_HEIGHT;
  const height = Math.max(MIN_EVENT_HEIGHT, (ve - vs) * ROW_HEIGHT);

  return { dayIndex, top, height };
}

function computeNonOverlappingPositions(events) {
  const cols = [];
  const placements = {};

  const sorted = events.slice().sort((a, b) => a.top - b.top || a.height - b.height);

  for (const ev of sorted) {
    let placed = false;

    for (let c = 0; c < cols.length; c++) {
      const col = cols[c];
      const last = col[col.length - 1];

      if (ev.top >= last.top + last.height - 1) {
        col.push(ev);
        placements[ev.id] = { colIndex: c, totalCols: null };
        placed = true;
        break;
      }
    }

    if (!placed) {
      cols.push([ev]);
      placements[ev.id] = { colIndex: cols.length - 1, totalCols: null };
    }
  }

  const total = cols.length || 1;
  for (const id in placements) placements[id].totalCols = total;

  return placements;
}

/* ------------------------------------- MAIN ------------------------------------- */

export default function CalendarWeek({ events = [], initialDate = new Date() }) {
  const [anchor, setAnchor] = useState(
    typeof initialDate === "string" ? new Date(initialDate) : new Date(initialDate)
  );

  const [listEvents, setListEvents] = useState([]); // el calendario usa este

  const weekStart = useMemo(() => startOfWeek(anchor, { weekStartsOn: 0 }), [anchor]);

  /* 🔥 SOLUCIÓN A — Convertir backend → formato calendario */
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getAllEvents();

      // Si no es un array → forzamos array vacío
      const rawEvents = Array.isArray(response) ? response : response?.events || [];

      // Agrupamos por día EXACTAMENTE como el calendario espera
      const buckets = Array.from({ length: 7 }, () => []);

      rawEvents.forEach((ev) => {
        const layout = computeEventLayout(ev, weekStart);
        if (!layout) return;

        const { dayIndex, top, height } = layout;
        if (dayIndex < 0 || dayIndex > 6) return;

        buckets[dayIndex].push({ ...ev, top, height });
      });

      // Convertimos cada bucket en el formato esperado
      const calendarData = buckets.map((dayEvents) => {
        if (dayEvents.length === 0) return { raw: [], placements: {} };

        const annotated = dayEvents.map((ev, i) => ({
          ...ev,
          uid: ev.id ?? `ev-${i}`,
        }));

        const placements = computeNonOverlappingPositions(annotated);

        return { raw: annotated, placements };
      });

      setListEvents(calendarData);
    };

    fetchEvents();
  }, [weekStart]); // ← recalcular cuando cambias de semana

  const containerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);

  const rangeLabel = useMemo(() => {
    const startNum = format(weekStart, "d", { locale: es });
    const endNum = format(addDays(weekStart, 6), "d", { locale: es });
    const month = format(weekStart, "MMM", { locale: es });
    const year = format(weekStart, "yyyy", { locale: es });
    return `${startNum}-${endNum} ${month}, ${year}`;
  }, [weekStart]);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Calendario</Typography>
        <Paper sx={{ display: "flex", alignItems: "center", borderRadius: 1, p: 0.5, border: "1px solid", borderColor: "divider" }}>
          <Button size="small" onClick={() => setModalOpen(true)}>Agregar Evento</Button>
        </Paper>
      </Box>

      {/* CONTROLS */}
      <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, border: "1px solid", borderColor: "divider", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={() => setAnchor((d) => addWeeks(d, -1))}><ChevronLeftIcon /></IconButton>
          <IconButton onClick={() => setAnchor((d) => addWeeks(d, 1))}><ChevronRightIcon /></IconButton>
          <Typography sx={{ fontWeight: 700 }}>{rangeLabel}</Typography>
          <Button variant="outlined" size="small" onClick={() => setAnchor(new Date())}>Hoy</Button>
        </Box>
      </Paper>

      {/* GRID PRINCIPAL */}
      <Box sx={{ display: "flex", flex: 1, border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>

        {/* HORAS */}
        <Box sx={{ width: 72, borderRight: "1px solid", borderColor: "divider" }}>
          <Box sx={{ height: 56, borderBottom: "1px solid", borderColor: "divider" }} />
          {HOURS.map((h) => (
            <Box key={h} sx={{ height: ROW_HEIGHT, textAlign: "center", pt: 1, borderBottom: "1px solid", borderColor: "divider" }}>
              <Typography variant="caption" color="text.secondary">
                {String(h).padStart(2, "0")}:00
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ÁREA SCROLL */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* DÍAS */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", position: "sticky", top: 0, zIndex: 10, bgcolor: "background.paper" }}>
            {days.map((d, idx) => {
              const isToday = isSameDay(d, today);
              return (
                <Box key={idx} sx={{
                  p: 1,
                  textAlign: "center",
                  borderRight: idx < 6 ? "1px solid" : "none",
                  borderColor: "divider",
                  bgcolor: isToday ? "primary.100" : "background.paper",
                }}>
                  <Typography sx={{ fontWeight: 700, color: isToday ? "primary.main" : "text.secondary" }}>
                    {DAY_LABELS[d.getDay()]}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {format(d, "d", { locale: es })}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* EVENTOS */}
          <Box ref={containerRef} sx={{ overflow: "auto", flex: 1 }}>
            <Box sx={{ position: "relative", minHeight: ROW_HEIGHT * HOURS.length }}>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", position: "absolute", inset: 0 }}>
                {listEvents.map((day, dayIdx) => {
                  const { raw, placements } = day;
                  return (
                    <Box key={dayIdx} sx={{ position: "relative" }}>
                      {raw.map((ev) => {
                        const place = placements[ev.id] || { colIndex: 0, totalCols: 1 };
                        const colWidth = 100 / place.totalCols;
                        const left = colWidth * place.colIndex;

                        const style = CATEGORY_STYLES[ev.category] || CATEGORY_STYLES.default;

                        return (
                          <Box
                            key={ev.id}
                            sx={{
                              position: "absolute",
                              top: ev.top,
                              left: `${left + 2}%`,
                              width: `calc(${colWidth}% - 4%)`,
                              height: ev.height,
                              bgcolor: style.bg,
                              border: "1px solid",
                              borderColor: style.border,
                              borderRadius: 1,
                              p: 1,
                              overflow: "hidden",
                            }}
                          >
                            <Typography sx={{ fontWeight: 700, color: style.text }}>
                              {ev.title}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: style.text }}>
                              {format(parseISO(ev.start), "HH:mm")} - {format(parseISO(ev.end), "HH:mm")}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          <ModalCreateWeekEvent
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={(newEvent) => {
              console.log("Nuevo evento:", newEvent);
              setModalOpen(false);
            }}
            infoEvent={{}}
          />
        </Box>
      </Box>
    </Box>
  );
}
