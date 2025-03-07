import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const imageBaseUrl = "https://cdn.mybestbrands.de/";
  const thumbnailUrl = `${imageBaseUrl}${product.Details.Media.ThumbnailImagePath}`

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <img
        src={thumbnailUrl}
        alt={product.Details.DealName}
        className="w-auto h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{product.Details.DealName}</h2>
        <h3 className="text-lg text-gray-600">{product.Pricing.DiscountedPrice.FormattedString}€</h3>
        <button
          onClick={() => navigate(`/product/${product.DealID}`)}
          className="mt-2 text-blue-500 hover:underline"
        >
          Show Details
        </button>
      </div>
    </div>
  );
};

export default Product;