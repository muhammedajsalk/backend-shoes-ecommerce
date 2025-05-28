import axios from "axios";
import { useFormik } from "formik";
import React, { memo, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { loginSceama } from "../../schema";
import { CartDataTrasfer } from "../Router/Router";



function Login() {
  const navigate = useNavigate()
  const { userDetails, setUserDetails } = useContext(CartDataTrasfer)
  const initialValues = {
    email: "",
    password: ""
  }

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues,
    validationSchema: loginSceama,
    onSubmit: (values) => {
      axios.post("http://localhost:5000/api/users/login", values, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message)
          setUserDetails(res.data.data)
          setTimeout(() => {
            navigate("/");
          }, 4000);
        })
        .catch(err => {
          const msg = err.response?.data?.message || err.message;
          toast.error(`Error: ${msg}`);
        })
    }
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white  p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <button className="w-full bg-lime-700 text-white py-2 rounded-lg hover:bg-lime-800 transition" type="submit">
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to={"/register"}>
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

export default memo(Login);
