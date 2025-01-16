import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contextApi/AuthProvider';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const {updateAuthUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/' ;

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Validate required fields
        if (!email || !password) {
          return toast.error("Email and password are required.");
        }
      
        const data = {
          email,
          password,
        };
      
        try {
          const res = await axios.post("http://localhost:4001/api/users/login", data);
      
          if (res.data) {
            // Success handling
            toast.success("User logged in successfully.");
            localStorage.setItem("Blog-Users", JSON.stringify(res.data.user));
            updateAuthUser(res.data);
            navigate(from, { replace: true });
          }
        } catch (err) {
          // Error handling
          if (err.response) {
            toast.error("Error: " + err.response.data.message);
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        }
      };
      
    return (
        <Container fluid className="flex vh-100">
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <div className="border shadow p-4 bg-white rounded">
                        <h3 className="text-start p-2 mb-4 font-weight-bold" style={{color: '#24befa'}}>Login Here!</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Control
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mb-3 py-2 px-3 outline-0 border-1"
                                    style={{boxShadow:"none"}}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mb-3 py-2 px-3 "
                                    style={{boxShadow:"none"}}
                                />
                            </Form.Group>
                            {message && <Alert variant="danger" className="mt-2">{message}</Alert>}
                            <Button type="submit" className="w-100 Btn py-2 rounded border-0" style={{backgroundColor: '#24befa'}}>
                                Login
                            </Button>
                        </Form>
                        <p className="text-center mt-3">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary text-decoration-underline">
                                Register
                            </Link>{' '}
                            here.
                        </p>
                    </div>
                    <div className='d-flex gap-1 mt-4'>
                        <span>Didn't receive instructions?</span>
                         <Link to={'/verifyemail'} className='text-primary text-decoration-none'>verify email</Link>.
                    </div>
                </Col>
            </Row>
            <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <Link to="/" className="Btn text-decoration-none">
                    Back
                </Link>
            </div>
        </Container>
    );
}

export default Login;
