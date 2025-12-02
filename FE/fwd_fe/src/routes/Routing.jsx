import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import ProfilePage from "../profile/pages/ProfilePage";
import CommunityPage from "../profile/profile_community/pages/CommunityPage";
import PostPage from "../profile/profile_community/pages/PostPage";
import NotFoundPage from "../profile/profile_community/errors/pages/NotFoundPage";
import ActivityPage from "../profile/profile_history/pages/ActivityPage";
import CalendarPage from "../profile/profile_calendar/pages/CalendarPage";
import Courses from "../courses/main_courses/pages/Courses";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/comunidad" element={<CommunityPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/actividad" element={<ActivityPage />} /> 
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/calendario" element={<CalendarPage />} />
        <Route path="/clases" element={<Courses />} />
      </Routes>
    </Router>
  );
};
export default Routing
