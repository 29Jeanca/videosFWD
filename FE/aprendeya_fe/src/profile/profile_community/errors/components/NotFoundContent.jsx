import { Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { brandTokens, fontMono } from "../../../../theme/theme";

export function NotFoundContent() {
const navigate = useNavigate();
return (
<Stack spacing={2.5} alignItems="center" textAlign="center" sx={{ width: "100%", maxWidth: 480, mx: "auto" }}>
<Typography variant="caption" sx={{ fontFamily: fontMono, fontSize: "13px", letterSpacing: "0.16em" }}>
ERROR 404
</Typography>

<Typography
component="div"
variant="h1"
sx={{
fontWeight: 700,
fontSize: "92px",
lineHeight: 1,
letterSpacing: "-0.04em",
color: brandTokens.primary[100],
}}
>
404
</Typography>

<Typography component="h1" variant="h2" sx={{ fontSize: "28px" }}>
Esta página no existe
</Typography>

<Typography variant="body1" color="text.secondary">
Puede que el enlace esté viejo o que el tema se haya borrado. Volvé al catálogo y seguí desde ahí.
</Typography>

<Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 0.75 }}>
<Button variant="contained" sx={{ height: "46px" }} onClick={() => navigate("/clases")}>
Ir al catálogo
</Button>
<Button
variant="outlined"
color="inherit"
sx={{ height: "46px", borderColor: "divider" }}
onClick={() => navigate("/comunidad")}
>
Ver comunidad
</Button>
</Stack>
</Stack>
);
}
