import axios from 'axios'
import React, { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotFound from '../not found/NotFound'

function UserProfile() {
    const [user, setUser] = useState([])
    const userId=localStorage.getItem("id")
    if (!userId) {
        return <NotFound name="please login after come the page"/>
    }
    const navigate=useNavigate()
    useEffect(()=>{
       axios.get(`https://shoes-ecommerce-9ems.onrender.com/users/${userId}`)
       .then(responsive=>setUser(responsive.data))
       .catch(err=>console.log("error found",err))
    },[])


    return (
        <div className="container mx-auto mt-30 mb-30 p-6 max-w-lg bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>
            <div className="text-center mb-4">
                <img src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?semt=ais_hybrid" alt="Profile" className="w-24 h-24 mx-auto rounded-full" />
            </div>
            <div className="space-y-3">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button className="bg-lime-500 text-white w-full py-2 rounded-lg hover:bg-lime-600" onClick={()=>navigate("/orders")}>Order Details</button>
            </div>
        </div>
    )
}

export default memo(UserProfile)