import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Sharingcontext/Sharing";
import { toast } from "react-toastify";

const Deliverydetails = () => {
  window.scrollTo(0, 0);
  const { cartitems, setcartitems } = useContext(Context); 
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
  
    const order = {
      orderId: `ORD-${Date.now()}`,
      orderDate: new Date().toLocaleString(),
      deliveryDetails: {
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        district: values.district,
        paymentMethod: values.paymentMethod,
      },
      items: cartitems,
      totalPrice: cartitems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
  
    try {
      const userId = localStorage.getItem("id");
  
      // Fetch user data
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      const user = response.data;
  
      // Update user orders and clear cart
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        orders: [...user.orders, order],
        cart: [],
      });
  
      // Update stock for each item in cart
      for (const item of cartitems) {
        try {
          // Fetch product details
          const productResponse = await axios.get(`http://localhost:5000/items/${item.id}`);
          const product = productResponse.data;
  
          const updatedStock = product.stock - item.quantity;
  
          // Check stock availability
          if (updatedStock < 0) {
            toast.error(`Not enough stock for ${product.name}`);
            return;
          }
  
          // Update product stock
          await axios.patch(`http://localhost:5000/items/${item.id}`, {
            stock: updatedStock,
          });
        } catch (error) {
          console.error(`Failed to update stock for item ID ${item.id}:`, error);
          toast.error(`Failed to update stock for ${item.name}`);
          return;
        }
      }
  
      // Clear cart in the context
      setcartitems([]);
      toast.success("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      console.error("Error during order submission:", error);
      toast.error("An error occurred while placing the order.");
    }
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
      <div className="text-white text-3xl font-bold  w-full flex justify-center pr-44"><h1>Order Address</h1></div>
      </div>
      </div>
    <div
      className="p-4 min-h-screen "
      style={{ backgroundColor: 'rgb(98, 130, 93)', paddingTop: "1rem" }}
    >
      <div className="bg-transparent w-96 mx-auto mt-20 border-8 p-4  border-white ">
    
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            required
            pattern="\d{10}" 
            title="Phone number must be 10 digits"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="district"
            type="text"
            placeholder="District"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="space-y-2">
            <label className="text-lg font-medium text-white">Payment Method:</label>
            <div role="group" aria-labelledby="payment-method" className=" flex">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  required
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-white">Cash on Delivery</span>
              </label>
              <label className="flex items-center space-x-1 pl-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="onlinePayment"
                  required
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-white">Online Payment</span>
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit" style={{ backgroundColor: 'rgb(31, 69, 41)' }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Deliverydetails;
