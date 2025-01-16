import React from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { useAuth } from '../contextApi/AuthProvider'
const Logout = () => {
    const {authUser,updateAuthUser} = useAuth()
    const handleLogout = ()=>{
        try {
            updateAuthUser({
                ...authUser,
                user: null
            })
            Cookies.remove('jwt')
            localStorage.removeItem('Blog-Users');
            toast.success("User logout successfully.");
            setTimeout(() => {window.location.reload()},1000);
        } catch (error) {
            toast.error("Error" + error.message)
        }
    }
  return (
    <div><Link to={'/'} onClick={handleLogout} className='text-decoration-none text-dark'>Logout</Link></div>
  )
}

export default Logout