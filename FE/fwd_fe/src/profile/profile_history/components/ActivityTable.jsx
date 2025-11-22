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


export default function ActivityTable({info,showEdit}) {
    const formaterDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
                Título
              </TableCell>
              <TableCell sx={{ fontSize: 12, textTransform: "uppercase" }}>
                Fecha
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
              <TableRow
                key={row.id}
                hover
                sx={{
                  transition: "0.2s",
                }}
              >
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
                      <Typography fontWeight={600}>{row.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.category_name ? `Publicado en la categoría de ${row.category_name}` :
                        row.post_comment ? `Comentario en el post: ${row.post_comment}` :
                        row.post_title ? `Like en el post: ${row.post_title}` :
                        ''}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formaterDate(row.created_at)}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <IconButton>
                    {showEdit && <EditIcon fontSize="small" />}
                  </IconButton>
                  <IconButton>
                    <DeleteIcon fontSize="small" />
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
        <Typography variant="body2" color="text.secondary">
          {/* Mostrando <b>1</b> a <b>4</b> de <b>12</b> resultados */}
        </Typography>

        <Box display="flex" gap={1}>
          <Box
          >
            <Button variant="outlined" >
            Anterior
            </Button>
          </Box>
          <Box
          >
            <Button variant="outlined" >
            Siguiente
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
