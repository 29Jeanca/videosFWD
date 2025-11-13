import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function SearchBar() {
  return (
    <TextField
      fullWidth
      placeholder="Buscar en los foros..."
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 4 }}
    />
  );
}
