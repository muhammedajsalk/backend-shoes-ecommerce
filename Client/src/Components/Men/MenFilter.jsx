import { useReducer } from "react";

export default function MenFilter() {
  const initialvalue={
    brand_name:"",
    category:"",
    price_from:null,
    price_to:null
  }
  function reducer(state,action){
      switch(action.type){
        case "brand_name":
          return {...state,brand_name:action.payload}
        case "category":
          return {...state,category:action.payload}
        case "price_from":
          return {...state,price_from:action.payload}
        case "price_to":
          return {...state,price_to:action.payload}
        default:
          return state
      }
  }
  const [state,dispatch]=useReducer(reducer,initialvalue)
  console.log(state);

  
  
    return (
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md mt-30 h-full">
        <h2 className="text-xl font-semibold mb-4">Filter</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Brand Name</label>
          <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e=>dispatch({type:"brand_name",payload:e.target.value})}>
            <option value="">Select Brand</option>
            <option value="nike">Nike</option>
            <option value="adidas">Adidas</option>
            <option value="puma">Puma</option>
            <option value="reebok">Reebok</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e=>dispatch({type:"category",payload:e.target.value})}>
            <option value="">Select Category</option>
            <option value="Sports Shoes">Sports Shoes</option>
            <option value="Gym Sneakers">Gym Sneakers</option>
            <option value="Running Shoes">Running Shoes</option>
            <option value="Casual Shoes">Casual Shoes</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <div className="flex items-center space-x-2">
            <input type="number" placeholder="From" className="w-1/2 p-2 border rounded-md" onChange={e=>dispatch({type:"price_from",payload:e.target.value})}/>
            <span>-</span>
            <input type="number" placeholder="To" className="w-1/2 p-2 border rounded-md" onChange={e=>dispatch({type:"price_to",payload:e.target.value})}/>
          </div>
        </div>
        <button className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Apply Filters
        </button>
      </div>
    );
  }
  