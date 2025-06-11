import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-between items-center'>
      <span className='text-2xl font-bold text-white'>Blog App</span>
      <div className='flex gap-4'>
        <a href="#" className="hover:opacity-80 transition-opacity text-white">Facebook</a>
        <a href="#" className="hover:opacity-80 transition-opacity text-white">Twitter</a>
        <a href="#" className="hover:opacity-80 transition-opacity text-white">Google+</a>
      </div>
    </div>
  )
}

export default Footer
