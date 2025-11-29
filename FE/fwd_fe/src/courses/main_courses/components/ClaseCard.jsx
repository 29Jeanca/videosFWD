// components/ClassCard.jsx
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function ClaseCard({ clase }) {
  return (
    <Card
      sx={{
        width: 240,
        borderRadius: 3,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        p: 1,
        transition: "0.15s",
        "&:hover": {
          boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {clase.titulo}
        </Typography>

        <Typography sx={{ fontSize: 13, mb: 1 }}>{clase.hora}</Typography>

        <Typography sx={{ fontSize: 13 }}>
          <b>Modalidad:</b> {clase.modalidad}
        </Typography>

        <Typography sx={{ fontSize: 13, mb: 2 }}>
          <b>Tema:</b> {clase.tema}
        </Typography>

        <Button variant="contained" fullWidth>
          RESERVAR
        </Button>
      </CardContent>
    </Card>
  );
}
