import React from 'react'
import NavDashboard from './NavDashboard.jsx'
import { useGetAllUsersQuery } from '../../redux/auth/authApi.js'
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.png'
const Users = () => {
  const {data: users=[]} = useGetAllUsersQuery()
  return (
    <div>
    <NavDashboard/>
    <div>
      <div className=''>
          <div className="container p-4 bg-white shadow-sm rounded-3" style={{marginTop:"6rem"}}>
              <h3 className="p-3 border-1 border-bottom mb-3"> All Users</h3>
              <div className='mt-5'>
                   {
                    users.map((user,index)=>(
                      <div key={index} className='p-3 border mb-2 d-flex gap-3 gap-sm-0 justify-content-between align-items-start'>
                        <div className='d-flex gap-3 align-items-center'>
                          <img src={user?.profileImg?.url || avatar} alt="" className='rounded-circle' style={{height:"50px", width:"50px"}}/>
                           <div className=''>
                               <h4 className='fw-medium' style={{fontSize:"18px"}}>{user?.fullName || user?.fullname}</h4>
                               <p className='text-primary fw-bold' style={{fontSize:"12px"}}>{user?.email}</p>
                           </div>
                        </div>
                        <div className='d-flex justify-content-center align-items-center gap-3'>
                          <Link className='p-2 p-1 text-white bg-success rounded-2 text-decoration-none'>Edit</Link>
                          <Link className='p-2 text-white bg-danger rounded-2 text-decoration-none'>Delete</Link>
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

export default Users