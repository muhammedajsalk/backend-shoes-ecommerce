import React, { memo, useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CartDataTrasfer } from "../Router/Router";
import { useFormik } from "formik";
import { PaymentSchema } from "../../schema";
import axios from "axios";
import NotFound from "../not found/NotFound";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from 'react-toastify';
import Cart from "../Cart/Cart";
import { useLocation } from "react-router-dom";


function Payment() {

    const location = useLocation();
    const locationdata = location.state?.from || "";

    const MySwal = withReactContent(Swal);

    const showSuccessToast = () => {
        MySwal.fire({
            title: "Payment Successful!",
            text: "Your order has been placed successfully.",
            icon: "success",
            toast: true,
            position: "center",
            showConfirmButton: true,
            timer: 3000,
            timerProgressBar: true,
        });
    };


    const { paymentTotal, quantities, setpaymentTotal,buyingarea,setCartQuatities,orderProduct,setOrderProduct} = useContext(CartDataTrasfer)
    const [state, setState] = useState([])
    const [formerOrder, setFormerOrder] = useState({})
    const [formercartitems,setformarcartitems]=useState([])
    

    const initialValues = {
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    };
    const userId = localStorage.getItem("id")

    if (!userId) {
        return <NotFound name="please login after come the page"/>
    }

    useEffect(() => {
        axios.get(`https://shoes-ecommerce-9ems.onrender.com/users/${userId}`)
            .then((responsive) => {
                setState(responsive.data.cart)
                setFormerOrder(responsive.data.orders)
                setformarcartitems(responsive.data.cart)
            })
            .catch(err => toast.error(`error found:${err}`))
    }, [])


    console.log(orderProduct)


    

    const now = new Date();
    const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const indiaDateTime = now.toLocaleString('en-IN', options);



    const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
        initialValues,
        validationSchema: PaymentSchema,
        onSubmit: (values,{resetForm}) => {
            if (paymentTotal === 0) {
                toast.error("please add products in cart")
            } else {
                const orderDetails = {
                    dates: indiaDateTime,
                    cart: locationdata=="buynow"? buyingarea : state ,
                    payment_total: paymentTotal,
                    payment_details: values,
                    quantities: quantities
                };
                const updatedOrders = Array.isArray(formerOrder) ? [...formerOrder, orderDetails] : [orderDetails];

                axios.patch(`https://shoes-ecommerce-9ems.onrender.com/users/${userId}`, { orders: updatedOrders,cart: locationdata === "buynow" ? formercartitems : []})
                    .then((response) => {
                        showSuccessToast()
                        resetForm()
                        setpaymentTotal(0)        
                    })
                    .catch(err => toast.error(`Error updating order:${err.message}`));
               

                if(locationdata==="cartbuy"){
                    setCartQuatities(0)
                }
                

            }
        }
    })

    return (
        <div className="max-w-2xl mx-auto p-8 mt-10 mb-10 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Payment Details
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-700 font-medium">Cardholder Name</label>
                    <input
                        name="cardholderName"
                        value={values.cardholderName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Enter name on card"
                        className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                    {errors.cardholderName && touched.cardholderName && (<p className="text-red-500">{errors.cardholderName}</p>)}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Card Number</label>
                    <input
                        name="cardNumber"
                        value={values.cardNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"

                    />
                    {errors.cardNumber && touched.cardNumber && (<p className="text-red-500">{errors.cardNumber}</p>)}
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">Expiry Date</label>
                        <input
                            name="expiryDate"
                            value={values.expiryDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="MM/YY"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                        {errors.expiryDate && touched.expiryDate && (<p className="text-red-500">{errors.expiryDate}</p>)}
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">CVV</label>
                        <input
                            name="cvv"
                            value={values.cvv}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="123"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                        {errors.cvv && touched.cvv && (<p className="text-red-500">{errors.cvv}</p>)}
                    </div>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                    <div className="flex justify-between text-gray-700 font-medium">
                        <span>Total Amount:</span>
                        <span className="text-xl font-bold text-gray-900">₹ {parseFloat(paymentTotal).toFixed(2)}</span>
                    </div>
                </div>

                <button className="w-full bg-lime-700 text-white py-2 rounded-lg hover:bg-lime-800 transition" type="submit" >
                    Pay Now
                </button>
                <span className="text-red-800">Desclaimer:- don't refress at this time</span>
            </form>

            <div className="mt-6 text-center text-gray-600">
                🔒 Secure & Encrypted Payment
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default memo(Payment);
