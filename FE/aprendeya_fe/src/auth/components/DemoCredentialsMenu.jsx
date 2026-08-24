// Menú desplegable "Ver credenciales de usuarios" en el login — pensado
// para que alguien que no tiene las credenciales a mano (un reclutador
// mirando el deploy de portafolio, por ejemplo) pueda ver las cuentas de
// prueba y entrar con un click, sin tener que ir a buscarlas en el repo.
//
// Solo tiene sentido con el backend simulado activo (ver src/mocks): esas
// cuentas no existen en ningún BE real. Si algún día se conecta un backend
// real (VITE_USE_MOCK_API=false), este menú desaparece solo.
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { fontFamilies } from "../../theme/theme";
import { DEMO_ACCOUNTS } from "../../mocks/seedData.js";

const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK_API !== "false";

export default function DemoCredentialsMenu({ onSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  if (!IS_MOCK_MODE) return null;

  const handlePick = (account) => {
    onSelect?.(account.email, account.password);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        startIcon={<BadgeOutlinedIcon fontSize="small" />}
        endIcon={<KeyboardArrowDownIcon sx={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease" }} />}
        size="small"
        sx={{
          minHeight: 36,
          px: 1.5,
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "text.secondary",
          "&:hover": { color: "primary.main", bgcolor: "action.hover" },
        }}
      >
        Ver credenciales de usuarios
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { sx: { mt: 1, borderRadius: "14px", minWidth: 320, maxWidth: 360 } } }}
      >
        <Box sx={{ px: 2, pt: 1, pb: 1.25 }}>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "text.secondary" }}>
            Cuentas de demostración
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "text.disabled" }}>
            Elegí una para autocompletar el formulario.
          </Typography>
        </Box>
        <Divider />

        {DEMO_ACCOUNTS.map((account) => (
          <MenuItem
            key={account.email}
            onClick={() => handlePick(account)}
            sx={{ py: 1.1, px: 2, display: "grid", gap: 0.25 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, width: "100%" }}>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{account.name}</Typography>
              <Chip
                label={account.roleLabel}
                size="small"
                sx={{ height: 20, fontSize: "0.6875rem", fontWeight: 600, bgcolor: "action.hover", color: "text.secondary" }}
              />
            </Box>
            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>{account.email}</Typography>
            <Typography sx={{ fontSize: "0.75rem", fontFamily: fontFamilies.mono, color: "text.disabled" }}>
              {account.password}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
