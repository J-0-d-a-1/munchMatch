import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../../styles/navBar.scss";
import MunchMatch from "../assets/munchMatch_logo.png";

function TopNavigation() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => navigate("/signup");
  const handleLogout = async () => {
    try {
      await axios.delete(`/api/sessions/${user.id}`, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container className="top-navigation">
        <Navbar.Brand as={Link} to="/" className="cursor-pointer">
          <img src={MunchMatch} className="brand-icon" />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <Navbar.Text className="me-3">
                Signed in as: {user.name}
              </Navbar.Text>
              <Button variant="success" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" onClick={handleLogin} className="me-2">
                Login
              </Button>
              <Button variant="outline-success" onClick={handleSignup}>
                Sign Up
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavigation;
