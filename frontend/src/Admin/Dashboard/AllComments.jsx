import React from 'react'
import { useDeleteCommentMutation, useGetCommentsQuery } from '../../redux/comment/comment.js';
import NavDashboard from './NavDashboard.jsx'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';

const AllComments = () => {
    const { data: comments = [] } = useGetCommentsQuery();
    const [deleteComment] = useDeleteCommentMutation();

    const handleDelete = async(id)=>{
        try {
         const res = await deleteComment(id).unwrap();
        toast.success('Comment deleted successfully.');
        window.location.reload();
        } catch (error) {
         toast.error("Failed to delete comment.Please try again")
         console.log('Failed to delete comment: ', error)
        }
     }

    return (
        <div>
            <NavDashboard />
            <div>
                <div className=''>
                    <div className="container p-4 bg-white shadow-sm rounded-3" style={{ marginTop: "6rem" }}>
                        <h3 className="p-3 border-1 border-bottom mb-3"> All Comments</h3>
                        <div className='mt-5'>
                            {
                                comments.map((comment, index) => (
                                    <div key={index} className='p-3 border mb-2 d-flex gap-3 gap-sm-0 justify-content-between align-items-start'>

                                        <div className='d-flex gap-3'>
                                            <span className='fw-bold text-primary'>{index + 1}.</span>
                                            <div className='d-flex flex-column gap-2'>
                                                {/* blog detail */}
                                                <div className='d-flex gap-3 align-items-center justify-content-start'>
                                                    <span className='fw-bold'>Blog:</span>
                                                    <Link to={`/blog/${comment?.blogId?._id}`} className='fw-normal' style={{ fontSize: "16px" }}>{comment?.blogId?.title}</Link>
                                                </div>
                                                {/* user detail */}
                                                <div className='d-flex gap-3 align-items-center justify-content-start'>
                                                    <span className='fw-bold'>User:</span>
                                                    <span className='fw-medium' style={{ fontSize: "16px" }}>{comment?.userId?.fullName}</span>
                                                </div>
                                                {/* user detail */}
                                                <div className='d-flex gap-3 align-items-center justify-content-start'>
                                                    <span className='fw-bold'>Comment:</span>
                                                    <span className='fw-medium' style={{ fontSize: "16px" }}>{comment?.comment}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-center align-items-center gap-3'>
                                            <Link onClick={()=> handleDelete(comment?._id)} className='p-2 text-white bg-danger rounded-2 text-decoration-none'>Delete</Link>
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

export default AllComments