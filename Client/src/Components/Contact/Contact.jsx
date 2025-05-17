import React, { memo } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useFormik } from "formik";
import { ContactSchema } from "../../schema";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Contact() {

    const MySwal = withReactContent(Swal);
    
        const showSuccessToast = () => {
            MySwal.fire({
                title: "email sent Successful!",
                text: "Your email has been send successfully.",
                icon: "success",
                toast: true,
                position: "center",
                showConfirmButton: true,
                timer: 3000,
                timerProgressBar: true,
            });
        };


    const initialValues={
        name:"",
        email:"",
        message:""
    }
    
    const {values,handleChange,handleBlur,handleSubmit,errors,touched}=useFormik({
        initialValues,
        onSubmit: (values,{resetForm}) => {
              showSuccessToast()
              resetForm()
          },
        validationSchema:ContactSchema ,
    }
    )
    
    return (
            <div className="max-w-4xl mx-auto p-8 mt-10 bg-white border border-1 mb-20">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    contact us
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium">full name</label>
                        <input
                            name="name"
                            value={values.name}
                            type="text"
                            placeholder="enter your name"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.name && touched.name && (<p className="text-red-500">{errors.name}</p>)}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">email</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="enter your email"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                        {errors.email && touched.email && (<p className="text-red-500">{errors.email}</p>)}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">message</label>
                        <textarea
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows="4"
                            placeholder="enter your message"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                        ></textarea>
                        {errors.message && touched.message && (<p className="text-red-500">{errors.message}</p>)}
                    </div>
                    <button className="w-full bg-lime-700 text-white py-2 rounded-lg hover:bg-lime-800 transition" type="submit">
                        send message
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-gray-600">Address: Gandi Nagar Road Kochi,Kerala,India</p>
                    <p className="text-gray-600">Phone: +91 98765 43210</p>
                    <p className="text-gray-600">Email: ajsal@gmail.com</p>
                </div>
            </div>
    );
}

export default memo(Contact);
