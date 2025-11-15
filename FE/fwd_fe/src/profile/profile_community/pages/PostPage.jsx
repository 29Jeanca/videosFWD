import { Box } from "@mui/material";
import MainComment from "../components/MainComment";
import Comments from "../components/Comments";
import NewComment from "../components/NewComment";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
export default function PostPage() {
  const { postId } = useParams();
  console.log(postId);

  

  return (
    <Box display="flex">
      <Sidebar communityActive={true} profileActive={false} />

      <Box sx={{ flex: 1, p: 4 }}>
        <MainComment postId={postId}/>
        <Box mt={4}>
          <Comments postId={postId}/>
        </Box>
        <NewComment />
      </Box>
    </Box>
  );
}
