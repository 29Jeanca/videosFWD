// src/profile/components/SavedPosts.jsx
// Sección "Publicaciones guardadas" del perfil — lista lo que el usuario
// guardó desde el botón "Guardar" de un post (ver MainComment.jsx). Reutiliza
// el mismo toggle guardar/quitar (postSaveUnsave) para poder sacar un post
// de la lista sin tener que ir hasta el post.
import { Box, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import { getSavedPostsByUser, postSaveUnsave } from "../services/validate";
import { useNotify } from "../../components/notifications/useNotify";
import { fontFamilies } from "../../theme/theme";

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

export default function SavedPosts() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const notify = useNotify();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const data = await getSavedPostsByUser();
        setSaved(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  const handleUnsave = async (postId) => {
    const response = await postSaveUnsave(postId);
    if (response?.saved === false) {
      setSaved((prev) => prev.filter((row) => row.post !== postId));
      notify.success("Se quitó de guardados.");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "16px",
        p: "26px",
        display: "grid",
        gap: "18px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
        <BookmarksOutlinedIcon sx={{ color: "primary.main" }} />
        <Typography sx={{ fontFamily: fontFamilies.display, fontWeight: 600, fontSize: "1.25rem" }}>
          Publicaciones guardadas
        </Typography>
      </Box>

      {loading ? (
        <Typography color="text.secondary">Cargando...</Typography>
      ) : saved.length === 0 ? (
        <Typography color="text.secondary">
          Todavía no guardaste ninguna publicación. Tocá "Guardar" en cualquier tema de la comunidad para verlo acá.
        </Typography>
      ) : (
        <Box sx={{ display: "grid", gap: "12px" }}>
          {saved.map((row) => (
            <Box
              key={row.id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                p: "16px",
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                cursor: "pointer",
                transition: "border-color 120ms ease, background-color 120ms ease",
                "&:hover": { borderColor: "primary.light", bgcolor: "action.hover" },
              }}
              onClick={() => navigate(`/post/${row.post}`)}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  fontSize: 12,
                  fontWeight: 600,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.14 : 0.18),
                  color: "primary.main",
                }}
              >
                {getInitials(row.post_anonymous ? "Anónimo" : row.post_user_name)}
              </Box>

              <Box sx={{ flex: 1, minWidth: 0, display: "grid", gap: "4px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  {row.post_category_name && (
                    <Chip
                      label={row.post_category_name}
                      size="small"
                      sx={{ height: 22, fontSize: 11, fontWeight: 600, bgcolor: "action.hover", color: "text.secondary" }}
                    />
                  )}
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: "0.9375rem" }}>{row.post_title}</Typography>
                <Typography
                  sx={{
                    fontSize: "0.8125rem",
                    color: "text.secondary",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {row.post_content}
                </Typography>
              </Box>

              <Tooltip title="Quitar de guardados">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnsave(row.post);
                  }}
                >
                  <BookmarkRemoveOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
