import { Card, CardContent, Typography, Stack } from "@mui/material";
import CourseCard from "./CourseCard";

export default function Courses() {
  const courses = [
    { title: "Módulo 1: Fundamentos de HTML y CSS", status: "Completado", progress: 100, color: "success", buttonText: "Ver clases" },
    { title: "Módulo 2: JavaScript Esencial", status: "En progreso", progress: 75, color: "primary", buttonText: "Continuar" },
    { title: "Módulo 3: React y Componentes", status: "Sin empezar", progress: 0, color: "grey", buttonText: "Empezar" },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Tus Cursos
        </Typography>
        <Stack spacing={2}>
          {courses.map((c) => (
            <CourseCard key={c.title} {...c} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
