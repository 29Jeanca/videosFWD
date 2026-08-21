// src/components/dialogs/ColorSwatchPicker.jsx
// Antes esto era un RadioGroup con FormControlLabel sin texto de label: MUI
// le pone un margin-left negativo por defecto para alinear el control con un
// label que acá no existe, así que las bolitas de color terminaban montadas
// una sobre otra. Reemplazado por botones simples en una fila con gap real,
// más un anillo con separación (box-shadow, no border) que no invade al
// vecino, y un check al seleccionar.
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";

export default function ColorSwatchPicker({ colors, value, onChange }) {
  return (
    <Box role="radiogroup" aria-label="Color del evento" sx={{ display: "flex", gap: 1.75, flexWrap: "wrap" }}>
      {colors.map((c) => {
        const selected = value === c.name;
        return (
          <Tooltip key={c.name} title={c.label}>
            <Box
              component="button"
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={c.label}
              onClick={() => onChange(c.name)}
              sx={{
                width: 36,
                height: 36,
                p: 0,
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                backgroundColor: c.hex,
                display: "grid",
                placeItems: "center",
                transition: "transform 140ms ease, box-shadow 140ms ease",
                boxShadow: selected
                  ? (theme) => `0 0 0 3px ${theme.palette.background.paper}, 0 0 0 5px ${c.hex}`
                  : "none",
                "&:hover": { transform: "scale(1.08)" },
                "&:focus-visible": {
                  outline: "none",
                  boxShadow: (theme) =>
                    `0 0 0 3px ${theme.palette.background.paper}, 0 0 0 5px ${theme.palette.primary.main}`,
                },
              }}
            >
              {selected && <CheckIcon sx={{ fontSize: 18, color: "#fff" }} />}
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}
