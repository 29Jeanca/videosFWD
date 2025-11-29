import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './routes/Routing'
import './styles/Global.css'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routing/>
    </LocalizationProvider>
  </StrictMode>,
)
