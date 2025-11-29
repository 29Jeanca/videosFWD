import { useState } from "react";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../../components/Sidebar";
import CalendarDay from "../components/CalendarDay";
import CalendarWeek from "../components/CalendarWeek";
import CalendarMonth from "../components/CalendarMonth";
import { useNavigate } from "react-router-dom";


export default function CalendarPage() {
    const navigate = useNavigate();
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detecta si la pantalla es pequeña
  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleViewChange = (_, next) => {
    if (next !== null) setView(next);
  };

  const goPrev = () => {
    setCurrentDate((prev) =>
      view === "month"
        ? new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        : view === "week"
        ? new Date(prev.setDate(prev.getDate() - 7))
        : new Date(prev.setDate(prev.getDate() - 1))
    );
  };

  const goNext = () => {
    setCurrentDate((prev) =>
      view === "month"
        ? new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        : view === "week"
        ? new Date(prev.setDate(prev.getDate() + 7))
        : new Date(prev.setDate(prev.getDate() + 1))
    );
  };

  const goToday = () => setCurrentDate(new Date());

  return (
    <Box display="flex" minHeight="100vh">
      {/* ---------- SIDEBAR ---------- */}
      {isMobile ? (
        <>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ position: "fixed", top: 12, left: 12, zIndex: 20 }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box width={250}>
              <Sidebar calendarActive profileActive={false} profile={()=>{
                navigate('/perfil')
              }}
              history={()=>{
                navigate('/actividad')
              }}
              />
            </Box>
          </Drawer>
        </>
      ) : (
        <Sidebar calendarActive profileActive={false} profile={()=>{
          navigate('/perfil')
        }}
        history={()=>{
          navigate('/actividad')
        }}
        />
      )}

      {/* ---------- MAIN AREA ---------- */}
      <Box flexGrow={1} p={isMobile ? 2 : 3} width="100%">
        {/* Selector vistas */}
        <Paper
          sx={{
            p: 1,
            mb: 3,
            borderRadius: 2,
            display: "inline-flex",
          }}
        >
          <ToggleButtonGroup
            exclusive
            value={view}
            onChange={handleViewChange}
            size="small"
          >
            {/* <ToggleButton value="month">Mes</ToggleButton> */}
            {/* <ToggleButton value="week">Semana</ToggleButton>
            <ToggleButton value="day">Día</ToggleButton> */}
          </ToggleButtonGroup>
        </Paper>

        {/* Render */}
        {view === "month" && (
          <CalendarMonth
            currentDate={currentDate}
            goPrev={goPrev}
            goNext={goNext}
            goToday={goToday}
          />
        )}

        {/* {view === "week" && (
          <CalendarWeek
            currentDate={currentDate}
            goPrev={goPrev}
            goNext={goNext}
            goToday={goToday}
          />
        )} */}

        {/* {view === "day" && (
          <CalendarDay
            currentDate={currentDate}
            goPrev={goPrev}
            goNext={goNext}
            goToday={goToday}
          />
        )} */}
      </Box>
    </Box>
  );
}
