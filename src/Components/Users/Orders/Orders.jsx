import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderListing= () => {
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        const users = response.data;

        const allOrders = users.flatMap((user) =>
          user.orders.map((order) => ({
            id: order.orderId,
            items: order.items,
            name: order.deliveryDetails.name,
            payment: order.deliveryDetails.paymentMethod,
            date: new Date(order.orderDate),
            totalPrice: order.totalPrice,
          }))
        );

        setOrders(allOrders.sort((a, b) => b.date - a.date));
      } catch (error) {
        (error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen" style={{  }}>
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
      <div className="text-white text-3xl font-bold  w-full flex justify-center pr-44"><h1>Your Orders</h1></div>
      </div>
      </div>

      <div className="space-y-4 px-8 pt-20">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div>
              <h2 className="text-2xl font-semibold">Order ID: {order.id}</h2>
              <p className="text-lg text-gray-600">
                Order Date: {order.date.toLocaleString()}
              </p>
              <p className="text-lg text-gray-600">
                Payment Method: {order.payment}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Order Items:</h3>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-4 border-b pb-2"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/50"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <span className="block font-semibold">{item.name}</span>
                      <span className="block text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                    <span className="font-semibold">
                      ₹{item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-right">
              <h2 className="text-lg font-bold">Total: ₹{order.totalPrice}</h2>
            </div>
          </div>
        ))}
           <div className="flex items-center justify-center mt-2" >
      <div >
      <button type="button" onClick={()=>navigate("/")}  className="flex items-center justify-center mb-2 p-2 bg-black w-20">  <FaHome className="text-2xl" color="white" /> </button>
      </div>
      </div>
      </div>
      
    </div>
  );
};

export default OrderListing;
