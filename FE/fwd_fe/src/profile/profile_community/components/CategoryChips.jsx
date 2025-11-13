import { Stack, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/validate";
export default function CategoryChips() {
   const [categories, setCategories] = useState([]);
  
    useEffect(()=>{
      const fetchCategories = async () => {
        try {
          const response = await getCategories();
          console.log("Discusiones obtenidas:", response);
          setCategories(response);
        } catch (error) {
          console.error("Error al obtener las discusiones:", error);
        }
      }
      fetchCategories();
    },[])
  // const categories = [
  //   // "JavaScript",
  //   // "Diseño UI/UX",
  //   // "Ayuda General",
  //   // "Proyectos",
  //   // "Anuncios",
  // ];

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
          sx={{
            bgcolor: "action.hover",
            fontWeight: 500,
          }}
          clickable
        />
      ))}
    </Stack>
  );
}
