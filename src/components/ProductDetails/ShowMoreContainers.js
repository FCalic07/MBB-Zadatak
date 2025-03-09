import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

function ShowSizes({product}) {
    const [showSizes, setShowSizes] = useState(false);

    return(
        <div className="py-4 border-b border-black">
          <button
            onClick={() => setShowSizes(!showSizes)}
            className="flex items-center justify-between w-full gap-2 mt-4 text-lg font-semibold"
          >
            Sizes <FaChevronDown className={`transition-transform ${showSizes ? "rotate-180" : ""}`} />
          </button>
  
          {showSizes && (
          <div className="flex mt-2 gap-3">
            {product.Details.AvailableSizes.split("|").map((size) => (
              <p className="text-gray-700">
                <p className="hover:underline hover:cursor-pointer">{size}</p>
              </p>
            ))}
          </div>
        )}
        </div>
    );
}

function ShowDetails({product}) {
    const [showProductDetails, setShowProductDetails] = useState(false);

    return(
        <div className="border-b py-4 border-black">
          <button
            onClick={() => setShowProductDetails(!showProductDetails)}
            className="flex items-center justify-between w-full gap-2 mt-4 text-lg font-semibold"
          >
            Product details <FaChevronDown className={`transition-transform ${showProductDetails ? "rotate-180" : ""}`} />
          </button>
  
          {showProductDetails && (
          <div className="mt-2 gap-3">
              <p className="text-gray-700 mb-3">
                {product.Details.Description}
              </p>
              <p className="font-semibold">Material</p>
              <p className="text-gray-700">
                {product.Details.Material}
              </p>
              <p className="mt-4 text-gray-700">
              Discover more products from <span className="hover:cursor-pointer underline font-semibold">{product.Retailer.Name}</span>
              </p>
          </div>
        )}
        </div>
    );

}

export { ShowSizes, ShowDetails };
