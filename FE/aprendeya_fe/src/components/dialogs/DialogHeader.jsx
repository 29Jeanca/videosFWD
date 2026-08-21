// src/components/dialogs/DialogHeader.jsx
// Cabecera compartida para los modales de la app: ícono en una placa de
// color, título (Sora) + subtítulo, botón de cerrar. Antes cada modal
// repetía su propia versión de esto (algunos con subtítulo, otros sin,
// distinto peso tipográfico) — usarla en todos les da una misma "firma"
// visual en vez de sentirse cinco componentes sueltos.
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { alpha } from "@mui/material/styles";

export default function DialogHeader({ icon, tone = "primary", title, subtitle, onClose }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, px: 3, pt: 3, pb: 2.5 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          borderRadius: "14px",
          display: "grid",
          placeItems: "center",
          bgcolor: (theme) => alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.2 : 0.12),
          color: `${tone}.main`,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, pt: 0.5 }}>
        <Typography variant="h5" sx={{ fontSize: "1.2rem" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {onClose && (
        <IconButton onClick={onClose} size="small" aria-label="Cerrar" sx={{ mt: 0.25 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
