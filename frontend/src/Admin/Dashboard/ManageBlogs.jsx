import React from 'react'
import NavDashboard from './NavDashboard.jsx'
import { useDeleteBlogMutation, useFetchAllBlogsQuery } from '../../redux/blog/blogApi.js'
import { FormatDate } from '../../Components/FormatDate.jsx';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'

const ManageBlogs = () => {
    const { data: blogs = []} = useFetchAllBlogsQuery();
    const [deleteBlog] = useDeleteBlogMutation();

    const handleDelete = async(id)=>{
       try {
        const res = await deleteBlog(id).unwrap();
       toast.success('Blog deleted successfully.');
       } catch (error) {
        toast.error("Failed to delete blog.Please try again")
        console.log('Failed to delete blog: ', error)
       }
    }
  return (
    <div>
      <NavDashboard/>
      <div>
        <div className=''>
            <div className="container p-4 bg-white shadow-sm rounded-3" style={{marginTop:"6rem"}}>
                <h3 className="p-3 border-1 border-bottom mb-3"> All Blogs ({blogs?.length}) </h3>

                <div className='mt-5'>
                   {
                    blogs.map((blog,index)=>(
                      <div key={index} className='p-3 border mb-2 d-flex flex-column gap-3 gap-sm-0 flex-sm-row justify-content-center justify-content-sm-between align-items-start'>
                        <div className='d-flex gap-3 align-items-center'>
                          <span>{index+1}.</span>
                          <img src={blog?.coverImg} alt="" className='rounded-circle' style={{height:"60px", width:"55px"}}/>
                           <div className=''>
                               <h4 className='fw-medium' style={{fontSize:"16px"}}>{blog?.title}</h4>
                               <p className='text-primary fw-bold' style={{fontSize:"12px"}}>{FormatDate(blog?.createdAt)}</p>
                           </div>
                        </div>
                        <div className='d-flex justify-content-center align-items-center gap-3'>
                          <Link to={`/admin/dashboard/update-blog/${blog?._id}`} className='p-2 p-1 text-white bg-success rounded-2 text-decoration-none'>Edit</Link>
                          <Link onClick={()=> handleDelete(blog?._id)} className='p-2 text-white bg-danger rounded-2 text-decoration-none'>Delete</Link>
                        </div>
                      </div>
                    ))
                   }
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ManageBlogs