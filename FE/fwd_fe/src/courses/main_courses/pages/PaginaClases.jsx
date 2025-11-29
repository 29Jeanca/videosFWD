// pages/ClasesDisponibles.jsx
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import SidebarFiltros from "../components/SidebarFiltros";
import SelectTema from "../components/SelectTema";
import ClaseCard from "../components/ClaseCard";
export default function PaginaClases() {
  const [filters, setFilters] = useState({ tipo: "todos", nivel: "2" });
  const [modulo, setModulo] = useState("");
  const [tema, setTema] = useState("");

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clases = [
    {
      titulo: "Intro a React",
      hora: "10:00 AM",
      modalidad: "Presencial",
      tema: "Hooks",
    },
    {
      titulo: "Django API",
      hora: "2:00 PM",
      modalidad: "Virtual",
      tema: "REST",
    },
    {
      titulo: "Flexbox & Grid",
      hora: "4:00 PM",
      modalidad: "Presencial",
      tema: "CSS",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarFiltros filters={filters} onFilterChange={handleFilterChange} />

      <Box sx={{ flexGrow: 1, p: 5 }}>
        <SelectTema
          modulo={modulo}
          tema={tema}
          setModulo={setModulo}
          setTema={setTema}
        />

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {clases.map((c, i) => (
            <Grid item key={i}>
              <ClaseCard clase={c} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
