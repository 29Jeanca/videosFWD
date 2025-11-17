import { Grid, Box, Typography, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import PersonalInfo from "../components/PersonalInfo";
import GeneralProgress from "../components/GeneralProgress";
import Courses from "../components/Courses";
import { Edit } from "@mui/icons-material";
import { getUserProfile } from "../services/validate";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import CommunityPage from "../profile_community/pages/CommunityPage";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(true);
  const [showCommunity, setShowCommunity] = useState(false);
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Buenos días";
    if (hour >= 12 && hour < 19) return "Buenas tardes";
    return "Buenas noches";
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/csrf/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log("CSRF token obtenido:", data));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        setUserData(data);
        console.log(data);
        if (data.detail === "Authentication credentials were not provided.") {
          navigate('/');
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [navigate]);

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
      <Sidebar 
        profile={() => {
          setShowUserProfile(true);
          setShowCommunity(false);
        }}
        profileActive={showUserProfile}
        community={() => {
          setShowCommunity(true);
          setShowUserProfile(false);
        }}
        communityActive={showCommunity}
      />

      <Box flex={1} p={{ xs: 2, md: 5 }}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4} 
          flexWrap="wrap" 
          gap={2}
        >
          <Box>
            <Typography variant="h4" fontWeight={800}>
              {getGreeting()}, {userData ? userData.first_name : "Cargando..."}!
            </Typography>

            <Typography color="text.secondary">
              Aquí puedes ver tu progreso y acceder a tus clases.
            </Typography>
          </Box>
        </Box>

        {/* Perfil y progreso general */}
        {showUserProfile && (
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
        )}

        {/* Comunidad */}
        {showCommunity && <CommunityPage />}
      </Box>
    </Box>
  );
}
