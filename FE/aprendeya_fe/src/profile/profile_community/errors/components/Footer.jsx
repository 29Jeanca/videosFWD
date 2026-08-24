import { Box, Stack, Typography, Link } from "@mui/material";


export function Footer() {
return (
<Box component="footer" bgcolor="background.paper" borderTop="1px solid" borderColor="divider">
<Stack
direction="row"
justifyContent="space-between"
alignItems="center"
flexWrap="wrap"
spacing={2.5}
sx={{ maxWidth: 1280, mx: "auto", px: 4, py: "22px" }}
>
<Typography variant="body2" color="text.secondary" sx={{ fontSize: "13px" }}>
© 2026 29aprendeya · Todos los derechos reservados
</Typography>

<Stack direction="row" spacing={2.5}>
<Link href="#" underline="hover" color="text.secondary" sx={{ fontSize: "13px" }}>
Soporte
</Link>
<Link href="#" underline="hover" color="text.secondary" sx={{ fontSize: "13px" }}>
Términos
</Link>
<Link href="#" underline="hover" color="text.secondary" sx={{ fontSize: "13px" }}>
Privacidad
</Link>
</Stack>
</Stack>
</Box>
);
}
