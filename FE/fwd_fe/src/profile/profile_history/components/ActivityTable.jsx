import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import EditTopicModal from "./EditTopicModal";
import DeleteModal from "./DeleteModal";
import { Delete } from "@mui/icons-material";
import { deletePost } from "../../services/validate";

export default function ActivityTable({ info, showEdit, reloadInfo }) {
  const [showModalPost, setShowModalPost] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const formaterDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const deleteInfo = async (id) => {
    const response = await deletePost(id);
    console.log(response);
    return response;
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell sx={{ fontSize: 12, textTransform: "uppercase" }}>
                <b>Título</b>
              </TableCell>
              <TableCell sx={{ fontSize: 12, textTransform: "uppercase" }}>
                <b>Fecha</b>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          {info.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay actividad reciente.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          <TableBody>
            {info.map((row) => (
              <TableRow key={row.id} hover sx={{ transition: "0.2s" }}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "success.light",
                        color: "success.main",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <DescriptionIcon fontSize="small" />
                    </Box>

                    <Box>
                      <Typography fontWeight={600}>
                        <b>{row.title}</b>
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {row.category_name ? (
                          <>
                            <b>Publicado en:</b> {row.category_name}
                          </>
                        ) : row.post_comment ? (
                          <>
                            <b>Comentaste:</b> "{row.content}" en el post:{" "}
                            <b>{row.post_comment}</b>
                          </>
                        ) : row.post_title ? (
                          <>
                            <b>Like en:</b> {row.post_title}
                          </>
                        ) : (
                          ""
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    <b>{formaterDate(row.created_at)}</b>
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <IconButton>
                    {showEdit && (
                      <EditIcon
                        onClick={() => {
                          setShowModalPost(true);
                          setSelectedTopic(row);
                        }}
                        fontSize="small"
                      />
                    )}
                  </IconButton>

                  <IconButton>
                    <Delete
                      fontSize="small"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedTopic(row);
                        reloadInfo();
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        borderTop="1px solid"
        borderColor="divider"
      >
        {showDeleteModal && (
          <DeleteModal
            open={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={() => {
              setShowDeleteModal(false);
              setConfirmDelete(true);
              deleteInfo(selectedTopic.id).then(() => {
                reloadInfo();
              });
            }}
          />
        )}

        {showModalPost && (
          <EditTopicModal
            open={showModalPost}
            onClose={() => {
              setShowModalPost(false);
              reloadInfo();
            }}
            existingTopic={selectedTopic}
          />
        )}

        <Box display="flex" gap={1}>
          <Button variant="outlined">Anterior</Button>
          <Button variant="outlined">Siguiente</Button>
        </Box>
      </Box>
    </>
  );
}
