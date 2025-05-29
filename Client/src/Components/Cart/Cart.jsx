import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartDataTrasfer } from '../Router/Router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NotFound from '../not found/NotFound';

function Cart() {

    const [userData, setUserData] = useState("")
    const [cartData, setCartData] = useState([])
     const {setCartQuatities} = useContext(CartDataTrasfer)

    useEffect(() => {
        axios.get("http://localhost:5000/api/users/toMe", { withCredentials: true })
            .then(response => {
                setUserData(response.data.data)
            })
            .catch(err => console.log("error Found", err));
    }, []);

    useEffect(() => {
        if (userData && userData._id) {
            axios.get(`http://localhost:5000/api/users/${userData._id}/cart`, { withCredentials: true })
                .then(res => setCartData(res.data.data))
                .catch(err => {
                    const msg = err.response?.data?.message || err.message;
                    console.log(msg)
                });
        }
    }, [userData])

    function handlequantitychange(id, calc) {
        axios.patch("http://localhost:5000/api/users/quantityUpdate", { productId: id, quantity: calc }, { withCredentials: true })
            .then(res => {
                toast.success(res.data.message)
                axios.get(`http://localhost:5000/api/users/${userData._id}/cart`, { withCredentials: true })
                    .then(res => setCartData(res.data.data))
                    .catch(err => toast.error("Failed to refresh cart data"));
            })
            .catch(err => {
                const msg = err.response?.data?.message || err.message;
                toast.error(msg)
                console.log(msg)
            })
    }

    function handledelete(id) {
        axios.delete(`http://localhost:5000/api/users/${id}/delete`,{ withCredentials: true })
            .then(res => {
                toast.success(res.data.message)
                axios.get(`http://localhost:5000/api/users/${userData._id}/cart`, { withCredentials: true })
                    .then(res => {
                        console.log("res.data.data.length"+res.data.data.length,"res.data.data"+res.data.data)
                        const cartLength=res.data.data.length
                        const cartMatch=res.data.data
                        setCartQuatities(Array.isArray(cartMatch)?cartLength:0)
                        setCartData(res.data.data)
                    }
                    )
                    .catch(err => toast.error("Failed to refresh cart data"));
            })
            .catch(err=>{
                const msg = err.response?.data?.message || err.message;
                toast.error(msg)
                console.log(msg)
            })
    }

    console.log(cartData)

    return (
        <div className="max-w-[1000px] mx-auto p-6 bg-white border border-1 mt-20 mb-20 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">products</h2>
            {Array.isArray(cartData) &&cartData.map((product) => (
                <div className="border p-4 flex items-center gap-4 rounded-lg" key={product.productId._id}>
                    <button className="text-gray-500 hover:text-red-500" onClick={() => handledelete(product.productId._id)}>&times;</button>
                    <img src={product.productId.images} alt="Product" className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-1">
                        <h3 className="text-lg font-medium">{product.productId.shoe_name}</h3>
                        <p className="text-lg font-bold mt-1">₹{product.productId.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => handlequantitychange(product.productId._id, product.quantity - 1)}>-</button>
                        <span className="px-3 py-1 border rounded">{product.quantity}</span>
                        <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => handlequantitychange(product.productId._id, product.quantity + 1)}>+</button>
                    </div>
                </div>
            ))}
            <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-lime-700 text-white rounded hover:bg-lime-800" onClick={() => navigate('/products')}>continue shopping</button>
            </div>
            <div className="mt-6 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">order summary</h3>
                <p className="text-lg font-bold text-lime-700">
                    {/* Subtotal: ₹{paymentTotal} */}
                </p>
                <button className="w-full mt-4 px-4 py-2 bg-lime-700 text-white rounded hover:bg-lime-800" onClick={() => {
                    if (cartData.length > 0) {
                        navigate("/payment", { state: { from: "cartbuy" } })
                    } else {
                        toast.error("please add anything in cart")
                    }
                }
                }>proceed to checkout</button>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>

    );
}

export default memo(Cart);