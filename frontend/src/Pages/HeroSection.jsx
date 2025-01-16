import React from 'react';
import { Container, Carousel, Row, Col } from 'react-bootstrap';
const HeroSection = ()=> {
    return (
      <Container className="mt-1 mt-md-5 p-2 p-md-4">
        <Row className='py-5'>
          {/* Branding Section */}
          <Col md={6} className="d-flex align-items-center p-md-2 justify-content-start mt-5 mt-md-0 order-2 order-md-1">
            <div>
              <h1 className='font-bold'>Hotels With Rooftop Pools Near Me</h1>
              <p className='py-3 text-justify'>Discovering hotels with rooftop pools near you! Whether you're planning a luxurious staycation or a weekend getaway, our curated selection of hotels with rooftop pools will help you beat the heat and elevate your travel experience.</p>
              <button className="Btn bg-gradient-dark">Read More</button>
            </div>
          </Col>
  
          {/* Slider Section */}
          <Col md={6} className='order-1 order-md-2'>
            <Carousel interval={2000} pause={false} controls={false}>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-image"
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-image"
                  src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-image"
                  src="https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    );
  }

export default HeroSection