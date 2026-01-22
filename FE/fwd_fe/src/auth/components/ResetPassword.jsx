import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { checkEmail, sendRecoverCode, resetPassword } from "../services/validate";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "info", message: "" });

  const navigate = useNavigate();

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
        bgcolor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          boxShadow: "0px 8px 30px rgba(0,0,0,0.06)",
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Restablecer Contraseña
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, textAlign: "center" }}
        >
          Ingresa el código enviado a tu correo y tu nueva clave.
        </Typography>

        {alert.show && (
          <Alert severity={alert.type} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        {!showFormPassword && (
          <>
            <Typography fontWeight={600} mb={1}>
              Correo electrónico
            </Typography>

            <TextField
              fullWidth
              placeholder="estudiantefwd@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.4,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                bgcolor: "#2563eb",
              }}
              onClick={validateEmail}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Enviar Código de Recuperación"
              )}
            </Button>
          </>
        )}

        {showFormPassword && (
          <>
            <Typography fontWeight={600} mb={1}>
              Código de recuperación
            </Typography>

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
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Typography fontWeight={600} mb={1}>
              Nueva Contraseña
            </Typography>

            <TextField
              fullWidth
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Typography fontWeight={600} mb={1}>
              Confirmar Nueva Contraseña
            </Typography>

            <TextField
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{
                py: 1.4,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                bgcolor: "#2563eb",
              }}
              endIcon={<CheckCircleOutlineIcon />}
              onClick={changePassword}
            >
              Actualizar Contraseña
            </Button>
          </>
        )}
      </Card>

      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ mt: 3, textTransform: "none", color: "text.secondary" }}
        onClick={() => navigate("/")}
      >
        Volver al inicio de sesión
      </Button>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 4 }}>
        © 2026 FWD Bootcamp · Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default ResetPassword;
