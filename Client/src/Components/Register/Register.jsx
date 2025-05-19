import axios from "axios";
import { useFormik } from "formik";
import React, { memo, useCallback, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupSceama } from "../../schema";
import { ToastContainer, toast } from 'react-toastify';


function Register() {

  const initialValues = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    cart: [],
    orders: {
      date: "",
      products: [],
      amount: "",
      payment_details: ""
    },
    isActive: true
  }

  const navigate = useNavigate()

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } = useFormik(
    {
      initialValues,
      validationSchema: signupSceama,
      onSubmit: (values) => {
        axios.post("http://localhost:5000/api/users/register", values)
          .then(response => {
            navigate("/login")
          })
          .catch(err => toast.error(`error found post${err.message}`))
      }
    }
  )



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white  p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.name && touched.name && (<p className="text-red-500">{errors.name}</p>)}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email && touched.email && (<p className="text-red-500">{errors.email}</p>)}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.password && touched.password && (<p className="text-red-500">{errors.password}</p>)}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Conform Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              name="cpassword"
              value={values.cpassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.cpassword && touched.cpassword && (<p className="text-red-500">{errors.cpassword}</p>)}
          </div>
          <button className="w-full bg-lime-700 text-white py-2 rounded-lg hover:bg-lime-800 transition" type="submit" >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-lime-700 hover:underline">
              Register
            </span>
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>
  );
}

export default memo(Register);
