import { Container, Grid, Typography, Drawer, IconButton, Box } from '@mui/material';
import Header from '../components/Header';
import SidebarFilters from '../components/SidebarFilters';
import ClassesGrid from '../components/ClassesGrid';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const classesData = [
    {
        title: 'Introducción a React',
        date: '10 de Marzo, 2024',
        instructor: 'Juan Pérez',
        duration: '2h 30m',
        tags: [
            { label: 'React', bg: '#E0F7FA', color: '#006064' },
            { label: 'Front-end', bg: '#E8F5E9', color: '#1B5E20' },
        ],  
        image: 'https://source.unsplash.com/random/800x450?react',
    },
    {
        title: 'Node.js para Principiantes',
        date: '15 de Marzo, 2024',
        instructor: 'María Gómez',
        duration: '3h 15m',
        tags: [
            { label: 'Node.js', bg: '#FFF3E0', color: '#E65100' },
            { label: 'Back-end', bg: '#EDE7F6', color: '#4A148C' },
        ],
        image: 'https://source.unsplash.com/random/800x450?nodejs',
    }
];

export default function Courses() {
  const [open, setOpen] = useState(false);

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

          {/* Contenido principal */}
          <Grid item xs={12} lg={8} xl={9}>
            <Typography variant="h4" fontWeight="bold">
              Biblioteca de Clases
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1} mb={3}>
              Explora todas las clases disponibles
            </Typography>
            <ClassesGrid classes={classesData} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}