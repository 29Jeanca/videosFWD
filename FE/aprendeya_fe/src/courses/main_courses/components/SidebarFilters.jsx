import { Paper, Typography, Box, Button, Chip, Divider, Stack } from '@mui/material';
import CalendarFilter from './CalendarFilter';

const AREAS = ['Frontend', 'Backend', 'Data', 'QA'];
const NIVELES = ['Principiante', 'Intermedio', 'Avanzado'];
const DURACIONES = ['Menos de 3 h', 'Más de 3 h'];

const EMPTY_FILTERS = { area: null, nivel: null, duracion: null };

// Casilla cuadrada estilo mockup (no es el Checkbox de MUI: el mockup usa un
// cuadrado propio de 18px, más chico y sin ripple).
function SquareOption({ label, checked, onClick }) {
  return (
    <Box
      onClick={onClick}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        fontSize: 14,
        color: 'text.primary',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          width: 18,
          height: 18,
          flex: 'none',
          borderRadius: '6px',
          bgcolor: checked ? 'primary.main' : 'transparent',
          border: (t) => (checked ? 'none' : `1.5px solid ${t.palette.divider}`),
        }}
      />
      {label}
    </Box>
  );
}

// Los filtros de Área/Nivel/Duración son puramente de UI: el modelo real de
// Course (BE/courses/models.py) solo trae `module` (frontend/backend/fullstack)
// como campo con el que se podría cruzar "Área" a futuro; Nivel y Duración no
// tienen campo real todavía. Antes tampoco filtraban nada (el RadioGroup/Select
// original no estaban conectados a ClassesGrid), así que se mantienen sin
// conectar — solo se restylizan como chips/checkboxes y quedan reflejados en
// "Filtros activos" en Courses.jsx para que la interacción se sienta real.
export default function SidebarFilters({
  filters = EMPTY_FILTERS,
  onFiltersChange,
  selectedDate = null,
  onSelectDate,
}) {
  const setGroup = (group, value) => {
    if (!onFiltersChange) return;
    onFiltersChange({
      ...filters,
      [group]: filters[group] === value ? null : value,
    });
  };

  const handleClear = () => onFiltersChange && onFiltersChange(EMPTY_FILTERS);

  return (
    <Stack gap={2.25}>
      <Paper sx={{ p: '22px', display: 'grid', gap: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: 16 }}>
            Filtros
          </Typography>
          <Button
            variant="text"
            onClick={handleClear}
            sx={{ minHeight: 'auto', minWidth: 0, p: 0, fontSize: 13, fontWeight: 500 }}
          >
            Limpiar
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gap: 1.375 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Área</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {AREAS.map((area) => {
              const selected = filters.area === area;
              return (
                <Chip
                  key={area}
                  label={area}
                  size="small"
                  onClick={() => setGroup('area', area)}
                  color={selected ? 'primary' : 'default'}
                  variant={selected ? 'filled' : 'outlined'}
                  sx={{
                    height: 32,
                    px: 0.5,
                    fontWeight: selected ? 600 : 500,
                    borderColor: selected ? 'transparent' : 'divider',
                  }}
                />
              );
            })}
          </Box>
        </Box>

        <Divider />

        <Box sx={{ display: 'grid', gap: 1.375 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Nivel</Typography>
          {NIVELES.map((nivel) => (
            <SquareOption
              key={nivel}
              label={nivel}
              checked={filters.nivel === nivel}
              onClick={() => setGroup('nivel', nivel)}
            />
          ))}
        </Box>

        <Divider />

        <Box sx={{ display: 'grid', gap: 1.375 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Duración</Typography>
          {DURACIONES.map((duracion) => (
            <SquareOption
              key={duracion}
              label={duracion}
              checked={filters.duracion === duracion}
              onClick={() => setGroup('duracion', duracion)}
            />
          ))}
        </Box>
      </Paper>

      <CalendarFilter selectedDate={selectedDate} onSelectDate={onSelectDate} />
    </Stack>
  );
}
