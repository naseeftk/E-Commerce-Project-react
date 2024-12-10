import React, { useContext, useState } from "react";
import { admcontext } from "../adsharingcontext/adcontext";
import axios from "axios"; 

const Admproducts = () => {
  const {
    filteredProducts,
    selectedOption,
    setSelectedOption,
    setProducts, 
    products, 
  } = useContext(admcontext);


  const [modalData, setModalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = () => {
    setModalData({}); 
    setIsEditing(false); 
    setIsModalOpen(true)
  };

  const handleEditProduct = (product) => {
    setModalData(product);
    setIsEditing(true); 
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
   
      await axios.delete(`http://localhost:5000/items/${id}`);

      
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts); 
    } catch (error) {
      ( error);
    }
  };


  const handleSave = async () => {
    if (isEditing) {
     
      try {
        await axios.put(`http://localhost:5000/items/${modalData.id}`, modalData);
  
      
        const updatedProducts = products.map((product) =>
          product.id === modalData.id ? modalData : product
        );
        setProducts(updatedProducts);
      } catch (error) {
        ( error);
      }
    } else {
      
      try {
        const response = await axios.post("http://localhost:5000/items", modalData);
  
        const newProduct = response.data;
  
        // Update products in the local state
        setProducts([...products, newProduct]);
      } catch (error) {
       ( error);
      }
    }
  
    // Close the modal and reset modal data
    setIsModalOpen(false);
    setModalData({});
  };
  

  const handleClose = () => {
    setIsModalOpen(false);
    setModalData({});
  };

  return (
    <div>
      <div className="flex items-center justify-center text-3xl font-bold">
        <h1>Products Management</h1>
      </div>

      <div className="w-full h-14 mt-6 p-4 bg-slate-300 flex justify-between">
        <h1>Select Category</h1>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">--All--</option>
          <option value="running">Running</option>
          <option value="casual">Casual</option>
          <option value="sneakers">Sneakers</option>
        </select>
      </div>

      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handleAddProduct}
          className="p-2 bg-blue-700 text-white h-12 rounded-full font-bold hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      <div className="mt-4">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Seller</th>
              <th className="border p-2">Edit</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="border p-2">{product.id}</td>
                  <td className="border p-2">
                    <img src={product.image} alt={product.name} width="50" />
                  </td>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2">₹{product.price}</td>
                  <td className="border p-2">{product.stock}</td>
                  <td className="border p-2">{product.seller}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center border p-2">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={modalData.name || ""}
                  onChange={(e) =>
                    setModalData({ ...modalData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter product name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  value={modalData.category || ""}
                  onChange={(e) =>
                    setModalData({ ...modalData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="running">Running</option>
                  <option value="casual">Casual</option>
                  <option value="sneakers">Sneakers</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={modalData.price || ""}
                  onChange={(e) =>
                    setModalData({ ...modalData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter product price"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Stock</label>
                <input
                  type="number"
                  value={modalData.stock || ""}
                  onChange={(e) =>
                    setModalData({ ...modalData, stock: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter stock quantity"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={modalData.image || ""}
                  onChange={(e) =>
                    setModalData({ ...modalData, image: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Seller Details</label>
                <input
                  type="text"
                  value={modalData.seller || ""}
                  onChange={(e) =>
                    setModalData({ ...modalData, seller: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter seller details"
                />
              </div>
            </form>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admproducts;
