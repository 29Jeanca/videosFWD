import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { brandTokens, fontMono } from '../../../theme/theme';

// NOTA: el mockup (view-clases.txt) modela un catálogo "on demand" con banda de
// categoría + progreso, pero el modelo real de Course (BE/courses/models.py) no
// trae ni "temas/clases", ni nivel, ni progreso de visualización — solo title,
// description, teacher, module, created_at, tags, thumbnail_img. Esta tarjeta
// mapea esos campos reales a los mismos huecos visuales del mockup y deja el
// botón "Empezar" sin onClick (la tarjeta tampoco navegaba a ningún lado antes).
export default function ClassCard({ title, description, created_at, teacher, module, tags = [] }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString('es', options);
  };

  const subtopic = tags[0]?.label;
  const categoryLabel = [module, subtopic].filter(Boolean).join(' / ') || 'curso';
  const metaLine = [module, teacher].filter(Boolean).join(' · ');
  const publishedOn = formatDate(created_at);

  return (
    <Card sx={{ overflow: 'hidden', display: 'grid', alignContent: 'start' }}>
      <Box
        sx={{
          height: 92,
          bgcolor: brandTokens.ink[900],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          px: 2.75,
        }}
      >
        <Typography
          noWrap
          sx={{
            fontFamily: fontMono,
            fontSize: 13,
            color: brandTokens.dark.primary,
          }}
        >
          {categoryLabel}
        </Typography>
        <Box
          sx={{
            flex: 'none',
            px: 1.25,
            py: 0.6,
            borderRadius: '8px',
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            bgcolor: alpha(brandTokens.dark.text, 0.12),
            color: brandTokens.dark.text,
          }}
        >
          On demand
        </Box>
      </Box>

      <CardContent sx={{ p: '22px', display: 'grid', gap: 1.75, '&:last-child': { pb: '22px' } }}>
        <Box sx={{ display: 'grid', gap: 0.75 }}>
          <Typography variant="h4" component="h3" sx={{ fontSize: '20px' }}>
            {title}
          </Typography>
          {metaLine && (
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{metaLine}</Typography>
          )}
        </Box>

        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 0.5 }}>
          <Typography variant="caption">
            {publishedOn ? `Publicado ${publishedOn}` : 'Curso on demand'}
          </Typography>
          <Button variant="outlined" color="inherit" sx={{ minHeight: 40, px: 2.25 }}>
            Empezar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
