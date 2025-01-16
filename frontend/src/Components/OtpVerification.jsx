import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerification = ()=>{

    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/login' ;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!code) {
      return toast.error("OTP is required.");
    }
  
    const data = { code };
    try {
      const res = await axios.post("http://localhost:4001/api/users/verifyemail", data);
  
      if (res.data) {
          toast.success("Email verified successfully.Now you can login.");
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
          <h3 className="text-center mb-4">OTP Verification</h3>
          <Alert variant="success" className="text-center">
            We've sent a verification code to your email. 
          </Alert>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3 py-3" controlId="otpInput">
              <Form.Label className="h3">Enter Code:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="py-3 px-3 mt-1"
                style={{boxShadow:"none"}}
              />
            </Form.Group>
            <Button type="submit" className="w-100 Btn py-2 rounded border-0 my-2" style={{backgroundColor: '#24befa'}}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default OtpVerification;
