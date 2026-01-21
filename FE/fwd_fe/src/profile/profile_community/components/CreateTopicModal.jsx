import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CategoryChips from "./CategoryChips";
import { newPost } from "../../services/validate";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function CreateTopicModal({ open, onClose, reloadTopics }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

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
      anonymous
    };

    try {
      setLoading(true);
      await newPost(newTopic);
      resetForm();
      onClose();
      if (reloadTopics) reloadTopics();
    } catch (error) {
      console.error("Error al publicar el tema:", error);
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
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "background.paper"
        }
      }}
    >
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Crear un Nuevo Tema en el Foro de Comunidad
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <CategoryChips
          clickedCategory={category}
          valueCategory={handleCategorySelect}
        />

        <TextField
          fullWidth
          label="Título del Tema"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          rows={6}
          label="Contenido del Mensaje"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
          }
          label="Anónimo"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" disabled={loading}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          disabled={
            loading ||
            !title.trim() ||
            !content.trim() ||
            category === null
          }
          onClick={postTopic}
        >
          {loading ? "Publicando..." : "Publicar Tema"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
