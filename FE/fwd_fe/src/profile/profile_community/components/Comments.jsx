import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useEffect, useState } from "react";
import { getPostComments } from "../../services/validate";

export default function Comments({postId}) {
  const [comments, setComments] = useState([])

  useEffect(()=>{
    const fetchComments = async () =>{
      try {
        const response = await getPostComments(postId);
        setComments(response);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }
    fetchComments();
  },[postId])
  
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Comentarios ({comments.length})
      </Typography>
      {comments.length === 0 && (
        <Typography variant="body1" color="text.secondary" mb={2}>
          No hay comentarios aún. Sé el primero en comentar.
        </Typography>
      )}
      {comments.map((c) => (
        <Box
          key={c.id}
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar src={c.img} sx={{ width: 48, height: 48 }} />

          <Box flex={1}>
            <Typography fontWeight={600}>{c.user_name}</Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {c.created_at}
            </Typography>

            <Typography mb={2}>{c.content}</Typography>

            <Button
              size="small"
              startIcon={<ReplyIcon fontSize="small" />}
              variant="contained"
              sx={{ bgcolor: "grey.200", color: "text.primary" }}
            >
              Responder
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
