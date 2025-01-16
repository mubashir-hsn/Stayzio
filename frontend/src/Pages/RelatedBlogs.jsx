import React from 'react'
import { useFetchRelatedBlogsQuery } from '../redux/blog/blogApi'
import { Link, useParams } from 'react-router-dom'
import avatar from '../assets/avatar.png'
const RelatedBlogs = () => {
    const { id } = useParams()
    const { data: blogs = [], isLoading } = useFetchRelatedBlogsQuery(id);

    return (
        <div>
            <div>
                <h4 className='px-4 py-3 bg-white rounded-top-2 border-bottom border-1' style={{ fontSize: "22px", fontWeight: "600" }}>Related Blogs</h4>
            </div>
            {isLoading && <div>Loading.....</div>}

            {
                blogs.length > 0 ? (
                    <div className='bg-white rounded-bottom-2 pt-4 p-3 d-flex flex-column gap-2'>
                        {
                            blogs.map((blog, index) => (
                                <Link to={`/blog/${blog?._id}`} key={index} className=' text-decoration-none d-flex justify-content-center align-items-start gap-2'>
                                    <div>
                                        <img src={blog?.coverImg} alt="" className=' rounded-circle' style={{ height: "50px", width: "50px" }} />
                                    </div>
                                    <div>
                                        <h5 className=' text-primary' style={{fontSize:"16px", fontWeight:"700"}}>{blog?.title?.substring(0, 50)}</h5>
                                        <p className=' text-black-50' style={{fontSize:"14px", fontWeight:"500"}}>{blog?.description?.substring(0, 70)}.....</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                ) : (
                    <div className="p-3 bg-white rounded-bottom-2" style={{ fontSize: "16px", fontWeight: "550" }}> No related blogs found.</div>
                )
            }
        </div>
    )
}

export default RelatedBlogs