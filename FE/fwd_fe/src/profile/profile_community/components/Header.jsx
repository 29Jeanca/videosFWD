import { Box, Typography, Button, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import CreateTopicModal from "./CreateTopicModal";

export default function Header({ reloadTopics }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      mb={4}
    >
      <Box>
        <Typography variant="h4" fontWeight={900}>
          Comunidad Forward Costa Rica
        </Typography>
        <Typography color="text.secondary">
          Realiza tus consultas o comparte tus ideas
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ fontWeight: "bold" }}
          onClick={handleOpenModal}
        >
          Crear Nuevo Tema
        </Button>
      </Stack>

      {/* 🔥 4. Pasar reloadTopics al modal */}
      <CreateTopicModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        reloadTopics={reloadTopics} 
      />
    </Stack>
  );
}
