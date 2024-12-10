import React from 'react';
import Product from '../Product/Product';


const Home = () => {
  window.scrollTo(0, 0)
  return (

    <div className="relative pt-20"> 
  
      <div className=" ml-2 mr-2 flex items-center justify-center">
        <img 
          src="public/MAINPIC.webp" 
          alt="Background" 
          style={{ height: "550px" , 
            backgroundSize: "cover",
            backgroundPosition: "cover", }} 
          className="rounded-md w-full " 
        />
      </div>

 
      <div className="pt-12"> 
        <Product/>
      </div>
    </div>
  );
};

export default Home;
