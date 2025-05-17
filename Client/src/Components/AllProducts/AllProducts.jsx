import axios from 'axios';
import React, { useEffect, useState, memo, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



function AllProducts() {
    const location = useLocation();
    const data = location.state?.from || "";
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPosts = filteredProducts.slice(firstPostIndex, lastPostIndex)


    const totalPage = Math.ceil(filteredProducts.length / postPerPage);
    let pages = [];

    for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
    }



    const navigate = useNavigate();
    useEffect(() => {
        axios.get("https://shoes-ecommerce-9ems.onrender.com/shoes")
            .then(response => {
                const filtered = data ? response.data.filter(item => item.category === data) : response.data;
                setProducts(filtered);
                setFilteredProducts(filtered);
            })
            .catch(err => toast.error(`error: ${err.message}`));
    }, [data]);


    useMemo(() => {
        const filtered = products.filter(product =>
            product.shoe_name.toLowerCase().includes(search.toLowerCase()) || product.brand_name.toLowerCase().includes(search.toLowerCase()) || product.type.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [search])


    return (
        <>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="container mx-auto p-4 my-10">
                    {data === "men" ? (
                        <h2 className="text-2xl font-bold text-center mb-6">All Men Products</h2>
                    ) : data === "women" ? (
                        <h2 className="text-2xl font-bold text-center mb-6">All Women Products</h2>
                    ) : (
                        <h2 className="text-2xl font-bold text-center mb-6">All Products</h2>
                    )}
                    <div className="flex gap-2 justify-center mb-6">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search shoes..."
                            className="border p-2 rounded-lg w-64"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentPosts.map((product, index) => (
                            <Link to={`/productDetails/${product.id}`} key={product.id}>
                                <div className="border rounded-xl h-[450px]  shadow-lg p-4 bg-white text-center transition-transform transform hover:scale-105" onClick={() => navigate(`/productDetails/${product.id}`)}>
                                    <img
                                        src={product.shoe_image}
                                        alt={product.shoe_name}
                                        className="w-full h-1/2 object-cover rounded-lg mb-4"
                                    />
                                    <ul className="space-y-1 text-gray-700 ">
                                        <li className="font-semibold ">{product.shoe_name}</li>
                                        <li className='mt-5'>{product.brand_name}</li>
                                        <li className="text-sm text-gray-500 mt-3">{product.category}</li>
                                        <li className="text-sm text-gray-500 mt-3">{product.type}</li>
                                        <li className="text-lg font-bold text-green-600 mt-5">₹{product.amount}</li>
                                    </ul>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-2 justify-center mt-4 mb-6">
                {pages.map((item, id) => (
                    <button
                        key={id}
                        onClick={() => setCurrentPage(item)}
                        className={`px-4 py-2 rounded-lg shadow-md font-medium 
                  ${currentPage === item ?
                                'bg-blue-500 text-white' :
                                'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>

    )
}

export default memo(AllProducts)