import { Stack, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/validate";
export default function CategoryChips({ clickedCategory, valueCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error al obtener las categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        overflowX: "auto",
        pb: 1,
        mb: 3,
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {categories.length === 0 && (
        <Chip
          label="No hay categorías disponibles"
          sx={{
            bgcolor: "action.hover",
            fontWeight: 500,
          }}
        />
      )}

      {categories.map((cat) => (
        <Chip
          key={cat.id}
          label={cat.name}
          onClick={() => valueCategory(cat.id)}
          sx={{
            bgcolor: clickedCategory === cat.id ? "primary.main" : "action.hover",
            color: clickedCategory === cat.id ? "white" : "text.primary",
            fontWeight: 600,
          }}
          clickable
        />
      ))}
    </Stack>
  );
}

