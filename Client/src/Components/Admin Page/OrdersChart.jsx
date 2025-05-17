import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


function OrdersChart() {
  const [fetchData, setFetchData] = useState([]);
  useEffect(() => {
    axios
      .get("https://shoes-ecommerce-9ems.onrender.com/users")
      .then((response) => setFetchData(response.data))
      .catch((err) => toast.error("users data fetch error found",err));
  }, []);

  const filteredOrders = fetchData.flatMap(user => user.orders);
  const onefilteredorders =useMemo(()=>filteredOrders.filter(items => items.payment_total),[fetchData])
  const revenueCal=onefilteredorders.reduce((sum,items)=>{
        return sum+=Number(items.payment_total)
  },0)
  
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      <div className="max-w-[400px] w-full md:w-[300px] lg:w-[350px] bg-white shadow-lg rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">total Orders</h1>
        <h2 className="text-5xl font-bold text-blue-600">{onefilteredorders.length}</h2>
      </div>

      <div className="max-w-[400px] w-full md:w-[300px] lg:w-[350px] bg-white shadow-lg rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">total Revenue</h1>
        <h2 className="text-5xl font-bold text-blue-600">₹{revenueCal}</h2>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>

  );
}

export default OrdersChart