import axios from 'axios'
import React, { memo,useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductAdminView() {

    const UserId= localStorage.getItem("id")
    const navigate= useNavigate()
    
    useEffect(() => {
      if (UserId !== "ab01") {
        navigate("*");
      }
    }, [UserId]);

    const [product,setProduct]=useState([])
    const {shoesId}=useParams()


    useEffect(() => {
        axios.get(`https://shoes-ecommerce-9ems.onrender.com/shoes/${shoesId}`)
            .then(responsive => setProduct(responsive.data))
            .catch(err => toast.error(`erroor found:${err.message}`))
    }, [shoesId])


    return (
        <>
            <div className="max-w-4xl mx-auto p-6 mt-10 mb-10 bg-white border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex justify-center">
                        <img
                            src={product.shoe_image}
                            alt={product.shoe_name}
                            className="w-full max-w-sm object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800 mt-10">{product.shoe_name}</h2>
                            <p className="text-gray-500 mt-10">Brand : {product.brand_name}</p>
                            <p className="text-gray-500 mt-5">Gender : {product.category}</p>
                            <p className="mt-4 text-gray-600 mt-5">Shoes Type : {product.type}</p>
                            <p className="text-lg font-semibold text-lime-400 mt-20">Amount: ₹{product.amount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    )
}

export default memo(ProductAdminView)