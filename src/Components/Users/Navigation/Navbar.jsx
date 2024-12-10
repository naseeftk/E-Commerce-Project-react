import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import axios from "axios";
import { Context } from "../../Sharingcontext/Sharing";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { loginButton, setloginButton, cartitems } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const username = localStorage.getItem("name");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/items");
        setProducts(response.data);
      } catch (error) {
        ( error);
      }
    };
    fetchProducts();
  }, []);

  
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query) {
      const filteredResults = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  
  const handleItemClick = (id) => {
    navigate(`/items/${id}`);
    setShowDropdown(false);
    setSearchQuery("");
  };

  
  const handleCartNavigation = () => {
    const userid = localStorage.getItem("id");
    if (!userid) {
      toast.success("please login first")
    } else {
      navigate("/cart");
    }
  };

  // Handle orders navigation
  const handleOrdersNavigation = () => {
    const userid = localStorage.getItem("id");
    if (!userid) {
      toast.success("please login first");
   
    } else {
      navigate("/orders");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    setloginButton(false); // Update shared context state
    navigate("/");
  };

  return (
    <nav
      className="shadow-md py-3 mt-1 fixed w-full z-50 "
      style={{ backgroundColor: "rgb(31, 69, 41)" }}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/ea6ddc32-fba9-4eaf-8c47-be3c31608acb.jpg"
            alt="Logo"
            className="w-12 h-12 rounded-full shadow-lg"
          />
          <button
            className="text-white text-4xl font-extrabold tracking-wider drop-shadow-lg font-display"
            type="button"
            onClick={() => navigate("/")}
          >
            <span className="italic text-yellow-500 rounded">STEP</span>
            <span className="font-serif text-gray-300">IFY</span>
          </button>
        </div>

        
        <div className="flex items-center space-x-2 relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-60 px-4 py-2 rounded-full border-2 border-white text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 sm:w-72"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="text-white hover:text-gray-200 font-medium">
            <FaSearch className="text-2xl" color="white" />
          </button>
          {showDropdown && searchResults.length > 0 && (
  <ul
    className="absolute left-0 bg-white border rounded shadow-md mt-1 w-full max-h-40 overflow-y-auto z-10"
    style={{ top: '100%' }}
  >
    {searchResults.map((result) => (
      <li
        key={result.id}
        className="p-2 cursor-pointer hover:bg-gray-300"
        onClick={() => handleItemClick(result.id)}
      >
        {result.name}
      </li>
    ))}
  </ul>
)}
        </div>

        {/* Greeting */}
        <h1 className="font-bold text-white">Hi, {username || "Guest"}</h1>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-6">
        
          <button
            onClick={handleCartNavigation}
            className="text-white flex items-center space-x-2 hover:text-gray-200 font-medium"
          >
            <MdShoppingCart className="w-6 h-6" />
        
          </button>
          <button
            onClick={handleOrdersNavigation}
            className="text-white hover:text-gray-200 font-medium"
          >
            Orders
          </button>
          {!loginButton ? (
            <button
              onClick={() => navigate("/login")}
              className="text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 font-bold uppercase"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 font-bold uppercase"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
