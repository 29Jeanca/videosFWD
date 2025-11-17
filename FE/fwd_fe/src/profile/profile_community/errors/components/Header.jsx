import { AppBar, Toolbar, Typography, Box, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();
return (
<AppBar position="static" color="transparent" elevation={0}>
<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
<Box display="flex" alignItems="center" gap={1}>
<Typography fontWeight={800} color="primary">FWD</Typography>
</Box>


<Box display={{ xs: "none", md: "flex" }} gap={4}>
<Button variant="text" color="primary" onClick={() => navigate("/perfil")}>Comunidad</Button>
<Button variant="text" onClick={() => navigate("/perfil")}>Perfil</Button>
</Box>


<Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuB..." />
</Toolbar>
</AppBar>
);
}