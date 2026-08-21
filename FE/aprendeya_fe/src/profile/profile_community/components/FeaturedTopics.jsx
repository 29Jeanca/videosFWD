import { Box, Typography } from "@mui/material";
import { brandTokens } from "../../../theme/theme";

// El mockup no tiene un widget de "temas destacados" en la barra lateral —
// en su lugar trae una tarjeta fija "Regla de la casa", con acento invertido
// en los DOS modos: en claro es `#0B1220` (ink/900) para contrastar contra
// la página clara; en oscuro NO reutiliza ese mismo hex (sería invisible
// contra un fondo de página que ya es `#0B1220`) — el mockup en modo oscuro
// usa `#1A2437`/`surface2` con borde `#26314A`, un paso más claro que la
// página, no "siempre el mismo hex". Por eso esto se resuelve por modo en
// vez de fijar un solo color de brandTokens.
export default function FeaturedTopics() {
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === "dark" ? brandTokens.dark.surface2 : brandTokens.dark.bg),
        border: (theme) => (theme.palette.mode === "dark" ? `1px solid ${brandTokens.dark.border}` : "none"),
        borderRadius: "16px",
        p: 2.75,
        display: "grid",
        gap: 1.5,
      }}
    >
      <Typography variant="h6" sx={{ color: "common.white" }}>
        Regla de la casa
      </Typography>
      <Typography sx={{ fontSize: 14, lineHeight: 1.65, color: brandTokens.dark.muted }}>
        Pegá tu código, contá qué probaste y qué esperabas. Así te responden
        más rápido.
      </Typography>
    </Box>
  );
}
