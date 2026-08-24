import { Card, CardContent, Avatar, Typography, Stack, Chip } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";
import { useRelativeTime } from "../hooks/UseRelativeTime";

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// Ciclo determinístico de 3 combinaciones de color para el avatar de
// iniciales, basado en el nombre del autor (no hay foto real de perfil en
// los datos del post, así que no hay nada que "perder" al reemplazar el
// avatar-imagen fijo que había antes por iniciales, como en el mockup).
function paletteIndex(name = "") {
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return sum % 3;
}

export default function DiscussionCard({
  user,
  createdAt,
  title,
  tag,
  content,
  comments,
  likes,
  onLike,
  onClick,
}) {
  const theme = useTheme();
  const time = useRelativeTime(createdAt);
  const unanswered = comments === 0;

  const avatarPalettes = [
    { bg: alpha(theme.palette.primary.main, 0.14), color: theme.palette.primary.dark },
    { bg: alpha(theme.palette.secondary.main, 0.14), color: theme.palette.secondary.dark },
    { bg: alpha(theme.palette.text.secondary, 0.14), color: theme.palette.text.secondary },
  ];
  const avatarStyle = avatarPalettes[paletteIndex(user)];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent sx={{ p: 2.75, display: "grid", gap: 1.5 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {tag && (
            <Chip
              label={tag}
              size="small"
              sx={{
                height: 22,
                borderRadius: "8px",
                bgcolor: "action.hover",
                color: "text.secondary",
                fontWeight: 600,
                fontSize: 12,
              }}
            />
          )}
          {unanswered && (
            <Chip
              label="Sin responder"
              size="small"
              sx={{
                height: 22,
                borderRadius: "8px",
                bgcolor: alpha(theme.palette.warning.main, 0.16),
                color: "warning.dark",
                fontWeight: 600,
                fontSize: 12,
              }}
            />
          )}
        </Stack>

        <Typography
          variant="h4"
          onClick={onClick}
          sx={{
            fontSize: 20,
            cursor: "pointer",
            color: "text.primary",
            "&:hover": { color: "primary.dark" },
          }}
        >
          {title}
        </Typography>

        {content && (
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {content}
          </Typography>
        )}

        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          rowGap={1}
          columnGap={2}
          sx={{ pt: 0.5 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: 11,
                fontWeight: 600,
                bgcolor: avatarStyle.bg,
                color: avatarStyle.color,
              }}
            >
              {getInitials(user)}
            </Avatar>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: "text.primary" }}>
              {user}
            </Typography>
          </Stack>

          <Typography sx={{ fontSize: 13, color: "text.disabled" }}>{time}</Typography>

          <Typography sx={{ fontSize: 13, color: "text.disabled" }}>
            {comments} {comments === 1 ? "respuesta" : "respuestas"}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            sx={{ cursor: "pointer" }}
          >
            <ThumbUp sx={{ fontSize: 15, color: "text.disabled" }} />
            <Typography sx={{ fontSize: 13, color: "text.disabled" }}>{likes}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
