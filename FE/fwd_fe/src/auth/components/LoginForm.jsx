import{ useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Paper,
  CssBaseline,
} from "@mui/material";
import { LightMode, DarkMode, Visibility } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginUser } from "../services/validate";

const LoginForm = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const validateUser = async()=>{
     const userCredentials = {email,password};
     const response=await loginUser(email,password);
      console.log(userCredentials);
      console.log(response);
  }

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#135bec",
      },
      background: {
        default: darkMode ? "#101622" : "#f6f6f8",
        paper: darkMode ? "#1c1f27" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#1e1e1e",
        secondary: darkMode ? "#9da6b9" : "#555555",
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Box sx={{ position: "absolute", top: 24, right: 24 }}>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? (
              <LightMode sx={{ fontSize: 28 }} />
            ) : (
              <DarkMode sx={{ fontSize: 28 }} />
            )}
          </IconButton>
        </Box>

        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            flex: 1,
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtbCL5GFyCC7BbIpeJWtgl4Yq8vhSuBif0ZwUL7q3tkd6x1Va5JFj1M8DaQ5n04S0xuLLlJKljso2C5HeCUwaUZeV_82lq6T-YbMEQb1H4GXp1MdtyfhYCIpn6YHkBqR9tfOzj-GnPBExoX2aRq3_XIjJ3_qDS6RlIearihI-KIolhT6CZADyl9bcdnDsplXXj30loHywBuYHSGRBbYNd1yNHBx6ABrR_zYmsJ2zFDcE6LwZXg7KHaoiAMgA15nDa-qI33dc2Wuf6x')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            display: { xs: "none", lg: "flex" },
            alignItems: "flex-end",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.5)",
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              p: 6,
              color: "white",
              width: "100%",
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Forward Freedom And Technology.
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, maxWidth: 400, opacity: 0.8 }}
            >
              Accede a tus clases grabadas y materiales de estudio en cualquier
              momento y lugar.
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          lg={6}
          component={Paper}
          elevation={0}
          square
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
            py: 6,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 800, textAlign: "center" }}>
            <Box sx={{ mb: 4 }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrTBh0Ii2lnLKXuczF2CqJO9Nb7bFpy5ORJ27Hv-2moQ78UchJd8DMxo01kSEeG5C6zn5jCtK1W56RwIMj3DO2xRI0kONywpMUuLvCiCG1VGgTIGF8f1TW0-iSsTyU5b-yv7B2D6cBqHkmlSoFj3Hu6AXxM4OgUDl_xLsc7uNsTQsiaAkONgTWxEmtkTFBMl4EDys0N3tp6Gcd6NH5Pf9Lps8g9TLUxdZbhhaYqZ4eZ8Rc7zJPLbC7lAMKOsPrruqEBC2CQgxe-RrU"
                alt="Logo FWD"
                style={{ height: 48 }}
              />
            </Box>

            <Typography variant="h5" fontWeight="bold">
              Bienvenido de nuevo
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
              Accede a tus clases.
            </Typography>

            <Box component="form" noValidate sx={{ mt: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  label="Correo Electrónico"
                  fullWidth
                  variant="outlined"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Box sx={{ position: "relative" }}>
                  <TextField
                    label="Contraseña"
                    fullWidth
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                }}
                onClick={validateUser}
              >
                Iniciar Sesión
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: "primary.main", fontWeight: 500 }}
                >
                  Olvidé mi contraseña
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;
