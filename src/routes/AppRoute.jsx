import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import HomePage from "../pages/HomePage";
import UsersPage from "../pages/UsersPage";
import LoginPage from "../pages/LoginPage";

const AppRoute = function () {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* private route */}
      <Route element={<PrivateRoute />}>
        <Route path="/users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
