import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";

export default function GeneralProgress() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Progreso General
        </Typography>
        <Box mb={1} display="flex" justifyContent="space-between">
          <Typography>Progreso Total</Typography>
          <Typography fontWeight={700} color="primary.main">
            65%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={65}
          sx={{ height: 8, borderRadius: 5, mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          Sigue así, ¡ya casi lo logras!
        </Typography>
      </CardContent>
    </Card>
  );
}
