import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  School,
  Person,
  Book,
  Group,
  CalendarMonth,
  Logout,
} from "@mui/icons-material";
import { logoutUser } from "../services/logout";
import { getUserProfile } from "../services/validate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Sidebar({profile,profileActive=true,community,communityActive,calendar,calendarActive,courses,coursesActive}) {
  const [userData, setUserData] = useState(null);
     console.log(courses);
     console.log(coursesActive);
      const navigate = useNavigate();
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
    <Box
      sx={{
        width: { xs: "100%", md: 300 },
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: { xs: "auto", md: "auto" },
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Box
          sx={{
            bgcolor: "primary.main",
            p: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <School sx={{ color: "white" }} />
        </Box>
        <Typography variant="h6" fontWeight={700}>
          Forward Costa Rica
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs2hbKcI5Cev620R4-17H7uFdv2nYgFzXDbH2LwkJFyWerK9Hez4N1sA-39TRNMXtiCvVhW78ydr7FgmO5PCVaAemiAtLvcAlzEnLJu0xwjV6ZKqFvQUOMLi00vItziQb9sWYrlm5c8SfxAU5D7ha3yxLn4RPqouHO4j8L-h4TgTpnlHwOiVGsO4GM9cCLk2bSkbjx4Zs-g1blMI2oWxySaicqdXyZg84AvwyPle4YTYDM3z-beMH59xMD92rYD-57FVWjAG4QBnfH"
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography fontWeight={600}>{userData ? userData.username: "Cargando..."}</Typography>
          <Typography variant="body2" color="text.secondary">
            {userData ? userData.email : "Cargando..."}
          </Typography>
        </Box>
      </Box>

      <List>
          <ListItemButton
            onClick={profile}
            selected={profileActive}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }} onClick={profile}>
              <Person  />
            </ListItemIcon>
            <ListItemText primary={'Perfil'} />
          </ListItemButton>

          {/* <ListItemButton
            onClick={courses}
            selected={coursesActive}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }} onClick={courses}>
              <Book />
            </ListItemIcon>
            <ListItemText primary={'Cursos'} />
          </ListItemButton> */}

          <ListItemButton
            onClick={community}
            selected={communityActive}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }} onClick={community}>
              <Group />
            </ListItemIcon>
            <ListItemText primary={'Comunidad'} />
          </ListItemButton>
          
          <ListItemButton
            onClick={calendar}
            selected={calendarActive}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }} onClick={calendar}>
              <CalendarMonth />
            </ListItemIcon>
            <ListItemText primary={'Calendario'} />
          </ListItemButton>
        </List>

      <Box mt="auto">
        <Divider sx={{ my: 2 }} />
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon onClick={async()=>{
            await logoutUser();
            navigate('/');
          }}>
            <Logout
            />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItemButton>
      </Box>
    </Box>
  );
}
