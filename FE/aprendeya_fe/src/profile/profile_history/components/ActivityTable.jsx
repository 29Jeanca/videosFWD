import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import EditTopicModal from "./EditTopicModal";
import DeleteModal from "./DeleteModal";
import {
  deleteComment,
  deletePost,
  editComment,
  postLikeUnlike,
} from "../../services/validate";
import EditCommentModal from "./EditCommentModal";

// Mapea el tipo de fila a la copia/color de la insignia "Tipo" del mockup.
// El mockup incluye un tercer tipo "Entrega" (verde, submission) que no existe
// en la API actual (solo posts-by-user / comments-by-user / likes-by-user), así
// que ese lugar visual lo ocupa "Me gusta" con su propio color en vez de
// inventar un tipo de entrega que no está soportado por el backend.
const typeBadge = (row) => {
  if (row.is_post) return { label: "Tema", color: "primary" };
  if (row.is_comment) return { label: "Comentario", color: "default" };
  if (row.is_like) return { label: "Me gusta", color: "secondary" };
  return { label: "—", color: "default" };
};

const rowDetail = (row) => {
  if (row.is_post) return row.title;
  if (row.is_comment) return `"${row.content}"`;
  if (row.is_like) return row.post_title;
  return "";
};

const rowCourse = (row) => {
  if (row.is_post) return row.category_name || "—";
  if (row.is_comment) return row.post_comment || "—";
  return "—";
};

export default function ActivityTable({ info, showEdit, reloadInfo }) {
  const [showModalPost, setShowModalPost] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const formaterDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const deleteInfo = async (id) => {
    const response = await deletePost(id);
    console.log(response);
    return response;
  };

  const editCommentPost = async (id, newText) => {
    const response = await editComment(id, newText);
    console.log(response);
    return response;
  };

  const deleteCommentPost = async (id) => {
    const response = await deleteComment(id);
    console.log(response);
    return response;
  };

  const unlikePost = async (id) => {
    const response = await postLikeUnlike(id);
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
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 120 }}>Tipo</TableCell>
              <TableCell>Detalle</TableCell>
              <TableCell sx={{ width: 150 }}>Curso</TableCell>
              <TableCell sx={{ width: 130 }}>Fecha</TableCell>
              <TableCell sx={{ width: 110 }} align="right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          {info.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay actividad reciente.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          <TableBody>
            {info.map((row) => {
              const badge = typeBadge(row);
              return (
                <TableRow key={row.id} hover sx={{ transition: "0.2s" }}>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        px: 1.25,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: 12,
                        fontWeight: 600,
                        bgcolor:
                          badge.color === "default"
                            ? "action.hover"
                            : (theme) => alpha(theme.palette[badge.color].main, 0.14),
                        color:
                          badge.color === "default"
                            ? "text.secondary"
                            : `${badge.color}.dark`,
                      }}
                    >
                      {badge.label}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" fontWeight={500} color="text.primary">
                      {rowDetail(row)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {rowCourse(row)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formaterDate(row.created_at)}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Box display="flex" gap={1.5} justifyContent="flex-end" fontSize={13} fontWeight={600}>
                      {showEdit && (row.is_post || row.is_comment) && (
                        <Box
                          component="span"
                          role="button"
                          tabIndex={0}
                          sx={{ color: "primary.main", cursor: "pointer" }}
                          onClick={() => {
                            if (row.is_post) {
                              setShowModalPost(true);
                              setSelectedTopic(row);
                            }
                            if (row.is_comment) {
                              setShowEditCommentModal(true);
                              setSelectedTopic(row);
                            }
                          }}
                        >
                          Editar
                        </Box>
                      )}

                      <Box
                        component="span"
                        role="button"
                        tabIndex={0}
                        sx={{ color: "error.main", cursor: "pointer" }}
                        onClick={() => {
                          if (row.is_post) {
                            setShowDeleteModal(true);
                            setSelectedTopic(row);
                            reloadInfo();
                          }
                          if (row.is_like) {
                            setShowDeleteModal(true);
                            setSelectedTopic(row);
                            reloadInfo();
                          }
                          if (row.is_comment) {
                            setShowDeleteModal(true);
                            setSelectedTopic(row);
                            reloadInfo();
                          }
                        }}
                      >
                        Borrar
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
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
              if (selectedTopic.is_post) {
                deleteInfo(selectedTopic.id).then(() => {
                  reloadInfo();
                });
                return;
              }
              if (selectedTopic.is_like) {
                unlikePost(selectedTopic.post).then(() => {
                  reloadInfo();
                });
                return;
              }
              if (selectedTopic.is_comment) {
                deleteCommentPost(selectedTopic.id).then(() => {
                  reloadInfo();
                });
                return;
              }
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

        {showEditCommentModal && (
          <EditCommentModal
            open={showEditCommentModal}
            onClose={() => {
              setShowEditCommentModal(false);
              reloadInfo();
            }}
            onSave={(newText) => {
              editCommentPost(selectedTopic.id, newText).then(() => {
                setShowEditCommentModal(false);
                reloadInfo();
              });
            }}
            initialText={selectedTopic ? selectedTopic.content : ""}
          />
        )}

        <Typography variant="caption" color="text.secondary">
          {info.length} {info.length === 1 ? "registro" : "registros"}
        </Typography>

        <Box display="flex" gap={0.75}>
          <Box
            sx={{
              height: 34,
              minWidth: 34,
              px: 1.25,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              display: "inline-grid",
              placeItems: "center",
              color: "text.secondary",
              cursor: "pointer",
            }}
          >
            <ChevronLeftIcon fontSize="small" />
          </Box>
          <Box
            sx={{
              height: 34,
              minWidth: 34,
              borderRadius: 1,
              display: "inline-grid",
              placeItems: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            1
          </Box>
          <Box
            sx={{
              height: 34,
              minWidth: 34,
              px: 1.25,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              display: "inline-grid",
              placeItems: "center",
              color: "text.secondary",
              cursor: "pointer",
            }}
          >
            <ChevronRightIcon fontSize="small" />
          </Box>
        </Box>
      </Box>
    </>
  );
}
