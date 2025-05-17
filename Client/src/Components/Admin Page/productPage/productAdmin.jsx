import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MenuArea from '../MenuArea'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


function ProductAdmin() {

    const UserId = localStorage.getItem("id")
    const navigate = useNavigate()

    useEffect(() => {
        if (UserId !== "ab01") {
            navigate("*");
        }
    }, [UserId]);


    const [datas, setDatas] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(9)

    const FilterData = useMemo(() => {
        return datas.filter((items) => {
            return items.shoe_name.toLowerCase().includes(search.toLowerCase()) || items.brand_name.toLowerCase().includes(search.toLowerCase()) || items.category.toLowerCase().includes(search.toLowerCase())
        })
    }, [datas, search])


    useEffect(() => {
        axios.get("https://shoes-ecommerce-9ems.onrender.com/shoes")
            .then(responsive => setDatas(responsive.data))
            .catch(err => toast.error("fetching data found error", err))
    }, [FilterData])

    let pages = []

    const lastIndexPage = currentPage * postPerPage
    const firstIndexPage = lastIndexPage - postPerPage
    const currenetPosts = FilterData.slice(firstIndexPage, lastIndexPage)

    const totalPage = FilterData.length
    for (let i = 1; i <= Math.ceil(totalPage / postPerPage); i++) {
        pages.push(i)
    }

    const DeleteProduct = useCallback((id) => {
        axios.delete(`https://shoes-ecommerce-9ems.onrender.com/shoes/${id}`)
            .then(responsive => toast.success("succefully deleted"))
            .catch(err => toast.error("delete not working".err))
    }, [FilterData])
    return (

        <>

            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <MenuArea />
                <div className="w-full flex flex-col items-center p-4 md:p-6 gap-4 md:gap-6 bg-gray-100 min-h-screen">
                    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl bg-white p-4  gap-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full md:w-[300px] p-2 border border-gray-300 rounded-lg outline-none "
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Link to={"/admin/addproduct"}>
                            <button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ">
                                Add Product
                            </button>
                        </Link>
                    </div>
                    <div className="w-full max-w-4xl bg-white p-4">
                        <ul className="hidden sm:grid grid-cols-5 text-center font-semibold text-gray-700 border-b">
                            <li className="py-2">Name</li>
                            <li className="py-2">Category</li>
                            <li className="py-2">View</li>
                            <li className="py-2">Edit</li>
                            <li className="py-2">Delete</li>
                        </ul>
                        {currenetPosts.map((items) => (
                            <div className="flex flex-col sm:grid sm:grid-cols-5 text-center gap-4 p-2 items-center border-b py-2" key={items.id}>
                                <span>{items.shoe_name}</span>
                                <span>{items.category}</span>
                                <Link to={`/admin/productadminview/${items.id}`}>
                                    <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md shadow-sm">
                                        View
                                    </button>
                                </Link>
                                <Link to={`/admin/productAdminEdit/${items.id}`}>
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md shadow-sm">
                                        Edit
                                    </button>
                                </Link>
                                <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md shadow-sm" onClick={() => DeleteProduct(items.id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                        <div className="flex gap-2 justify-center mt-4 mb-6">
                            {pages.map((item, id) => (
                                <button
                                    key={id}
                                    onClick={() => setCurrentPage(item)}
                                    className={`px-4 py-2 rounded-lg shadow-md font-medium ${currentPage === item ? 'bg-blue-500 text-white' :'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{item}</button>
                            ))}
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </>


    )
}

export default ProductAdmin