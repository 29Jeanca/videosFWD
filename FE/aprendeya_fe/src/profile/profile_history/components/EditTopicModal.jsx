import { useState } from "react";
import { Dialog, DialogContent, DialogActions, TextField, Typography, Button, Box, Switch } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { editPost } from "../../services/validate";
import CategoryChips from "../../profile_community/components/CategoryChips";
import DialogTopAccent from "../../../components/dialogs/DialogTopAccent";
import DialogHeader from "../../../components/dialogs/DialogHeader";

export default function EditTopicModal({ open, onClose, reloadTopics, existingTopic }) {
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

    const editedTopic = await editPost(existingTopic.id, newTopic);
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
      PaperProps={{ sx: { borderRadius: "20px", overflow: "hidden" } }}
    >
      <DialogTopAccent />
      <DialogHeader
        icon={<EditOutlinedIcon />}
        title="Editar tema"
        subtitle="Los cambios se ven al instante para el resto de la comunidad."
        onClose={onClose}
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
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveRoundedIcon fontSize="small" />}
          disabled={!title.trim() || !content.trim() || !category}
          onClick={editTopic}
        >
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
