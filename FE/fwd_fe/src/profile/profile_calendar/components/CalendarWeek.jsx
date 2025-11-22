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

/**
 * CalendarWeek (mejorado)
 * - Horas 07:00 - 22:00
 * - Scroll vertical (container)
 * - Sticky day headers
 * - Events positioned by hour/duration, clamped to visible window
 *
 * Props:
 *  - events: [{ id, title, start: ISO, end: ISO, category, description }]
 *  - initialDate: Date|string (cualquier día dentro de la semana a mostrar)
 */

const HOUR_START = 7;
const HOUR_END = 22; // inclusive end hour; visible window is [7,22)
const HOURS = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i); // 7..21
const ROW_HEIGHT = 56; // px por hora — ajustable
const MIN_EVENT_HEIGHT = 32;
const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

/** estilos por categoría — ajusta colores si quieres */
const CATEGORY_STYLES = {
  Comunidad: { bg: "rgba(219,234,254,0.95)", text: "#1e40af", border: "rgba(191,219,254,1)" },
  "Front-end": { bg: "rgba(220,252,231,0.95)", text: "#166534", border: "rgba(187,247,208,1)" },
  Entrega: { bg: "rgba(254,226,226,0.95)", text: "#9f1239", border: "rgba(254,202,202,1)" },
  default: { bg: "rgba(238,238,238,0.95)", text: "#374151", border: "rgba(230,230,230,1)" },
};

function clamp(v, a, b) {
  return Math.min(Math.max(v, a), b);
}

/** calcula top y height (px) para evento, y qué díaIndex corresponde (0..6) */
function computeEventLayout(ev, weekStart) {
  const start = parseISO(ev.start);
  const end = parseISO(ev.end);

  // day index relative to weekStart
  const dayIndex = differenceInCalendarDays(
    new Date(start.getFullYear(), start.getMonth(), start.getDate()),
    new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate())
  );

  // Hora decimal
  const startHour = start.getHours() + start.getMinutes() / 60;
  const endHour = end.getHours() + end.getMinutes() / 60;

  // Clamp to window
  const vs = clamp(startHour, HOUR_START, HOUR_END);
  const ve = clamp(endHour, HOUR_START, HOUR_END);

  if (ve <= vs) return null;

  const top = (vs - HOUR_START) * ROW_HEIGHT;
  const height = Math.max(MIN_EVENT_HEIGHT, (ve - vs) * ROW_HEIGHT);

  return { dayIndex, top, height, startHour, endHour };
}

/** detecta colisiones simples y aplica offsets para que no se tapen */
function computeNonOverlappingPositions(events) {
  // events: array of {id, top, height, ...}
  // Simple greedy stacking: sort by top, keep track of columns
  const cols = []; // array of arrays of events per column (non-overlapping)
  const placements = {}; // id -> {colIndex, totalCols}

  const sorted = events.slice().sort((a, b) => a.top - b.top || a.height - b.height);

  for (const ev of sorted) {
    let placed = false;
    for (let c = 0; c < cols.length; c++) {
      const col = cols[c];
      const last = col[col.length - 1];
      // if doesn't overlap with last in this column
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

  // now totalCols is number of columns used for any event overlapping a given event.
  // Simplified approach: for now set totalCols = cols.length (worst case). 
  // That's acceptable for basic separation, but we can refine per-row if necessary.
  const total = cols.length || 1;
  for (const id in placements) placements[id].totalCols = total;

  return placements;
}

export default function CalendarWeek({ events = [], initialDate = new Date() }) {
  const [anchor, setAnchor] = useState(typeof initialDate === "string" ? new Date(initialDate) : new Date(initialDate));
  const containerRef = useRef(null);

  const weekStart = useMemo(() => startOfWeek(anchor, { weekStartsOn: 0 }), [anchor]); // domingo

  useEffect(() => {
    // on mount, optional: scroll to mid-day (e.g., 09:00) so user sees events
    if (containerRef.current) {
      // scrollTop so that 9:00 is visible (9 - HOUR_START)
      const targetHour = Math.max(0, 9 - HOUR_START);
      containerRef.current.scrollTop = targetHour * ROW_HEIGHT - 20;
    }
  }, [weekStart]);

  function goPrev() { setAnchor((d) => addWeeks(d, -1)); }
  function goNext() { setAnchor((d) => addWeeks(d, 1)); }
  function goToday() { setAnchor(new Date()); }

  // compute days array
  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) arr.push(addDays(weekStart, i));
    return arr;
  }, [weekStart]);

  // group events per day with layout
  const eventsByDay = useMemo(() => {
    const buckets = Array.from({ length: 7 }, () => []);

    for (const ev of events) {
      try {
        const layout = computeEventLayout(ev, weekStart);
        if (!layout) continue;
        const { dayIndex, top, height } = layout;
        if (dayIndex < 0 || dayIndex > 6) continue;
        buckets[dayIndex].push({ ...ev, top, height });
      } catch (e) {
        // ignore invalid event
      }
    }

    // For each day, compute simple non-overlap placements
    const result = buckets.map((dayEvents) => {
      if (dayEvents.length === 0) return { raw: [], placements: {} };
      // annotate with unique ids
      const annotated = dayEvents.map((ev, i) => ({ ...ev, uid: ev.id ?? `ev-${i}` }));
      const placements = computeNonOverlappingPositions(annotated);
      return { raw: annotated, placements };
    });

    return result;
  }, [events, weekStart]);

  // label for header range
  const rangeLabel = useMemo(() => {
    const startDay = weekStart;
    const endDay = addDays(weekStart, 6);
    const startNum = format(startDay, "d", { locale: es });
    const endNum = format(endDay, "d", { locale: es });
    const month = format(startDay, "MMM", { locale: es });
    const year = format(startDay, "yyyy", { locale: es });
    return `${startNum}-${endNum} ${month}, ${year}`;
  }, [weekStart]);

  // today marker
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0,0,0,0);
    return t;
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
      {/* TOOLBAR */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Calendario</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Paper sx={{ display: "flex", alignItems: "center", borderRadius: 1, p: 0.5, border: "1px solid", borderColor: "divider" }}>
            <Box component="label" sx={{ px: 2, py: "6px", fontWeight: 600, fontSize: 14, color: "text.secondary" }}>Mes</Box>
            <Box component="label" sx={{ px: 2, py: "6px", fontWeight: 600, fontSize: 14, color: "text.primary", bgcolor: "transparent" }}>Semana</Box>
            <Box component="label" sx={{ px: 2, py: "6px", fontWeight: 600, fontSize: 14, color: "text.secondary" }}>Día</Box>
          </Paper>
        </Box>
      </Box>

      {/* controls */}
      <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, border: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "background.paper" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" onClick={goPrev}><ChevronLeftIcon /></IconButton>
          <IconButton size="small" onClick={goNext}><ChevronRightIcon /></IconButton>
          <Typography sx={{ fontWeight: 700, ml: 1 }}>{rangeLabel}</Typography>
          <Button variant="outlined" size="small" sx={{ ml: 3 }} onClick={goToday}>Hoy</Button>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button size="small" sx={{ bgcolor: "grey.100", textTransform: "none" }}>Módulo</Button>
          <Button size="small" sx={{ bgcolor: "grey.100", textTransform: "none" }}>Tipo de Evento</Button>
        </Box>
      </Paper>

      {/* GRID: left hours column + scrollable days area */}
      <Box sx={{ display: "flex", flex: 1, border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden", bgcolor: "background.paper" }}>
        {/* Hours column */}
        <Box sx={{ width: 72, borderRight: "1px solid", borderColor: "divider", flexShrink: 0, bgcolor: "background.default" }}>
          {/* header spacer */}
          <Box sx={{ height: 56, borderBottom: "1px solid", borderColor: "divider" }} />
          {HOURS.map((h) => (
            <Box key={h} sx={{ height: ROW_HEIGHT, display: "flex", alignItems: "flex-start", justifyContent: "center", pt: 1, borderBottom: "1px solid", borderColor: "divider" }}>
              <Typography variant="caption" color="text.secondary">{String(h).padStart(2, "0")}:00</Typography>
            </Box>
          ))}
        </Box>

        {/* Days area (scrollable vertical) */}
        <Box sx={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* sticky headers row */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", position: "sticky", top: 0, zIndex: 20, bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider" }}>
            {days.map((d, idx) => {
              const isToday = isSameDay(d, today);
              return (
                <Box key={idx} sx={{ p: 1.25, textAlign: "center", borderRight: idx < 6 ? "1px solid" : "none", borderColor: "divider", bgcolor: isToday ? "primary.100" : "background.paper" }}>
                  <Typography sx={{ fontWeight: 700, color: isToday ? "primary.main" : "text.secondary", fontSize: 13 }}>
                    {DAY_LABELS[d.getDay()]}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                    {format(d, "d", { locale: es })}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* scrollable content */}
          <Box ref={containerRef} sx={{ overflow: "auto", flex: 1, position: "relative" }}>
            {/* tall grid area */}
            <Box sx={{ position: "relative", minHeight: ROW_HEIGHT * HOURS.length + 8 }}>
              {/* vertical hourly lines for each day */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", position: "absolute", left: 0, right: 0, top: 0 }}>
                {days.map((_, dayIdx) => (
                  <Box key={dayIdx} sx={{ borderRight: dayIdx < 6 ? "1px solid" : "none", borderColor: "divider", position: "relative" }}>
                    {/* horizontal lines */}
                    {HOURS.map((h, i) => (
                      <Box key={i} sx={{ height: ROW_HEIGHT, borderBottom: "1px solid", borderColor: "divider" }} />
                    ))}
                  </Box>
                ))}
              </Box>

              {/* render events per day */}
              <Box sx={{ position: "absolute", left: 0, right: 0, top: 0, display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
                {eventsByDay.map((dayObj, dayIdx) => {
                  const { raw, placements } = dayObj;
                  if (!raw || raw.length === 0) return <Box key={dayIdx} sx={{ minHeight: ROW_HEIGHT * HOURS.length }} />;
                  // compute placements (simple)
                  // placements: { uid: {colIndex, totalCols}}
                  // if placements empty, fallback single column
                  // For safety, derive mapping again
                  const placementMap = placements || {};
                  return (
                    <Box key={dayIdx} sx={{ position: "relative", minHeight: ROW_HEIGHT * HOURS.length, px: 0, py: 0 }}>
                      {raw.map((ev) => {
                        const idKey = ev.id ?? ev.uid;
                        const place = placementMap[idKey] || { colIndex: 0, totalCols: 1 };
                        const colIndex = place.colIndex ?? 0;
                        const totalCols = Math.max(1, place.totalCols ?? 1);
                        const widthPercent = 100 / totalCols;
                        const leftPercent = widthPercent * colIndex;

                        const style = CATEGORY_STYLES[ev.category] || CATEGORY_STYLES.default;

                        return (
                          <Box
                            key={idKey}
                            sx={{
                              position: "absolute",
                              top: ev.top,
                              left: `${leftPercent + 2}%`,
                              width: `calc(${widthPercent}% - 4%)`,
                              height: ev.height,
                              bgcolor: style.bg,
                              border: "1px solid",
                              borderColor: style.border,
                              borderRadius: 1,
                              p: 1,
                              boxSizing: "border-box",
                              overflow: "hidden",
                            }}
                          >
                            <Typography sx={{ fontWeight: 700, color: style.text, fontSize: 13 }}>{ev.title}</Typography>
                            <Typography sx={{ fontSize: 12, color: style.text, mt: 0.5 }}>
                              {format(parseISO(ev.start), "HH:mm", { locale: es })} - {format(parseISO(ev.end), "HH:mm", { locale: es })}
                            </Typography>
                            {ev.description && (
                              <Typography sx={{ fontSize: 12, color: style.text, opacity: 0.95, mt: 0.5 }}>
                                {ev.description}
                              </Typography>
                            )}
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
