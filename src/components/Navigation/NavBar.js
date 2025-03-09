import React, {useEffect} from "react";
import { FaRegHeart, FaRegUser } from 'react-icons/fa';

function NavBar() {

  useEffect(()=>{
    console.log("rerendered navbar");
  });


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
              <FaRegHeart className="text-white text-xl"/>
              <FaRegUser className="text-white text-xl"/>
            </div>
          </div>
        </nav>
      );
};

export default NavBar;