import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useFetchBlogByIdQuery } from '../redux/blog/blogApi';
import { useParams } from 'react-router-dom';
import SingleBlogCard from './SingleBlogCard';
import CommentCard from './CommentCard';
import RelatedBlogs from './RelatedBlogs';

const SingleBlog = () => {
  const { id } = useParams()
  const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id)
  return (
    <>
      {isLoading && <div>Loading.....</div>}
      {error && <div>Something went wrong.</div>}

      <Container fluid className="mt-5 h-100">
        {
          blog && (
            <Row className='gap-4 m-auto justify-content-center align-items-start'>

              <Col md={10} lg={7} className="">
                <SingleBlogCard blog={blog?.blog} />
                <CommentCard comments={blog?.comments}/>
              </Col>

              <Col md={10} lg={4} className='bg-white p-2 rounded-3'>
                <RelatedBlogs/>
              </Col>

            </Row>
          )
        }
      </Container>
    </>
  );
};

export default SingleBlog;
