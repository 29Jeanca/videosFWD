import React, { useState,useEffect } from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Alert,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showFormPassword, setShowFormPassword] = useState(false);

  const navigate = useNavigate();

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
          sx={{ mb: 4, textAlign: "center" }}
        >
          Ingresa el código enviado a tu correo y tu nueva clave.
        </Typography>

        {/* EMAIL */}
        {!showFormPassword && (
        <>
        <Typography fontWeight={600} mb={1}>
          Correo electrónico
        </Typography>
        <TextField
          fullWidth
          placeholder="estudiantefwd@.com"
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
          sx={{
            py: 1.4,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "#2563eb",
          }}  
          onClick={() => setShowFormPassword(true)}
        > 
          Enviar Código de Recuperación
        </Button>
        </>
        )}

        {showFormPassword && (
          <>
            {/* CÓDIGO */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography fontWeight={600}>
                Código de recuperación
              </Typography>
              <Typography variant="caption" color="primary">
                6 dígitos
              </Typography>
            </Box>

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

            {/* NUEVA PASSWORD */}
            <Typography fontWeight={600} mb={1}>
              Nueva Contraseña
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="••••••••"
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

            {/* CONFIRMAR PASSWORD */}
            <Typography fontWeight={600} mb={1}>
              Confirmar Nueva Contraseña
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="••••••••"
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

            {/* BOTÓN */}
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
            >
              Actualizar Contraseña
            </Button>

            {/* ALERTA */}
            <Alert
              severity="info"
              sx={{
                mt: 3,
                bgcolor: "#f0f7ff",
                border: "1px solid #dbeafe",
              }}
            >
              Asegúrate de que tu nueva contraseña tenga al menos 8
              caracteres, incluya una mayúscula y un número.
            </Alert>
          </>
        )}
      </Card>

      {/* VOLVER */}
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ mt: 3, textTransform: "none", color: "text.secondary" }}
        onClick={() => navigate("/")}
      >
        Volver al inicio de sesión
      </Button>

      {/* FOOTER */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 4, textAlign: "center" }}
      >
        © 2026 FWD Bootcamp · Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default ResetPassword;
