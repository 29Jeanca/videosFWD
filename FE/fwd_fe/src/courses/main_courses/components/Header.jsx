// Header.jsx
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6" fontWeight={700}>
            FWD
          </Typography>

          <Box display={{ xs: "none", md: "flex" }} gap={4}>
            <Typography variant="body1" fontWeight={500}>
              Mis Cursos
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Perfil
            </Typography>
          </Box>
        </Box>

        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
