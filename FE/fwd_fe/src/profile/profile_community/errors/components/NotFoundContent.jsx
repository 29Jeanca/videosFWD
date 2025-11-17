import { Box, Typography, Button, Stack } from "@mui/material";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from "react-router-dom";

export function NotFoundContent() {
const navigate = useNavigate();
return (
<Stack spacing={4} alignItems="center" textAlign="center">
<SentimentDissatisfiedIcon color="primary" sx={{ fontSize: 120 }} />


<Box>
<Typography variant="h3" fontWeight={800}>¡Oops!</Typography>
<Typography variant="body1" color="text.secondary">
Parece que esta página no existe o ha sido movida.
</Typography>
</Box>


<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
<Button variant="contained" size="large" onClick={() => navigate("/perfil")}>Volver a Comunidad</Button>
<Button variant="outlined" size="large" onClick={() => navigate("/perfil")}>Explorar otros temas</Button>
</Stack>
</Stack>
);
}