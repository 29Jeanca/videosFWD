import { Box, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Datos de ejemplo: igual que antes de este cambio, no vienen de una API
// (CommunityPage no consulta eventos); solo se actualizó el texto/fechas
// para calzar con la copia del mockup.
const events = [
  { month: "ago", day: "21", title: "Code review en vivo", time: "7:00 p.m. · con Marcela V." },
  { month: "ago", day: "27", title: "Charla: primer empleo tech", time: "6:30 p.m. · invitada externa" },
];

export default function UpcomingEvents() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "16px",
        p: 2.75,
        display: "grid",
        gap: 2,
      }}
    >
      <Typography variant="h6">Próximos eventos</Typography>

      <Stack spacing={1.75}>
        {events.map((e) => (
          <Stack key={e.day} direction="row" spacing={1.5}>
            <Box
              sx={{
                width: 44,
                flex: "none",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "10px",
                py: 0.75,
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: 11, textTransform: "uppercase", color: "text.disabled" }}>
                {e.month}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: 17 }}>
                {e.day}
              </Typography>
            </Box>
            <Box sx={{ display: "grid", gap: 0.375 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{e.title}</Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{e.time}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>

      <Button
        variant="outlined"
        onClick={() => navigate("/calendario")}
        sx={{
          height: 40,
          fontSize: 14,
          color: "text.primary",
          borderColor: "divider",
          "&:hover": { borderColor: "text.disabled" },
        }}
      >
        Ver calendario
      </Button>
    </Box>
  );
}
