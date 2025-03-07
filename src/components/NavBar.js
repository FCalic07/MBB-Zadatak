import React from "react";
import { FaRegHeart, FaRegUser } from 'react-icons/fa';

function NavBar() {
    return (
        <nav className="bg-black h-14 px-28">
          <div className="flex items-center justify-between h-full">

            <a href="/" className="flex items-center">
            <img 
                src="https://www.mybestbrands.de/intstatic/images/mbb-logo-white.svg" 
                alt="MyBestBrands logo" 
                className="h-[16px] w-auto" 
              />
            </a>
    
            <div className="flex items-center space-x-6">
              <a href="/"><FaRegHeart className="text-white text-xl"/></a>
              <a href="/"><FaRegUser className="text-white text-xl"/></a>
            </div>
          </div>
        </nav>
      );
};

export default NavBar;