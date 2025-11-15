import { Grid, Box, Container, Stack } from "@mui/material";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TabSelection from "../components/TabSelection";
import CategoryChips from "../components/CategoryChips";
import DiscussionCard from "../components/DiscussionCard";
import FeaturedTopics from "../components/FeaturedTopics";
import UpcomingEvents from "../components/UpcomingEvents";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { getData, getPostComments, getLikedPosts, postLikeUnlike } from "../../services/validate";
import { useNavigate } from "react-router-dom";

export default function CommunityPage() {
  const [createdPost, setCreatedPost] = useState([]);
  const [likesByPost, setLikesByPost] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const formaterDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getData();
        setCreatedPost(posts);

        if (posts.detail === "Authentication credentials were not provided.") {
          setCreatedPost([]);
          navigate('/');
          return;
        }

        const likesObj = {};
        for (const p of posts) {
          const res = await getLikedPosts(p.id);
          likesObj[p.id] = res.length;
        }
        setLikesByPost(likesObj);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCommentPost = async () => {
      try {
        await getPostComments(1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchCommentPost();
  }, [navigate]);

  return (
    <Container maxWidth="xl" sx={{ py: 4}}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9}>
          <Header />
          <SearchBar />
          <TabSelection />
          <CategoryChips />
          <Stack spacing={2}>
            {createdPost.length === 0 ? (
              <Box mt={4}>No hay discusiones disponibles.</Box>
            ) : loading ? (
              <Box mt={4}>Cargando discusiones...</Box>
            ) : (
              createdPost.map((d, i) => (
                <DiscussionCard
                  key={i}
                  user={d.user_name}
                  createdAt={d.created_at}
                  title={d.title}
                  tag={d.category_name}
                  likes={likesByPost[d.id] ?? 0}
                  onLike={async () => {
                    const response = await postLikeUnlike(d.id);

                    if (response && response.detail === "Authentication credentials were not provided.") {
                      navigate('/');
                      return;
                    }

                    const res = await getLikedPosts(d.id);
                    setLikesByPost(prev => ({
                      ...prev,
                      [d.id]: res.length
                    }));
                  }}
                  avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDfmNIZwkNvYKkxc5MShpp3-UzVcELEXVFk9ovihIHFsEQ16u52BQyISU8LLcFmp3Glq3Sef-x9ji5alYOG2TkZG4ioDh6VcpbLIEYE9XEHIgxLkV3H7lU08CTmpYMIcMXpupJvZRQSe-lf0oIr7ooA_8Z3vRmhDwDPFUhYREZxRNGR3tQWj6vzJiRunvnM6KTUl7LwTM9nwIMV-OHGEOZPMEA1YIP_h1q68gcmwaDbNUa7MpBTzfr7BZtcwKiCnTqR0j45yNSR6foz"
                />
              ))
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
