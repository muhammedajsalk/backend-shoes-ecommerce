import React, { memo, useCallback, useContext, useEffect,useState } from 'react';
import axios from 'axios';
import { CartDataTrasfer } from '../Router/Router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NotFound from '../not found/NotFound';

function Cart() {
    const { paymentTotal, setpaymentTotal,quantities, setQuantities,setCartQuatities} = useContext(CartDataTrasfer)
    const [cart, setCart] = useState([]);
    const [cartProduct, setCartProduct] = useState([]);
    const navigate = useNavigate()
    const userId = localStorage.getItem("id");

    if (!userId) {
        return <NotFound />
    }
    
    useEffect(() => {
        axios.get(`https://shoes-ecommerce-9ems.onrender.com/users/${userId}`)
            .then(response => {
                setCart(response.data.cart)
                setCartQuatities(response.data.cart.length)
            })
            .catch(err => err);
    }, [userId]);


    useEffect(() => {
        if (cart.length > 0) {
            const fetchProductDetails = async () => {
                try {
                    const productPromises = cart.map(itemId =>
                        axios.get(`https://shoes-ecommerce-9ems.onrender.com/shoes/${itemId}`)
                    );
                    const productResponses = await Promise.all(productPromises);
                    const products = productResponses.map(response => response.data);
                    setCartProduct(products);

                    const initialQuantities = {};
                    products.forEach(product => {
                        initialQuantities[product.id] = 1;
                    });
                    setQuantities(initialQuantities);
                } catch (error) {
                    toast.error("error in fetching", error);
                }
            };

            fetchProductDetails();
        }
    }, [cart]);
    

    useEffect(() => {
        if (cartProduct.length > 0) {
            const total = cartProduct.reduce((sum, product) => {
                const quantity = quantities[product.id] || 1;
                return sum + product.amount * quantity;
            }, 0).toFixed(2);
            if (paymentTotal !== total) {
                setpaymentTotal(total);
            }
        }
    }, [cartProduct, quantities, setpaymentTotal]);

    
        


    const handlequantitychange=useCallback((id, calc)=>{
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + calc)
        }));
    },[setQuantities])


    const handledelete=useCallback((id)=>{
        const updatedCartProduct = cartProduct.filter((item) => item.id !== id);
        setCartProduct(updatedCartProduct);
        const updatedCart = cart.filter((itemId) => itemId !== id);
        setCart(updatedCart);
        setCartQuatities(cart.length-1)
        axios.patch(`https://shoes-ecommerce-9ems.onrender.com/users/${userId}`, { cart: updatedCart })
            .catch(err => toast.error("Error: updated cart", err));
    },[cart, userId])


    return (
        <div className="max-w-[1000px] mx-auto p-6 bg-white border border-1 mt-20 mb-20 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">products</h2>
            {cartProduct.map((product) => (
                <div className="border p-4 flex items-center gap-4 rounded-lg" key={product.id}>
                    <button className="text-gray-500 hover:text-red-500" onClick={() => handledelete(product.id)}>&times;</button>
                    <img src={product.shoe_image} alt="Product" className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-1">
                        <h3 className="text-lg font-medium">{product.shoe_name}</h3>
                        <p className="text-lg font-bold mt-1">₹{product.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => handlequantitychange(product.id, -1)}>-</button>
                        <span className="px-3 py-1 border rounded">{quantities[product.id] || 1}</span>
                        <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => handlequantitychange(product.id, 1)}>+</button>
                    </div>
                </div>
            ))}
            <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-lime-700 text-white rounded hover:bg-lime-800" onClick={()=>navigate('/products')}>continue shopping</button>
            </div>
            <div className="mt-6 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">order summary</h3>
                <p className="text-lg font-bold text-lime-700">
                    Subtotal: ₹{paymentTotal}
                </p>
                <button className="w-full mt-4 px-4 py-2 bg-lime-700 text-white rounded hover:bg-lime-800" onClick={() => {
                    if(cartProduct.length>0){
                        navigate("/payment",{ state: { from: "cartbuy" } })
                    }else{
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