import { Box } from "@mui/material";
import AppHeader from "../../../../components/AppHeader";
import { Footer } from "../components/Footer";
import { NotFoundContent } from "../components/NotFoundContent";


export default function NotFoundPage() {
return (
<Box minHeight="100vh" display="grid" bgcolor="background.default" sx={{ gridTemplateRows: "auto 1fr auto" }}>
<AppHeader />
<Box display="grid" sx={{ placeItems: "center", px: 4, py: 9 }}>
<NotFoundContent />
</Box>
<Footer />
</Box>
);
}
