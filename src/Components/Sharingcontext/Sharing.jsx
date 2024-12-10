import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Context = createContext();

const Sharing = ({ children }) => {
  const [loginButton, setloginButton] = useState(false);
  const [cartitems, setcartitems] = useState([]);
  const [orders, setOrders] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const userid = localStorage.getItem("id");
    if (userid) {
      setloginButton(true);

      axios
        .get(`http://localhost:5000/users/${userid}`)
        .then((response) => {
          setcartitems(response.data.cart || []);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const addcart = async (product) => {
    const userid = localStorage.getItem("id");

    if (!userid) {
      toast.success("please login first")
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/users/${userid}`);
      const user = response.data;

      const existingProduct = user.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        toast.success("Item Already Exists in your CART ");
      } else {
        const updatedCart = [...user.cart, { ...product, quantity: 1 }];
        await axios.patch(`http://localhost:5000/users/${userid}`, { cart: updatedCart });
        setcartitems(updatedCart);
        toast.success("Item Added into your CART ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Orders Method
  const fetchOrders = async (userid) => {
    if (!userid) {
      console.error("User not logged in.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/orders?userId=${userid}`);
      setOrders(response.data); // Update orders state
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  return (
    <Context.Provider
      value={{
        loginButton,
        setloginButton,
        cartitems,
        setcartitems,
        addcart,
        orders,
        fetchOrders, // Provide orders and fetchOrders
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Sharing;
