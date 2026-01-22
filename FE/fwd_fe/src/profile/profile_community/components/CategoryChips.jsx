import { Tabs, Tab, Box } from "@mui/material";
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
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (_, newValue) => {
    valueCategory(newValue); 
  };

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Tabs
        value={clickedCategory} 
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          width: "100%",
          maxWidth: "80%",

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
            backgroundColor: "#414071 !important",
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
    </Box>
  );
}
