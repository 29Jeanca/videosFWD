import { Box, Avatar, TextField, Button, Typography } from "@mui/material";

export default function NewComment() {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Añadir un comentario
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcGQNIBOxanYO1BNKnCgrLvHAltt5J0PqCWvNaI6SfvCKSDLyxMw87gUH6xeVjEpEfyXo43Vahoe-AsSWny4Z2ZCkRUZ9BWbW19az_pxsWsA35gRrmeARqei4Jhtfw_x3CZpMkLZz3nEhbrGMrSuuf4oOblmugRhnmflF-cKBifvaGO70bSufW3gbG8t--GinN_m4nPMcLKHWk1fNcFL5sYsDbkNTRqQBJkm7f5TOUwKm7jT5YTCnyON2IQ9kECGO4TvX1UXU4EsQy"
          sx={{ width: 48, height: 48 }}
        />

        <Box flex={1}>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Escribe tu comentario aquí..."
          />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained">Publicar Comentario</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
