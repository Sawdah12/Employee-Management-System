import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <Navbar bg="dark" data-bs-theme="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand as="span">Employee Management System</Navbar.Brand>
      <Nav className="mx-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/employee">Employees List</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default NavBar;