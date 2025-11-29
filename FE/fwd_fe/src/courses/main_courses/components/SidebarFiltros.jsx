// components/Sidebar.jsx
import { Box, Typography, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function SidebarFiltros({ filters, onFilterChange }) {
  return (
    <Box
      sx={{
        width: 220,
        p: 3,
        borderRight: "1px solid #e5e5e5",
        background: "#fff",
        height: "100vh",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Filtros
      </Typography>

      <Typography sx={{ fontSize: 13, fontWeight: 600, mt: 2 }}>
        Tipo
      </Typography>
      <RadioGroup value={filters.tipo} onChange={(e) => onFilterChange("tipo", e.target.value)}>
        <FormControlLabel value="todos" control={<Radio />} label="Todos" />
        <FormControlLabel value="presencial" control={<Radio />} label="Presencial" />
        <FormControlLabel value="virtual" control={<Radio />} label="Virtual" />
      </RadioGroup>

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
        Nivel
      </Typography>
      <RadioGroup value={filters.nivel} onChange={(e) => onFilterChange("nivel", e.target.value)}>
        <FormControlLabel value="todos" control={<Radio />} label="Todos" />
        <FormControlLabel value="1" control={<Radio />} label="Nivel 1" />
        <FormControlLabel value="2" control={<Radio />} label="Nivel 2" />
      </RadioGroup>
    </Box>
  );
}
