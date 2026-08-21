import { Tabs, Tab, Box, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/validate";

export default function CategoryChips({ clickedCategory, valueCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (_, newValue) => {
    valueCategory(newValue);
  };

  const sinCategorias = !loading && categories.length === 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="body2" fontWeight={600} mb={1}>
        Categoría
      </Typography>

      {/* Antes esto reservaba la altura completa de un <Tabs> vacío (sin
          categorías todavía cargadas, variant="scrollable" incluido) — un
          espacio en blanco fijo dentro del modal aunque no hubiera nada que
          mostrar. Ahora solo ocupa espacio real: un esqueleto angosto
          mientras carga, y un aviso breve si de verdad no hay categorías. */}
      {loading ? (
        <Box sx={{ display: "flex", gap: 1.2 }}>
          {[88, 104, 76].map((w, i) => (
            <Skeleton key={i} variant="rounded" width={w} height={36} sx={{ borderRadius: "18px" }} />
          ))}
        </Box>
      ) : sinCategorias ? (
        <Typography variant="body2" color="text.secondary">
          No hay categorías disponibles por ahora.
        </Typography>
      ) : (
      <Tabs
        value={clickedCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          width: "100%",
          minHeight: 36,

          "& .MuiTabs-flexContainer": {
            gap: 1.2,
          },

          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            minHeight: "36px",
            borderRadius: "18px",
            padding: "6px 14px",
            minWidth: "auto",
            backgroundColor: "action.hover",
            color: "text.primary",

            "&:hover": {
              backgroundColor: "action.selected",
            },
          },

          "& .Mui-selected": {
            backgroundColor: theme => `${theme.palette.primary.dark} !important`,
            color: "white !important",
          },
        }}
      >
        {categories.map((cat) => (
          <Tab
            key={cat.id}
            label={cat.name}
            value={cat.id}
          />
        ))}
      </Tabs>
      )}
    </Box>
  );
}
