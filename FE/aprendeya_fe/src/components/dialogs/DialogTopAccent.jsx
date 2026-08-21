// src/components/dialogs/DialogTopAccent.jsx
// Franja de 4px arriba de cada modal — el mismo par primary/accent del
// isotipo ("29" + cursor, ver Logo29) en miniatura, para que los modales se
// sientan de la marca y no como diálogos genéricos de MUI. "error" para
// confirmaciones destructivas (DeleteModal).
import Box from "@mui/material/Box";

export default function DialogTopAccent({ tone = "brand" }) {
  return (
    <Box
      sx={{
        height: 4,
        background: (theme) =>
          tone === "error"
            ? theme.palette.error.main
            : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
    />
  );
}
