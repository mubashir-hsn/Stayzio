import React from 'react'
import {createBrowserRouter} from "react-router-dom";
import App from '../App';
import HomePage from '../Pages/HomePage';
import Login from '../Components/Login';
import Register from '../Components/Register';
import OtpVerification from '../Components/OtpVerification';
import VerifyEmail from '../Components/VerifyEmail';
import SingleBlog from '../Pages/SingleBlog';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import PrivacyPolicy from '../Pages/PrivacyPolicy.jsx'
import Profile from '../Admin/Profile.jsx';
import Dashboard from '../Admin/Dashboard/Dashboard.jsx';
import UploadBlog from '../Admin/Dashboard/UploadBlog.jsx';
import ManageBlogs from '../Admin/Dashboard/ManageBlogs.jsx';
import Users from '../Admin/Dashboard/Users.jsx';
import UpdateBlog from '../Admin/Dashboard/UpdateBlog.jsx';
import AllComments from '../Admin/Dashboard/AllComments.jsx';
import DashboardLayout from '../Admin/Dashboard/DashboardLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "blog/:id", element: <SingleBlog /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacypolicy", element: <PrivacyPolicy /> },
    ],
  },
  { 
    path: '/login',
    element: <Login />
  },

  {
     path: '/register',
     element: <Register />
  },

  { path: "/api/user/verifyemail", element: <OtpVerification /> },
  { path: "/verifyemail", element: <VerifyEmail /> },
  { path: "/user/profile", element: <Profile /> },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute requiredRole="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, path: '/admin/dashboard', element: <Dashboard /> },
      { path: 'upload-blog', element: <UploadBlog /> },
      { path: 'manage-blogs', element: <ManageBlogs /> },
      { path: 'update-blog/:id', element: <UpdateBlog /> },
      { path: 'all-users', element: <Users /> },
      { path: 'all-comments', element: <AllComments /> },
    ],
  },
]);


export default router