import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import ProfilePage from "../profile/pages/ProfilePage";
const Routing = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};
export default Routing;
