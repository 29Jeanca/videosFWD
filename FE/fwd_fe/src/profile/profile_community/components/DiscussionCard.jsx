import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  Chip,
  Button,
  Box,
} from "@mui/material";
import { Forum, ThumbUp } from "@mui/icons-material";
import { useRelativeTime } from "../hooks/useRelativeTime";

export default function DiscussionCard({
  user,
  createdAt,
  title,
  tag,
  comments,
  likes,
  avatar,
  onLike,
  onClick,
}) {
  const time = useRelativeTime(createdAt);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        transition: "0.2s",
        width: "100%",
        cursor: "pointer",
        "&:hover": { boxShadow: 3, borderColor: "primary.main" },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Avatar src={avatar} sx={{ width: 40, height: 40 }} />

          {/* CONTENT */}
          <Stack flex={1} width="100%">
            {/* USER + TIME */}
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {user}
              <Typography component="span" color="text.secondary">
                - {time}
              </Typography>
            </Typography>

            {/* TITLE */}
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                mt: 0.5,
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {title}
            </Typography>

            {/* TAG + STATS */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={2}
              mt={1}
              sx={{ width: "100%" }}
            >
              <Chip label={tag} size="small" />

              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{ flexShrink: 0 }}
              >
                <Forum fontSize="small" />
                <Typography variant="body2">{comments}</Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{ flexShrink: 0 }}
              >
                <ThumbUp
                  fontSize="small"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita abrir el post
                    onLike();
                  }}
                  sx={{ cursor: "pointer" }}
                />
                <Typography variant="body2">{likes}</Typography>
              </Stack>
            </Stack>

            {/* BUTTON */}
            <Button
              size="small"
              sx={{
                mt: 2,
                textTransform: "none",
                alignSelf: { xs: "flex-start", sm: "flex-start" },
              }}
              onClick={onClick}
            >
              Ver Tema Completo
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
