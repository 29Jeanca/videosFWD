import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Button, Stack, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CategoryChips from "./CategoryChips";
import { newPost } from "../../services/validate";

export default function CreateTopicModal({ open, onClose }) {
 const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(null); 

  const handleCategorySelect = (catId) => {
    setCategory(catId);
  };

  const postTopic = async() =>{
    const newTopic = {
        title,
        content,
        category,
    }
    const postedTopic = await newPost(newTopic);
    console.log(postedTopic);
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "background.paper",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Crear un Nuevo Tema en el Foro de Comunidad
        <IconButton onClick={onClose}>
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
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancelar</Button>

        <Button
          variant="contained"
          disabled={!title.trim() || !content.trim() || !category}
          onClick={postTopic}
          
        >
          Publicar Tema
        </Button>
      </DialogActions>
    </Dialog>
  );
}