import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import CourseCard from "./CourseCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Courses() {
  const [courses] = useState([])
  const navigate = useNavigate();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Tus Clases
        </Typography>
        <Stack spacing={2}>
          {courses.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Aún no hay clases
            </Typography>
          )}
          <Button
            onClick={() => navigate('/clases')}
          variant="contained" color="primary" sx={{ alignSelf: 'flex-start' }}>
            Explorar Clases
          </Button>
          {courses.map((c) => (
            <CourseCard key={c.title} {...c} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
