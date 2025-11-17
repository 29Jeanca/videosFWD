import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NotFoundContent } from "../components/NotFoundContent";


export default function NotFoundPage() {
return (
<Box bgcolor={(theme) => theme.palette.background.default} minHeight="100vh">
<Header />
<Container maxWidth="md" sx={{ py: 8 }}>
<NotFoundContent />
</Container>
</Box>
);
}