import { Box, Card, CardContent, LinearProgress, Typography } from "@mui/material";
import { fontFamilies } from "../../theme/theme";

export default function GeneralProgress() {
  return (
    <Card>
      <CardContent sx={{ p: "28px", display: "grid", gap: "24px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "20px",
          }}
        >
          <Box sx={{ display: "grid", gap: "6px" }}>
            <Typography
              sx={{
                fontFamily: fontFamilies.display,
                fontWeight: 600,
                fontSize: "1.375rem",
                letterSpacing: "-0.02em",
              }}
            >
              Progreso general
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sigue así, ¡ya casi lo logras!
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: fontFamilies.display,
              fontWeight: 700,
              fontSize: "2.125rem",
              letterSpacing: "-0.03em",
              color: "primary.main",
              whiteSpace: "nowrap",
            }}
          >
            0%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={0} sx={{ height: "10px" }} />
      </CardContent>
    </Card>
  );
}
