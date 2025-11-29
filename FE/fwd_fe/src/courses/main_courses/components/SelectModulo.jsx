// SelectModulo.jsx
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

export default function SelectModulo() {
  return (
    <Box mb={3}>
      <Typography variant="subtitle1" fontWeight={700} mb={1}>
        Módulo
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Selecciona un módulo</InputLabel>
        <Select defaultValue="">
          <MenuItem value="mod1">Frontend Básico</MenuItem>
          <MenuItem value="mod2">Backend Django</MenuItem>
          <MenuItem value="mod3">React Avanzado</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
