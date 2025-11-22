// CalendarMonth.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";

const WEEK_DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

/**
 * Utility: retorna array de 42 Date objects que llenan la cuadrícula (6 semanas)
 * centrada en el mes de referencia (current)
 */
function generateMonthGrid(current) {
  const year = current.getFullYear();
  const month = current.getMonth();

  // Primer día del mes
  const firstOfMonth = new Date(year, month, 1);
  // Día de la semana (0=Dom)
  const startWeekDay = firstOfMonth.getDay();
  // Start date = primer casillero del calendario (puede ser del mes anterior)
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

/**
 * Eventos de ejemplo (copiados del HTML original, para Septiembre 2024).
 * La clave es 'YYYY-MM-DD'
 */
const SAMPLE_EVENTS = {
  "2024-09-02": [{ title: "Evento Comunidad", color: "blue" }],
  "2024-09-04": [{ title: "Clase: Intro a React", color: "green" }],
  "2024-09-06": [{ title: "Taller: Hooks Avanzados", color: "orange" }],
  "2024-09-11": [{ title: "Clase: State Management", color: "green" }],
  "2024-09-13": [{ title: "Entrega: Proyecto 1", color: "red" }],
  "2024-09-16": [{ title: "Networking", color: "blue", highlight: true }],
  "2024-09-18": [{ title: "Clase: Routing", color: "green" }],
  "2024-09-25": [{ title: "Clase: Backend Intro", color: "green" }],
  "2024-09-30": [{ title: "Entrega Final", color: "red" }],
};

function formatKey(d) {
  return d.toISOString().slice(0, 10);
}

export default function CalendarMonth({ initialDate = new Date() }) {
  const [current, setCurrent] = useState(() => {
    // Start at the initialDate provided but normalized to first day of month
    const cl = new Date(initialDate);
    return new Date(cl.getFullYear(), cl.getMonth(), 1);
  });

  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  const days = useMemo(() => generateMonthGrid(current), [current]);

  const monthLabel = useMemo(() => {
    // e.g., "Septiembre 2024" in Spanish (es-CR)
    return new Intl.DateTimeFormat("es-CR", {
      month: "long",
      year: "numeric",
    }).format(current);
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      {/* Header (title + view toggles) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Calendario
        </Typography>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              p: 0.5,
            }}
          >
            <Box
              component="label"
              sx={{
                px: 2,
                py: "6px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: 1,
                color: "text.secondary",
                fontSize: 14,
                fontWeight: 600,
                "& input": { display: "none" },
                bgcolor: (theme) => "transparent",
              }}
            >
              Mes
              <input name="calendar-view" type="radio" defaultChecked />
            </Box>

            <Box
              component="label"
              sx={{
                px: 2,
                py: "6px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: 1,
                color: "text.secondary",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Semana
              <input name="calendar-view" type="radio" />
            </Box>

            <Box
              component="label"
              sx={{
                px: 2,
                py: "6px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: 1,
                color: "text.secondary",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Día
              <input name="calendar-view" type="radio" />
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          p: 1.5,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={prevMonth} size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={nextMonth} size="small">
            <ChevronRight />
          </IconButton>

          <Typography sx={{ fontWeight: 700, ml: 1 }}>{monthLabel}</Typography>

          <Button
            variant="outlined"
            size="small"
            onClick={goToday}
            sx={{ ml: 3 }}
          >
            Hoy
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            sx={{ bgcolor: "grey.100", color: "text.primary", textTransform: "none" }}
            startIcon={<ExpandMore />}
          >
            Módulo
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ bgcolor: "grey.100", color: "text.primary", textTransform: "none" }}
            startIcon={<ExpandMore />}
          >
            Tipo de Evento
          </Button>
        </Box>
      </Box>

      {/* Grid */}
      <Box
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "auto 1fr 1fr 1fr 1fr 1fr",
          gap: "1px",
          bgcolor: "divider",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Weekday headers */}
        {WEEK_DAYS.map((d) => (
          <Box
            key={d}
            sx={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: 13,
              py: 1.25,
              bgcolor: "background.paper",
              color: "text.secondary",
            }}
          >
            {d}
          </Box>
        ))}

        {/* Days (42 cells) */}
        {days.map((day, idx) => {
          const isCurrentMonth = day.getMonth() === current.getMonth();
          const isToday =
            day.getFullYear() === today.getFullYear() &&
            day.getMonth() === today.getMonth() &&
            day.getDate() === today.getDate();

          const key = formatKey(day);
          const events = SAMPLE_EVENTS[key] || [];

          return (
            <Box
              key={key + idx}
              sx={{
                p: 1.25,
                minHeight: 110,
                bgcolor: isCurrentMonth ? "background.paper" : "transparent",
                color: isCurrentMonth ? "text.primary" : "text.disabled",
                borderTop: "1px solid",
                borderLeft: "1px solid",
                borderColor: "divider",
                position: "relative",
              }}
            >
              {/* Day number */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: isToday ? 700 : 600,
                    color: isToday ? "primary.main" : undefined,
                    opacity: isCurrentMonth ? 1 : 0.6,
                  }}
                >
                  {day.getDate()}
                </Typography>

                {isToday && (
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {day.getDate()}
                  </Box>
                )}
              </Box>

              {/* Events list (small) */}
              <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                {events.map((ev, i) => {
                  const bg =
                    ev.color === "blue"
                      ? "rgba(219,234,254,0.8)"
                      : ev.color === "green"
                      ? "rgba(220,252,231,0.9)"
                      : ev.color === "orange"
                      ? "rgba(255,237,213,0.9)"
                      : ev.color === "red"
                      ? "rgba(254,226,226,0.9)"
                      : "rgba(238,238,238,0.8)";

                  const textColor =
                    ev.color === "blue"
                      ? "#1e40af"
                      : ev.color === "green"
                      ? "#166534"
                      : ev.color === "orange"
                      ? "#9a3412"
                      : ev.color === "red"
                      ? "#9f1239"
                      : "inherit";

                  return (
                    <Box
                      key={i}
                      sx={{
                        fontSize: 12,
                        p: "6px 8px",
                        borderRadius: 1,
                        bgcolor: bg,
                        color: textColor,
                        fontWeight: 600,
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
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
