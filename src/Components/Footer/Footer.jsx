import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
       
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
    
          <div>
            <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
            <p>About Stepify</p>
            <p>Careers</p>
            <p>Press Releases</p>
            <p>Stepify Science</p>
          </div>

    
          <div>
            <h3 className="font-bold text-lg mb-4">Connect with Us</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>

      
          <div>
            <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
            <p>Sell on Stepify</p>
            <p>Become an Affiliate</p>
            <p>Advertise Your Products</p>
          </div>

     
          <div>
            <h3 className="font-bold text-lg mb-4">Let Us Help You</h3>
            <p>stepify Account</p>
            <p>Returns Centre</p>
            <p>100% Purchase Protection</p>
            <p>Help</p>
          </div>
        </div>


        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-400">&copy; 2024 Stepify. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
