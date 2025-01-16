
import { Outlet } from 'react-router-dom'
import BlogNavbar from './Components/BlogNavbar'
import './app.css'
import Footer from './Components/Footer'

export default function App() {

  return (
    <>
    <BlogNavbar/>
      <Outlet/>
    <Footer/>
    </>
  )
}
