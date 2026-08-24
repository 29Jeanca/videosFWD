import { Box, Container, Stack, Chip, Typography } from "@mui/material";
import AppHeader from "../../../components/AppHeader";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TabSelection from "../components/TabSelection";
import CategoryChips from "../components/CategoryChips";
import DiscussionCard from "../components/DiscussionCard";
import UpcomingEvents from "../components/UpcomingEvents";
import FeaturedTopics from "../components/FeaturedTopics";
import { useEffect, useState } from "react";
import {
  getData,
  getPostComments,
  getLikedPosts,
  postLikeUnlike,
  getPostByCategory,
} from "../../services/validate";
import { useNavigate } from "react-router-dom";

export default function CommunityPage() {
  const [createdPost, setCreatedPost] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);

  const [likesByPost, setLikesByPost] = useState({});
  const [commentsByPost, setCommentsByPost] = useState({});

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const posts = await getData();

      if (posts.detail === "Authentication credentials were not provided.") {
        navigate("/");
        return;
      }

      setCreatedPost(posts);
      setOriginalPosts(posts);

      const likesObj = {};
      for (const p of posts) {
        const res = await getLikedPosts(p.id);
        likesObj[p.id] = res.length;
      }

      const commentsObj = {};
      for (const p of posts) {
        const res = await getPostComments(p.id);
        commentsObj[p.id] = res.length;
      }

      setLikesByPost(likesObj);
      setCommentsByPost(commentsObj);

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

  useEffect(() => {
    fetchData();
    fetchCommentPost();
  }, []);

  // El orden de estos casos sigue el orden visual de las pestañas en
  // TabSelection (Recientes / Sin responder / Populares / Más Activos) para
  // que la pestaña que dice "Sin responder" de verdad filtre sin respuestas,
  // etc. Las 4 mismas reglas de filtrado/orden que ya existían se conservan
  // intactas, solo se reordenó a qué índice de pestaña responde cada una.
  const handleTabFilter = (tabIndex) => {
    let sorted = [...originalPosts];

    switch (tabIndex) {
      case 0:
        // Recientes
        sorted.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;

      case 1:
        // Sin responder
        sorted = sorted.filter(
          (p) => (commentsByPost[p.id] ?? 0) === 0
        );
        break;

      case 2:
        // Populares
        sorted.sort(
          (a, b) =>
            (likesByPost[b.id] ?? 0) -
            (likesByPost[a.id] ?? 0)
        );
        break;

      case 3:
        // Más Activos
        sorted.sort(
          (a, b) =>
            (commentsByPost[b.id] ?? 0) -
            (commentsByPost[a.id] ?? 0)
        );
        break;

      default:
        break;
    }

    setCreatedPost(sorted);
  };

  return (
    <>
      <AppHeader />
      <Container maxWidth="xl" sx={{ py: 5, px: { xs: 2, md: 4 } }}>
        <Header reloadTopics={fetchData} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 316px" },
            gap: 3.5,
            alignItems: "start",
          }}
        >
          {/* COLUMNA PRINCIPAL */}
          <Stack spacing={2.5}>
            <SearchBar />

            {/* TABS QUE CAMBIAN LA VISTA */}
            <TabSelection onTabChange={handleTabFilter} />

            {/* CATEGORÍAS */}
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Chip
                label="Todas"
                onClick={fetchData}
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: 600,
                  fontSize: 13,
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              />
              <CategoryChips
                valueCategory={async (catId) => {
                  try {
                    setLoading(true);
                    const data = await getPostByCategory(catId);
                    setCreatedPost(data);
                    setOriginalPosts(data);
                    setLoading(false);
                  } catch (error) {
                    console.error("Error al filtrar por categoría:", error);
                  }
                }}
              />
            </Stack>

            {/* LISTA DE POSTS */}
            {createdPost.length === 0 ? (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                No hay discusiones disponibles.
              </Typography>
            ) : loading ? (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Cargando discusiones...
              </Typography>
            ) : (
              <Stack spacing={2.5}>
                {createdPost.map((d, i) => (
                  <DiscussionCard
                    key={i}
                    onClick={() => navigate(`/post/${d.id}`)}
                    user={
                      d.anonymous
                        ? "Participante Anónimo"
                        : d.user_name
                    }
                    createdAt={d.created_at}
                    title={d.title}
                    tag={d.category_name}
                    content={d.content}
                    likes={likesByPost[d.id] ?? 0}
                    comments={commentsByPost[d.id] ?? 0}
                    onLike={async () => {
                      const response = await postLikeUnlike(d.id);

                      if (
                        response &&
                        response.detail ===
                          "Authentication credentials were not provided."
                      ) {
                        navigate("/");
                        return;
                      }

                      const res = await getLikedPosts(d.id);
                      setLikesByPost((prev) => ({
                        ...prev,
                        [d.id]: res.length,
                      }));
                    }}
                  />
                ))}
              </Stack>
            )}
          </Stack>

          {/* BARRA LATERAL */}
          <Box component="aside" sx={{ display: "grid", gap: 2.25, top: 96, position: { md: "sticky" } }}>
            <UpcomingEvents />
            <FeaturedTopics />
          </Box>
        </Box>
      </Container>
    </>
  );
}
