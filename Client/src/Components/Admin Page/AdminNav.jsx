import React from 'react'

function AdminNav() {
  return (
    <div className='w-full h-20 flex justify-between items-center bg-blue-300 shadow-lg px-8'>
      <span className='text-white font-bold text-xl'>
        <h1></h1>
      </span>
      <span className='flex items-center space-x-2 text-white'>
        <i className="fa-solid fa-user text-2xl hover:text-blue-500 transition-all duration-200"></i>
        <h2 className='text-lg'>Muhammed Ajsal</h2>
      </span>
    </div>
  )
}

export default AdminNav
