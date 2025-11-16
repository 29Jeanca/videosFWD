import { Box, Avatar, Typography, Chip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import { getPostById, postLikeUnlike, getLikedPosts } from "../../services/validate";
import { useNavigate } from "react-router-dom";

export default function MainComment({ postId }) {
  const [contentPost, setContentPost] = useState([]);
  const [likesByPost, setLikesByPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const data = await getPostById(postId);
        if (data.detail === "Authentication credentials were not provided.") {
          navigate("/");
          return;
        }
        setContentPost(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostDetails();
  }, [postId]);

  const formaterDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Header usuario */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Avatar
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfmNIZwkNvYKkxc5MShpp3-UzVcELEXVFk9ovihIHFsEQ16u52BQyISU8LLcFmp3Glq3Sef-x9ji5alYOG2TkZG4ioDh6VcpbLIEYE9XEHIgxLkV3H7lU08CTmpYMIcMXpupJvZRQSe-lf0oIr7ooA_8Z3vRmhDwDPFUhYREZxRNGR3tQWj6vzJiRunvnM6KTUl7LwTM9nwIMV-OHGEOZPMEA1YIP_h1q68gcmwaDbNUa7MpBTzfr7BZtcwKiCnTqR0j45yNSR6foz"
          sx={{ width: 56, height: 56 }}
        />

        <Box>
          <Typography fontWeight={600}>
            {contentPost.anonymous ? "Participante Anónimo" : contentPost.user_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formaterDate(contentPost.created_at)}
          </Typography>
        </Box>
      </Box>

      {/* Título */}
      <Typography
        variant="h4"
        fontWeight={700}
        mb={2}
        sx={{ fontSize: { xs: "1.6rem", md: "2.2rem" } }}
      >
        {contentPost.title}
      </Typography>

      <Typography mb={2}>{contentPost.content}</Typography>

      {/* Pie con chips y like */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mt: 3,
        }}
      >
        <Chip label={contentPost.category_name} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ThumbUpIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={async () => {
              const response = await postLikeUnlike(contentPost.id);

              if (response?.detail === "Authentication credentials were not provided.") {
                navigate("/");
                return;
              }

              const res = await getLikedPosts(contentPost.id);
              setLikesByPost((prev) => ({
                ...prev,
                [contentPost.id]: res.length,
              }));
            }}
          />
          <Typography>{likesByPost[contentPost.id] || 0}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
