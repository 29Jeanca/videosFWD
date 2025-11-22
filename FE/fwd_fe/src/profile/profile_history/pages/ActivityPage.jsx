import { Box, Paper } from "@mui/material";
import ActivityHeader from "../components/ActivityHeader";
import ActivityTable from "../components/ActivityTable";
import Sidebar from "../../components/Sidebar";
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
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} height="100%" bgcolor="background.default">
        
        <Sidebar
            history={()=> navigate('/perfil')}
            historyActive={true}
            profileActive={false}
            communityActive={false}
            community={()=> navigate('/perfil')}
            calendar={()=> navigate('/calendario')}
            calendarActive={false}
            profile={()=> navigate('/perfil')}
        />

        <Box flex={1} p={{ xs: 2, md: 4 }} minHeight="100vh" width="100%">
          <Box maxWidth="1200px" mx="auto">

            <ActivityHeader filter={filter} setFilter={setFilter} />

            <Paper elevation={0} sx={{
              mt: 4,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}>
              <ActivityTable info={info} showEdit={showEdit} reloadInfo={reloadInfo} />
            </Paper>

          </Box>
        </Box>
      </Box>
    );
}
