import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Header = function (props) {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("You have successfully logged out.");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          TuLe's App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {((user && user.auth) || window.location.pathname !== "/login") && (
              <>
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/users">
                  Users
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user && user.auth && user.email && (
              <Navbar.Text className="me-2">{`Hello, ${user.email}`}</Navbar.Text>
            )}
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              {user && user.auth ? (
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
