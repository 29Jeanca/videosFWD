import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

export default function EditCommentModal({
  open,
  onClose,
  onSave,
  initialText = "",
}) {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle sx={{ display: "flex", alignItems: "center", pb: 1 }}>
        Editar Comentario

        <IconButton
          onClick={onClose}
          sx={{ marginLeft: "auto" }}
          aria-label="Cerrar"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent dividers>
        <TextField
          label="Tu comentario"
          fullWidth
          multiline
          minRows={4}
          maxRows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>

      {/* FOOTER */}
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => onSave(text)}
          disabled={!text.trim()}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
