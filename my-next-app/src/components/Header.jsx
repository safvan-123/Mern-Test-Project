"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const MyNavbar = () => {
  const router = useRouter();
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-lg">
      <Container>
        <Navbar.Brand as={Link} href="/">
          User Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/users">
              Users
            </Nav.Link>
            <Nav.Link as={Link} href="/createuser">
              Create User
            </Nav.Link>
            <Nav.Link as={Link} href="/updateuser">
              Update User
            </Nav.Link>
            <Nav.Link as={Link} href="/register">
              <Button variant="light" className="text-dark px-3 py-1">
                Register
              </Button>
            </Nav.Link>
            <Nav.Link as={Link} href="/login">
              <Button variant="light" className="text-dark px-3 py-1">
                Login
              </Button>
              {/* <h2>Welcome {user.name}!</h2>
              <p>Email: {user.email}</p> */}
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/login");
                }}
              >
                Logout
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
