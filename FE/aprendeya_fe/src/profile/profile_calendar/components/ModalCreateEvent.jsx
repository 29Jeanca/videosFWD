import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { postEvent, patchEvent, deleteEvent } from "../services/validate";
import DialogTopAccent from "../../../components/dialogs/DialogTopAccent";
import DialogHeader from "../../../components/dialogs/DialogHeader";
import ColorSwatchPicker from "../../../components/dialogs/ColorSwatchPicker";
import { useNotify } from "../../../components/notifications/useNotify";

const COLORS = [
  { name: "green", hex: "#22c55e", label: "Verde" },
  { name: "red", hex: "#ef4444", label: "Rojo" },
  { name: "blue", hex: "#3b82f6", label: "Azul" },
  { name: "orange", hex: "#f97316", label: "Naranja" },
  { name: "purple", hex: "#a855f7", label: "Violeta" },
];

// Sirve tanto para crear como para editar: si `infoEvent.id` viene con
// valor, es un evento propio existente (ver CalendarMonth/Week/Day — solo
// se puede llegar a este modo tocando un evento que YO creé) y el modal
// pasa a modo edición (PATCH + botón de borrar) en vez de crear uno nuevo.
export default function ModalCreateEvent({ open, onClose, onSave, onDelete, infoEvent }) {
  const [title, setTitle] = useState(infoEvent.title || "");
  const [description, setDescription] = useState(infoEvent.description || "");
  const [color, setColor] = useState(infoEvent.color || "green");
  const [deleting, setDeleting] = useState(false);
  const notify = useNotify();

  const isEditing = Boolean(infoEvent.id);
  const isDisabled = title.trim() === "" || description.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;

    if (isEditing) {
      const response = await patchEvent(infoEvent.id, { title, description, color });
      if (!response || response.error) {
        notify.error("No se pudo guardar el evento.");
        return;
      }
      notify.success("Evento actualizado.");
      onSave({ id: infoEvent.id, title, description, color, date: infoEvent.date });
    } else {
      const response = await postEvent({ title, description, color, date: infoEvent.date });
      if (!response || response.error) {
        notify.error("No se pudo crear el evento.");
        return;
      }
      notify.success("Evento creado.");
      // El backend devuelve el id real del evento recién creado — sin
      // pasarlo, el evento quedaba sin id en el estado local y tocarlo antes
      // de recargar la página abría "Añadir evento" en vez de "Editar
      // evento" (un evento no se podía distinguir de uno nuevo).
      onSave({ id: response.id, title, description, color, date: infoEvent.date });
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const response = await deleteEvent(infoEvent.id);
    setDeleting(false);
    if (!response || response.error) {
      notify.error("No se pudo eliminar el evento.");
      return;
    }
    notify.success("Evento eliminado.");
    onDelete?.(infoEvent.id, infoEvent.date);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "20px", overflow: "hidden" } }}
    >
      <DialogTopAccent />
      <DialogHeader
        icon={<EventAvailableOutlinedIcon />}
        title={isEditing ? "Editar evento" : "Añadir evento"}
        subtitle={
          isEditing
            ? "Modificá los detalles o eliminá este evento."
            : "Rellená los detalles para el nuevo evento en el calendario."
        }
        onClose={onClose}
      />

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 3, pt: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            label="Título del evento"
            placeholder="Ej. Clase de React"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Descripción del evento"
            placeholder="Añadí una breve descripción..."
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Box>
            <Typography variant="body2" fontWeight={600} mb={1.25}>
              Color del evento
            </Typography>
            <ColorSwatchPicker colors={COLORS} value={color} onChange={setColor} />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 1,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            justifyContent: isEditing ? "space-between" : "flex-end",
          }}
        >
          {isEditing && (
            <Button
              color="error"
              startIcon={<DeleteOutlineIcon fontSize="small" />}
              onClick={handleDelete}
              disabled={deleting}
            >
              Eliminar
            </Button>
          )}
          <Box sx={{ display: "flex", gap: 1.25 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" disabled={isDisabled}>
              {isEditing ? "Guardar cambios" : "Guardar evento"}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}
