import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import ProfilePage from "../profile/pages/ProfilePage";
import { useEffect } from "react";
const Routing = () => {
  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/csrf/", {
      credentials: "include",
    });
  }, []);
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
