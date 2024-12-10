import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { FaHome } from 'react-icons/fa';
import { Context } from '../../Sharingcontext/Sharing';

const Items = () => {
  window.scrollTo(0, 0)
  const { itemsid } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState();
  const { addcart } = useContext(Context); 


  useEffect(() => {
    const productDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${itemsid}`);
        setDetails(response.data);
      } catch (error) {
        (error)
      }
    };
    productDetails();
  }, [itemsid]);

  if (details) {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100 ">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl w-full mt-10 flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col justify-between">
          <h1 className="text-2xl font-bold ">{details.name.toUpperCase()}</h1>
          <h3 className="font-semibold text-gray-800">
            Brand: <span className="text-lg font-bold">{details.brand}</span>
          </h3>
          <h3>
            Color: <span className="font-semibold">{details.color}</span>
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li><span className="font-semibold">Seller:</span> {details.seller}</li>
            <li><span className="font-semibold">Details:</span> {details.details}</li>
          </ul>
          <div className="mb-2">
            <span className="text-3xl font-bold text-green-600"> ₹{details.price}</span>
            <span className="text-lg font-semibold text-gray-500 line-through ml-4">
              {details.oldPrice}
            </span>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <button
              onClick={() => addcart(details)} 
              className="bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 transition font-bold uppercase"
            >
              ADD TO CART
            </button>
   
          </div>
     
        </div>

        <div className="md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
          <img
            src={details.image}
            alt={details.name}
            className="max-h-96 rounded-lg shadow-md object-cover"
          />
        </div>
        
      </div>
      <div className="flex items-center justify-center mt-2" >
      <div >
      <button type="button" onClick={()=>navigate("/")}  className="flex items-center justify-center p-2 bg-black w-20">  <FaHome className="text-2xl" color="white" /> </button>
      </div>
      </div>
    </div>
  );
}
}

export default Items;
