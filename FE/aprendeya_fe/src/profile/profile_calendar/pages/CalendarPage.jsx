import { useState } from "react";
import { Box, Container, ToggleButtonGroup, ToggleButton } from "@mui/material";
import AppHeader from "../../../components/AppHeader";
import CalendarDay from "../components/CalendarDay";
import CalendarWeek from "../components/CalendarWeek";
import CalendarMonth from "../components/CalendarMonth";

// Estilo del switch de vista (Mes/Semana/Día), tomado del mockup de
// docs/HANDOFF.md: contenedor "píldora" con fondo divider, cada segmento
// redondeado y el activo resaltado en background.paper.
const segmentSx = {
  height: 34,
  display: "inline-flex",
  alignItems: "center",
  px: "14px",
  borderRadius: "8px",
  fontSize: 14,
  color: "text.secondary",
  fontWeight: 500,
};

export default function CalendarPage() {
  const [view, setView] = useState("month");

  const handleViewChange = (_, next) => {
    if (next !== null) setView(next);
  };

  return (
    <>
      <AppHeader />
      <Container maxWidth="xl" sx={{ pt: { xs: 3, md: 5 }, pb: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ maxWidth: 1280, mx: "auto", width: "100%" }}>
          {/* Selector de vista — Mes/Semana/Día, las tres funcionales: cada
              una trae/crea sus propios eventos (ver CalendarMonth/Week/Day). */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: "3px",
                gap: "2px",
                bgcolor: "divider",
                borderRadius: "10px",
              }}
            >
              <ToggleButtonGroup
                exclusive
                value={view}
                onChange={handleViewChange}
                size="small"
                sx={{
                  "& .MuiToggleButtonGroup-grouped": { border: 0, margin: 0 },
                  "& .MuiToggleButton-root": {
                    ...segmentSx,
                    textTransform: "none",
                    "&.Mui-selected": {
                      bgcolor: "background.paper",
                      color: "text.primary",
                      fontWeight: 600,
                      boxShadow: "0 1px 2px rgba(11,18,32,0.08)",
                      "&:hover": { bgcolor: "background.paper" },
                    },
                  },
                }}
              >
                <ToggleButton value="month">Mes</ToggleButton>
                <ToggleButton value="week">Semana</ToggleButton>
                <ToggleButton value="day">Día</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Cada vista es autónoma (fetch de eventos + su propia navegación
              prev/next/hoy), mismo patrón que ya traía CalendarMonth. */}
          {view === "month" && <CalendarMonth />}
          {view === "week" && <CalendarWeek />}
          {view === "day" && <CalendarDay />}
        </Box>
      </Container>
    </>
  );
}
