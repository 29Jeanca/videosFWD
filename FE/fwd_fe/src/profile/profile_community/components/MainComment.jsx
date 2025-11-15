import { Box, Avatar, Typography, Chip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function MainComment() {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Avatar
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfmNIZwkNvYKkxc5MShpp3-UzVcELEXVFk9ovihIHFsEQ16u52BQyISU8LLcFmp3Glq3Sef-x9ji5alYOG2TkZG4ioDh6VcpbLIEYE9XEHIgxLkV3H7lU08CTmpYMIcMXpupJvZRQSe-lf0oIr7ooA_8Z3vRmhDwDPFUhYREZxRNGR3tQWj6vzJiRunvnM6KTUl7LwTM9nwIMV-OHGEOZPMEA1YIP_h1q68gcmwaDbNUa7MpBTzfr7BZtcwKiCnTqR0j45yNSR6foz"
          sx={{ width: 56, height: 56 }}
        />
        <Box>
          <Typography fontWeight={600}>Carlos Ruiz</Typography>
          <Typography variant="body2" color="text.secondary">
            hace 2 horas
          </Typography>
        </Box>
      </Box>

      <Typography variant="h4" fontWeight={700} mb={2}>
        ¿Alguien más tiene problemas con el state de React en el Proyecto 3?
      </Typography>

      <Typography mb={2}>
        Hola a todos,
        <br />
        Estoy trabajando en el Proyecto 3 y me he encontrado con un problema
        bastante frustrante con el manejo del estado en React...
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Chip label="JavaScript" color="warning" />

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ThumbUpIcon fontSize="small" />
          <Typography>12</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <BookmarkIcon fontSize="small" />
          <Typography>Guardar</Typography>
        </Box>
      </Box>
    </Box>
  );
}
