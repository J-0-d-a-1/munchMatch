import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../../styles/footer.scss";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function Footer() {
  const { user } = useAuth();

  return (
    <Navbar
      className="bg-body-tertiary footer-nav"
      fixed="bottom"
      style={{ paddingTop: "0", paddingBottom: "0" }}
    >
      <Container className="footer">
        <Nav className="w-100 justify-content-around">
          {/* Default view */}
          <Nav.Link as={Link} to="/restaurants">
            <div className="home">
              <FaSearch className="footer_icon" />
            </div>
          </Nav.Link>
          <Nav.Link as={Link} to="/favorites">
            <div className="favorites">
              <FaHeart className="footer_icon" />
            </div>
          </Nav.Link>
          {/* Owner view */}
          {user?.is_owner && (
            <Nav.Link as={Link} to="/user/restaurants">
              <div className="restaurants">
                <FaUnlockKeyhole className="footer_icon" />
              </div>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
