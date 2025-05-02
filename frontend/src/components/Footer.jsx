import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dashboard from "../assets/dashboard.png";
import Home from "../assets/home_icon.png";
import Favorites from "../assets/favorites_icon.png";
import "../../styles/footer.scss";

function Footer() {
  const { user } = useAuth();

  return (
    <Navbar className="bg-body-tertiary mt-auto">
      <Container>
        <Nav className="w-100 justify-content-around">
          {/* Default view */}
          <Nav.Link as={Link} to="/">
            <div className="home">
              <img src={Home} className="footer_icon" />
            </div>
          </Nav.Link>
          <Nav.Link as={Link} to="/favorites">
            <div className="favorites">
              <img src={Favorites} className="footer_icon" />
            </div>
          </Nav.Link>
          {/* Owner view */}
          {user?.is_owner && (
            <Nav.Link as={Link} to="/user/restaurants">
              <div className="restaurants">
                <img src={Dashboard} className="footer_icon" />
              </div>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
