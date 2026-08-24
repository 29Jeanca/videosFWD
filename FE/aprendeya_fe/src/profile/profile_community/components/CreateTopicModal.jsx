import { useState } from "react";
import { Dialog, DialogContent, DialogActions, TextField, Typography, Button, Box, Switch } from "@mui/material";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CategoryChips from "./CategoryChips";
import { newPost } from "../../services/validate";
import DialogTopAccent from "../../../components/dialogs/DialogTopAccent";
import DialogHeader from "../../../components/dialogs/DialogHeader";
import { useNotify } from "../../../components/notifications/useNotify";

export default function CreateTopicModal({ open, onClose, reloadTopics }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const notify = useNotify();

  const handleCategorySelect = (catId) => {
    setCategory(catId);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory(null);
    setAnonymous(false);
  };

  const postTopic = async () => {
    const newTopic = {
      title: title.trim(),
      content: content.trim(),
      category,
      anonymous,
    };

    try {
      setLoading(true);
      const response = await newPost(newTopic);
      if (!response || response.error) {
        notify.error("No se pudo publicar el tema.");
        return;
      }
      resetForm();
      onClose();
      notify.success("Tema publicado.");
      if (reloadTopics) reloadTopics();
    } catch (error) {
      console.error("Error al publicar el tema:", error);
      notify.error("No se pudo publicar el tema.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: "20px", overflow: "hidden" } }}
    >
      <DialogTopAccent />
      <DialogHeader
        icon={<ForumOutlinedIcon />}
        title="Crear un nuevo tema"
        subtitle="Compartí tu duda o aporte con el resto de la comunidad."
        onClose={handleClose}
      />

      <DialogContent sx={{ px: 3, pt: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>
        <CategoryChips clickedCategory={category} valueCategory={handleCategorySelect} />

        <TextField
          fullWidth
          label="Título del tema"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={6}
          label="Contenido del mensaje"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2.5,
          }}
        >
          <Box>
            <Typography variant="body2" fontWeight={600}>
              Publicar como anónimo
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Tu nombre no va a aparecer en el tema.
            </Typography>
          </Box>
          <Switch
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            inputProps={{ "aria-label": "Publicar como anónimo" }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Button onClick={handleClose} variant="outlined" disabled={loading}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          startIcon={<SendRoundedIcon fontSize="small" />}
          disabled={loading || !title.trim() || !content.trim() || category === null}
          onClick={postTopic}
        >
          {loading ? "Publicando..." : "Publicar tema"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
