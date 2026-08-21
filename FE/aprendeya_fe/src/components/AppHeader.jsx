// src/components/AppHeader.jsx
// Header global de 29AprendeYa (ver docs/HANDOFF.md "Fase 4"). Una sola barra de
// navegación para toda la app — reemplaza los headers propios de cada vista
// (courses/.../Header.jsx, profile_community/errors/.../Header.jsx, el Sidebar como
// nav primaria, etc.) a medida que cada vista migra a este componente.
//
// Trae: logo (link a /clases), nav de secciones con estado activo por ruta, buscador
// decorativo, control de tema (mismo patrón que Login/Reset) y avatar + logout.
import { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useNavigate, useLocation } from "react-router-dom";
import { useTema } from "../theme/useTema";
import { logoutUser } from "../profile/services/logout";
import Logo29 from "./Logo29";

const ICONO_POR_PREF = {
  system: SettingsSuggestIcon,
  light: LightModeIcon,
  dark: DarkModeIcon,
};

const NAV_ITEMS = [
  { label: "Clases", to: "/clases" },
  { label: "Comunidad", to: "/comunidad" },
  { label: "Calendario", to: "/calendario" },
  { label: "Actividad", to: "/actividad" },
  { label: "Perfil", to: "/perfil" },
];

export default function AppHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mode, pref, ciclarTema } = useTema();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const IconoTema = ICONO_POR_PREF[pref] ?? SettingsSuggestIcon;

  const irA = (to) => {
    setMenuAbierto(false);
    navigate(to);
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ gap: { xs: 1.5, md: 3 }, py: 1 }}>
        <IconButton
          onClick={() => setMenuAbierto(true)}
          aria-label="Abrir menú de navegación"
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }}
          onClick={() => navigate("/clases")}
        >
          <Logo29 variant={mode} size={1.1} />
        </Box>

        <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
          {NAV_ITEMS.map((item) => {
            const activo = pathname.startsWith(item.to);
            return (
              <Button
                key={item.to}
                onClick={() => navigate(item.to)}
                sx={{
                  px: 1.75,
                  fontWeight: activo ? 600 : 500,
                  color: activo ? "primary.main" : "text.secondary",
                  bgcolor: activo
                    ? (theme) => alpha(theme.palette.primary.main, mode === "light" ? 0.12 : 0.18)
                    : "transparent",
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, mode === "light" ? 0.08 : 0.12),
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        {/* Empuja buscador/tema/avatar/logout a la derecha sin depender de la
            nav de arriba, que está oculta por debajo de "md". */}
        <Box sx={{ flex: 1 }} />

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1,
            height: 40,
            width: { sm: 200, lg: 232 },
            px: 1.5,
            borderRadius: "8px",
            border: "1px solid",
            borderColor: "divider",
            color: "text.secondary",
          }}
        >
          <SearchIcon sx={{ fontSize: 18 }} />
          <InputBase
            placeholder="Buscar clases o temas"
            sx={{ fontSize: "0.875rem", flex: 1, color: "text.primary" }}
          />
        </Box>

        <Tooltip title="Cambiar tema">
          <IconButton onClick={ciclarTema} aria-label="Cambiar tema">
            <IconoTema sx={{ fontSize: 22 }} />
          </IconButton>
        </Tooltip>

        {/* Decorativo por ahora — no hay backend de notificaciones todavía
            (ver docs/HANDOFF.md); el mockup tampoco lo conecta a nada, solo
            marca que hay algo pendiente con el punto naranja. */}
        <Tooltip title="Notificaciones">
          <IconButton aria-label="Notificaciones" sx={{ display: { xs: "none", sm: "inline-flex" } }}>
            <Box sx={{ position: "relative", display: "flex" }}>
              <NotificationsNoneOutlinedIcon sx={{ fontSize: 21 }} />
              <Box
                sx={{
                  position: "absolute",
                  top: -1,
                  right: -1,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "secondary.main",
                  border: "1.5px solid",
                  borderColor: "background.paper",
                }}
              />
            </Box>
          </IconButton>
        </Tooltip>

        <Tooltip title="Perfil">
          <IconButton onClick={() => navigate("/perfil")} aria-label="Ir a tu perfil">
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
              <PersonOutlineIcon sx={{ fontSize: 19 }} />
            </Avatar>
          </IconButton>
        </Tooltip>

        <Tooltip title="Cerrar sesión">
          <IconButton
            aria-label="Cerrar sesión"
            onClick={async () => {
              await logoutUser();
              navigate("/");
            }}
          >
            <LogoutIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>

      {/* Reemplaza la nav de arriba (oculta por debajo de "md") — sin esto la
          navegación primaria desaparecía sin alternativa en pantallas angostas. */}
      <Drawer anchor="left" open={menuAbierto} onClose={() => setMenuAbierto(false)}>
        <Box sx={{ width: 260, py: 2 }} role="presentation">
          <Box sx={{ px: 2.5, pb: 1.5 }}>
            <Logo29 variant={mode} size={1} />
          </Box>
          <Divider />
          <List sx={{ py: 1 }}>
            {NAV_ITEMS.map((item) => {
              const activo = pathname.startsWith(item.to);
              return (
                <ListItemButton
                  key={item.to}
                  selected={activo}
                  onClick={() => irA(item.to)}
                  sx={{
                    mx: 1,
                    my: 0.25,
                    borderRadius: 1.5,
                    "&.Mui-selected": {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, mode === "light" ? 0.12 : 0.18),
                      color: "primary.main",
                      fontWeight: 600,
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
