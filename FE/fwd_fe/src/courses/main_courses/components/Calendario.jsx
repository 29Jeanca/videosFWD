// Calendario.jsx
import { Box, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function Calendario({ value, onChange }) {
  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Calendario
      </Typography>

      <DateCalendar value={value} onChange={onChange} />
    </Box>
  );
}
