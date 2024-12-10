import React, { useEffect, useState } from "react";
import axios from "axios";

const Adorders = () => {
  const [orders, setOrders] = useState([]);

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
    <div className="bg-gray-100 min-h-screen" style={{ paddingTop: "1rem" }}>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>
      </div>

      <div className="space-y-4 px-8">
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
      </div>
    </div>
  );
};

export default Adorders;
