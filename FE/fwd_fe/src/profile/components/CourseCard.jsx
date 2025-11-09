import { Card, CardContent, Typography, Button, Box, LinearProgress } from "@mui/material";

export default function CourseCard({ title, status, progress, color, buttonText }) {
  return (
    <Card sx={{ p: 1 }}>
      <CardContent sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: "center" }}>
        <Box flex={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={600}>{title}</Typography>
            <Typography
              variant="caption"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                bgcolor: `${color}.main`,
                color: `${color}.contrastText`,
              }}
            >
              {status}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2} mt={1}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ flex: 1, height: 6, borderRadius: 5 }}
            />
            <Typography variant="body2" color="text.secondary">
              {progress}%
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ minWidth: 120, px: 2, borderRadius: 2 }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
