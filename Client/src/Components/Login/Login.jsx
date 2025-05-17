import axios from "axios";
import { useFormik } from "formik";
import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate()
  const [datass, setDatass] = useState([])


  const initialValues = {
    email: "",
    password: ""
  }

  useEffect(() => {
    axios.get("https://shoes-ecommerce-9ems.onrender.com/users")
      .then(responsive => setDatass(responsive.data))
      .catch(err => toast.error(`error fetch found ${err.message}`))
  }, [])

  const { values, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues,
    onSubmit: (values) => {
      const userDatas = datass.find(items => items.email === values.email && items.password === values.password)
      if (userDatas != undefined&& userDatas.isActive===true && userDatas.isAdmin===true) {
        localStorage.setItem("id", userDatas.id);
        navigate("/admin")
      }else if(userDatas != undefined&& userDatas.isActive===true){
        localStorage.setItem("id", userDatas.id);
        navigate("/")
      }else{
        toast.error("your entered details in correct")
      }
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
