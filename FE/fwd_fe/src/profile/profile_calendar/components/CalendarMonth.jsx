// CalendarMonth.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { getAllEvents } from "../services/validate";
import { useNavigate } from "react-router-dom";
import ModalCreateEvent from "./ModalCreateEvent";

const WEEK_DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function generateMonthGrid(current) {
  const year = current.getFullYear();
  const month = current.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startWeekDay = firstOfMonth.getDay();

  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - startWeekDay);

  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatKey(d) {
  return d.toISOString().slice(0, 10);
}

export default function CalendarMonth({ initialDate = new Date() }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [infoEvent, setInfoEvent] = useState({
    title: "",
    description: "",
    date: "",
    color: "",
  });
  const [eventsInfo, setEventsInfo] = useState({});

  const [current, setCurrent] = useState(() => {
    const cl = new Date(initialDate);
    return new Date(cl.getFullYear(), cl.getMonth(), 1);
  });

  useEffect(() => {
    async function fetchEvents() {
      const response = await getAllEvents();
      
      if (response.detail === "Authentication credentials were not provided.") {
        navigate("/");
        return;
      }

      if (typeof response === "object" && !Array.isArray(response)) {
        setEventsInfo(response);
      } else {
        setEventsInfo({});
      }
    }
    fetchEvents();
  }, []);

  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  const days = useMemo(() => generateMonthGrid(current), [current]);

  const monthLabel = useMemo(() => {
    return new Intl.DateTimeFormat("es-CR", {
      month: "long",
      year: "numeric",
    }).format(current);
  }, [current]);

  function prevMonth() {
    setCurrent((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  }
  function nextMonth() {
    setCurrent((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  }
  function goToday() {
    const t = new Date();
    setCurrent(new Date(t.getFullYear(), t.getMonth(), 1));
  }

  const handleSaveEvent = (eventData) => {
    console.log("Evento guardado:", eventData);
    setShowModal(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          p: 1.5,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={prevMonth} size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={nextMonth} size="small">
            <ChevronRight />
          </IconButton>

          <Typography sx={{ fontWeight: 700, ml: 1 }}>{monthLabel}</Typography>

          <Button variant="outlined" size="small" onClick={goToday} sx={{ ml: 3 }}>
            Hoy
          </Button>
        </Box>
      </Box>

      {/* Calendar Grid */}
      <Box
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "auto repeat(6, 1fr)",
          gap: "1px",
          bgcolor: "divider",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Week headers */}
        {WEEK_DAYS.map((d) => (
          <Box
            key={d}
            sx={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: 13,
              py: 1.25,
              bgcolor: "background.paper",
              color: "text.secondary",
            }}
          >
            {d}
          </Box>
        ))}

        {/* Days */}
        {days.map((day, idx) => {
          const isCurrentMonth = day.getMonth() === current.getMonth();
          const isToday =
            day.getFullYear() === today.getFullYear() &&
            day.getMonth() === today.getMonth() &&
            day.getDate() === today.getDate();

          const key = formatKey(day);
          const events = eventsInfo[key] || [];

          return (
            <Box
              key={key + idx}
              onClick={() => {
                setSelectedDate(key);
                setShowModal(true);
                console.log("Clicked", key);
                setInfoEvent({
                  title: "",
                  description: "",
                  date: key,
                  color: "green",
                });
              }}
              sx={{
                p: 1.25,
                minHeight: 110,
                bgcolor: isCurrentMonth ? "background.paper" : "transparent",
                color: isCurrentMonth ? "text.primary" : "text.disabled",
                borderTop: "1px solid",
                borderLeft: "1px solid",
                borderColor: "divider",
                position: "relative",
                cursor: "pointer",
              }}
            >
              {/* Day number */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    fontWeight: isToday ? 700 : 600,
                    color: isToday ? "primary.main" : undefined,
                    opacity: isCurrentMonth ? 1 : 0.6,
                  }}
                >
                  {day.getDate()}
                </Typography>

                {isToday && (
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {day.getDate()}
                  </Box>
                )}
              </Box>

              {/* Events */}
              <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                {events.map((ev, i) => {
                  const bg =
                    ev.color === "blue"
                      ? "rgba(219,234,254,0.8)"
                      : ev.color === "green"
                      ? "rgba(220,252,231,0.9)"
                      : ev.color === "orange"
                      ? "rgba(255,237,213,0.9)"
                      : ev.color === "red"
                      ? "rgba(254,226,226,0.9)"
                      : "rgba(238,238,238,0.8)";

                  const textColor =
                    ev.color === "blue"
                      ? "#1e40af"
                      : ev.color === "green"
                      ? "#166534"
                      : ev.color === "orange"
                      ? "#9a3412"
                      : ev.color === "red"
                      ? "#9f1239"
                      : "inherit";

                  return (
                    <Box
                      key={i}
                      sx={{
                        fontSize: 12,
                        p: "6px 8px",
                        borderRadius: 1,
                        bgcolor: bg,
                        color: textColor,
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ev.title}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>

      {showModal && (
        <ModalCreateEvent
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
          date={selectedDate}
          infoEvent={infoEvent}
        />
      )}
    </Box>
  );
}
