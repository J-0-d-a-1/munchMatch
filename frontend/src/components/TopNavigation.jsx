import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const user = {
  name: "user1",
};

function TopNavigation() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>MunchMatch</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Signin as: {user.name}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavigation;
