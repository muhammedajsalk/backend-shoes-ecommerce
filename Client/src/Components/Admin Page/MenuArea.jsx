import React, { useState } from 'react';
import shoe from '../../assets/images/Logo/shoe.png';
import { useNavigate } from 'react-router-dom';

function MenuArea() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        className="xl:hidden fixed top-4 left-4 z-20 p-3 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full shadow-lg focus:outline-none transition-all transform hover:scale-105 hover:shadow-2xl"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <i className="fa-solid fa-x text-2xl text-white"></i>
        ) : (
          <i className="fa-solid fa-bars text-2xl text-white"></i>
        )}
      </button>
      <div
        className={`bg-gray-900 bg-opacity-80 flex flex-col p-6 h-screen shadow-lg w-[300px] fixed top-0 left-0 z-10 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } xl:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-40 w-full flex items-center justify-center mb-6">
          <img src={shoe} alt="Shoe Logo" className="h-full object-contain rounded-md shadow-md" />
        </div>
        <nav className="mt-10 w-full text-center">
          <ul className="text-lg md:text-2xl font-semibold space-y-8 text-white">
            <li
              className="hover:text-blue-500 hover:scale-105 transition-all cursor-pointer transform hover:translate-x-2"
              onClick={() => navigate('/admin')}
            >
              dashboard
            </li>
            <li
              className="hover:text-blue-500 hover:scale-105 transition-all cursor-pointer transform hover:translate-x-2"
              onClick={() => navigate('/admin/product_admin')}
            >
              products
            </li>
            <li
              className="hover:text-blue-500 hover:scale-105 transition-all cursor-pointer transform hover:translate-x-2"
              onClick={() => navigate('/admin/users_admin')}
            >
              users
            </li>
            <li
              className="bg-red-600 text-white py-3 rounded-lg shadow-md hover:opacity-80 transition-all cursor-pointer transform hover:scale-105"
              onClick={() => {
                localStorage.removeItem('id');
                navigate('/login');
              }}
            >
              logout
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MenuArea;
