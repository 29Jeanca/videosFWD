import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import { alpha } from "@mui/material/styles";
import { fontFamilies } from "../../theme/theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/validate";
import { useTema } from "../../theme/useTema";
import Logo29 from "../../components/Logo29";

// Ícono del botón de tema: refleja la preferencia activa, no solo el modo resuelto
// (así "sistema" se distingue de "claro"/"oscuro" aunque hoy resuelvan igual).
const ICONO_POR_PREF = {
  system: SettingsSuggestIcon,
  light: LightModeIcon,
  dark: DarkModeIcon,
};

function CampoConLabel({ label, children }) {
  return (
    <Box sx={{ display: "grid", gap: 0.75 }}>
      <Typography
        component="label"
        sx={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

const LoginForm = () => {
  const { mode, pref, ciclarTema } = useTema();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [charging, setCharging] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  // Solo UI por ahora — mantener la sesión abierta más tiempo del default es un
  // cambio de backend (duración de sesión/JWT), fuera de alcance de esta fase.
  const [recordar, setRecordar] = useState(true);
  const navigate = useNavigate();

  const validateUser = async () => {
    setCharging(true);
    try {
      const response = await loginUser(email, password);
      console.log(response);

      if (response.message === "Login exitoso") {
        console.log("Todo good");
        navigate("/perfil");
      } else {
        setError(response.message || "Error al iniciar sesión");
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión");
    } finally {
      setCharging(false);
    }
  };

  const IconoTema = ICONO_POR_PREF[pref] ?? SettingsSuggestIcon;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
        color: "text.primary",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      {/* 3 líneas verticales muy tenues, centradas en un carril de 1100px —
          textura de fondo decorativa, ver Vistas 29AprendeYa.dc.html §Login. */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          left: "50%",
          width: 1100,
          maxWidth: "100%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box key={i} sx={{ width: "1px", bgcolor: (t) => alpha(t.palette.primary.main, 0.1) }} />
        ))}
      </Box>

      {/* "29" gigante solo de contorno, en la esquina — textura de marca, nunca
          como imagen ni relleno sólido (ver docs/BRAND.md §Logotipo). */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          right: { xs: -60, md: -90 },
          bottom: { xs: -70, md: -110 },
          fontFamily: fontFamilies.display,
          fontWeight: 700,
          fontSize: { xs: "14rem", md: "22rem" },
          lineHeight: 0.78,
          letterSpacing: "-0.06em",
          color: "transparent",
          WebkitTextStroke: (t) => `1px ${alpha(t.palette.primary.main, mode === "light" ? 0.13 : 0.16)}`,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        29
      </Box>

      <Box
        component="header"
        sx={{ position: "relative", px: { xs: 3, md: 6 }, py: { xs: 3, md: 4.25 }, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3 }}
      >
        <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/clases")}>
          <Logo29 variant={mode} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2.75 }, fontSize: "0.875rem", color: "text.secondary" }}>
          <Link component="button" type="button" onClick={() => navigate("/clases")} underline="hover" color="inherit" sx={{ fontSize: "inherit" }}>
            Cursos
          </Link>
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>Ayuda</Box>
          <IconButton onClick={ciclarTema} aria-label="Cambiar tema" size="small" sx={{ border: "1.5px solid", borderColor: "divider" }}>
            <IconoTema sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ position: "relative", display: "grid", placeItems: "center", px: { xs: 3, md: 6 }, py: { xs: 2, md: 3 } }}>
        <Box sx={{ width: "100%", maxWidth: 528, display: "grid", gap: { xs: 3, md: 4.25 } }}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography
              variant="h1"
              sx={{
                display: "inline-flex",
                alignItems: "baseline",
                flexWrap: "wrap",
                fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.4rem" },
              }}
            >
              Volvé a lo tuyo
              <Logo29 variant="cursor" size={0.65} animado sx={{ ml: 1.25, height: "0.86em" }} />
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "42ch" }}>
              Tu ruta, tus ejercicios y las respuestas de tus mentores siguen exactamente donde los dejaste.
            </Typography>
          </Box>

          <Box component="form" noValidate sx={{ display: "grid", gap: 2.25 }}>
            <CampoConLabel label="Correo">
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { height: 54 } }}
              />
            </CampoConLabel>

            <CampoConLabel label="Contraseña">
              <TextField
                fullWidth
                type={showPassword ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { height: 54 } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Mostrar contraseña" : "Ocultar contraseña"}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </CampoConLabel>

            {error && <Alert severity="error">{error}</Alert>}

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
              <Box
                component="label"
                sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.875rem", cursor: "pointer" }}
              >
                <Checkbox
                  checked={recordar}
                  onChange={(e) => setRecordar(e.target.checked)}
                  size="small"
                  sx={{ p: 0 }}
                />
                Mantener mi sesión abierta
              </Box>
              <Link href="/reset-password" underline="hover" sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                Olvidé mi contraseña
              </Link>
            </Box>

            <Box sx={{ position: "relative" }}>
              {charging ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 1.5 }}>
                  <CircularProgress size={28} />
                </Box>
              ) : (
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={validateUser}
                  disabled={charging}
                  sx={{ height: 56, fontSize: "1.0625rem" }}
                >
                  Entrar
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2.5, flexWrap: "wrap", pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
            <Typography variant="body2" color="text.secondary">¿Primera vez acá?</Typography>
            <Button variant="outlined" onClick={() => navigate("/clases")} sx={{ whiteSpace: "nowrap" }}>
              Explorar los cursos
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{ position: "relative", px: { xs: 3, md: 6 }, py: 3.25, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2.5, flexWrap: "wrap", fontSize: "0.8125rem", color: "text.secondary" }}
      >
        <span>© 2026 29aprendeya</span>
        <Box sx={{ display: "flex", gap: 2.5 }}>
          <Link underline="hover" color="inherit">Términos</Link>
          <Link underline="hover" color="inherit">Privacidad</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
