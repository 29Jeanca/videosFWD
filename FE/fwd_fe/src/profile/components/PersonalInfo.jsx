import { Card, CardContent, Typography, Stack, Button, TextField } from "@mui/material";
import { getUserProfile, patchUserProfile } from "../services/validate";
import { useEffect, useState } from "react";
import { Edit } from "@mui/icons-material";

export default function PersonalInfo() {
  const [userData, setUserData] = useState(null);
  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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

  const handleEdit = async() => {
    console.log("Datos guardados:", { username, firstName, lastName, email });
    const newObjUser = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: userData.password,
    };
    console.log("Nuevo objeto de usuario:", newObjUser);
    const response = await patchUserProfile(newObjUser);
    console.log("Respuesta del servidor:", response);
    setEdit(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Información Personal
        </Typography>

        <Stack spacing={2}>
          <div>
            <Typography variant="caption" color="text.secondary">
              Nombre de Usuario
            </Typography>
            {edit ? (
              <TextField
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <Typography>{username || "Cargando..."}</Typography>
            )}
          </div>

          <div>
            {edit ? (
              <>
                <Typography variant="caption" color="text.secondary">
                  Nombre
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Typography variant="caption" color="text.secondary">
                  Apellido
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            ) : (
              <>
                <Typography variant="caption" color="text.secondary">
                  Nombre Completo
                </Typography>
                <Typography>
                  {firstName && lastName
                    ? `${firstName} ${lastName}`
                    : "Cargando..."}
                </Typography>
              </>
            )}
          </div>

          <div>
            <Typography variant="caption" color="text.secondary">
              Correo Electrónico
            </Typography>
            {edit ? (
              <TextField
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <Typography>{email || "Cargando..."}</Typography>
            )}
          </div>

          <div>
            <Typography variant="caption" color="text.secondary">
              Bootcamp
            </Typography>
            <Typography>Desarrollo Web Full Stack</Typography>
          </div>

          {edit ? (
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Guardar Cambios
              </Button>
              <Button variant="outlined" onClick={() => setEdit(false)}>
                Cancelar
              </Button>
            </Stack>
          ) : (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => setEdit(true)}
            >
              Editar Información
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
