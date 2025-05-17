import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from "formik";
import { ProductAddSchema } from '../../../schema';
import { ToastContainer, toast } from 'react-toastify';


function AddProduct() {


    const UserId= localStorage.getItem("id")
    const navigate= useNavigate()
    
    useEffect(() => {
      if (UserId !== "ab01") {
        navigate("*");
      }
    }, [UserId]);

    const initialValues={
        shoe_name:"",
        brand_name:"",
        category:"",
        type:"",
        amount:"",
        shoe_image:"",
    }

    const {handleSubmit,handleChange,values,errors,touched,resetForm}=useFormik({
         initialValues,
         validationSchema:ProductAddSchema,
         onSubmit:(values)=>{
            axios.post("https://shoes-ecommerce-9ems.onrender.com/shoes",values)
            .then(response=>{
                toast.success("succefully posted")
                resetForm()
            })
            .catch(err=>toast.error("succefully posted",err))
         }
    })
    
   
  return (
    <div className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10'>
            <h2 className='text-2xl font-semibold mb-4 text-center'>add product</h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                    <label className='block mb-1 font-medium'>Shoe Name</label>
                    <input type='text' name='shoe_name' value={values.shoe_name}   className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={handleChange} />
                    {errors.shoe_name && errors.shoe_name && (<p className="text-red-500">{errors.shoe_name}</p>)}
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Brand Name</label>
                    <input  type='text' name='brand_name' value={values.brand_name}    className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'onChange={handleChange} />
                    {errors.brand_name && errors.brand_name && (<p className="text-red-500">{errors.brand_name}</p>)}
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Category</label>
                    <input  type='text' name='category' value={values.category}   className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'onChange={handleChange} />
                    {errors.category && errors.category && (<p className="text-red-500">{errors.category}</p>)}
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Type</label>
                    <input type='text' name='type' value={values.type}  className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={handleChange} />
                    {errors.type && errors.type && (<p className="text-red-500">{errors.type}</p>)}
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Amount</label>
                    <input type='text' name='amount' value={values.amount}    className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={handleChange}/>
                    {errors.amount && errors.amount && (<p className="text-red-500">{errors.amount}</p>)}
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Shoe Image URL</label>
                    <input  type='text' name='shoe_image' value={values.shoe_image}   className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={handleChange}/>
                    {errors.shoe_image && errors.shoe_image && (<p className="text-red-500">{errors.shoe_image}</p>)}
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'>Edit Submit</button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
  )
}

export default AddProduct