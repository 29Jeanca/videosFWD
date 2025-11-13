import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import ProfilePage from "../profile/pages/ProfilePage";
import CommunityPage from "../profile/profile_community/pages/CommunityPage";
const Routing = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/comunidad" element={<CommunityPage />} />
      </Routes>
    </Router>
  );
};
export default Routing;
