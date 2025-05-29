import axios from 'axios'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CartDataTrasfer } from '../Router/Router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
    const navigate = useNavigate()
    const { cartid, setCartId, setpaymentTotal, setQuantities, buyingarea, setBuyingArea, setCartQuatities, userDetails, orderProduct, setOrderProduct } = useContext(CartDataTrasfer)
    const { productId } = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/products/${productId}`)
            .then(responsive => setProduct(responsive.data.data))
            .catch(err => toast.error(`erroor found:${err.message}`))
    }, [])


    function AddCart(id) {
        axios.post(`http://localhost:5000/api/users/${id}/cart`, {}, { withCredentials: true })
            .then(res => {
                const userId=res.data.user
                axios.get(`http://localhost:5000/api/users/${userId}/cart`, { withCredentials: true })
                .then(res =>{
                    const cartLength=res.data.data.length
                     console.log("res.data.data.length"+res.data.data.length,"res.data.data"+res.data.data)
                   setCartQuatities(cartLength)
                })
                .catch(err => {
                    const msg = err.response?.data?.message || err.message;
                    console.log(msg)
                });
                toast.success(res.data.message)
            })
            .catch(err => {
                const msg = err.response?.data?.message || err.message;
                toast.error(`Error: ${msg}`);
            })
    }




    function handleBuyNow(id) {
        axios.get(`http://localhost:5000/api/users/${id}/buyNow`, { withCredentials: true })
            .then(res => {
               navigate("/payment", { state: { from: "buynow" } ,productId: product._id });
            })
            .catch(err => {
                const msg = err.response?.data?.message || err.message;
                toast.error(`Error: ${msg}`);
            })
    }




    return (
        <>
            <div className="max-w-4xl mx-auto p-6 mt-10 mb-10 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex justify-center">
                        <img
                            src={product.images}
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
                            <button className="px-4 py-2 bg-lime-700 text-white rounded hover:bg-lime-800 w-full mt-5" onClick={() => AddCart(product._id)}>Add to Cart</button>
                            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 w-full mt-3" onClick={() => handleBuyNow(product._id)}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    )
}

export default memo(ProductDetails)