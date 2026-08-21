import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import CourseCard from "./CourseCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses] = useState([]);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "grid", gap: "16px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Typography variant="h4">Mis clases</Typography>
        <Button
          onClick={() => navigate("/clases")}
          sx={{ p: 0, minWidth: "auto", minHeight: "auto", fontSize: "0.875rem" }}
        >
          Ver catálogo
        </Button>
      </Box>

      {courses.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Aún no hay clases
            </Typography>
            <Button
              onClick={() => navigate("/clases")}
              variant="contained"
              color="primary"
              sx={{ alignSelf: "flex-start" }}
            >
              Explorar clases
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: "16px",
          }}
        >
          {courses.map((c) => (
            <CourseCard key={c.title} {...c} />
          ))}
        </Box>
      )}
    </Box>
  );
}
