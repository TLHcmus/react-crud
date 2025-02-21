import { Outlet } from "react-router-dom";
import { Alert } from "react-bootstrap";
const PrivateRoute = function () {
  const token = localStorage.getItem("token");
  return token ? (
    <Outlet />
  ) : (
    <Alert variant="danger" className="mt-3">
      <Alert.Heading>An error occured!</Alert.Heading>
      <p>Please log in to use this feature</p>
    </Alert>
  );
};

export default PrivateRoute;
