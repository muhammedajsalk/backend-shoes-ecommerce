import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MenuArea from '../MenuArea';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function UserPage() {


    const UserId = localStorage.getItem("id")
    const navigate = useNavigate()

    useEffect(() => {
        if (UserId !== "ab01") {
            navigate("*");
        }
    }, [UserId]);

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get("https://shoes-ecommerce-9ems.onrender.com/users")
            .then(response => setUsers(response.data))
            .catch(err => toast.error("users fetched issue", err));
    }, []);


    const filteredData = useMemo(() => {
        return users.filter(items => items.name.toLowerCase().includes(search.toLowerCase()))
    }, [users, search])



    const blockClicked = useCallback((id) => {
        axios.patch(`https://shoes-ecommerce-9ems.onrender.com/users/${id}`, { isActive: false })
            .then(() => {
                toast.success("succefully blocked")
                setUsers(prev => prev.map(user => user.id === id ? { ...user, isActive: false } : user));
            })
            .catch(err => toast.error("blocked issue", err));
    }, [users])


    const unBlockClicked = useCallback((id) => {
        axios.patch(`https://shoes-ecommerce-9ems.onrender.com/users/${id}`, { isActive: true })
            .then(() => {
                toast.success("succefully unblocked")
                setUsers(prev => prev.map(user => user.id === id ? { ...user, isActive: true } : user));
            })
            .catch(err => toast.error("unblocking error found", err));
    }, [users])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex)

    const totalPages = filteredData.length

    let pages = []

    for (let i = 1; i <= Math.ceil(totalPages / postPerPage); i++) {
        pages.push(i)
    }


    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <MenuArea />
            <div className="w-full flex flex-col items-center p-4 md:p-6 gap-4 md:gap-6 bg-gray-100 min-h-screen">
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl bg-white p-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full md:w-[300px] p-2 border border-gray-300 rounded-lg outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="w-full max-w-4xl bg-white p-4">
                    <ul className="hidden sm:grid grid-cols-5 text-center font-semibold text-gray-700 border-b">
                        <li className="py-2">name</li>
                        <li className="py-2">email</li>
                        <li className="py-2">status</li>
                        <li className='py-2'>orders</li>
                        <li className="py-2">action</li>
                    </ul>
                    {currentPosts.map((item) => (
                        <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-5 text-center gap-4 p-2 items-center border-b py-2">
                            <span>{item.name}</span>
                            <span>{item.email}</span>
                            <span className={item.isActive ? 'text-green-500' : 'text-red-500'}>
                                {item.isActive ? 'Active' : 'Blocked'}
                            </span>
                            <Link to={`/admin/users_admin/users_orders/${item.id}`}>
                                <span className='text-white py-1 px-3 rounded-md shadow-sm bg-yellow-300'>
                                    orders
                                </span>
                            </Link>
                            <button
                                className={`${item.isActive ? 'bg-red-500' : 'bg-green-500'
                                    } hover:bg-opacity-80 text-white py-1 px-3 rounded-md shadow-sm`}
                                onClick={() => item.isActive ? blockClicked(item.id) : unBlockClicked(item.id)}
                            >
                                {item.isActive ? 'Block' : 'Unblock'}
                            </button>
                        </div>
                    ))}
                    <div className="flex gap-2 justify-center mt-4 mb-6">
                        {pages.map((item, id) => (
                            <button
                                key={id}
                                onClick={() => setCurrentPage(item)}
                                className={`px-4 py-2 rounded-lg shadow-md font-medium ${currentPage === item ? 'bg-blue-500 text-white' :'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} >{item}</button>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default UserPage;



