import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import { Forum, ThumbUp } from "@mui/icons-material";

export default function DiscussionCard({ user, time, title, tag, comments, likes, avatar, onLike }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": { boxShadow: 3, borderColor: "primary.main" },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
          <Stack flex={1}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user} <Typography component="span" color="text.secondary">• {time}</Typography>
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
              {title}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2} mt={1}>
              <Chip label={tag} size="small" />
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Forum fontSize="small" cursor="pointer" />
                <Typography variant="body2">{comments}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <ThumbUp fontSize="small" cursor="pointer"  onClick={()=>{
                  onLike();
                }}/>
                <Typography variant="body2">{likes}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
