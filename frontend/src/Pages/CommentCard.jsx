import React from 'react'
import avatar from '../assets/avatar.png'
import { FormatDate } from '../Components/FormatDate'
import PostComment from './PostComment'

const CommentCard = ({comments}) => {
console.log(comments)
  return (
   <div  className='bg-white p-4 rounded-3 my-5'>
     <div>
       {
        comments?.length > 0 ? (<div>
            <h3 className='p-3 border-bottom border-1' style={{fontWeight:"600" , fontSize:"18px"}}>All Comments.</h3>
            <div>
               {
                comments.map((comment,index)=>(
                    <div key={index} className='mt-4'>
                        <div className=' d-flex justify-content-start align-items-center gap-3'>
                            <img  className='rounded-circle' src={comment?.userId?.profileImg?.url || avatar} style={{height:"52px",width:"48px"}} alt="User" />
                             <div>
                                <p className=' text-capitalize text-primary text-decoration-underline fw-semibold' style={{fontSize:"16px"}}>{comment?.userId?.fullName}</p>
                                <p className=' text-black-50 fw-bold' style={{fontSize:"12px", fontStyle:"italic" , marginTop:"-12px"}}>{FormatDate(comment?.createdAt)}</p>
                             </div>
                        </div>
                        {/* comment detail */}
                        <div className='p-3 mt-3 border-primary shadow-sm' style={{borderLeft:"2px solid"}}>
                            <p className=' w-25'>{comment?.comment}</p>
                        </div>
                    </div>
                ))
               }
            </div>
        </div>) : <div style={{fontWeight:"550" , fontSize:"16px"}}>No comment found!</div>
       }
    </div>

    {/* comment field */}

    <div className='mt-5'>
        <PostComment/>
    </div>
   </div>
  )
}

export default CommentCard