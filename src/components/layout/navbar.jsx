import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="container flex items-center justify-between h-16 px-4 mx-auto bg-black sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <Link to="/" className='ml-2 text-lg font-bold text-white cursor-pointer'>
          StaffSync
        </Link>
      </div>
      <div className='flex-row items-center gap-8 p-2 text-lg font-medium md:flex'>
        <div className='flex'>
          <Link 
            to="/dashboard" 
            className='p-2 mr-2 text-black bg-white rounded-lg cursor-pointer hover:bg-gray-200 transition-colors'
          >                
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar