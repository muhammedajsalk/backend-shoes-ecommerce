import React, { createContext, lazy, Suspense, useCallback,useMemo,useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { motion } from "framer-motion";
import NotFound from '../not found/NotFound';
import UserProfile from '../user profile/UserProfile';
import Admin from '../Admin Page/Admin';
import ProductAdmin from '../Admin Page/productPage/productAdmin';
import ProductAdminView from '../Admin Page/productPage/productAdminView';
import ProductAdminEdit from '../Admin Page/productPage/ProductAdminEdit';
import AddProduct from '../Admin Page/productPage/AddProduct';
import UserPage from '../Admin Page/UserPage/UserPage';                                                                           
import UserOrders from '../Admin Page/UserPage/UserOrders';
import AdminLogin from '../Admin Page/adminLogin';


const Cart = lazy(() => import('../Cart/Cart'))
const Contact = lazy(() => import('../Contact/Contact'))
const AllProducts = lazy(() => import("../AllProducts/AllProducts"))
const Payment = lazy(() => import('../Payment/Payment'))
const Register = lazy(() => import('../Register/Register'))
const Home = lazy(() => import('../Home/Home'))
const Login = lazy(() => import("../Login/Login"))
const Orders  = lazy(() => import('../Orders/Orders'))
const ProductDetails = lazy(() => import('../ProductDetails/ProductDetails'))



const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="flex justify-center items-center min-h-screen bg-black"
  >
    <h1 className="text-white text-5xl">Loading........</h1>
  </motion.div>
);

export const CartDataTrasfer = createContext();





function Routerss() {

  const [cartid, setCartId] = useState([]);
  const [paymentTotal,setpaymentTotal]=useState(0)
  const [quantities, setQuantities] = useState({});
  const [cartQuatities,setCartQuatities]=useState(0)
  const [buyingarea,setBuyingArea]=useState([])
  const [userDetails,setUserDetails]=useState("")
  const [orderProduct,setOrderProduct]=useState("")
  

  const location=useLocation()
  const isAdminRoute =location.pathname.startsWith("/admin")
  const isLoginRoute=location.pathname.startsWith("/login")
  const isRegister=location.pathname.startsWith("/register")



  const providerValue = useMemo(() => ({ cartid, setCartId, paymentTotal, setpaymentTotal,quantities, setQuantities,buyingarea,setBuyingArea,setCartQuatities,setUserDetails,orderProduct,setOrderProduct}))

  return (
    <>
      {(!isAdminRoute && !isLoginRoute &&!isRegister)&&<Header quantities={cartQuatities} setQuantities={setCartQuatities} userDetails={userDetails}/>}
      <CartDataTrasfer.Provider value={providerValue}>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/payment' element={<Payment />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/products' element={<AllProducts />}></Route>
            <Route path="*" element={<NotFound />} />
            <Route path='/productDetails/:productId' element={<ProductDetails/>}></Route>
            <Route path='/user_profile' element={<UserProfile />}></Route>
            <Route path='/Admin' element={<Admin />}></Route>
            <Route path='/AdminLogin' element={<AdminLogin />}></Route>
            <Route path='/admin/product_admin' element={<ProductAdmin />}></Route>
            <Route path='/admin/productadminview/:shoesId' element={<ProductAdminView />}></Route>
            <Route path='/admin/productAdminEdit/:shoesId' element={<ProductAdminEdit />}></Route>
            <Route path='/admin/addproduct' element={<AddProduct />}></Route>
            <Route path='/admin/users_admin' element={<UserPage/>}></Route>
            <Route path='/admin/users_admin/users_orders/:usersParId' element={<UserOrders/>}></Route>
          </Routes>
        </Suspense>
      </CartDataTrasfer.Provider>
      {!isAdminRoute&&<Footer/>}
    </>
  )
}

export default Routerss