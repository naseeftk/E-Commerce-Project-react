import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { admcontext } from '../adsharingcontext/adcontext';

const Adhome = () => {
  const { products } = useContext(admcontext);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        const nonAdminUsers = response.data.filter((user) => user.role !== 'admin');
        setUsers(nonAdminUsers);
  

        const sales = nonAdminUsers
          .flatMap((user) => user.orders) 
     
          .reduce((sum, order) => sum + order.totalPrice, 0); 
        setTotalSales(sales);
  
       
        const allOrders = nonAdminUsers.flatMap((user) =>
          user.orders.map((order) => ({
            id: order.orderId,
            items: order.items.length,
            name: order.deliveryDetails.name,
            payment: order.deliveryDetails.paymentMethod,
            date: new Date(order.orderDate),
            amount: order.totalPrice,
          }))
        );
        setOrders(allOrders.sort((a, b) => b.date - a.date).slice(0, 5));
      
      } catch (err) {
        ( err);
      }
    };
  
    fetchData();
  }, []);

  const totalStock = products.reduce((sum, product) => sum + Number(product.stock || 0), 0);

  return (
    <div>
      <div className="pt-6 font-bold flex justify-center items-center">
        <h1 className="text-3xl">DETAILS:</h1>
      </div>
      <div className="font-bold">
        <div className="flex justify-around text-white pt-6">
          <div className="bg-lime-500 w-96 p-6 border border-solid border-black">
            <h3>{products.length}</h3>
            <p>Products</p>
          </div>
          <div className="bg-cyan-600 w-96 p-6 border border-solid border-black">
            <h3>{users.length}</h3>
            <p>Users</p>
          </div>
        </div>
        <div className="flex justify-around text-white pt-8">
          <div className="bg-orange-400 w-96 p-6 border border-solid border-black">
            <h3>₹{totalSales}+</h3>
            <p>Sales</p>
          </div>
          <div className="bg-fuchsia-500 w-96 p-6 border border-solid border-black">
            <h3>{totalStock}+</h3>
            <p>Stocks</p>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <h1 className="text-lg font-bold">Latest Orders:</h1>
        <div className="pt-4">
          <table className="border-collapse border-2 border-black w-full bg-slate-300">
            <thead>
              <tr>
                <th className="border-2 border-black">ID</th>
                <th className="border-2 border-black">NO: OF ITEMS</th>
                <th className="border-2 border-black">NAME</th>
                <th className="border-2 border-black">PAYMENT</th>
                <th className="border-2 border-black">DATE</th>
                <th className="border-2 border-black">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-black">{order.id}</td>
                  <td className="border border-black">{order.items}</td>
                  <td className="border border-black">{order.name}</td>
                  <td className="border border-black">{order.payment}</td>
                  <td className="border border-black">{order.date.toLocaleDateString()}</td>
                  <td className="border border-black">₹{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adhome;
