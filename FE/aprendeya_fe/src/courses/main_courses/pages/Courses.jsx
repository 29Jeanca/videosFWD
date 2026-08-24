import { Container, Typography, Drawer, IconButton, Box, Button, Chip, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AppHeader from '../../../components/AppHeader';
import SidebarFilters from '../components/SidebarFilters';
import ClassesGrid from '../components/ClassesGrid';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { getCourses } from '../services/validate';
import { fontMono } from '../../../theme/theme';

const EMPTY_FILTERS = { area: null, nivel: null, duracion: null };

const formatChipDate = (date) =>
  date ? `${date.getDate()} ${date.toLocaleDateString('es', { month: 'short' }).replace('.', '')}` : '';

export default function Courses() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  // Filtros de Área/Nivel/Duración y la fecha del mini calendario son solo de
  // UI (ver nota en SidebarFilters.jsx): no filtran `courses`, solo alimentan
  // los chips de "Filtros activos" para que el catálogo se vea/interactúe
  // como en el mockup sin inventar un contrato de filtrado que el backend
  // (BE/courses) todavía no soporta.
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();

        const formattedCourses = response.map(course => ({
          ...course,
          tags: course.tags.map(tag => ({
            label: tag,
            bg: 'info.light',
            color: 'info.dark'
          }))
        }));

        setCourses(formattedCourses);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  const clearAllFilters = () => {
    setFilters(EMPTY_FILTERS);
    setSelectedDate(null);
  };

  const activeChips = [
    filters.area && { id: 'area', label: filters.area, onRemove: () => setFilters((f) => ({ ...f, area: null })) },
    filters.nivel && { id: 'nivel', label: filters.nivel, onRemove: () => setFilters((f) => ({ ...f, nivel: null })) },
    filters.duracion && {
      id: 'duracion',
      label: filters.duracion,
      onRemove: () => setFilters((f) => ({ ...f, duracion: null })),
    },
    selectedDate && { id: 'date', label: formatChipDate(selectedDate), onRemove: () => setSelectedDate(null) },
  ].filter(Boolean);

  return (
    <>
      <AppHeader />
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 3,
            mb: 4,
          }}
        >
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography
              sx={{
                fontFamily: fontMono,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'text.secondary',
              }}
            >
              Catálogo
            </Typography>
            <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
              Catálogo de cursos
            </Typography>
            <Typography sx={{ fontSize: 15, color: 'text.secondary' }}>
              {courses.length} cursos on demand · acceso sin vencimiento
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.25} sx={{ flexWrap: 'wrap' }}>
            <Button variant="outlined" color="inherit" sx={{ whiteSpace: 'nowrap' }}>
              Ordenar: recientes
            </Button>
            <Button variant="contained" color="primary" sx={{ whiteSpace: 'nowrap' }}>
              Mis cursos
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '268px 1fr' },
            gap: { xs: 3, lg: 3.5 },
            alignItems: 'start',
          }}
        >
          <Box sx={{ display: { xs: 'none', lg: 'block' }, position: 'sticky', top: 96 }}>
            <SidebarFilters
              filters={filters}
              onFiltersChange={setFilters}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </Box>

          <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            <Box sx={{ width: 300, maxWidth: '100vw', p: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <SidebarFilters
                filters={filters}
                onFiltersChange={setFilters}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </Box>
          </Drawer>

          <Box sx={{ display: 'grid', gap: 2.5 }}>
            <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>

            {activeChips.length > 0 && (
              <Stack direction="row" spacing={1.25} alignItems="center" flexWrap="wrap" useFlexGap>
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Filtros activos:</Typography>
                {activeChips.map((chip) => (
                  <Chip
                    key={chip.id}
                    label={chip.label}
                    onDelete={chip.onRemove}
                    sx={{
                      height: 30,
                      fontWeight: 600,
                      bgcolor: (t) => alpha(t.palette.primary.main, 0.14),
                      color: 'primary.dark',
                      '& .MuiChip-deleteIcon': { color: 'primary.dark', opacity: 0.7 },
                    }}
                  />
                ))}
              </Stack>
            )}

            <ClassesGrid classes={courses} onClearFilters={clearAllFilters} />
          </Box>
        </Box>
      </Container>
    </>
  );
}
