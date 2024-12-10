import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// User Components
import Register_page from "./Components/Login/Register_page";
import Login_page from "./Components/Login/Login_page";
import Layout from "./Components/Users/Layout/Layout";
import Cart from "./Components/Users/Cart/Cart";
import OrderListing from "./Components/Users/Orders/Orders";
import Product from "./Components/Users/Product/Product";
import Deliverydetails from "./Components/Users/DeliveryDetails/Deliverydetails";
import Items from "./Components/Users/Items/Items";
import Home from "./Components/Users/Home/Home";

// Admin Components
import Adlayout from "./Components/Admin/AdLayout/Adlayout";
import Adhome from "./Components/Admin/Adhome/Adhome";

import Adorders from "./Components/Admin/Adorders/Adorders";
import Adusers from "./Components/Admin/Adusers/Adusers";

// Context
import Sharing from "./Components/Sharingcontext/Sharing";
import Adcontext from "./Components/Admin/adsharingcontext/adcontext";

import Admproducts from "./Components/Admin/Admproducts/Admproducts";

const App = () => (
  <BrowserRouter>
  <Adcontext>
    <Sharing>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        
        <Route path="/admin" element={<Adlayout />}>
          <Route index element={<Adhome />} />
          <Route path="adusers" element={<Adusers />} />
          <Route path="adproducts" element={<Admproducts />} />
          <Route path="adorders" element={<Adorders />} />
        </Route>

    
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="items/:itemsid" element={<Items />} />
          <Route path="brand/:brandName" element={<Product />} />
        </Route>
        <Route path="orders" element={<OrderListing />} />
        <Route path="cart" element={<Cart />} />
        <Route path="register" element={<Register_page />} />
        <Route path="login" element={<Login_page />} />
        <Route path="delivery" element={<Deliverydetails />} />
  
      </Routes>
    </Sharing>
    </Adcontext>
  </BrowserRouter>
);

export default App;
