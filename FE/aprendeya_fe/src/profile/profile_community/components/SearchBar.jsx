import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function SearchBar() {
  return (
    <TextField
      fullWidth
      placeholder="Buscar en discusiones"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search fontSize="small" sx={{ color: "text.disabled" }} />
          </InputAdornment>
        ),
        sx: {
          height: 50,
          borderRadius: "12px",
          fontSize: 15,
          bgcolor: "background.paper",
        },
      }}
    />
  );
}
