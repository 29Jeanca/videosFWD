import { Box, Typography, Button } from '@mui/material';

export default function NoResults({ onClearFilters }) {
  return (
    <Box
      sx={{
        border: (theme) => `1px dashed ${theme.palette.divider}`,
        borderRadius: '16px',
        bgcolor: 'action.hover',
        minHeight: 260,
        p: { xs: 4, md: 5 },
        display: 'grid',
        alignContent: 'center',
        justifyItems: 'center',
        gap: 1.25,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          bgcolor: 'action.selected',
          display: 'grid',
          placeItems: 'center',
          fontFamily: (theme) => theme.typography.h1.fontFamily,
          fontWeight: 700,
          color: 'text.disabled',
        }}
      >
        29
      </Box>
      <Typography variant="h6" component="p">
        Sin más resultados
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '32ch' }}>
        No encontramos más cursos para los filtros seleccionados. Quitá alguno para ver el resto del catálogo.
      </Typography>
      <Button variant="outlined" color="inherit" onClick={onClearFilters} sx={{ minHeight: 40, px: 2.25 }}>
        Quitar filtros
      </Button>
    </Box>
  );
}
