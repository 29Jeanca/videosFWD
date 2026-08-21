import { Dialog, Box, Typography, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DialogTopAccent from "../../../components/dialogs/DialogTopAccent";

// Antes era un overlay armado a mano (position:fixed + bgcolor:"white" fijo),
// lo que rompía el modo oscuro y no tenía foco/ESC/aria-modal. Ahora es un
// Dialog real de MUI con el mismo diseño (ícono + texto centrado).
export default function DeleteModal({ open, onCancel, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "20px", overflow: "hidden", textAlign: "center" },
      }}
    >
      <DialogTopAccent tone="error" />
      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.12),
            color: "error.main",
          }}
        >
          <DeleteOutlineIcon sx={{ fontSize: 32 }} />
        </Box>

        <Typography variant="h6" fontWeight={700} mb={1}>
          Confirmar eliminación
        </Typography>

        <Typography color="text.secondary" mb={3}>
          ¿Estás seguro de que querés eliminar esta publicación? Esta acción
          no se puede deshacer.
        </Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            onClick={onCancel}
            variant="outlined"
            sx={{ px: 3, fontWeight: 600, borderRadius: 2 }}
          >
            Cancelar
          </Button>

          <Button
            onClick={onConfirm}
            variant="contained"
            color="error"
            sx={{ px: 3, fontWeight: 600, borderRadius: 2 }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
