import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ToastContainer, toast } from 'react-toastify';

const UsersChart = () => {
  const [fetchData, setFetchData] = useState([]);
  const [activeUser, setActiveUsers] = useState([]);
  const [blockUsers, setBlockUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users",{withCredentials:true})
      .then((response) => setFetchData(response.data.data))
      .catch((err) => toast.error("fetching users error found",err));
  }, []);


  useEffect(() => {
    if (fetchData.length > 0) {
      const activeData = fetchData.filter((item) => item.isActive === true);
      setActiveUsers(activeData);
      const blockedUsers = fetchData.filter((item) => item.isActive === false);
      setBlockUsers(blockedUsers);
    }
  }, [fetchData]);


  const data = [
    { name: 'active users', value: activeUser.length },
    { name: 'blocked users', value: blockUsers.length },
  ];

  const COLORS = ['#FFBB28', '#f35100'];

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
        <h1 className="text-center text-2xl md:text-4xl font-semibold mb-4">Total Users: {fetchData.length}</h1>
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
            <span className="w-4 h-4 bg-[#FFBB28] rounded-sm"></span>
            <span>Active Users - {activeUser.length}</span>
          </li>
          <li className="flex items-center gap-2 text-lg">
            <span className="w-4 h-4 bg-[#f35100] rounded-sm"></span>
            <span>Blocked Users - {blockUsers.length}</span>
          </li>
        </ul>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default UsersChart;

