import React, { useState, useEffect, useCallback,memo, useContext } from 'react';
import shoe from '../../assets/images/Logo/shoe.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [Datas, setDatas] = useState("");
   
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const userId = localStorage.getItem("id");

    useEffect(() => {
        if (userId) {
            axios.get(`https://shoes-ecommerce-9ems.onrender.com/users/${userId}`)
                .then(response =>{
                    setDatas(response.data) 
                    props.setQuantities(response.data.cart.length)
                    if(response.data.isActive===false){
                        localStorage.removeItem("id")
                        window.location.reload();   
                    }
                })
                .catch(err => console.log("error Found", err));
        }
    }, [userId]);

    const Logout = () => {
        localStorage.removeItem("id");
        navigate("/login");
        window.location.reload();   
    };

    

    

    return (
        <header className="flex items-center justify-around bg-white shadow-md relative">
            <div className='h-25 flex items-center'>
                <img src={shoe} alt="Logo" className="h-25 hidden md:block" />
                <div className='lg:hidden md:hidden'>
                <i className="fa-solid fa-bars text-xl cursor-pointer"  onClick={toggleMenu}></i>
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
                {typeof Datas === "object" ? (
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <span className="text-gray-700"><i className="fa-solid fa-user"></i></span>
                        <span className="text-gray-700 font-medium" onClick={() => navigate("/user_profile")}>{Datas.name}</span>
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
                {userId && (
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
        </header>
    );
}

export default memo(Header);