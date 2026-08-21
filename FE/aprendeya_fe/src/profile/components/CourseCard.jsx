import { Card, CardContent, Typography, Button, Box, LinearProgress } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { fontFamilies } from "../../theme/theme";

export default function CourseCard({ title, status, progress, color = "primary", buttonText }) {
  const enCurso = color === "primary";

  return (
    <Card>
      <CardContent sx={{ p: "22px", display: "grid", gap: "14px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
          <Typography
            sx={{
              fontFamily: fontFamilies.display,
              fontWeight: 600,
              fontSize: "1.125rem",
              letterSpacing: "-0.015em",
            }}
          >
            {title}
          </Typography>
          <Box
            component="span"
            sx={{
              px: "10px",
              py: "5px",
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              bgcolor: (theme) => alpha(theme.palette[color].main, theme.palette.mode === "light" ? 0.12 : 0.18),
              color: `${color}.dark`,
            }}
          >
            {status}
          </Box>
        </Box>

        <Box sx={{ display: "grid", gap: "8px" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography
              sx={{
                fontFamily: fontFamilies.mono,
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: `${color}.dark`,
              }}
            >
              {progress}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} color={color} sx={{ height: "8px" }} />
        </Box>

        <Button variant={enCurso ? "contained" : "outlined"} color={color} sx={!enCurso ? { color: "text.primary", borderColor: "divider" } : undefined}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
