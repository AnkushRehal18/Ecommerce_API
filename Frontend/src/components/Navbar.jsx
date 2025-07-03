import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../utils/constants";

const Navbar = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchText.trim()) {
            navigate(`/products?search=${searchText}`);
        }
    };

    const handleLogout = async ()=>{
        try{
            await axios.post(BaseUrl + "/logout" , {} ,{
        withCredentials : true
      })
      localStorage.clear();  
      navigate("/login");  
        }
        catch(err){
            console.log(err)
        }
    }

    const handleCreateProduct= ()=>{
        navigate("/createProduct")
        cursor(pointer)
    }

    const handleHomeClick = ()=>{
        navigate("/products")
        cursor(pointer)
    }
    return (
        <div className="navbar bg-blue-300 shadow-sm px-6 flex justify-between items-center h-[70px]">
            
            <div className="flex items-center gap-4">
                <a className="btn btn-ghost text-xl" onClick={handleHomeClick}>Home</a>
                <a className="btn btn-ghost text-xl" onClick={handleCreateProduct}>Create Product</a>
            </div>

            <div className="flex items-center gap-4">
                
                <input
                    type="text"
                    placeholder="Search products"
                    className="border border-gray-400 rounded px-3 py-2 w-32 md:w-64"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />

                <button className="btn btn-primary border rounded-xl" onClick={handleSearch}>
                    Search
                </button>

                <button className="btn btn-primary border rounded-xl" onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </div>
    );
};

export default Navbar;
