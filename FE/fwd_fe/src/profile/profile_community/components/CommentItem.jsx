import { Box, Avatar, Typography, Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useRelativeTime } from "../hooks/useRelativeTime";

export default function CommentItem({ comment }) {
  const relative = useRelativeTime(comment.created_at);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        p: { xs: 1.5, md: 2 },
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Avatar src={comment.img} sx={{ width: 48, height: 48 }} />

      <Box flex={1}>
        <Typography fontWeight={600}>{comment.user_name}</Typography>

        <Typography variant="body2" color="text.secondary" mb={1}>
          {relative}
        </Typography>

        <Typography mb={2}>{comment.content}</Typography>

        <Button
          size="small"
          startIcon={<ReplyIcon fontSize="small" />}
          sx={{
            bgcolor: "grey.200",
            color: "text.primary",
            textTransform: "none",
          }}
        >
          Responder
        </Button>
      </Box>
    </Box>
  );
}
