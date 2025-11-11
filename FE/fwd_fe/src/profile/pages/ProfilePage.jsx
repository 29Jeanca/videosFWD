import { Grid, Box, Typography, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import PersonalInfo from "../components/PersonalInfo";
import GeneralProgress from "../components/GeneralProgress";
import Courses from "../components/Courses";
import { Edit } from "@mui/icons-material";
import { getUserProfile } from "../services/validate";
import { useEffect, useState } from "react";
export default function ProfilePage() {
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
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
      <Sidebar />
      <Box flex={1} p={{ xs: 2, md: 5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" fontWeight={800}>
              Bienvenido, {userData ? userData.first_name : "Cargando..."}!
            </Typography>
            <Typography color="text.secondary">
              Aquí puedes ver tu progreso y acceder a tus clases.
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <PersonalInfo />
            <Box mt={3}>
              <GeneralProgress />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Courses />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
