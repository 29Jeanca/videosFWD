import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ActivityHeader({ filter='posts', setFilter }) {

  return (
    <Box>
      <Typography 
        variant="h4" 
        fontWeight={900} 
        sx={{ mb: 1 }}
      >
        Historial de Actividad
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Gestiona tus 'Me gusta', comentarios y publicaciones.
      </Typography>

      <FormControl sx={{ width: 220 }}>
        <Select
          value={filter}
          defaultValue="post"
          onChange={(e) => setFilter(e.target.value)}
          IconComponent={ExpandMoreIcon}
          sx={{
            height: 40,
            borderRadius: 2,
          }}
        >
          <MenuItem value="posts">Publicaciones</MenuItem>
          <MenuItem value="likes">Me gusta</MenuItem>
          <MenuItem value="comments">Comentarios</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
