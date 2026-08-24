import { Box, Avatar, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useRelativeTime } from "../hooks/useRelativeTime";

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

export default function CommentItem({ comment }) {
  const relative = useRelativeTime(comment.created_at);
  const displayName = comment.anonymous ? "Participante Anónimo" : comment.user_name;

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "16px",
        p: 3,
        display: "grid",
        gap: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          src={comment.img}
          sx={{
            width: 34,
            height: 34,
            bgcolor: (theme) => alpha(theme.palette.secondary.main, theme.palette.mode === "light" ? 0.14 : 0.18),
            color: "secondary.main",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {getInitials(displayName)}
        </Avatar>
        <Box sx={{ display: "grid", gap: 0.25 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{displayName}</Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{relative}</Typography>
        </Box>
      </Box>

      <Typography sx={{ fontSize: 15, lineHeight: 1.7, color: "text.primary" }}>
        {comment.content}
      </Typography>
    </Box>
  );
}
