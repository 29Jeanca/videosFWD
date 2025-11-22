// CalendarDay.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { parseISO, format, addDays } from "date-fns";
import { es } from "date-fns/locale";

/**
 * DIARIO - muestra una columna de un día con horas (09:00 - 17:00)
 * Props:
 *  - initialDate: Date|string (día a mostrar)
 *  - events: [{ id, title, start: ISO, end: ISO, description?, category? }]
 *
 * Nota: formato de eventos IGUAL que Semana
 */

const HOURS = Array.from({ length: 9 }, (_, i) => 9 + i); // 9..17 (9 items)
const ROW_HEIGHT = 64; // px por hora (ajusta si quieres más/menos altura)

const CATEGORY_STYLE = {
  "Comunidad": { bg: "rgba(219,234,254,0.95)", text: "#1e40af", border: "rgba(191,219,254,1)" },
  "Front-end": { bg: "rgba(220,252,231,0.95)", text: "#166534", border: "rgba(187,247,208,1)" },
  "Entrega": { bg: "rgba(254,226,226,0.95)", text: "#9f1239", border: "rgba(254,202,202,1)" },
  "default": { bg: "rgba(238,238,238,0.95)", text: "#374151", border: "rgba(230,230,230,1)" },
};

function clampToWindow(startHour, endHour, min = 9, max = 17) {
  const s = Math.max(startHour, min);
  const e = Math.min(endHour, max);
  return [s, e];
}

export default function CalendarDay({ initialDate = new Date(), events = [] }) {
  const [dayAnchor, setDayAnchor] = useState(
    typeof initialDate === "string" ? new Date(initialDate) : new Date(initialDate)
  );

  // normalize to start of day (local)
  const dayStart = useMemo(() => {
    const d = new Date(dayAnchor);
    d.setHours(0,0,0,0);
    return d;
  }, [dayAnchor]);

  function prevDay() { setDayAnchor(d => { const n = new Date(d); n.setDate(n.getDate() - 1); return n; }); }
  function nextDay() { setDayAnchor(d => { const n = new Date(d); n.setDate(n.getDate() + 1); return n; }); }
  function goToday() { setDayAnchor(new Date()); }

  // filter events that belong to this day and compute top/height
  const dayEvents = useMemo(() => {
    const list = [];
    for (const ev of events) {
      try {
        const s = parseISO(ev.start);
        const e = parseISO(ev.end);
        // if event's day matches displayed day
        const sDay = new Date(s.getFullYear(), s.getMonth(), s.getDate());
        const targetDay = new Date(dayStart);
        if (sDay.getTime() !== targetDay.getTime()) continue;

        const startHour = s.getHours() + s.getMinutes() / 60;
        const endHour = e.getHours() + e.getMinutes() / 60;

        // clamp to visible window 9..17
        const [vs, ve] = clampToWindow(startHour, endHour, HOURS[0], HOURS[HOURS.length - 1] + 1);
        if (ve <= vs) continue;

        const top = (vs - HOURS[0]) * ROW_HEIGHT;
        const height = (ve - vs) * ROW_HEIGHT;

        list.push({
          ...ev,
          _top: top,
          _height: Math.max(32, height - 8), // ensure minimum visible height
          _startHour: startHour,
          _endHour: endHour,
        });
      } catch (err) {
        console.log(err);
        
        // ignore invalid event formats
      }
    }
    // optional: sort by start hour
    list.sort((a, b) => {
      const ai = parseISO(a.start);
      const bi = parseISO(b.start);
      return ai - bi;
    });
    return list;
  }, [events, dayStart]);

  const dayLabel = format(dayStart, "EEEE, d 'de' MMMM, yyyy", { locale: es });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
      {/* Header/toolbar */}
      <Paper elevation={0} sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={prevDay} size="small"><ChevronLeft /></IconButton>
          <IconButton onClick={nextDay} size="small"><ChevronRight /></IconButton>
          <Typography sx={{ fontWeight: 700, ml: 1 }}>{dayLabel}</Typography>
          <Button variant="outlined" size="small" sx={{ ml: 3 }} onClick={goToday}>Hoy</Button>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button size="small" sx={{ bgcolor: "grey.100", textTransform: "none" }}>Módulo</Button>
          <Button size="small" sx={{ bgcolor: "grey.100", textTransform: "none" }}>Tipo de Evento</Button>
        </Box>
      </Paper>

      {/* Main area */}
      <Box sx={{ display: "flex", flex: 1, borderRadius: 2, border: "1px solid", borderColor: "divider", overflow: "hidden", bgcolor: "background.paper" }}>
        {/* Hours column */}
        <Box sx={{ width: 96, borderRight: "1px solid", borderColor: "divider", flexShrink: 0 }}>
          {HOURS.map((h) => (
            <Box key={h} sx={{ height: ROW_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid", borderColor: "divider" }}>
              <Typography variant="caption" color="text.disabled">{String(h).padStart(2,"0")}:00</Typography>
            </Box>
          ))}
        </Box>

        {/* Day column */}
        <Box sx={{ flex: 1, position: "relative", px: 2, py: 1 }}>
          {/* grid lines */}
          <Box sx={{ position: "absolute", inset: 0 }}>
            {HOURS.map((h, i) => (
              <Box key={i} sx={{ position: "absolute", left: 0, right: 0, top: i * ROW_HEIGHT, borderTop: "1px solid", borderColor: "divider" }} />
            ))}
          </Box>

          {/* events stacked */}
          <Box sx={{ position: "relative", minHeight: HOURS.length * ROW_HEIGHT }}>
            {dayEvents.map((ev) => {
              const style = CATEGORY_STYLE[ev.category] || CATEGORY_STYLE.default;
              return (
                <Box
                  key={ev.id}
                  sx={{
                    position: "absolute",
                    left: 8,
                    right: 8,
                    top: ev._top,
                    height: ev._height,
                    bgcolor: style.bg,
                    border: "1px solid",
                    borderColor: style.border,
                    borderRadius: 1,
                    p: 1.25,
                    boxSizing: "border-box",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: style.text, fontSize: 14 }}>{ev.title}</Typography>
                  <Typography sx={{ fontSize: 12, color: style.text }}>
                    {format(parseISO(ev.start), "HH:mm", { locale: es })} - {format(parseISO(ev.end), "HH:mm", { locale: es })}
                    {ev.duration ? ` (${ev.duration})` : ""}
                  </Typography>
                  {ev.description && (
                    <Typography sx={{ fontSize: 12, color: style.text, opacity: 0.9, mt: 0.5 }}>
                      {ev.description}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
