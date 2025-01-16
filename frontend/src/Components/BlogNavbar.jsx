import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contextApi/AuthProvider';
import Logout from './Logout';
const BlogNavbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const {authUser} = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`shadow-sm ${isSticky ? 'sticky-top ' : ''}`}
      style={{ transition: 'top 1s' }}
    >
      <Container>
        <Navbar.Brand href="/" className='logo'>Stayzio</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "nav-link")}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "nav-link")}
            >
              About Us
            </NavLink>
            <NavLink
              to="/privacypolicy"
              className={({ isActive }) => (isActive ? "active" : "nav-link")}
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "nav-link")}
            >
              Contact Us
            </NavLink>

            {
              authUser ? (
                <DropdownButton id="dropdown-basic-button" className='p-0 text-capitalize' title={authUser?.user?.fullName}>
                  <Dropdown.Item><Link to={'/user/profile'} className='text-decoration-none text-dark'>Profile</Link></Dropdown.Item>
                  {
                    authUser?.user?.role ==='admin' && <Dropdown.Item><Link to={'/admin/dashboard'} className='text-decoration-none text-dark'>Dashboard</Link></Dropdown.Item>
                  }
                  <Dropdown.Item><Logout /></Dropdown.Item>
                </DropdownButton>
              ) : (
                <Nav.Link className='btnLogin'><Link className='text-white text-decoration-none' to={'/login'}>Login</Link></Nav.Link>
              )
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BlogNavbar