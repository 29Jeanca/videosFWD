import { Box } from "@mui/material";
import MainComment from "../components/MainComment";
import Comments from "../components/Comments";
import NewComment from "../components/NewComment";
import Sidebar from "../../components/Sidebar";

export default function PostPage() {
  return (
    <Box display="flex">
      <Sidebar communityActive={true} />

      <Box sx={{ flex: 1, p: 4 }}>
        <MainComment />
        <Box mt={4}>
          <Comments />
        </Box>
        <NewComment />
      </Box>
    </Box>
  );
}
