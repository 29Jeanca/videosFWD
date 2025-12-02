import {
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useState } from "react";
import CalendarFilter from "./CalendarFilter";
export default function SidebarFilters() {
  const [topic] = useState([]);
  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6">Filtrar Clases</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Encuentra la clase que buscas
      </Typography>

      <Typography variant="subtitle2" mb={1}>
        Módulo
      </Typography>
      <RadioGroup row defaultValue="Front-end">
        <FormControlLabel
          value="Front-end"
          control={<Radio />}
          label="Front-end"
        />
        <FormControlLabel
          value="Back-end"
          control={<Radio />}
          label="Back-end"
        />
      </RadioGroup>

      <Typography variant="subtitle2" mt={3} mb={1}>
        Tema
      </Typography>
      <Select fullWidth defaultValue="all">
        <MenuItem value="all">Todos los temas</MenuItem>
        {topic.map((t, index) => (
          <MenuItem key={index} value={t}>
            {t}
          </MenuItem>
        ))}
      </Select>

      <Typography variant="subtitle2" mt={3} mb={1}>
        Día de la Clase
      </Typography>
      <CalendarFilter />

      <Box mt={3} display="flex" flexDirection="column" gap={1}>
        <Button variant="contained" color="primary">
          Aplicar Filtros
        </Button>
        <Button variant="outlined">Limpiar Filtros</Button>
      </Box>
    </Paper>
  );
}
