import { Card, CardContent, Typography, Stack } from "@mui/material";
import CourseCard from "./CourseCard";
import { useState } from "react";

export default function Courses() {
  const [courses] = useState([])

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Tus Cursos
        </Typography>
        <Stack spacing={2}>
          {courses.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Aún no hay cursos
            </Typography>
          )}
          {courses.map((c) => (
            <CourseCard key={c.title} {...c} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
