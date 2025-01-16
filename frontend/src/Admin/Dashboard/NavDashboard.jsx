import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavDashboard = () => {
  return (
    <div>
        <Navbar bg="white" expand="lg" className="w-100 z-2 shadow-sm p-3 position-fixed top-0">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="logo text-decoration-none">
              Stayzio
            </Link>
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            <Link
              to="/admin/dashboard"
              className="text-decoration-none fw-bold py-2 px-3 bg-danger-subtle text-dark fw-medium me-3"
              style={{ fontSize: "18px" }}
            >
              Admin Panel
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavDashboard