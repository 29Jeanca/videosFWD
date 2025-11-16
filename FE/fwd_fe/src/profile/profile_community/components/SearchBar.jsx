import { TextField, InputAdornment, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function SearchBar() {
  return (
    <>
    <TextField
      fullWidth
      placeholder="Buscar por título"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search  />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 4 }}
      />
      <Button variant="outlined"
      size="small"
      sx={{ ml: 1, textTransform: 'none' }}
      position="end"

      >Buscar</Button>
      </>
  );
}
