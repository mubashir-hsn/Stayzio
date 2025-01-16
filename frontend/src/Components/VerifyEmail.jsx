import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const VerifyEmail = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/api/user/verifyemail';

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email };
        if (!email) {
            return toast.error("Email is required.");
        }

        try {
            const res = await axios.post("http://localhost:4001/api/users/emailverification", data);

            if (res.data) {
                // Navigate to the desired location after successful signup
                navigate(from, { replace: true });
            }
        } catch (err) {
            if (err.response) {
                toast.error("Error: " + err.response.data.message);
            } else {
                toast.error("Something went wrong.");
            }
        }
    };
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="shadow-lg p-4 bg-white rounded" style={{ maxWidth: "500px", width: "100%" }}>
                <Col>
                    <h3 className="text-center mb-4">Email Verification</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-3 py-3" controlId="otpInput">
                            <Form.Label className="h6">Email:</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="py-2 px-3 mt-1"
                                style={{boxShadow:"none"}}
                            />
                        </Form.Group>
                        <Button type="submit" className="w-100 Btn py-2 rounded border-0 my-2" style={{ backgroundColor: '#24befa' }}>
                            Send
                        </Button>
                    </Form>
                    <p className="text-center mt-3">
                        Have an account.{' '}
                        <Link to="/login" className="text-primary text-decoration-underline">
                            Login
                        </Link>{' '}
                        here.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default VerifyEmail