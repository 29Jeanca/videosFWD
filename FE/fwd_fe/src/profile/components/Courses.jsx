import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import CourseCard from "./CourseCard";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../courses/main_courses/services/validate";
export default function Courses() {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    const getLengthCourses = async() =>{
      try {
         const response = await getCourses()
          setCourses(response)
        } catch (error) {
          console.error(error);
      }
    }
    getLengthCourses()
  },[])
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
          <Typography variant="body2" color="text.secondary">
            Hay {courses.length} clase(s) inscrita(s)
          </Typography>

          
        </Stack>
      </CardContent>
    </Card>
  );
}
