import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ToastContainer, toast } from 'react-toastify';

const ProductCountChart = () => {
  const [fetchData, setFetchData] = useState([]);
  const [women, setWomen] = useState([]);
  const [men, setMen] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/products",{withCredentials:true})
      .then((response) => setFetchData(response.data.data))
      .catch((err) => toast.error("fetching shoes error",err));
  }, []);


  useEffect(() => {
    if (fetchData.length > 0) {
      const womensData = fetchData.filter((item) => item.category === "women");
      setWomen(womensData);
      const mensData = fetchData.filter((item) => item.category === "men");
      setMen(mensData);
    }
  }, [fetchData]);


  const data = [
    { name: 'Women', value: women.length },
    { name: 'Men', value: men.length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {data[index]?.value}
      </text>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full border-b mt-10 gap-4 p-4 pb-16">
      <div className="w-full md:w-2/3 h-80">
        <h1 className="text-center text-2xl md:text-4xl font-semibold mb-4">total products: {fetchData.length}</h1>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={50}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-1/3 flex justify-center">
        <ul className="space-y-2">
          <li className="flex items-center gap-2 mb-2 text-lg">
            <span className="w-4 h-4 bg-[#0088FE] rounded-sm"></span>
            <span>women - {women.length}</span>
          </li>
          <li className="flex items-center gap-2 text-lg">
            <span className="w-4 h-4 bg-[#00C49F] rounded-sm"></span>
            <span>men - {men.length}</span>
          </li>
        </ul>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
    </div>
  );
};

export default ProductCountChart;

