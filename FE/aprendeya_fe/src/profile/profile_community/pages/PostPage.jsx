import { Box } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MainComment from "../components/MainComment";
import Comments from "../components/Comments";
import NewComment from "../components/NewComment";
import AppHeader from "../../../components/AppHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [reloadComments, setReloadComments] = useState(false);

  return (
    <>
      <AppHeader />
      <Box sx={{ maxWidth: 880, mx: "auto", px: { xs: 2, md: 4 }, pt: 5, pb: 16 }}>
        <Box
          component="button"
          onClick={() => navigate("/comunidad")}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            border: "none",
            background: "none",
            p: 0,
            mb: 2.75,
            fontSize: 14,
            fontWeight: 600,
            color: "primary.main",
            cursor: "pointer",
            "&:hover": { color: "primary.dark" },
          }}
        >
          <ArrowBackRoundedIcon sx={{ fontSize: 16 }} />
          Volver a comunidad
        </Box>

        <MainComment postId={postId} />

        <Box sx={{ display: "grid", gap: 2, mt: 3.5 }}>
          <Comments postId={postId} reload={reloadComments} />
          <NewComment onCommentAdded={() => setReloadComments(!reloadComments)} />
        </Box>
      </Box>
    </>
  );
}
