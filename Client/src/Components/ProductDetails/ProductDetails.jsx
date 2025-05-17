import axios from 'axios'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CartDataTrasfer } from '../Router/Router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
    const navigate = useNavigate()
    const { cartid, setCartId, setpaymentTotal, setQuantities, buyingarea, setBuyingArea, setCartQuatities } = useContext(CartDataTrasfer)
    const { productId } = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get(`https://shoes-ecommerce-9ems.onrender.com/shoes/${productId}`)
            .then(responsive => setProduct(responsive.data))
            .catch(err => toast.error(`erroor found:${err.message}`))
    }, [])


    const AddCart = useCallback(async (id) => {
        if (cartid.includes(id)) {
            toast.warning("Iitem is already in the cart.");
            return;
        }

        const userId = localStorage.getItem("id");
        if (!userId) {
            toast.error("please log in to add items to your cart.");
            return;
        }

        try {
            const response = await axios.get(`https://shoes-ecommerce-9ems.onrender.com/users/${userId}`);
            const existingCart = response.data.cart || [];
            setCartQuatities((prev) => prev + 1)
            if (existingCart.includes(id)) {
                toast.warning("item is already in the cart.");
                return;
            }
            const updatedCart = [...existingCart, id];
            await axios.patch(`https://shoes-ecommerce-9ems.onrender.com/users/${userId}`, { cart: updatedCart });

            setCartId(updatedCart);
            toast.success("item added to cart successfully");
        } catch (err) {
            toast.error("failed to update cart. try again.");
        }
    }, [cartid, setCartId]);




    const handleBuyNow = useCallback(() => {
        if (!product) return;
        const userId = localStorage.getItem("id");
        if (!userId) {
            toast.error("Please log in to proceed with payment.");
            return;
        }
        const updatedCart = [product.id]
        setBuyingArea(updatedCart)
        setpaymentTotal(product.amount);
        setQuantities(1);
        navigate("/payment", { state: { from: "buynow" } });
    }, [product, setpaymentTotal, setQuantities, navigate])



    return (
        <>
            <div className="max-w-4xl mx-auto p-6 mt-10 mb-10 bg-white">
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
                            <button className="px-4 py-2 bg-lime-700 text-white rounded hover:bg-lime-800 w-full mt-5" onClick={() => AddCart(product.id)}>Add to Cart</button>
                            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 w-full mt-3" onClick={handleBuyNow}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    )
}

export default memo(ProductDetails)