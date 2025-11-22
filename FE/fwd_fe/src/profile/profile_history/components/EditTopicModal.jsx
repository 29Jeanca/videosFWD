import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { editPost } from "../../services/validate";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CategoryChips from "../../profile_community/components/CategoryChips";

export default function EditTopicModal({ open, onClose, reloadTopics,existingTopic }) {
  const [title, setTitle] = useState(existingTopic ? existingTopic.title : "");
  const [content, setContent] = useState(existingTopic ? existingTopic.content : "");
  const [category, setCategory] = useState(existingTopic ? existingTopic.category : null);
  const [anonymous, setAnonymous] = useState(existingTopic ? existingTopic.anonymous : false);

  const handleCategorySelect = (catId) => {
    setCategory(catId);
  };

  const editTopic = async () => {
    const newTopic = {
      title,
      content,
      category,
      anonymous,
    };

    const editedTopic = await editPost(existingTopic.id,newTopic);
    console.log(editedTopic);
    onClose();
    
    if (reloadTopics) reloadTopics();
  };

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
      
      <FormControlLabel control={<Checkbox checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />} label="Anónimo" />
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancelar</Button>

        <Button
          variant="contained"
          disabled={!title.trim() || !content.trim() || !category}
          onClick={editTopic}
        >
          Publicar Tema
        </Button>
      </DialogActions>
    </Dialog>
  );
}
