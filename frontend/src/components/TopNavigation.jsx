import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import axios from 'axios';

const user = {
  name: "user1",
};

function TopNavigation(props) {
  const navigate = useNavigate();
  const {user, setUser} = props;
  // TODO: manage this through a context or state management solution
  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await axios.delete(`/api/sessions/${user.id}`, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>MunchMatch</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <Navbar.Text className="me-3">
                Signed in as: {user.name}
              </Navbar.Text>
              <Button variant="outline-primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavigation;
