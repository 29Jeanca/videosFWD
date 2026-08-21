import { Box, Typography, Tabs, Tab } from "@mui/material";
import { fontMono } from "../../../theme/theme";

// Filtros reales del backend (posts-by-user / comments-by-user / likes-by-user).
// El mockup de diseño ("Todo" / "Temas" / "Comentarios" / "Entregas") asume un
// endpoint combinado y un tipo "Entrega" que no existen en la API actual, así
// que se mantienen los 3 filtros existentes con la copia del mockup donde
// aplica ("Temas" ≈ posts, "Comentarios" = comments) y la copia previa donde
// no ("Me gusta" para likes, sin equivalente en el mockup).
const FILTERS = [
  { value: "posts", label: "Temas" },
  { value: "comments", label: "Comentarios" },
  { value: "likes", label: "Me gusta" },
];

export default function ActivityHeader({ filter = "posts", setFilter }) {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: fontMono,
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "text.secondary",
          mb: 1.25,
        }}
      >
        Actividad
      </Typography>

      <Typography
        variant="h2"
        component="h1"
        sx={{ fontSize: "34px", lineHeight: 1.15, letterSpacing: "-0.025em", mb: 1.25 }}
      >
        Tu historial
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ fontSize: "15px", mb: 3 }}>
        Todo lo que publicaste, comentaste y entregaste.
      </Typography>

      <Tabs
        value={filter}
        onChange={(_e, value) => setFilter(value)}
        sx={{
          minHeight: "auto",
          borderBottom: "1px solid",
          borderColor: "divider",
          "& .MuiTabs-indicator": { backgroundColor: "primary.main", height: 2 },
        }}
      >
        {FILTERS.map((f) => (
          <Tab
            key={f.value}
            value={f.value}
            label={f.label}
            sx={{
              minHeight: "auto",
              px: 2,
              py: 1.5,
              fontSize: 14,
              color: "text.secondary",
              "&.Mui-selected": { color: "primary.dark" },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
