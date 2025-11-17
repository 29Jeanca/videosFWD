import { Box, Stack, Typography, Link } from "@mui/material";


export function Footer() {
return (
<Box py={6} borderTop="1px solid" borderColor="divider" textAlign="center">
<Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap" mb={3}>
<Link underline="hover">Términos de Servicio</Link>
<Link underline="hover">Política de Privacidad</Link>
<Link underline="hover">Contacto</Link>
</Stack>


<Typography variant="body2" color="text.secondary">
© 2024 FWD Bootcamp. Todos los derechos reservados.
</Typography>
</Box>
);
}