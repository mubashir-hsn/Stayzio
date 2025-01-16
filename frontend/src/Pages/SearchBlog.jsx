import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const SearchBlog = ({search , handleSearchChange , handleSearch}) => {
    const handleKeypress = (event)=>{
        if (event.key==="Enter") {
            handleSearch()
        }
    }
  return (
    <Container className='my-2'>
        <Row className='flex'>
          <Col md={10} className=' mt-md-5 flex gap-2'>
              <input type="text" value={search} onChange={handleSearchChange} onKeyPress={handleKeypress} className='py-2 px-3 w-100 border-1' style={{outline: "none"}} />
              <button className='py-2 px-3 border-none bg-dark text-white border-0 text-uppercase' style={{letterSpacing:".7px"}}>Search</button>
          </Col>
        </Row>
    </Container>
  )
}

export default SearchBlog