import React from 'react'
import HeroSection from './HeroSection'
import Blog from './Blog'

const HomePage = () => {
  return (
    <>
      <div className='bg-white container'>
         <HeroSection/>
         <Blog/>
      </div>
    </>
  )
}
export default HomePage