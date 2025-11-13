import { Box, Typography, Stack, Link, Divider } from "@mui/material";

export default function FeaturedTopics() {
  const topics = [
    { title: "Guía definitiva para Flexbox y Grid", comments: 28 },
    { title: "Cómo preparar una entrevista técnica", comments: 19 },
    { title: "Errores comunes al empezar con React Hooks", comments: 15 },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Temas Destacados
      </Typography>
      <Stack spacing={2}>
        {topics.map((t, i) => (
          <Box key={i}>
            <Link
              href="#"
              underline="hover"
              sx={{ fontWeight: 600, display: "block" }}
            >
              {t.title}
            </Link>
            <Typography variant="body2" color="text.secondary">
              {t.comments} comentarios
            </Typography>
            {i < topics.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
