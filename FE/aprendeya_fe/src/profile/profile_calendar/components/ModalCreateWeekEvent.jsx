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
import { postEvent } from "../services/validate";
import DialogTopAccent from "../../../components/dialogs/DialogTopAccent";
import DialogHeader from "../../../components/dialogs/DialogHeader";
import ColorSwatchPicker from "../../../components/dialogs/ColorSwatchPicker";

const COLORS = [
  { name: "green", hex: "#22c55e", label: "Verde" },
  { name: "red", hex: "#ef4444", label: "Rojo" },
  { name: "blue", hex: "#3b82f6", label: "Azul" },
  { name: "orange", hex: "#f97316", label: "Naranja" },
  { name: "purple", hex: "#a855f7", label: "Violeta" },
];

export default function ModalCreateWeekEvent({ open, onClose, onSave, infoEvent }) {
  const [title, setTitle] = useState(infoEvent.title || "");
  const [description, setDescription] = useState(infoEvent.description || "");
  const [startDate, setStartDate] = useState(infoEvent.startDate || "");
  const [endDate, setEndDate] = useState(infoEvent.endDate || "");
  const [color, setColor] = useState(infoEvent.color || "green");

  const isDisabled =
    title.trim() === "" || description.trim() === "" || startDate.trim() === "" || endDate.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    const response = await postEvent({
      title,
      description,
      color,
      date: startDate,
      fecha_inicio: startDate,
      fecha_fin: endDate,
    });
    console.log(response);
    onSave({ title, description, color, date: startDate, startDate, endDate });
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
        title="Añadir evento"
        subtitle="Rellená los detalles para el nuevo evento en el calendario."
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

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Fecha y hora de inicio"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ flex: "1 1 200px" }}
            />
            <TextField
              label="Fecha y hora de fin"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ flex: "1 1 200px" }}
            />
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={600} mb={1.25}>
              Color del evento
            </Typography>
            <ColorSwatchPicker colors={COLORS} value={color} onChange={setColor} />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 1, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isDisabled}>
            Guardar evento
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
