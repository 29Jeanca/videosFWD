import { Box, Avatar, Typography, Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useEffect, useState } from "react";
import { getPostComments } from "../../services/validate";
import CommentItem from "./CommentItem";

export default function Comments({ postId, reload }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await getPostComments(postId);
      setComments(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, reload]);  // ⬅️ recarga cuando se agrega un comentario

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
        <CommentItem key={c.id} comment={c} />
      ))}
    </Box>
  );
}
