import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { postNewComment } from "../../services/validate";

export default function NewComment({ onCommentAdded }) {
  const { postId } = useParams();
  const [content, setContent] = useState("");

  const postComment = async () => {
    if (!content.trim()) return;

    const objComment = {
      post_id: postId,
      content: content,
    };

    try {
      const response = await postNewComment(objComment);
      console.log(response);

      setContent("");

      onCommentAdded();
    } catch (err) {
      console.error("Error al publicar comentario:", err);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "16px",
        p: 2.75,
        display: "grid",
        gap: 1.5,
      }}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Tu respuesta</Typography>

      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        minRows={4}
        placeholder="Contá qué probaste y pegá tu código…"
        sx={{ "& .MuiOutlinedInput-input": { fontSize: 15 } }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
          Markdown y bloques de código soportados
        </Typography>
        <Button onClick={postComment} variant="contained" sx={{ height: 42, px: 2.5 }}>
          Publicar respuesta
        </Button>
      </Box>
    </Box>
  );
}
