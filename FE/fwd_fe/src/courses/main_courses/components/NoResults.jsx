import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function NoResults() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      sx={{
        bgcolor: theme => (theme.palette.mode === 'dark' ? 'rgba(30,41,59,0.5)' : 'rgb(241,245,249)'),
        border: theme => `2px dashed ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`,
        borderRadius: 3,
        p: 4,
        minHeight: 300,
      }}
    >
      <SearchOffIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" fontWeight="bold">
        No se encontraron más clases
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={1} maxWidth={420}>
        No hay resultados para los filtros seleccionados. Prueba con otros criterios para encontrar lo que buscas.
      </Typography>
    </Box>
  );
}