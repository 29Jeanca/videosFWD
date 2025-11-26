import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { postEvent } from "../services/validate";

const COLORS = [
  { name: "green", hex: "#22c55e" },
  { name: "red", hex: "#ef4444" },
  { name: "blue", hex: "#3b82f6" },
  { name: "orange", hex: "#f97316" },
  { name: "purple", hex: "#a855f7" },
];

export default function ModalCreateEvent({ open, onClose, onSave, infoEvent }) {
  const [title, setTitle] = useState(infoEvent.title || "");
  const [description, setDescription] = useState(infoEvent.description || "");
  const [color, setColor] = useState(infoEvent.color || "green");

  // 🔥 VALIDACIÓN: deshabilitar botón si falta título o descripción
  const isDisabled = title.trim() === "" || description.trim() === "";

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isDisabled) return; // seguridad extra
    const response = await postEvent({ title, description, color, date: infoEvent.date });
    console.log(response);
    onSave({ title, description, color, date: infoEvent.date });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      {/* ------- HEADER ------- */}
      <DialogTitle sx={{ m: 0, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Añadir Evento
          </Typography>

          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Rellena los detalles para el nuevo evento en el calendario.
        </Typography>
      </DialogTitle>

      {/* ------- FORM ------- */}
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          
          {/* TÍTULO */}
          <TextField
            label="Título del Evento"
            placeholder="Ej. Clase de React"
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* DESCRIPCIÓN */}
          <TextField
            label="Descripción del Evento"
            placeholder="Añade una breve descripción..."
            fullWidth
            size="small"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* SELECTOR DE COLOR */}
          <Box>
            <Typography fontSize={14} mb={1.5}>
              Color del Evento
            </Typography>

            <RadioGroup
              row
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              {COLORS.map((c) => (
                <FormControlLabel
                  key={c.name}
                  value={c.name}
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": { display: "none" },
                        "&.Mui-checked::before": {
                          content: '""',
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          border: "2px solid #135bec",
                          transform: "scale(1.15)",
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: c.hex,
                        },
                      }}
                    />
                  }
                />
              ))}
            </RadioGroup>
          </Box>
        </DialogContent>

        {/* ------- ACTIONS ------- */}
        <DialogActions sx={{ px: 3, pb: 3, borderTop: "1px solid #e5e7eb" }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#135bec" }}
            disabled={isDisabled}
          >
            Guardar Evento
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
