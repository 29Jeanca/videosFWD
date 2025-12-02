import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

export default function CalendarFilter() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Box mt={3}>
      <Typography variant="subtitle2" mb={1}>Día de la Clase</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <DateCalendar
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          views={['day']}
          sx={{
            bgcolor: theme => theme.palette.mode === 'dark' ? 'background.default' : 'background.paper',
            borderRadius: 2,
            p: 1,
            border: '1px solid',
            borderColor: theme => theme.palette.divider,
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}