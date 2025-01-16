import React, { useState } from 'react'
import SearchBlog from './SearchBlog'
import { useFetchBlogsQuery } from '../redux/blog/blogApi.js'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';

const Blog = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState({ search: "", category: "" })

  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query)
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSearch = () => setQuery({ search, category })
  return (
    <div>
      <SearchBlog search={search} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />

      {isLoading && <div>Loading.....</div>}
      {error && <div>{error.toString()}</div>}

      <Container className="mt-5 pb-5">
        <Row className="g-4">
          {blogs.map((blog) => (
            <Col key={blog?._id} md={4}>
              <Link to={`/blog/${blog?._id}`} className="blog-card border-0 text-decoration-none">
                <div className="card border-0 h-100 shadow">
                  <img
                    src={blog?.coverImg}
                    alt="blog-cover"
                    className="card-img-top blog-img"
                  />
                  <div className="card-body">
                    <h5 className="blog-title1">{blog?.title}</h5>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Blog