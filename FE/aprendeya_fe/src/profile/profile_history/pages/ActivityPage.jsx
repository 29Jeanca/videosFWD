import { Box, Container, Paper } from "@mui/material";
import ActivityHeader from "../components/ActivityHeader";
import ActivityTable from "../components/ActivityTable";
import AppHeader from "../../../components/AppHeader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInfoByFilter } from "../../services/validate";

export default function ActivityPage() {
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);
    const [filter, setFilter] = useState("posts");
    const [showEdit, setShowEdit] = useState(false);

    async function loadTableInfo() {
        const data = await getInfoByFilter(filter);
        setInfo(data);

        if (data.detail === "Authentication credentials were not provided.") {
            navigate('/');
        }

        if (filter !== 'likes') {
            setShowEdit(true);
        } else {
            setShowEdit(false);
        }
    }

    useEffect(() => {
        loadTableInfo();
    }, [filter]);

    const reloadInfo = () => loadTableInfo();

    return (
      <>
      <AppHeader />
      <Box bgcolor="background.default" minHeight="100vh">
        <Container
          maxWidth="lg"
          sx={{
            maxWidth: { lg: "1280px" },
            pt: { xs: 3, md: 5 },
            pb: { xs: 6, md: 16 },
            px: { xs: 2, md: 4 },
          }}
        >
          <ActivityHeader filter={filter} setFilter={setFilter} />

          <Paper elevation={0} sx={{
            mt: 4,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
          }}>
            <ActivityTable info={info} showEdit={showEdit} reloadInfo={reloadInfo} />
          </Paper>
        </Container>
      </Box>
      </>
    );
}
