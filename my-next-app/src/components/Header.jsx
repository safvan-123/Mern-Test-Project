// "use client";

// import Link from "next/link";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";

// const MyNavbar = () => {
//   return (
//     <Navbar bg="primary" variant="dark" expand="lg" className="shadow-lg">
//       <Container>
//         <Navbar.Brand as={Link} href="/">
//           User Management
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link as={Link} href="/">
//               Home
//             </Nav.Link>
//             <Nav.Link as={Link} href="/users">
//               Users
//             </Nav.Link>
//             <Nav.Link as={Link} href="/createuser">
//               Create User
//             </Nav.Link>
//             <Nav.Link as={Link} href="/updateuser">
//               Update User
//             </Nav.Link>
//           </Nav>
//           {/* <Button variant="light" className="ms-3"> */}
//           <a className="btn btn-light">
//             <Nav.Link
//               as={Link}
//               href="/login"
//               className="text-dark"
//               // style={{ backgroundColor: "white" }}
//             >
//               Login
//             </Nav.Link>
//           </a>
//           {/* </Button> */}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default MyNavbar;

"use client";

import Link from "next/link";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const MyNavbar = () => {
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
            <Nav.Link as={Link} href="/login">
              <Button variant="light" className="text-dark px-3 py-1">
                Login
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
