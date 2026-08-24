import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

// El orden y las etiquetas siguen el mockup ("Recientes", "Sin responder",
// "Populares"). El cuarto filtro (orden por más comentados) no tiene
// equivalente en el mockup — no existe un concepto de "Mis temas" en los
// datos actuales (requeriría identificar al usuario dueño del post), así
// que se conserva como "Más Activos" en la última posición.
const TAB_LABELS = ["Recientes", "Sin responder", "Populares", "Más Activos"];

export default function TabSelection({ onTabChange }) {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        TabIndicatorProps={{ sx: { height: 2, bgcolor: "primary.main" } }}
        sx={{
          minHeight: 0,
          "& .MuiTab-root": {
            minHeight: 0,
            minWidth: "auto",
            padding: "12px 16px",
            fontSize: 14,
            fontWeight: 500,
            color: "text.secondary",
            textTransform: "none",
          },
          "& .Mui-selected": {
            fontWeight: 600,
            color: "primary.dark",
          },
        }}
      >
        {TAB_LABELS.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
    </Box>
  );
}
