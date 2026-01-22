import { Container, Grid, Typography, Drawer, IconButton, Box } from '@mui/material';
import Header from '../components/Header';
import SidebarFilters from '../components/SidebarFilters';
import ClassesGrid from '../components/ClassesGrid';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { getCourses } from '../services/validate';

export default function Courses() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();

        const formattedCourses = response.map(course => ({
          ...course,
          tags: course.tags.map(tag => ({
            label: tag,
            bg: '#E0F7FA',
            color: '#006064'
          }))
        }));

        setCourses(formattedCourses);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} display={{ xs: 'block', lg: 'none' }}>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12} lg={4} xl={3} display={{ xs: 'none', lg: 'block' }}>
            <Box sx={{ position: 'sticky', top: 96 }}>
              <SidebarFilters />
            </Box>
          </Grid>

          <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            <Box sx={{ width: 300, p: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <SidebarFilters />
            </Box>
          </Drawer>

          <Grid item xs={12} lg={8} xl={9}>
            <Typography variant="h4" fontWeight="bold">
              Biblioteca de Clases
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1} mb={3}>
              Explora todas las clases disponibles
            </Typography>
            <ClassesGrid classes={courses} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
