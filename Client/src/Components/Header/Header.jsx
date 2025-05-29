import React, { useState, useEffect, useCallback, memo, useContext } from 'react';
import shoe from '../../assets/images/Logo/shoe.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { CartDataTrasfer } from '../Router/Router';
import Cookies from 'js-cookie';

function Header(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [Datas, setDatas] = useState();



    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen((prev) => !prev);


    useEffect(() => {
        axios.get("http://localhost:5000/api/users/toMe", { withCredentials: true })
            .then(response => {
                const userData=response.data.data
                setDatas(userData)
                axios.get(`http://localhost:5000/api/users/${userData._id}/cart`, { withCredentials: true })
                    .then(res => {
                        const cartLength=res.data.data.length
                        const cartMatch=res.data.data
                         console.log("res.data.data.length"+res.data.data.length,"res.data.data"+res.data.data)
                        props.setQuantities(Array.isArray(cartMatch)?cartLength:0)
                    })
                    .catch(err => {
                        const msg = err.response?.data?.message || err.message;
                        console.log(msg)
                    });
            })
            .catch(err => console.log("error Found", err));
    }, []);

    console.log("userDatils" + props.userDetails.name)
    const Logout = () => {
        axios.post("http://localhost:5000/api/users/logOut", {}, { withCredentials: true })
            .then(response => {
                toast.success(`${response.data.message}`)
                navigate("/login");
            })
            .catch(err => {
                const msg = err.response?.data?.message || err.message;
                toast.error(`Error: ${msg}`);
            })
    };

    console.log(Datas)




    return (
        <header className="flex items-center justify-around bg-white shadow-md relative">
            <div className='h-25 flex items-center'>
                <img src={shoe} alt="Logo" className="h-25 hidden md:block" />
                <div className='lg:hidden md:hidden'>
                    <i className="fa-solid fa-bars text-xl cursor-pointer" onClick={toggleMenu}></i>
                </div>
            </div>

            <ul className={`md:flex space-x-6 text-gray-700 font-medium ${menuOpen ? "block absolute top-16 left-0 w-full bg-white shadow-md p-4 z-20" : "hidden"}`}>
                {menuOpen && (<li className="text-right mb-4"><i className="fa-solid fa-times text-xl cursor-pointer hover:text-blue-500" onClick={toggleMenu}></i></li>
                )}
                <li className="hover:text-blue-500 cursor-pointer py-2"><Link to={"/"}>Home</Link></li>
                <li className="hover:text-blue-500 cursor-pointer py-2" onClick={() => navigate("/products", { state: { from: "men" } })}>Men</li>
                <li className="hover:text-blue-500 cursor-pointer py-2" onClick={() => navigate("/products", { state: { from: "women" } })}>Women</li>
                <li className="hover:text-blue-500 cursor-pointer py-2" onClick={() => navigate("/products")}>Products</li>
                <li className="hover:text-blue-500 cursor-pointer py-2"><Link to={"/contact"}>Contact</Link></li>
            </ul>

            <div className="flex items-center space-x-4">
                {typeof Datas === "object" || props.userDetails.name ? (
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <span className="text-gray-700"><i className="fa-solid fa-user"></i></span>
                        <span className="text-gray-700 font-medium" onClick={() => navigate("/user_profile")}>{props.userDetails.name ? props.userDetails.name : Datas.name}</span>
                        <button className="bg-red-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded" onClick={Logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to={"/login"}>
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <span className="text-gray-700">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <span className="text-gray-700 font-medium">Register/Login</span>
                        </div>
                    </Link>
                )}
                {(Datas || props.userDetails?.name) && (
                    <Link to={"/cart"}>
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <span className="text-gray-700 relative inline-block">
                                <i className="fas fa-shopping-cart"></i>
                                <span id="cartCount" class="absolute top-0 right-0 bg-red-500 text-white text-[8px] rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">{props.quantities}</span>
                            </span>
                            <p className="text-gray-700 font-medium">Cart</p>
                        </div>
                    </Link>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </header>
    );
}

export default memo(Header);