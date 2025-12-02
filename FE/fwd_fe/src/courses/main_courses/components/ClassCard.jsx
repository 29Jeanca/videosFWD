import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

export default function ClassCard({ title, created_at, teacher, duration=0, tags = [], thumbnail_img }) {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'box-shadow .3s',
        border: theme => `1px solid ${theme.palette.mode === 'dark' ? '#1f2937' : '#e2e8f0'}`,
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Box
        sx={{
          aspectRatio: '16/9',
          backgroundImage: `url(${thumbnail_img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
        }}
      />
      <CardContent sx={{ pt: 2 }}>
        <Box display="flex" gap={1} mb={1} flexWrap="wrap">
          {tags.map((t, i) => (
            <Chip
              key={i}
              label={t.label}
              size="small"
              sx={{
                height: 24,
                px: 0.75,
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 12,
                bgcolor: t.bg,
                color: t.color,
              }}
            />
          ))}
        </Box>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {formatDate(created_at)} | {teacher} | {duration}
        </Typography>
      </CardContent>
    </Card>
  );
}