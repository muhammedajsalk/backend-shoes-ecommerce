import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center">
      <img
        src="https://www.planetfurniture.co.uk/wp-content/uploads/2023/04/floor-to-ceiling-open-shelving-handmade-bespoke-furniture-sneaker-room-planet-furniture-1-1080x1080.jpg"
        alt="Shoe Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div className="relative z-10 text-center px-10">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Step Into Style
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Discover the latest collection of sneakers for every occasion.
        </motion.p>

        <motion.button
          className="px-8 py-4 bg-lime-400 text-black font-semibold rounded-full shadow-lg hover:bg-lime-500 transition-transform transform hover:scale-105"
          onClick={() => navigate("/products")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          SHOP NOW
        </motion.button>
      </div>
    </div>
  );
}

export default memo(MainPage);
