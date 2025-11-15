import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

export default function Comments() {
  const lista = [
    {
      id: 1,
      nombre: "Ana Gómez",
      tiempo: "hace 1 hora",
      comentario:
        "¡Sí! Me pasó exactamente lo mismo. El problema era que estaba mutando el estado directamente...",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyOAtPzjQPds_fdNz5d9TZTyH8TXbhJgN27RjlJP2fvkqWJbbr9p8zAXZvHRvi58erMKgi51nw11MJDhEsVomPhrv-dtr_9JlPjsxdclHvNHKZSV3EiP346Xj6xMJTvAwuj5ZRUnoiLtQtsN44dhiNEg6PsANZ0nb87Lsx3LAzz6Py72qyAc-yoqSXwQ6QpjAif0JWC7_lNKU5qEb3_zLt9Vn0KYGynpzzsF2NFOucM0Xsb_24I3UCDiLNoLTZok6Smg-894HpxT6O",
    },
    {
      id: 2,
      nombre: "Jorge Torres",
      tiempo: "hace 45 minutos",
      comentario:
        "Además de lo que dice Ana, revisa si estás pasando el estado como una prop con el mismo nombre...",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmxhYW3-O11mLIEe6ysO-wwE1NoQU81hPzf__7eLigJZWsDU_bwGZR4Fz2w0PEU8zUL9kr4KsqSq433yoZ-qJcDTCs13BJQ1GZehurXf_YSyy3YSgUoKyRtfD5LhQpmGFW1T1GBL6fyJ_Y65f9xWaWG8eQ-F7l8493V5DpEy1uAHG2THCW7P1QP5TN7EgqR-_Zw5KtstTg6I2_H2MmTQF3KYz3upKdeLoyffgU9cOZK5Dm2yXteizaipelIcdvrfQ7ne1uu6PuH9sI",
    },
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Comentarios ({lista.length})
      </Typography>

      {lista.map((c) => (
        <Box
          key={c.id}
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar src={c.img} sx={{ width: 48, height: 48 }} />

          <Box flex={1}>
            <Typography fontWeight={600}>{c.nombre}</Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {c.tiempo}
            </Typography>

            <Typography mb={2}>{c.comentario}</Typography>

            <Button
              size="small"
              startIcon={<ReplyIcon fontSize="small" />}
              variant="contained"
              sx={{ bgcolor: "grey.200", color: "text.primary" }}
            >
              Responder
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
