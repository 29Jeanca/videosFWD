import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { checkEmail, sendRecoverCode, resetPassword } from "../services/validate";
import { useTema } from "../../theme/useTema";
import { fontFamilies } from "../../theme/theme";
import Logo29 from "../../components/Logo29";

// Ícono del botón de tema: refleja la preferencia activa (ver LoginForm.jsx,
// mismo patrón — familia visual compartida).
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

// Indicador "paso X de 2" — el flujo real tiene dos etapas (pedir código / definir
// contraseña nueva), no tres; ver nota de la Fase 3 en el resumen de cierre.
function IndicadorDePaso({ paso }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      {[1, 2].map((n) => (
        <Box
          key={n}
          sx={{
            width: 26,
            height: 4,
            borderRadius: 999,
            bgcolor: n <= paso ? "primary.main" : "divider",
          }}
        />
      ))}
      <Typography
        sx={{ fontFamily: fontFamilies.mono, fontSize: "0.75rem", color: "text.secondary", ml: 0.75 }}
      >
        paso {paso} de 2
      </Typography>
    </Box>
  );
}

const ResetPassword = () => {
  const { mode, pref, ciclarTema } = useTema();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "info", message: "" });

  const navigate = useNavigate();
  const IconoTema = ICONO_POR_PREF[pref] ?? SettingsSuggestIcon;

  const sendRecoveryEmail = async (email, code) => {
    return emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { email, code },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const validateEmail = async () => {
    if (!email) {
      showAlert("warning", "Debes ingresar un correo");
      return;
    }

    setLoading(true);
    setAlert({ show: false, type: "", message: "" });

    try {
      const response = await checkEmail(email);

      if (response.message === "El correo no está registrado.") {
        showAlert("error", "El correo no está registrado");
        return;
      }

      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

      const emailResponse = await sendRecoverCode(email, generatedCode);

      if (emailResponse.message === "Código de recuperación enviado.") {
        await sendRecoveryEmail(email, generatedCode);
        setShowFormPassword(true);
        showAlert("success", "Código enviado correctamente. Revisa tu correo");
      }
    } catch {
      showAlert("error", "Ocurrió un error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (!code || !newPassword || !confirmPassword) {
      showAlert("warning", "Todos los campos son obligatorios");
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert("warning", "Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await resetPassword(email, code, newPassword);
      showAlert("success", response.message);
    } catch {
      showAlert("error", "No se pudo actualizar la contraseña");
    }
  };

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
          misma textura decorativa que LoginForm.jsx. */}
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

      {/* "29" gigante solo de contorno, esquina inferior izquierda en esta vista
          (ver Vistas 29AprendeYa.dc.html §Reset password). */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          left: { xs: -60, md: -110 },
          bottom: { xs: -70, md: -110 },
          fontFamily: fontFamilies.display,
          fontWeight: 700,
          fontSize: { xs: "14rem", md: "28.75rem" },
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
        sx={{
          position: "relative",
          px: { xs: 3, md: 6 },
          py: { xs: 3, md: 4.25 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Logo29 variant={mode} />
        <IconButton
          onClick={ciclarTema}
          aria-label="Cambiar tema"
          size="small"
          sx={{ border: "1.5px solid", borderColor: "divider" }}
        >
          <IconoTema sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      <Box sx={{ position: "relative", display: "grid", placeItems: "center", px: { xs: 3, md: 6 }, py: { xs: 2, md: 3 } }}>
        <Box sx={{ width: "100%", maxWidth: 528, display: "grid", gap: { xs: 3, md: 4.25 } }}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <IndicadorDePaso paso={showFormPassword ? 2 : 1} />

            <Typography variant="h1" sx={{ fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.25rem" } }}>
              Recuperá tu acceso
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "44ch" }}>
              {showFormPassword
                ? "Ingresá el código que te enviamos a tu correo y tu nueva clave."
                : "Escribí tu correo y te mandamos un enlace para crear una contraseña nueva. Tu progreso no se toca."}
            </Typography>
          </Box>

          {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}

          <Box sx={{ display: "grid", gap: 2.25 }}>
            {!showFormPassword && (
              <>
                <CampoConLabel label="Correo">
                  <TextField
                    fullWidth
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { height: 54 } }}
                  />
                </CampoConLabel>

                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={loading}
                  onClick={validateEmail}
                  sx={{ height: 56 }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "inherit" }} /> : "Enviar enlace"}
                </Button>
              </>
            )}

            {showFormPassword && (
              <>
                <CampoConLabel label="Código de recuperación">
                  <TextField
                    fullWidth
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    inputProps={{
                      maxLength: 6,
                      style: {
                        letterSpacing: "6px",
                        fontSize: "18px",
                        textAlign: "center",
                        fontFamily: fontFamilies.mono,
                      },
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { height: 54 } }}
                  />
                </CampoConLabel>

                <CampoConLabel label="Nueva contraseña">
                  <TextField
                    fullWidth
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { height: 54 } }}
                  />
                </CampoConLabel>

                <CampoConLabel label="Confirmar nueva contraseña">
                  <TextField
                    fullWidth
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { height: 54 } }}
                  />
                </CampoConLabel>

                <Button fullWidth size="large" variant="contained" onClick={changePassword} sx={{ height: 56 }}>
                  Actualizar contraseña
                </Button>
              </>
            )}

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{
                height: 52,
                color: "text.primary",
                borderColor: "divider",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              Volver al inicio de sesión
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 1.25,
              pt: 3.25,
              borderTop: "1px solid",
              borderColor: "divider",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "text.secondary",
            }}
          >
            <Box>El enlace vence a los 30 minutos. Si no llega, revisá spam antes de pedir otro.</Box>
            <Box>
              ¿Perdiste también el correo? Escribinos a{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                soporte@29aprendeya.com
              </Box>
              .
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{ position: "relative", px: { xs: 3, md: 6 }, py: 3.25, fontSize: "0.8125rem", color: "text.disabled" }}
      >
        © 2026 29aprendeya
      </Box>
    </Box>
  );
};

export default ResetPassword;
