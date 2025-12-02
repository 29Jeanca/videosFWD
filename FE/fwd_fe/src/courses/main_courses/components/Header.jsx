import { AppBar, Toolbar, Typography, IconButton, InputBase, Button, Avatar, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../profile/services/logout';
export default function Header() {
    const navigate = useNavigate();
  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ backdropFilter: 'blur(6px)', bgcolor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box color="primary.main" sx={{ width: 28 }}>
            {/* SVG Logo */}
            <svg viewBox="0 0 48 48" fill="currentColor"><path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"/></svg>
          </Box>
          <Typography variant="h6" fontWeight="bold">FWD</Typography>
        </Box>
        <Box display={{ xs: 'none', md: 'flex' }} gap={3}>
          <Typography variant="body2">Cursos</Typography>
          <Typography
              onClick={() => navigate('/perfil')}
                sx={{ cursor: 'pointer' }}
          variant="body2" color="text.secondary">Perfil</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            onClick={()=>{
                logoutUser()
            }}
          variant="contained" color="primary">Cerrar Sesión</Button>
          <Avatar 
            onClick={() => navigate('/perfil')}
            sx={{ cursor: 'pointer' }}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe0RusU0LPxQd_ESPxJujY8JXLaOvCxikv59SjHbj_Y9RML90Zg6OX-KgqaniHq-h5ZqBz1Q3wi-2EhOiIg75cujsaIJU9DPt-2JHxVNDRueGObZnCFgWdqHjFXHeXEZdTGc0ZBFZarXkma5YC08YvOSms_qiW8tuOWqkTwhZSA8PQr_6YXYewMQde6nelnEiqKgeL4aK_a3MuHkJpo4tW-rrnEG2kFvYZ_ihG9lSRSQRBkgXKJBcxXtvnylGxigg0RYuBlX671YUF" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}