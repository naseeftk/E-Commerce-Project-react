import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Sharingcontext/Sharing";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";

const Cart = () => {
  const { cartitems, setcartitems } = useContext(Context);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    totalamount(cartitems || []);
  }, [cartitems]);

  const totalamount = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const userCart = async () => {
    const userid = localStorage.getItem("id");
    if (!userid) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/users/${userid}`);
      const userCart = response.data.cart || [];
      setcartitems(userCart);
      totalamount(userCart);
    } catch (error) {
      console.error(error);
    }
  };

    userCart();


  const incqty = async(itemId) => {
    const userid = localStorage.getItem("id");
   
    try {
      const updatedCart = cartitems.map((item) => {
        if (item.id === itemId) {
          if (item.quantity < item.stock) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            toast.error("Out of Stock");
          }
        }
        return item;
      });

      await axios.patch(`http://localhost:5000/users/${userid}`, { cart: updatedCart });
      setcartitems(updatedCart);
      totalamount(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const decqty = async (itemId) => {
    const userid = localStorage.getItem("id");
   

    try {
      const updatedCart = cartitems
        .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);

      await axios.patch(`http://localhost:5000/users/${userid}`, { cart: updatedCart });
      setcartitems(updatedCart);
      totalamount(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (itemId) => {
    const userid = localStorage.getItem("id");
    if (!userid) {
      alert("User not logged in.");
      return;
    }

    try {
      const newcart = cartitems.filter((item) => item.id !== itemId);
      await axios.patch(`http://localhost:5000/users/${userid}`, { cart: newcart });
      setcartitems(newcart);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceOrder = () => {
    setTotalPrice(0);
    navigate("/delivery");
  };

  return (
    <div>
    <div className="shadow-md py-3 mt-0 z-50 fixed  w-full "
    style={{ backgroundColor: "rgb(31, 69, 41)" }}
  >
    <div className="container mx-auto flex items-center px-4">
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
      <div className="text-white text-3xl font-bold  w-full flex justify-center pr-44"><h1>Your Cart</h1></div>
      </div>
      </div>
      <div className="pt-20 p-4">
      {cartitems?.length > 0 ? (
        <div className="space-y-4 ">
          {cartitems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md space-y-4 sm:space-y-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => decqty(item.id)}
                  className="px-3 py-1 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => incqty(item.id)}
                  className="px-3 py-1 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                >
                  +
                </button>
                <button
                  onClick={() => remove(item.id)}
                  className="px-3 py-1 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <h2 className="text-2xl font-bold">Total: ₹{totalPrice}</h2>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handlePlaceOrder}
              className="w-full sm:w-1/2 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition mt-4"
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">Your cart is empty.</p>
      )}
             <div className="flex items-center justify-center mt-2" >
      <div >
      <button type="button" onClick={()=>navigate("/")}  className="flex items-center justify-center p-2 bg-black w-20">  <FaHome className="text-2xl" color="white" /> </button>
      </div>
      </div>
      </div>
    </div>
  
  );
};

export default Cart;
