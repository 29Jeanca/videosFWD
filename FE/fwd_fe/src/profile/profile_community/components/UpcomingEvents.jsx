import { Box, Typography, Stack, Paper } from "@mui/material";

export default function UpcomingEvents() {
  const events = [
    { month: "JUL", day: "28", title: "Q&A en vivo con Profesores", time: "18:00 (Hora Local)" },
    { month: "AGO", day: "05", title: "Taller de optimización de portfolio", time: "19:00 (Hora Local)" },
  ];

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Próximos Eventos
      </Typography>
      <Stack spacing={2}>
        {events.map((e) => (
          <Paper
            key={e.day}
            sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: 2,
                textAlign: "center",
                width: 48,
                py: 0.5,
              }}
            >
              <Typography variant="caption" fontWeight={700}>
                {e.month}
              </Typography>
              <Typography variant="h6" fontWeight={900} lineHeight={1}>
                {e.day}
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={600}>{e.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {e.time}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
