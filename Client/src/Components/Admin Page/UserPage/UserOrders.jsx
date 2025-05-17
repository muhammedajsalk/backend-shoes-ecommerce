import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function UserOrders() {
    const [shoesData, setShoesData] = useState([]);
    const [datas, setDatas] = useState([]);

    const UserId= localStorage.getItem("id")
    const navigate= useNavigate()
    
    useEffect(() => {
      if (UserId !== "ab01") {
        navigate("*");
      }
    }, [UserId]);


   const {usersParId}=useParams()

    useEffect(() => {
        setDatas([]);
        axios.get(`https://shoes-ecommerce-9ems.onrender.com/users/${usersParId}`)
            .then((response) => {
                const fetchedorders=Array.isArray(response.data.orders) ? response.data.orders : []
                setDatas(fetchedorders)
            })
            .catch(err => {
                toast.error(`error fetching orders:${err}`)
                setDatas([])
        });
    }, [UserId]);

    useEffect(() => {
        axios.get(`https://shoes-ecommerce-9ems.onrender.com/shoes`)
            .then((response) => setShoesData(response.data || []))
            .catch(err => toast.error(`error fetching shoes:${err}`));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white border  mt-20 mb-20">
            <h2 className="text-2xl font-semibold mb-6">order details</h2>
            {datas.length === 0 ? (
                <p className="text-gray-500">no orders found.</p>
            ) : (
                datas.map((items, id) => {
                    const cartItems = Array.isArray(items.cart) ? items.cart : [];
                    return (
                        <div className="border p-4 mb-4" key={id}>
                            <h3 className="text-lg font-medium">order ID: {id + 834567}</h3>
                            <p className="text-gray-500 text-sm">placed on: {items.dates}</p>
                            <div className="mt-4">
                                {cartItems.map((shoeId) => {
                                    const shoe = shoesData.find(s => s.id === shoeId);
                                    if (!shoe) return null;

                                    const quantity = items.quantities?.[shoeId] || 1;

                                    return (
                                        <div key={shoeId} className="flex items-center gap-4 border-b pb-2 mb-2">
                                            <img src={shoe.shoe_image} alt="Product" className="w-16 h-16 object-cover rounded" />
                                            <div className="flex-1">
                                                <h4 className="text-lg font-medium">{shoe.shoe_name}</h4>
                                                <p className="text-gray-600">quantity: {quantity}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <p className="text-lg font-bold text-lime-700">total: ₹{items.payment_total}</p>
                            </div>
                        </div>
                    );
                })
            )}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        </div>
    );
}

export default memo(UserOrders);