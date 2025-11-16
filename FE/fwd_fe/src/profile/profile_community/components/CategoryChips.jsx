import { Tabs, Tab, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/validate";

export default function CategoryChips({ clickedCategory, valueCategory }) {
  const [categories, setCategories] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);

        const initialIndex = response.findIndex(
          (cat) => cat.id === clickedCategory
        );
        if (initialIndex !== -1) setTabValue(initialIndex);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, [clickedCategory]);

  const handleChange = (_, newValue) => {
    setTabValue(newValue);
    const selected = categories[newValue];
    if (selected) valueCategory(selected.id);
  };

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Tabs
        value={tabValue}
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

          // ⭐ Seleccionado = color #414071
          "& .Mui-selected": {
            backgroundColor: "#414071 !important",
            color: "white !important",
          },

          "& .MuiTabs-scrollButtons": {
            width: "32px",
            borderRadius: "50%",
          },
        }}
      >
        {categories.map((cat) => (
          <Tab key={cat.id} label={cat.name} />
        ))}
      </Tabs>
    </Box>
  );
}
