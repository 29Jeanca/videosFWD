import { Box, Avatar, Typography, Chip, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useEffect, useState } from "react";
import {
  getPostById,
  postLikeUnlike,
  getLikedPosts,
  postSaveUnsave,
  getSavedByPost,
  getUserProfile,
} from "../../services/validate";
import { useNavigate } from "react-router-dom";
import { brandTokens, fontMono } from "../../../theme/theme";
import { useNotify } from "../../../components/notifications/useNotify";

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

export default function MainComment({ postId }) {
  const [contentPost, setContentPost] = useState([]);
  const [likesByPost, setLikesByPost] = useState({});
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const notify = useNotify();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const data = await getPostById(postId);

        if (data.detail === "Authentication credentials were not provided.") {
          navigate("/");
          return;
        }
        if (data.error === "Post no encontrado") {
          navigate("*");
          return;
        }

        setContentPost(data);

        const [me, likes, savedRows] = await Promise.all([
          getUserProfile(),
          getLikedPosts(data.id),
          getSavedByPost(data.id),
        ]);

        setLikesByPost((prev) => ({
          ...prev,
          [data.id]: likes.length,
        }));
        setLiked(likes.some((like) => like.user_id === me.id || like.user === me.id));
        setSaved(savedRows.some((row) => row.user === me.id));
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

  // El post es texto plano en la API; los bloques de código se marcan con
  // ```fences``` estilo Markdown (ver hint "Markdown y bloques de código
  // soportados" en el editor de respuesta) y se pintan como caja oscura tipo
  // editor, igual en claro y oscuro — no hay resaltado de sintaxis real, solo
  // monoespaciado (ver docs/HANDOFF.md).
  const renderContent = (text) => {
    if (!text) return null;
    const segments = text.split(/```/g);

    return segments.map((segment, index) => {
      if (!segment.trim()) return null;

      if (index % 2 === 1) {
        return (
          <Box
            key={index}
            component="pre"
            sx={{
              m: 0,
              fontFamily: fontMono,
              fontSize: 14,
              lineHeight: 1.7,
              bgcolor: brandTokens.dark.bg,
              color: brandTokens.dark.text,
              borderRadius: "12px",
              p: 2.25,
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {segment.trim()}
          </Box>
        );
      }

      return (
        <Typography key={index} sx={{ fontSize: 16, lineHeight: 1.7, color: "text.primary", m: 0 }}>
          {segment.trim()}
        </Typography>
      );
    });
  };

  const displayName = contentPost.anonymous ? "Participante Anónimo" : contentPost.user_name;

  return (
    <Box
      component="article"
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "16px",
        p: 4,
        display: "grid",
        gap: 2.5,
      }}
    >
      {contentPost.category_name && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={contentPost.category_name}
            size="small"
            sx={{
              height: "auto",
              px: 0.5,
              py: 0.5,
              borderRadius: "8px",
              bgcolor: "action.hover",
              color: "text.secondary",
              fontSize: 12,
              fontWeight: 600,
            }}
          />
        </Box>
      )}

      <Typography variant="h2" sx={{ fontSize: "30px" }}>
        {contentPost.title}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.14 : 0.18),
            color: "primary.main",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {getInitials(displayName)}
        </Avatar>
        <Box sx={{ display: "grid", gap: 0.25 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{displayName}</Typography>
          <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
            {formaterDate(contentPost.created_at)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "grid", gap: 1.75 }}>{renderContent(contentPost.content)}</Box>

      <Box sx={{ display: "flex", gap: 1.25, pt: 0.5 }}>
        <Button
          variant={liked ? "contained" : "outlined"}
          startIcon={
            liked ? <ThumbUpIcon sx={{ fontSize: 16 }} /> : <ThumbUpOutlinedIcon sx={{ fontSize: 16 }} />
          }
          onClick={async () => {
            const response = await postLikeUnlike(contentPost.id);

            if (response?.detail === "Authentication credentials were not provided.") {
              navigate("/");
              return;
            }

            const nowLiked = response?.message === "Post liked";
            setLiked(nowLiked);
            notify.success(nowLiked ? "Marcado como útil." : "Se quitó de útil.");

            const res = await getLikedPosts(contentPost.id);
            setLikesByPost((prev) => ({
              ...prev,
              [contentPost.id]: res.length,
            }));
          }}
          sx={
            liked
              ? { height: 40, px: 2, fontSize: 14, fontWeight: 600 }
              : {
                  height: 40,
                  px: 2,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "text.primary",
                  borderColor: "divider",
                  "&:hover": { borderColor: "primary.light", bgcolor: "transparent" },
                }
          }
        >
          Útil · {likesByPost[contentPost.id] ?? 0}
        </Button>
        <Button
          variant={saved ? "contained" : "outlined"}
          color={saved ? "secondary" : "primary"}
          startIcon={saved ? <BookmarkIcon sx={{ fontSize: 16 }} /> : <BookmarkBorderIcon sx={{ fontSize: 16 }} />}
          onClick={async () => {
            const response = await postSaveUnsave(contentPost.id);

            if (response?.detail === "Authentication credentials were not provided.") {
              navigate("/");
              return;
            }

            setSaved(Boolean(response?.saved));
            notify.success(response?.saved ? "Publicación guardada." : "Se quitó de guardados.");
          }}
          sx={
            saved
              ? { height: 40, px: 2, fontSize: 14, fontWeight: 600 }
              : {
                  height: 40,
                  px: 2,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "text.primary",
                  borderColor: "divider",
                  "&:hover": { borderColor: "primary.light", bgcolor: "transparent" },
                }
          }
        >
          {saved ? "Guardado" : "Guardar"}
        </Button>
      </Box>
    </Box>
  );
}
