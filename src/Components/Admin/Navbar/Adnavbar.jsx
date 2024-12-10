import React, { useContext } from "react";
import { Context } from "../../Sharingcontext/Sharing";
import { useNavigate } from "react-router-dom";

const Adnavbar = () => {
  const navigate = useNavigate();
  const { loginButton, setloginButton } = useContext(Context);

  const username = localStorage.getItem("name"); 

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setloginButton(false); 
    navigate("/"); 
    localStorage.clear(); 
  };

  

  return (
    <nav className="shadow-md p-2 py-3   h-20 fixed  z-50" style={{ backgroundColor: 'rgb(31, 69, 41)', width:"81%"}}>
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="/ea6ddc32-fba9-4eaf-8c47-be3c31608acb.jpg"
            alt="Logo"
            className="w-12 h-12 rounded-full shadow-lg"
          />
          <div className="text-white text-4xl font-extrabold tracking-wider drop-shadow-lg font-display">
            <span className="italic text-yellow-500 rounded">STEP</span>
            <span className="font-serif text-gray-300">IFY</span>
          </div>
        </div>

        <h1 className="font-bold text-white">
          Hi {username ? username : "Guest"}
        </h1>

    
          <button
            onClick={handleLogout}
            className="text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 focus:outline-none font-bold uppercase tracking-wider"
          >
            Logout
          </button>
     
      </div>
    </nav>
  );
};

export default Adnavbar;
