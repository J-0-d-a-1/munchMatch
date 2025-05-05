import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../../styles/footer.scss";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

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
              <IoSearch className="footer_icon" />
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
                <CgProfile className="footer_icon" />
              </div>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
