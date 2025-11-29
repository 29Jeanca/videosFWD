// components/FiltersTop.jsx
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";

export default function SelectTema({ modulo, tema, setModulo, setTema }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Clases disponibles
      </Typography>

      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
        Módulo
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select value={modulo} onChange={(e) => setModulo(e.target.value)} displayEmpty>
          <MenuItem value="">
            <em>Selecciona un módulo</em>
          </MenuItem>
          <MenuItem value="React">React Avanzado</MenuItem>
        </Select>
      </FormControl>

      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
        Tema
      </Typography>
      <FormControl fullWidth>
        <Select value={tema} onChange={(e) => setTema(e.target.value)} displayEmpty>
          <MenuItem value="">
            <em>Selecciona un tema</em>
          </MenuItem>
          <MenuItem value="Variables">Variables y Tipos</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
