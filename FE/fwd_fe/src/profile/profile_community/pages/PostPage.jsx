import { Box } from "@mui/material";
import MainComment from "../components/MainComment";
import Comments from "../components/Comments";
import NewComment from "../components/NewComment";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Sidebar: visible solo en pantallas medianas hacia arriba */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: { md: "250px" },
          flexShrink: 0,
        }}
      >
        <Sidebar communityActive={true} profileActive={false} />
      </Box>
      <Button sx={
        {
          display: {xs:'block',md:'none',lg:'none'}
        }
      }
        onClick={()=>{
          navigate('/perfil')
        }}
      >
        Volver a la Comunidad
      </Button>
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, md: 4 },
          maxWidth: 900,
          mx: "auto",
        }}
      >
        <MainComment postId={postId} />

        <Box mt={4}>
          <Comments postId={postId} />
        </Box>

        <NewComment />
      </Box>
    </Box>
  );
}
