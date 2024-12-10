import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../../Sharingcontext/Sharing";
import { admcontext } from "../../Admin/adsharingcontext/adcontext";

const Product = () => {
  const { brandName } = useParams(); 
  const { products, selectedOption, setSelectedOption } = useContext(admcontext);
  const { addcart } = useContext(Context);

  
  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedOption(category);
    localStorage.setItem("selectedCategory", category); 
  };


  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setSelectedOption(storedCategory);
    }
  }, [setSelectedOption]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      localStorage.removeItem('user');
    }
  }, []);

  const filteredbrand = brandName
    ? products.filter((product) => product.brand === brandName)
    : products;

  
  const filteredCategory = selectedOption
    ? filteredbrand.filter((product) => product.category.toLowerCase() === selectedOption.toLowerCase())
    : filteredbrand;

  return (
    <div className="bg-gray-50 py-8" style={{ paddingTop: "4rem" }}>
      <div className="flex justify-around p-4">
        {["NIKE", "PUMA", "SPAREX", "ADIDAS"].map((brand) => (
          <div key={brand}>
            <Link to={`/brand/${brand}`}>
              <img
                src={`/${brand}.png`}
                alt={brand}
                className="h-52 w-72 object-contain hover:scale-105 shadow-md"
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="w-full h-14 mt-6 p-4 bg-slate-300 flex justify-between">
        <h1>Select Category</h1>
        <select value={selectedOption} onChange={handleChange}>
          <option value="">--All--</option>
          <option value="running">Running</option>
          <option value="casual">Casual</option>
          <option value="sneakers">Sneakers</option>
        </select>
      </div>

      <div className="container mx-auto px-4 mt-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {brandName ? `${brandName} Products` : "Our Products"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCategory.length > 0 ? (
            filteredCategory.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
              >
                <div className="relative group">
                  <Link to={`/items/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-60 object-contain transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.name.toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <h6 className="text-sm font-semibold text-gray-500">
                      BRAND: {product.brand}
                    </h6>
                    <h3 className="text-xl font-bold text-gray-800">
                      {product.price}
                    </h3>
                  </div>
                </div>
                <div className="p-4 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => addcart(product)}
                    className="bg-green-600 text-white px-6 py-2 rounded-full shadow-md transition-colors duration-300 hover:bg-green-700 focus:outline-none font-semibold uppercase tracking-wider"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">No products found for this category</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
