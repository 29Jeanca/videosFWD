import { Box, Typography } from "@mui/material";
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
  }, [postId, reload]);

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h3" sx={{ fontSize: "20px" }}>
        {comments.length} respuestas
      </Typography>

      {comments.length === 0 && (
        <Typography sx={{ color: "text.secondary" }}>
          Aún no hay respuestas. Sé el primero en responder.
        </Typography>
      )}

      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </Box>
  );
}
