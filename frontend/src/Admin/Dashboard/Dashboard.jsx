import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Navbar, Nav } from 'react-bootstrap';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Menu icon
import { useAuth } from '../../contextApi/AuthProvider.jsx';
import Logout from '../../Components/Logout.jsx';
import { useFetchAllBlogsQuery } from '../../redux/blog/blogApi.js';
import { useGetAllUsersQuery } from '../../redux/auth/authApi.js';
import { useGetCommentsQuery } from '../../redux/comment/comment.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);



function Dashboard() {

  const { data: blogs = []} = useFetchAllBlogsQuery();
  const {data: users=[]} = useGetAllUsersQuery();
  const {data : comments=[]} = useGetCommentsQuery();
  const [showUserInfo, setShowUserInfo] = useState(true);
  const { authUser } = useAuth();
  const navigate = useNavigate();

  // chart data define
  const chartData = {
    labels: ['Blogs', 'Users', 'Comments'],
    datasets: [
      {
        label: 'Statistics',
        data: [blogs?.length, users?.length, comments?.length],
        backgroundColor: [' #f89b9b', '#86f4b4', '#f7c0ec'],
      },
    ],
  };

  // Redirect if not admin
  useEffect(() => {
    if (!authUser || authUser?.user?.role !== 'admin') {
      navigate('/login');
    }
  }, [authUser, navigate]);

  const toggleUserInfo = () => setShowUserInfo(!showUserInfo);

  return (
    <>
      {/* Navbar with Toggle Icon (Visible Only on Small Screens) */}
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
              className="text-decoration-none text-dark fw-bold me-3 d-none d-lg-block"
              style={{ fontSize: "20px" }}
            >
              Admin Panel
            </Link>
            <FaBars
              className="menu-icon text-dark d-lg-none"
              style={{ fontSize: "24px", cursor: "pointer" }}
              onClick={toggleUserInfo}
            />
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="p-4 mt-5">
        <Row>
          {/* User Info Section */}
          <Col
            xs={12} sm={4} md={3}
            className="h-100 bg-white z-1 px-4 pt-4 rounded shadow-sm position-fixed left-0 transition-all"
            style={{
              top: "6rem",
              transform: showUserInfo ? 'translateX(0)' : 'translateX(-120%)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <Link to={'/user/profile'} className="text-decoration-none">
              <div className="d-flex align-items-center text-center mb-4 gap-3 py-2 border-1 border-bottom">
                <Image
                  src={authUser?.user?.profileImg?.url}
                  roundedCircle
                  className="mb-3"
                  alt="User"
                  style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                />
                <h4 className="fw-medium text-dark" style={{ fontSize: "25px" }}>{authUser?.user?.fullName}</h4>
              </div>
            </Link>
            <div className="d-flex flex-column gap-3 mt-5 justify-content-center align-items-center">
              <Link to={'/admin/dashboard/upload-blog'} className="w-100 text-center fw-semibold py-3 rounded-3 text-dark mb-2 text-decoration-none" style={{ backgroundColor: "#e7c6ff" }}>Upload Blog</Link>
              <Link to={'/admin/dashboard/manage-blogs'} className="w-100 text-center fw-semibold py-3 rounded-3 text-dark mb-2 text-decoration-none" style={{ backgroundColor: "#b6ccfe" }}>Manage Blogs</Link>
              <Link to={'/logout'} className="w-100 text-center fw-semibold py-3 rounded-3 text-white mb-2 text-decoration-none" style={{ backgroundColor: "#ffc8dd" }}><Logout/></Link>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={9} className="ms-md-auto mt-4">
            <Row className="mb-4">
              <Col xs={12} sm={4} md={4} className="text-center mb-4 mb-md-0">
                <Link to={'/admin/dashboard/manage-blogs'} className="text-decoration-none">
                  <Card className="text-white p-5 background text-center shadow border-0">
                    <Card.Body className="fw-bold">
                      <Card.Title>Total Blogs</Card.Title>
                      <Card.Text>{blogs?.length}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col xs={12} sm={4} md={4} className="text-center mb-4 mb-md-0">
                <Link to={'/admin/dashboard/all-users'} className="text-decoration-none">
                  <Card className="text-white p-5 background2 text-center shadow border-0">
                    <Card.Body className="fw-bold">
                      <Card.Title>Total Users</Card.Title>
                      <Card.Text>{users?.length}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col xs={12} sm={4} md={4} className="text-center mb-4 mb-md-0">
                <Link to={'/admin/dashboard/all-comments'} className="text-decoration-none">
                  <Card className="text-white p-5 background3 text-center shadow border-0">
                    <Card.Body className="fw-bold">
                      <Card.Title>Total Comments</Card.Title>
                      <Card.Text>{comments?.length}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>

            <Card className="p-3 shadow-sm">
              <Bar data={chartData} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
