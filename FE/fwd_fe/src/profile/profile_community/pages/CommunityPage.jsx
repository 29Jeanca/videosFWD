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
import { getData, getPostComments } from "../../services/validate";
import { useNavigate } from "react-router-dom";


export default function CommunityPage() {
  const [createdPost,setCreatedPost] = useState([])
  const navigate = useNavigate();
  const formaterDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }


  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const response = await getData();
        console.log("Discusiones obtenidas:", response);
        setCreatedPost(response);
        if(response.detail==="Authentication credentials were not provided."){
          setCreatedPost([]);
          navigate('/');
        }
      } catch (error) {
        console.error("Error al obtener las discusiones:", error);
      }
    }
    const fetchCommentPost = async () => {
      try {
        const response = await getPostComments(1); 
        console.log("Comentarios obtenidos:", response);
      }
      catch (error) {
        console.error("Error al obtener los comentarios:", error);
      }
    }
    fetchPosts();
    fetchCommentPost();
  },[navigate])

  // const discussions = [
  //   // {
  //   //   user: "Carlos Ruiz",
  //   //   time: "hace 2 horas",
  //   //   title: "¿Alguien más tiene problemas con el state de React en el Proyecto 3?",
  //   //   tag: "JavaScript",
  //   //   comments: 5,
  //   //   likes: 12,
  //   //   avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfmNIZwkNvYKkxc5MShpp3-UzVcELEXVFk9ovihIHFsEQ16u52BQyISU8LLcFmp3Glq3Sef-x9ji5alYOG2TkZG4ioDh6VcpbLIEYE9XEHIgxLkV3H7lU08CTmpYMIcMXpupJvZRQSe-lf0oIr7ooA_8Z3vRmhDwDPFUhYREZxRNGR3tQWj6vzJiRunvnM6KTUl7LwTM9nwIMV-OHGEOZPMEA1YIP_h1q68gcmwaDbNUa7MpBTzfr7BZtcwKiCnTqR0j45yNSR6foz",
  //   // },
  //   // {
  //   //   user: "Ana Gómez",
  //   //   time: "hace 1 día",
  //   //   title: "Feedback para mi portfolio final",
  //   //   tag: "Proyectos",
  //   //   comments: 8,
  //   //   likes: 21,
  //   //   avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyOAtPzjQPds_fdNz5d9TZTyH8TXbhJgN27RjlJP2fvkqWJbbr9p8zAXZvHRvi58erMKgi51nw11MJDhEsVomPhrv-dtr_9JlPjsxdclHvNHKZSV3EiP346Xj6xMJTvAwuj5ZRUnoiLtQtsN44dhiNEg6PsANZ0nb87Lsx3LAzz6Py72qyAc-yoqSXwQ6QpjAif0JWC7_lNKU5qEb3_zLt9Vn0KYGynpzzsF2NFOucM0Xsb_24I3UCDiLNoLTZok6Smg-894HpxT6O",
  //   // },
  //   // {
  //   //   user: "Jorge Torres",
  //   //   time: "hace 3 días",
  //   //   title: "Comparto mis recursos favoritos para Diseño UI",
  //   //   tag: "Diseño UI/UX",
  //   //   comments: 15,
  //   //   likes: 45,
  //   //   avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmxhYW3-O11mLIEe6ysO-wwE1NoQU81hPzf__7eLigJZWsDU_bwGZR4Fz2w0PEU8zUL9kr4KsqSq433yoZ-qJcDTCs13BJQ1GZehurXf_YSyy3YSgUoKyRtfD5LhQpmGFW1T1GBL6fyJ_Y65f9xWaWG8eQ-F7l8493V5DpEy1uAHG2THCW7P1QP5TN7EgqR-_Zw5KtstTg6I2_H2MmTQF3KYz3upKdeLoyffgU9cOZK5Dm2yXteizaipelIcdvrfQ7ne1uu6PuH9sI",
  //   // },
  // ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9}>
          <Header />
          <SearchBar />
          <TabSelection />
          <CategoryChips />
          <Stack spacing={2}>
            {createdPost.length === 0 ? (
              <Box mt={4}>No hay discusiones disponibles.</Box>
            ) : (
              createdPost.map((d, i) => (
                <DiscussionCard key={i}
                  user={d.user_name}
                  time={formaterDate(d.created_at)}
                  title={d.title}
                  tag={d.category_name}
                  likes={d.thumbs_up}
                  avatar={"https://lh3.googleusercontent.com/aida-public/AB6AXuDfmNIZwkNvYKkxc5MShpp3-UzVcELEXVFk9ovihIHFsEQ16u52BQyISU8LLcFmp3Glq3Sef-x9ji5alYOG2TkZG4ioDh6VcpbLIEYE9XEHIgxLkV3H7lU08CTmpYMIcMXpupJvZRQSe-lf0oIr7ooA_8Z3vRmhDwDPFUhYREZxRNGR3tQWj6vzJiRunvnM6KTUl7LwTM9nwIMV-OHGEOZPMEA1YIP_h1q68gcmwaDbNUa7MpBTzfr7BZtcwKiCnTqR0j45yNSR6foz"}
                />
              ))
            )}
          </Stack>
        </Grid>

      </Grid>
    </Container>
  );
}
