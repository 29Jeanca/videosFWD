import { Box, Typography, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
export default function DeleteModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        bgcolor: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(2px)",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: 430,
          p: 4,
          mx: 2,
          textAlign: "center",
        }}
      >
        {/* Icono */}
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
            bgcolor: "#fdeaea",
            color: "error.main",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 34,
              fontVariationSettings: "'wght' 300",
            }}
          >
           <Delete fontSize="large" />
          </span>
        </Box>

        <Typography variant="h6" fontWeight="700" mb={1}>
          Confirmar Eliminación
        </Typography>

        <Typography color="text.secondary" mb={4}>
          ¿Estás seguro de que quieres eliminar esta publicación?<br />
          Esta acción no se puede deshacer.
        </Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            onClick={onCancel}
            sx={{
              px: 3,
              py: 1,
              bgcolor: "#edf0f2",
              color: "#374151",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": { bgcolor: "#e5e7eb" },
            }}
          >
            Cancelar
          </Button>

          <Button
            onClick={onConfirm}
            sx={{
              px: 3,
              py: 1,
              bgcolor: "error.main",
              color: "white",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": { bgcolor: "error.dark" },
            }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
