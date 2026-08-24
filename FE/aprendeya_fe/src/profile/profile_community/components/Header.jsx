import { Box, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import CreateTopicModal from "./CreateTopicModal";
import { fontMono } from "../../../theme/theme";

export default function Header({ reloadTopics }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "flex-end" }}
      spacing={4}
      mb={3.5}
    >
      <Box sx={{ display: "grid", gap: 1.25 }}>
        <Typography
          sx={{
            fontFamily: fontMono,
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "text.secondary",
          }}
        >
          Comunidad
        </Typography>
        <Typography variant="h1" sx={{ fontSize: 34, lineHeight: 1.15 }}>
          Preguntá sin miedo
        </Typography>
        <Typography sx={{ fontSize: 15, color: "text.secondary" }}>
          Realiza tus consultas o comparte tus ideas
        </Typography>
      </Box>

      <Button variant="contained" onClick={handleOpenModal}>
        Crear tema
      </Button>

      <CreateTopicModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        reloadTopics={reloadTopics}
      />
    </Stack>
  );
}
