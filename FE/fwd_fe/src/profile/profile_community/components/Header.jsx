import { Box, Typography, Button, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function Header() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      mb={4}
    >
      <Box>
        <Typography variant="h4" fontWeight={900}>
          Comunidad Forward Costa Rica
        </Typography>
        <Typography color="text.secondary">
          Realiza tus consultas o comparte tus ideas
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ fontWeight: "bold" }}
        >
          Crear Nuevo Tema
        </Button>
      </Stack>
    </Stack>
  );
}
