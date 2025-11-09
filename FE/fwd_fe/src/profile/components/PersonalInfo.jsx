import { Card, CardContent, Typography, Stack } from "@mui/material";
import { getUserProfile } from "../services/validate";
import { useEffect, useState } from "react";
  
export default function PersonalInfo() {
  const [userData, setUserData] = useState(null);
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const data = await getUserProfile();
          setUserData(data);
          console.log(data);
          
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUserData();
    }, []);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Información Personal
        </Typography>
        <Stack spacing={2}>
          <div>
            <Typography variant="caption" color="text.secondary">
              Nombre Completo
            </Typography>
            <Typography>{userData ? userData.first_name + " " + userData.last_name : "Cargando..."}</Typography>
          </div>
          <div>
            <Typography variant="caption" color="text.secondary">
              Correo Electrónico
            </Typography>
            <Typography>{userData ? userData.email : "Cargando..."}</Typography>
          </div>
          <div>
            <Typography variant="caption" color="text.secondary">
              Bootcamp Actual
            </Typography>
            <Typography>Desarrollo Web Full Stack</Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
