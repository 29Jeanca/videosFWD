import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

export default function TabsSection() {
  const [value, setValue] = useState(0);
  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
>
        <Tab label="Recientes" sx={{ fontWeight: "bold" }} />
        <Tab label="Más Activos" sx={{ fontWeight: "bold" }} />
        <Tab label="Sin Responder" sx={{ fontWeight: "bold" }} />
        <Tab label="Más Gustados" sx={{ fontWeight: "bold" }} />
      </Tabs>
    </Box>
  );
}
