import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Adusers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [ModalVisible, setModalVisible] = useState(false);
  const [selectedUserOrders, setSelectedUserOrders] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
  
        const nonAdminUsers = response.data.filter(user => user.role !== 'admin');
        setUsers(nonAdminUsers);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchUsers();
  }, []);

  const userClick = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
    setSelectedUserOrders([]);
  };

  const orderClick = (user) => {
    setSelectedUserOrders(user.orders); 
    setModalVisible(true); 
  };

  
  const toBlock = async (user) => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${user.id}`, {
        blocked: true,
      });
      setUsers(users.map(u => (u.id === user.id ? response.data : u))); 
    } catch (err) {
      (err);
    }
  };

  const toUnblock = async (user) => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${user.id}`, {
        blocked: false,
      });
      setUsers(users.map(u => (u.id === user.id ? response.data : u)));
    } catch (err) {
      c( err);
    }
  };

  return (
    <>
    <div>
      <h1 className="text-3xl font-bold flex justify-center items-center">Users:</h1>
      <div className="p-14">
        <table className="border-collapse  w-11/12 h-80 border-2  border-black text-centerw-full bg-slate-300">
          <thead>
            <tr>
              <th className="border-2 border-black text-center">ID</th>
              <th className="border-2 border-black text-center">NAME</th>
              <th className="border-2 border-black text-center">DETAILS</th>
              <th className="border-2 border-black text-center">ORDERS</th>
              <th className="border-2 border-black text-center">ORDER DETAILS</th>
              <th className="border-2 border-black text-center">BLOCK/UNBLOCK</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-black text-center">{user.id}</td>
                
                <td className="border border-black text-center">
                {user.name}
                </td>
                <td className="border border-black text-center "><button className='w-28 h-10 bg-slate-400' onClick={() => userClick(user)}>details</button></td>
                <td className="border border-black text-center">
                  {user.orders.length}
                </td>
                <td  className="border border-black text-center"><button className='w-28 h-10 bg-slate-400' onClick={() => orderClick(user)}>details</button></td>
                <td className="border border-black text-center">
                  {user.blocked ? (
                    <button onClick={() => toUnblock(user)} className="bg-green-500 text-white px-4 py-2 rounded">
                      Unblock
                    </button>
                  ) : (
                    <button onClick={() => toBlock(user)} className="bg-red-500 text-white px-4 py-2 rounded">
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for User Details */}
      {ModalVisible && selectedUser && !selectedUserOrders.length && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <div className="space-y-4">
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Password:</strong> {selectedUser.password}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Order Details */}
      {ModalVisible && selectedUserOrders.length > 0 && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto">
              {selectedUserOrders.map((order, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                  <p><strong>Order ID:</strong> {order.orderId}</p>
                  <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                  <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        <p><strong>Item Name:</strong> {item.name}</p>
                        <p><strong>Price:</strong> ₹{item.price}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Adusers;
