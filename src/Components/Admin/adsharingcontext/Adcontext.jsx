import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const admcontext = createContext();
const Adcontext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [modalData, setModalData] = useState({}); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/items');
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:5000/items', newProduct);
      setProducts([...products, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const editProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:5000/items/${updatedProduct.id}`, updatedProduct);
      setProducts(products.map(product => (product.id === updatedProduct.id ? response.data : product)));
    } catch (err) {
         (err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <admcontext.Provider
      value={{
        products,
        setProducts,
        selectedOption,
        setSelectedOption,
        filteredProducts: products.filter(product => !selectedOption || product.category === selectedOption),
        addProduct,
        editProduct,
        deleteProduct,
        modalData,
        setModalData,
        isModalOpen,
        setIsModalOpen
      }}
    >
      {children}
    </admcontext.Provider>
  );
};

export default Adcontext;
