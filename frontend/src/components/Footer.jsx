import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../../styles/footer.scss";

function Footer() {
  const { user } = useAuth();

  return (
    <Navbar className="bg-body-tertiary mt-auto" fixed="bottom">
      <Container>
        <Nav className="w-100 justify-content-around">
          {/* Default view */}
          <Nav.Link as={Link} to="/">
            <div className="home">
              <span>Home</span>
            </div>
          </Nav.Link>
          <Nav.Link as={Link} to="/favorites">
            <div className="favorites">
              <span>My Favorites</span>
            </div>
          </Nav.Link>
          {/* Owner view */}
          {user?.is_owner && (
            <Nav.Link as={Link} to="/user/restaurants">
              <div className="restaurants">
                <span>My Restaurants</span>
              </div>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
