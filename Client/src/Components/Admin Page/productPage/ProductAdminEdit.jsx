import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function ProductAdminEdit() {


    const [product, setProduct] = useState({})
    const { id } = useParams()


    useEffect(() => {
        axios.get(`http://localhost:5000/api/admin/product/${id}`, { withCredentials: true })
            .then(responsive => setProduct(responsive.data.data))
            .catch(err => {
                const msg = err.response?.data?.message || err.message;
                toast.error(msg)
            })
    }, [id])

    const buttonClick = useCallback(() => {
        const formData = new FormData();

        // Append fields to formData
        formData.append('shoe_name', product.shoe_name);
        formData.append('brand_name', product.brand_name);
        formData.append('description', product.description);
        formData.append('category', product.category);
        formData.append('type', product.type);
        formData.append('amount', product.amount);
        formData.append('count', product.count);

        if (product.imageFile) {
            formData.append('images', product.imageFile);
        }

        axios
            .patch(`http://localhost:5000/api/admin/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            .then((response) => {
                toast.success("Successfully edited");
            })
            .catch((err) => {
                const msg = err.response?.data?.message || "Error found";
                toast.error(msg);
            });
    }, [product]);






    return (
        <div className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10'>
            <h2 className='text-2xl font-semibold mb-4 text-center'>Edit Product</h2>
            <form className='space-y-4' onSubmit={(e) => { e.preventDefault(); buttonClick(); }}>
                <div>
                    <label className='block mb-1 font-medium'>Shoe Name</label>
                    <input type='text' value={product.shoe_name || ""} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => setProduct({ ...product, shoe_name: e.target.value })} />
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Brand Name</label>
                    <input type='text' value={product.brand_name || ""} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => setProduct({ ...product, brand_name: e.target.value })} />
                </div>
                <div>
                    <label className='block mb-1 font-medium'>description</label>
                    <input type='text' value={product.description || ""} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => setProduct({ ...product, category: e.target.value })} />
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Category</label>
                    <input type='text' value={product.category || ""} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => setProduct({ ...product, category: e.target.value })} />
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Type</label>
                    <input type='text' value={product.type || ""} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => setProduct({ ...product, type: e.target.value })} />
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Amount</label>
                    <input type='text' value={product.amount || ""} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => setProduct({ ...product, amount: e.target.value })} />
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Stock</label>
                    <input type='text' value={product.count || ""} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => setProduct({ ...product, category: e.target.value })} />
                </div>
                <div>
                    <label className='block mb-1 font-medium'>Shoe Image URL</label>
                    <input
                        type='file'
                        accept='image/*'
                        className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setProduct((prev) => ({ ...prev, imageFile: file }));
                            }
                        }}
                    />
                    {product.images && <p>Selected: {product.images}</p>}

                </div>
                <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'>Edit Submit</button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    )
}

export default ProductAdminEdit