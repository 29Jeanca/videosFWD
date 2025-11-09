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
export default function Sidebar() {
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
  const menuItems = [
    { icon: <Person />, label: "Mi Perfil", active: true },
    { icon: <Book />, label: "Mis Cursos" },
    { icon: <Group />, label: "Comunidad" },
    { icon: <CalendarMonth />, label: "Calendario" },
  ];

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
        height: { xs: "auto", md: "100vh" },
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
          FWD Bootcamp
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
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            selected={item.active}
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
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box mt="auto">
        <Divider sx={{ my: 2 }} />
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon 
              onClick={() => logoutUser("/")}
          >
            <Logout
            />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItemButton>
      </Box>
    </Box>
  );
}
