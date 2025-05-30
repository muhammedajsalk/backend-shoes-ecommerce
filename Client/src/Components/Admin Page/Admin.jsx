import React, { useEffect } from 'react'
import MenuArea from './MenuArea'
import AdminNav from './AdminNav'
import ProductCountChart from './ProductChart'
import UsersChart from './usersChart'
import OrdersChart from './OrdersChart'
import { useNavigate } from 'react-router-dom'


function Admin() {

  return (
    <div className='flex'>
        <MenuArea/>
        <div className='w-full '>
        <AdminNav/>
        <ProductCountChart/>
        <UsersChart/>
        <OrdersChart/>
        </div>
    </div>
  )
}

export default Admin