import { Box, Card, CardContent, Typography, Stack, Button, TextField } from "@mui/material";
import { getUserProfile, patchUserProfile } from "../services/validate";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNotify } from "../../components/notifications/useNotify";

function Campo({ label, value }) {
  return (
    <Box sx={{ display: "grid", gap: "5px" }}>
      <Typography
        sx={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "text.disabled",
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: "0.9375rem", color: "text.primary" }}>
        {value || "Cargando..."}
      </Typography>
    </Box>
  );
}

export default function PersonalInfo() {
  const [userData, setUserData] = useState(null);
  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const notify = useNotify();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        setUserData(data);

        setUsername(data.username || "");
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = async () => {
    const newObjUser = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: userData.password,
    };
    const response = await patchUserProfile(newObjUser);
    if (!response) {
      notify.error("No se pudieron guardar los cambios.");
      return;
    }
    setEdit(false);
    notify.success("Datos personales actualizados.");
  };

  return (
    <Card>
      <CardContent sx={{ p: "28px", display: "grid", gap: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4">Datos personales</Typography>
          {!edit && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditOutlinedIcon fontSize="small" />}
              onClick={() => setEdit(true)}
              sx={{ color: "text.primary", borderColor: "divider" }}
            >
              Editar
            </Button>
          )}
        </Box>

        {edit ? (
          <Stack spacing={2}>
            <TextField
              label="Nombre de usuario"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Apellido"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Guardar cambios
              </Button>
              <Button variant="outlined" onClick={() => setEdit(false)}>
                Cancelar
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: "20px 32px",
            }}
          >
            <Campo
              label="Nombre completo"
              value={firstName && lastName ? `${firstName} ${lastName}` : ""}
            />
            <Campo label="Correo" value={email} />
            <Campo label="Nombre de usuario" value={username} />
            <Campo label="Bootcamp" value="Desarrollo Web Full Stack" />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
