import { Paper, Box, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

const WEEKDAY_LETTERS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const isSameDay = (a, b) =>
  !!a && !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// Genera la grilla de 6 semanas (L-D) para el mes visible, incluyendo los días
// "de relleno" del mes anterior/siguiente (mismo criterio visual del mockup).
function buildMonthGrid(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  // getDay(): 0=domingo..6=sábado -> lo convertimos a offset lunes-primero.
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    return { date, inMonth: date.getMonth() === month };
  });
}

// Widget de calendario compacto y decorativo: antes usaba el DateCalendar de
// @mui/x-date-pickers, pero no estaba conectado a ningún filtrado real (el
// estado quedaba local y no se propagaba). Se simplifica a una grilla propia,
// más fiel al tamaño/composición del mockup, manteniendo el mismo alcance
// puramente visual (ver Courses.jsx: selectedDate solo alimenta el chip
// "Filtros activos", no filtra el catálogo).
export default function CalendarFilter({ selectedDate = null, onSelectDate }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const days = buildMonthGrid(viewDate);

  const goToMonth = (delta) => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const handleSelect = (day) => {
    if (!day.inMonth || !onSelectDate) return;
    onSelectDate(isSameDay(day.date, selectedDate) ? null : day.date);
  };

  return (
    <Paper sx={{ p: '22px', display: 'grid', gap: 1.75 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontSize: 15 }}>
          {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          <IconButton
            size="small"
            onClick={() => goToMonth(-1)}
            sx={{ width: 26, height: 26, border: (t) => `1px solid ${t.palette.divider}`, borderRadius: '8px' }}
          >
            <ChevronLeftIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => goToMonth(1)}
            sx={{ width: 26, height: 26, border: (t) => `1px solid ${t.palette.divider}`, borderRadius: '8px' }}
          >
            <ChevronRightIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, textAlign: 'center' }}>
        {WEEKDAY_LETTERS.map((letter, i) => (
          <Typography key={i} sx={{ fontSize: 11, color: 'text.disabled' }}>
            {letter}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, textAlign: 'center' }}>
        {days.map((day, i) => {
          const isSelected = isSameDay(day.date, selectedDate);
          const isToday = isSameDay(day.date, today);
          return (
            <Box
              key={i}
              onClick={() => handleSelect(day)}
              sx={{
                py: 0.75,
                fontSize: 13,
                borderRadius: '8px',
                cursor: day.inMonth ? 'pointer' : 'default',
                fontWeight: isSelected ? 600 : 400,
                color: isSelected
                  ? 'primary.contrastText'
                  : !day.inMonth
                    ? 'text.disabled'
                    : 'text.primary',
                bgcolor: isSelected ? 'primary.main' : isToday ? 'action.selected' : 'transparent',
              }}
            >
              {day.date.getDate()}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
