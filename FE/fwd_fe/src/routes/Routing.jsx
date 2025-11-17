import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import ProfilePage from "../profile/pages/ProfilePage";
import CommunityPage from "../profile/profile_community/pages/CommunityPage";
import PostPage from "../profile/profile_community/pages/PostPage";
import NotFoundPage from "../profile/profile_community/errors/pages/NotFoundPage";
const Routing = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/comunidad" element={<CommunityPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
export default Routing;
