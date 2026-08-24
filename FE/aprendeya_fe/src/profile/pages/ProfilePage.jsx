import { Grid, Box, Container, Typography, Avatar, Button, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { alpha } from "@mui/material/styles";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import AppHeader from "../../components/AppHeader";
import PersonalInfo from "../components/PersonalInfo";
import GeneralProgress from "../components/GeneralProgress";
import Courses from "../components/Courses";
import SavedPosts from "../components/SavedPosts";
import { getUserProfile } from "../services/validate";
import { fontFamilies } from "../../theme/theme";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Menú de secciones del propio Perfil (ver docs/HANDOFF.md "Fase 4" / plan de
// `/perfil`) — no es la nav del sitio (eso ya lo cubre AppHeader), es solo un
// atajo para bajar a cada bloque de esta misma vista.
const SECCIONES = [
  { label: "Mi progreso", icon: <TrendingUpOutlinedIcon fontSize="small" /> },
  { label: "Mis clases", icon: <SchoolOutlinedIcon fontSize="small" /> },
  { label: "Guardados", icon: <BookmarksOutlinedIcon fontSize="small" /> },
  { label: "Datos personales", icon: <BadgeOutlinedIcon fontSize="small" /> },
];

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState("Mi progreso");
  const navigate = useNavigate();

  const refs = {
    "Mi progreso": useRef(null),
    "Mis clases": useRef(null),
    Guardados: useRef(null),
    "Datos personales": useRef(null),
  };

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

  const irASeccion = (label) => {
    setSeccionActiva(label);
    refs[label].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const iniciales = userData?.first_name
    ? `${userData.first_name[0]}${userData.last_name?.[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 } }}>
        <Grid container spacing={{ xs: 3, lg: 3.5 }}>
          {/* Aside de identidad — tarjeta de avatar/estado + menú de secciones
              de esta vista (no confundir con la nav del sitio, ver AppHeader).
              Se parte en "lg" (no "md"): entre 900-1200px esta columna quedaba
              tan angosta que las etiquetas de sección se veían cortadas. */}
          <Grid item xs={12} lg={3}>
            <Box sx={{ position: { lg: "sticky" }, top: { lg: 96 }, display: "grid", gap: "18px" }}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "16px",
                  p: "26px",
                  display: "grid",
                  gap: "16px",
                  justifyItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 76,
                    height: 76,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.12 : 0.18),
                    color: "primary.dark",
                    fontFamily: fontFamilies.display,
                    fontWeight: 700,
                    fontSize: "1.625rem",
                  }}
                >
                  {iniciales || <BadgeOutlinedIcon />}
                </Avatar>
                <Box sx={{ display: "grid", gap: "4px" }}>
                  <Typography
                    sx={{
                      fontFamily: fontFamilies.display,
                      fontWeight: 600,
                      fontSize: "1.1875rem",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {userData ? `${userData.first_name} ${userData.last_name}` : "Cargando..."}
                  </Typography>
                  {userData?.email && (
                    <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
                      {userData.email}
                    </Typography>
                  )}
                </Box>
                <Box
                  component="span"
                  sx={{
                    px: "12px",
                    py: "5px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    bgcolor: (theme) => alpha(theme.palette.success.main, theme.palette.mode === "light" ? 0.12 : 0.18),
                    color: "success.dark",
                  }}
                >
                  Activa
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => irASeccion("Datos personales")}
                  sx={{ color: "text.primary", borderColor: "divider" }}
                >
                  Editar perfil
                </Button>
              </Box>

              <Box
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "16px",
                  p: "12px",
                }}
              >
                <List sx={{ p: 0, display: "grid", gap: "2px" }}>
                  {SECCIONES.map((seccion) => (
                    <ListItemButton
                      key={seccion.label}
                      selected={seccionActiva === seccion.label}
                      onClick={() => irASeccion(seccion.label)}
                      sx={{
                        height: "42px",
                        px: "14px",
                        borderRadius: "10px",
                        "&.Mui-selected": {
                          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.12 : 0.18),
                          color: "primary.dark",
                          "& .MuiSvgIcon-root": { color: "inherit" },
                          "&:hover": {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.16 : 0.24),
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                        {seccion.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={seccion.label}
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                          fontWeight: seccionActiva === seccion.label ? 600 : 500,
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} lg={9}>
            <Box mb={4}>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" } }}>
                {getGreeting()}, {userData ? userData.first_name : "Cargando..."}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                Acá podés ver tu progreso, tus clases y tus datos.
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gap: "24px" }}>
              <Box ref={refs["Mi progreso"]}>
                <GeneralProgress />
              </Box>
              <Box ref={refs["Mis clases"]}>
                <Courses />
              </Box>
              <Box ref={refs["Guardados"]}>
                <SavedPosts />
              </Box>
              <Box ref={refs["Datos personales"]}>
                <PersonalInfo />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
