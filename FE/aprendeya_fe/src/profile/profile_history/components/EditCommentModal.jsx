import { Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useState, useEffect } from "react";
import DialogTopAccent from "../../../components/dialogs/DialogTopAccent";
import DialogHeader from "../../../components/dialogs/DialogHeader";

export default function EditCommentModal({ open, onClose, onSave, initialText = "" }) {
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
      PaperProps={{ sx: { borderRadius: "20px", overflow: "hidden" } }}
    >
      <DialogTopAccent />
      <DialogHeader
        icon={<ModeCommentOutlinedIcon />}
        title="Editar comentario"
        subtitle="El comentario se actualiza para todos al guardar."
        onClose={onClose}
      />

      <DialogContent sx={{ px: 3, pt: 0 }}>
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

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveRoundedIcon fontSize="small" />}
          onClick={() => onSave(text)}
          disabled={!text.trim()}
        >
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
